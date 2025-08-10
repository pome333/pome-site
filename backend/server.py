from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pymongo import MongoClient
from typing import List, Optional
import os
import uuid
from datetime import datetime, timedelta

app = FastAPI()

# Simple, clean CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
client = MongoClient(MONGO_URL)
db = client.pome_db

# Collections
users = db.users
emotions = db.emotions
activities = db.activities
user_activities = db.user_activities

# Models
class User(BaseModel):
    id: Optional[str] = None
    email: str
    name: str
    created_at: Optional[datetime] = None

class EmotionEntry(BaseModel):
    id: Optional[str] = None
    user_id: str
    quadrant: str  # "high_energy_low_pleasant", "high_energy_high_pleasant", etc.
    specific_emotion: str
    context: Optional[dict] = None  # location, social_setting, current_activity
    created_at: Optional[datetime] = None

class Activity(BaseModel):
    id: Optional[str] = None
    name: str
    energy_categories: List[str]  # physical, emotional, social, natural, spiritual
    description: Optional[str] = None

class UserActivity(BaseModel):
    id: Optional[str] = None
    user_id: str
    activity_id: str
    completed: bool = False
    effectiveness_rating: Optional[int] = None  # 1-10 how much it helped
    completed_at: Optional[datetime] = None
    created_at: Optional[datetime] = None

# Enhanced default activities with corrected tags
DEFAULT_ACTIVITIES = [
    {"name": "Gym workout", "energy_categories": ["physical"]},
    {"name": "Yoga", "energy_categories": ["physical", "spiritual"]},
    {"name": "Beach walk", "energy_categories": ["physical", "natural"]},
    {"name": "Meditation", "energy_categories": ["spiritual"]},
    {"name": "Call friends", "energy_categories": ["social", "emotional"]},
    {"name": "Gratitude journaling", "energy_categories": ["emotional"]},
    {"name": "Dancing", "energy_categories": ["physical", "social"]},
    {"name": "Nature hike", "energy_categories": ["physical", "natural"]},
    {"name": "Therapy session", "energy_categories": ["emotional"]},
    {"name": "Art creation", "energy_categories": ["emotional"]},
    {"name": "Meet with friends", "energy_categories": ["social"]},
    {"name": "Meet with family", "energy_categories": ["social"]},
    {"name": "Time with pets", "energy_categories": ["emotional"]},
    {"name": "Art gallery/museum/concert", "energy_categories": ["emotional"]},
    {"name": "A good movie night", "energy_categories": ["emotional"]},
    {"name": "Reading", "energy_categories": ["emotional"]},
    {"name": "Spa day", "energy_categories": ["physical"]},
    {"name": "Massage", "energy_categories": ["physical"]},
    {"name": "A date", "energy_categories": ["social"]},
    {"name": "Work on my mission", "energy_categories": ["spiritual"]},
    {"name": "A long walk", "energy_categories": ["physical", "natural"]},
    {"name": "Cooking favorite meal", "energy_categories": ["emotional"]},
    {"name": "Gardening", "energy_categories": ["natural"]},
    {"name": "Volunteer work", "energy_categories": ["social", "spiritual"]},
    {"name": "Listen to music", "energy_categories": ["emotional"]},
    {"name": "Take a bath", "energy_categories": ["physical"]},
    {"name": "Photography", "energy_categories": ["emotional"]},
    {"name": "Write in journal", "energy_categories": ["emotional"]},
    {"name": "Play with children", "energy_categories": ["social"]},
    {"name": "Attend religious service", "energy_categories": ["spiritual", "social"]},
    {"name": "Go to the beach", "energy_categories": ["natural", "physical"]},
    {"name": "Have a picnic", "energy_categories": ["natural", "social"]},
    {"name": "Practice breathing exercises", "energy_categories": ["physical"]},
    {"name": "Learn something new", "energy_categories": ["emotional"]},
    {"name": "Organize/declutter space", "energy_categories": ["emotional"]},
]

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}

