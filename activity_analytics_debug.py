#!/usr/bin/env python3
"""
Debug Activity Analytics Issue
Tests the specific scenario described in the review request
"""

import requests
import sys
import json
from datetime import datetime

class ActivityAnalyticsDebugger:
    def __init__(self, base_url="https://7654efca-c21e-4e6d-8320-125646db0e34.preview.emergentagent.com"):
        self.base_url = base_url
        self.user_id = None
        self.selected_activities = []
        self.all_activities = []

    def create_test_user(self):
        """Create a test user"""
        test_email = f"debug_user_{datetime.now().strftime('%H%M%S')}@example.com"
        test_name = "Debug User"
        
        print(f"🔍 Creating test user: {test_name}")
        
        response = requests.post(
            f"{self.base_url}/api/users",
            json={"email": test_email, "name": test_name},
            headers={'Content-Type': 'application/json'}
        )
        
        if response.status_code == 200:
            user_data = response.json()
            self.user_id = user_data['id']
            print(f"✅ Created user ID: {self.user_id}")
            return True
        else:
            print(f"❌ Failed to create user: {response.status_code}")
            return False

    def get_all_activities(self):
        """Get all available activities"""
        print(f"🔍 Fetching all activities...")
        
        response = requests.get(f"{self.base_url}/api/activities")
        
        if response.status_code == 200:
            self.all_activities = response.json()
            print(f"✅ Found {len(self.all_activities)} total activities")
            return True
        else:
            print(f"❌ Failed to get activities: {response.status_code}")
            return False

    def add_specific_activities(self):
        """Add exactly 3-4 specific activities as mentioned in the request"""
        target_activities = ["Gym workout", "Yoga", "Reading", "Meditation"]
        
        print(f"🔍 Adding specific activities to user's plan...")
        
        for activity_name in target_activities:
            # Find the activity by name
            activity = None
            for act in self.all_activities:
                if act['name'] == activity_name:
                    activity = act
                    break
            
            if not activity:
                print(f"❌ Activity '{activity_name}' not found")
                continue
            
            # Add to user activities
            response = requests.post(
                f"{self.base_url}/api/user-activities",
                json={
                    "user_id": self.user_id,
                    "activity_id": activity['id'],
                    "completed": False
                },
                headers={'Content-Type': 'application/json'}
            )
            
            if response.status_code == 200:
                self.selected_activities.append(activity)
                print(f"✅ Added '{activity_name}' to user's plan")
            else:
                print(f"❌ Failed to add '{activity_name}': {response.status_code}")
        
        print(f"📊 Total activities selected: {len(self.selected_activities)}")
        for act in self.selected_activities:
            print(f"   - {act['name']}")

    def check_analytics(self):
        """Check the activity analytics"""
        print(f"🔍 Checking activity analytics...")
        
        response = requests.get(f"{self.base_url}/api/analytics/activities/{self.user_id}")
        
        if response.status_code == 200:
            analytics = response.json()
            
            print(f"\n📊 ANALYTICS RESULTS:")
            print(f"   Total Activities Added: {analytics.get('total_activities_added', 'N/A')}")
            print(f"   Completion Rate: {analytics.get('completion_rate', 'N/A')}%")
            
            print(f"\n📋 Activity Frequency:")
            activity_freq = analytics.get('activity_frequency', {})
            for activity_name, count in activity_freq.items():
                print(f"   - {activity_name}: {count}")
            
            print(f"\n🏷️ Category Distribution:")
            category_dist = analytics.get('category_distribution', {})
            for category, count in category_dist.items():
                print(f"   - {category}: {count}")
            
            # Compare with what we actually selected
            print(f"\n🔍 COMPARISON:")
            print(f"   Activities we selected: {len(self.selected_activities)}")
            print(f"   Analytics shows: {analytics.get('total_activities_added', 'N/A')}")
            
            if len(self.selected_activities) == analytics.get('total_activities_added'):
                print(f"✅ MATCH: Analytics correctly shows {len(self.selected_activities)} activities")
            else:
                print(f"❌ MISMATCH: Expected {len(self.selected_activities)}, got {analytics.get('total_activities_added')}")
            
            # Check if activity names match
            analytics_activities = set(activity_freq.keys())
            selected_names = set(act['name'] for act in self.selected_activities)
            
            print(f"\n🏷️ Activity Names Comparison:")
            print(f"   Selected: {selected_names}")
            print(f"   Analytics: {analytics_activities}")
            
            if selected_names == analytics_activities:
                print(f"✅ MATCH: Activity names match perfectly")
            else:
                print(f"❌ MISMATCH: Activity names don't match")
                missing_in_analytics = selected_names - analytics_activities
                extra_in_analytics = analytics_activities - selected_names
                if missing_in_analytics:
                    print(f"   Missing in analytics: {missing_in_analytics}")
                if extra_in_analytics:
                    print(f"   Extra in analytics: {extra_in_analytics}")
            
            return analytics
        else:
            print(f"❌ Failed to get analytics: {response.status_code}")
            return None

    def get_user_activities_raw(self):
        """Get raw user activities data for debugging"""
        print(f"🔍 Getting raw user activities data...")
        
        response = requests.get(f"{self.base_url}/api/user-activities/{self.user_id}")
        
        if response.status_code == 200:
            user_activities = response.json()
            print(f"📊 Raw user activities count: {len(user_activities)}")
            
            for i, ua in enumerate(user_activities, 1):
                print(f"   {i}. Activity ID: {ua.get('activity_id')}, Completed: {ua.get('completed', False)}")
            
            return user_activities
        else:
            print(f"❌ Failed to get user activities: {response.status_code}")
            return []

    def debug_analytics_issue(self):
        """Main debugging function"""
        print("🚀 Starting Activity Analytics Debug")
        print("=" * 60)
        
        # Step 1: Create test user
        if not self.create_test_user():
            return False
        
        # Step 2: Get all activities
        if not self.get_all_activities():
            return False
        
        # Step 3: Add specific activities
        self.add_specific_activities()
        
        # Step 4: Get raw user activities for debugging
        user_activities = self.get_user_activities_raw()
        
        # Step 5: Check analytics
        analytics = self.check_analytics()
        
        print("\n" + "=" * 60)
        print("🎯 DEBUG SUMMARY:")
        print(f"   User ID: {self.user_id}")
        print(f"   Total available activities: {len(self.all_activities)}")
        print(f"   Activities we selected: {len(self.selected_activities)}")
        print(f"   Raw user activities count: {len(user_activities)}")
        if analytics:
            print(f"   Analytics total_activities_added: {analytics.get('total_activities_added')}")
        
        return True

def main():
    """Main function"""
    debugger = ActivityAnalyticsDebugger()
    success = debugger.debug_analytics_issue()
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())