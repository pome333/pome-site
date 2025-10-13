#!/usr/bin/env python3
"""
Specific Backend Tests for Pome App Review Requirements
Tests the specific requirements mentioned in the review request
"""

import requests
import sys
import json

class PomeSpecificTester:
    def __init__(self, base_url="https://pome-analytics.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0

    def test_activities_count_and_dancing(self):
        """Test that there are 35 activities and Dancing has Physical + Social tags"""
        print("\n🔍 Testing Activities System Requirements...")
        
        try:
            url = f"{self.base_url}/api/activities"
            response = requests.get(url, timeout=10)
            
            if response.status_code != 200:
                print(f"❌ Failed - Status: {response.status_code}")
                return False
            
            activities = response.json()
            
            # Test 1: Check total count is 35
            self.tests_run += 1
            if len(activities) == 35:
                print(f"✅ Activities count test passed: {len(activities)} activities found")
                self.tests_passed += 1
            else:
                print(f"❌ Activities count test failed: Expected 35, got {len(activities)}")
            
            # Test 2: Find Dancing activity and check its categories
            self.tests_run += 1
            dancing_activity = None
            for activity in activities:
                if activity.get('name') == 'Dancing':
                    dancing_activity = activity
                    break
            
            if dancing_activity:
                categories = dancing_activity.get('energy_categories', [])
                expected_categories = ['physical', 'social']
                
                if set(categories) == set(expected_categories):
                    print(f"✅ Dancing activity test passed: Found with categories {categories}")
                    self.tests_passed += 1
                else:
                    print(f"❌ Dancing activity test failed: Expected {expected_categories}, got {categories}")
            else:
                print("❌ Dancing activity test failed: Dancing activity not found")
            
            # Print all activities for verification
            print(f"\n📋 All {len(activities)} activities:")
            for i, activity in enumerate(activities, 1):
                categories_str = " + ".join([cat.title() for cat in activity.get('energy_categories', [])])
                print(f"   {i:2d}. {activity.get('name')} ({categories_str})")
            
            return True
            
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False

    def test_emotion_data_structure(self):
        """Test that emotion data structure supports enhanced tracking"""
        print("\n🔍 Testing Enhanced Emotion Tracking Structure...")
        
        # Create a test user first
        try:
            user_response = requests.post(
                f"{self.base_url}/api/users",
                json={"email": "test_emotion@example.com", "name": "Test User"},
                timeout=10
            )
            
            if user_response.status_code != 200:
                print(f"❌ Failed to create test user: {user_response.status_code}")
                return False
            
            user_data = user_response.json()
            user_id = user_data.get('id')
            
            # Test enhanced emotion logging
            self.tests_run += 1
            emotion_data = {
                "user_id": user_id,
                "quadrant": "high_energy_high_pleasant",
                "specific_emotion": "Joy",
                "context": {
                    "location": "Home",
                    "social_setting": "Family",
                    "current_activity": "Working"
                }
            }
            
            emotion_response = requests.post(
                f"{self.base_url}/api/emotions",
                json=emotion_data,
                timeout=10
            )
            
            if emotion_response.status_code == 200:
                print("✅ Enhanced emotion logging test passed")
                self.tests_passed += 1
                
                # Verify the emotion was stored correctly
                emotions_response = requests.get(
                    f"{self.base_url}/api/emotions/user/{user_id}",
                    timeout=10
                )
                
                if emotions_response.status_code == 200:
                    emotions = emotions_response.json()
                    if emotions and len(emotions) > 0:
                        latest_emotion = emotions[0]
                        if (latest_emotion.get('quadrant') == 'high_energy_high_pleasant' and
                            latest_emotion.get('specific_emotion') == 'Joy' and
                            latest_emotion.get('context')):
                            print("✅ Emotion data structure verification passed")
                        else:
                            print("❌ Emotion data structure verification failed")
                    else:
                        print("❌ No emotions found after logging")
                else:
                    print(f"❌ Failed to retrieve emotions: {emotions_response.status_code}")
            else:
                print(f"❌ Enhanced emotion logging test failed: {emotion_response.status_code}")
            
            return True
            
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False

    def run_specific_tests(self):
        """Run all specific tests"""
        print("🚀 Starting Pome Specific Requirements Tests")
        print("=" * 60)
        
        self.test_activities_count_and_dancing()
        self.test_emotion_data_structure()
        
        # Print final results
        print("\n" + "=" * 60)
        print(f"📊 Specific Tests Results: {self.tests_passed}/{self.tests_run} tests passed")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All specific requirements tests passed!")
            return 0
        else:
            print(f"⚠️  {self.tests_run - self.tests_passed} specific tests failed")
            return 1

def main():
    """Main test runner"""
    tester = PomeSpecificTester()
    return tester.run_specific_tests()

if __name__ == "__main__":
    sys.exit(main())