@app.post("/api/users")
async def create_user(user: User):
    user_dict = user.dict()
    user_dict["id"] = str(uuid.uuid4())
    user_dict["created_at"] = datetime.utcnow()
    
    # Check if user already exists
    existing = users.find_one({"email": user.email})
    if existing:
        return {"id": existing["id"], "email": existing["email"], "name": existing["name"]}
    
    users.insert_one(user_dict)
    return {"id": user_dict["id"], "email": user_dict["email"], "name": user_dict["name"]}

@app.get("/api/users/{user_id}")
async def get_user(user_id: str):
    user = users.find_one({"id": user_id})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {"id": user["id"], "email": user["email"], "name": user["name"]}

@app.post("/api/emotions")
async def log_emotion(emotion: EmotionEntry):
    emotion_dict = emotion.dict()
    emotion_dict["id"] = str(uuid.uuid4())
    emotion_dict["created_at"] = datetime.utcnow()
    emotions.insert_one(emotion_dict)
    return {"id": emotion_dict["id"], "message": "Emotion logged successfully"}

@app.get("/api/emotions/user/{user_id}")
async def get_user_emotions(user_id: str, days: int = 7):
    since_date = datetime.utcnow() - timedelta(days=days)
    user_emotions = list(emotions.find(
        {"user_id": user_id, "created_at": {"$gte": since_date}},
        {"_id": 0}
    ).sort("created_at", -1))
    return user_emotions

@app.get("/api/activities")
async def get_activities():
    activity_list = list(activities.find({}, {"_id": 0}))
    if not activity_list:
        # Initialize with default activities
        for activity_data in DEFAULT_ACTIVITIES:
            activity_dict = activity_data.copy()
            activity_dict["id"] = str(uuid.uuid4())
            activities.insert_one(activity_dict)
        activity_list = list(activities.find({}, {"_id": 0}))
    return activity_list

@app.post("/api/user-activities")
async def create_user_activity(user_activity: UserActivity):
    activity_dict = user_activity.dict()
    activity_dict["id"] = str(uuid.uuid4())
    activity_dict["created_at"] = datetime.utcnow()
    user_activities.insert_one(activity_dict)
    return {"id": activity_dict["id"], "message": "Activity added successfully"}

@app.put("/api/user-activities/{activity_id}/complete")
async def complete_activity(activity_id: str, effectiveness_rating: int):
    result = user_activities.update_one(
        {"id": activity_id},
        {
            "$set": {
                "completed": True,
                "effectiveness_rating": effectiveness_rating,
                "completed_at": datetime.utcnow()
            }
        }
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Activity not found")
    return {"message": "Activity marked as completed"}

@app.get("/api/user-activities/{user_id}")
async def get_user_activities(user_id: str):
    user_activity_list = list(user_activities.find(
        {"user_id": user_id},
        {"_id": 0}
    ).sort("created_at", -1))
    return user_activity_list

@app.get("/api/analytics/patterns/{user_id}")
async def get_emotion_patterns(user_id: str, days: int = 30):
    since_date = datetime.utcnow() - timedelta(days=days)
    
    # Get emotions for the period
    user_emotions = list(emotions.find(
        {"user_id": user_id, "created_at": {"$gte": since_date}},
        {"_id": 0}
    ))
    
    # Analyze patterns
    quadrant_counts = {}
    emotion_counts = {}
    triggers = {}
    
    for emotion in user_emotions:
        # Count quadrants
        quadrant = emotion.get("quadrant", "unknown")
        quadrant_counts[quadrant] = quadrant_counts.get(quadrant, 0) + 1
        
        # Count specific emotions
        specific = emotion.get("specific_emotion", "unknown")
        emotion_counts[specific] = emotion_counts.get(specific, 0) + 1
        
        # Analyze triggers from context
        if emotion.get("context"):
            context = emotion["context"]
            for key, value in context.items():
                if value:  # Only count non-empty values
                    if key not in triggers:
                        triggers[key] = {}
                    triggers[key][value] = triggers[key].get(value, 0) + 1
    
    return {
        "quadrant_distribution": quadrant_counts,
        "emotion_frequency": emotion_counts,
        "trigger_analysis": triggers,
        "total_entries": len(user_emotions)
    }

@app.get("/api/analytics/activities/{user_id}")
async def get_activity_analytics(user_id: str, days: int = 30):
    since_date = datetime.utcnow() - timedelta(days=days)
    
    # Get user activities for the period
    user_activity_list = list(user_activities.find(
        {"user_id": user_id, "created_at": {"$gte": since_date}},
        {"_id": 0}
    ))
    
    # Get all activities to get category information
    all_activities = list(activities.find({}, {"_id": 0}))
    activity_lookup = {act["id"]: act for act in all_activities}
    
    # Overall activity analytics
    total_activities_added = len(user_activity_list)
    completed_activities = [ua for ua in user_activity_list if ua.get("completed", False)]
    completion_rate = (len(completed_activities) / total_activities_added * 100) if total_activities_added > 0 else 0
    
    # Activity frequency
    activity_counts = {}
    category_counts = {"physical": 0, "emotional": 0, "social": 0, "natural": 0, "spiritual": 0}
    effectiveness_by_activity = {}
    effectiveness_by_category = {"physical": [], "emotional": [], "social": [], "natural": [], "spiritual": []}
    
    for ua in user_activity_list:
        activity_id = ua.get("activity_id")
        activity_info = activity_lookup.get(activity_id)
        
        if activity_info:
            activity_name = activity_info["name"]
            activity_counts[activity_name] = activity_counts.get(activity_name, 0) + 1
            
            # Count by categories
            for category in activity_info["energy_categories"]:
                category_counts[category] += 1
                
                # Track effectiveness by category
                if ua.get("effectiveness_rating"):
                    effectiveness_by_category[category].append(ua["effectiveness_rating"])
            
            # Track effectiveness by activity
            if ua.get("effectiveness_rating"):
                if activity_name not in effectiveness_by_activity:
                    effectiveness_by_activity[activity_name] = []
                effectiveness_by_activity[activity_name].append(ua["effectiveness_rating"])
    
    # Calculate average effectiveness by category
    avg_effectiveness_by_category = {}
    for category, ratings in effectiveness_by_category.items():
        if ratings:
            avg_effectiveness_by_category[category] = sum(ratings) / len(ratings)
    
    # Calculate average effectiveness by activity
    avg_effectiveness_by_activity = {}
    for activity, ratings in effectiveness_by_activity.items():
        if ratings:
            avg_effectiveness_by_activity[activity] = sum(ratings) / len(ratings)
    
    # Weekly breakdown (last 4 weeks)
    weekly_data = {}
    for i in range(4):
        week_start = datetime.utcnow() - timedelta(days=7*(i+1))
        week_end = datetime.utcnow() - timedelta(days=7*i)
        week_label = f"Week {4-i}"
        
        week_activities = [ua for ua in user_activity_list 
                          if week_start <= ua.get("created_at", datetime.min) < week_end]
        
        week_category_counts = {"physical": 0, "emotional": 0, "social": 0, "natural": 0, "spiritual": 0}
        for ua in week_activities:
            activity_info = activity_lookup.get(ua.get("activity_id"))
            if activity_info:
                for category in activity_info["energy_categories"]:
                    week_category_counts[category] += 1
        
        weekly_data[week_label] = {
            "total_activities": len(week_activities),
            "category_breakdown": week_category_counts
        }
    
    return {
        "total_activities_added": total_activities_added,
        "completion_rate": round(completion_rate, 1),
        "activity_frequency": activity_counts,
        "category_distribution": category_counts,
        "avg_effectiveness_by_category": avg_effectiveness_by_category,
        "avg_effectiveness_by_activity": avg_effectiveness_by_activity,
        "weekly_breakdown": weekly_data,
        "most_effective_activities": sorted(avg_effectiveness_by_activity.items(), 
                                          key=lambda x: x[1], reverse=True)[:5]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)