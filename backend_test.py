#!/usr/bin/env python3
"""
Backend API Testing for Pome Emotional Intelligence App
Tests all endpoints with comprehensive validation
"""

import requests
import sys
import json
from datetime import datetime
import uuid

class PomeAPITester:
    def __init__(self, base_url="https://pome-emotions.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.test_user_id = None
        self.test_emotion_id = None
        self.test_activity_id = None

    def run_test(self, name, method, endpoint, expected_status, data=None, validate_response=None):
        """Run a single API test with optional response validation"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            
            if success:
                try:
                    response_data = response.json()
                    print(f"✅ Passed - Status: {response.status_code}")
                    
                    # Additional response validation if provided
                    if validate_response and callable(validate_response):
                        validation_result = validate_response(response_data)
                        if not validation_result:
                            success = False
                            print(f"❌ Response validation failed")
                        else:
                            print(f"✅ Response validation passed")
                    
                    if success:
                        self.tests_passed += 1
                        return True, response_data
                    else:
                        return False, {}
                        
                except json.JSONDecodeError:
                    print(f"❌ Failed - Invalid JSON response")
                    return False, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_data = response.json()
                    print(f"   Error: {error_data}")
                except:
                    print(f"   Raw response: {response.text}")
                return False, {}

        except requests.exceptions.RequestException as e:
            print(f"❌ Failed - Network Error: {str(e)}")
            return False, {}
        except Exception as e:
            print(f"❌ Failed - Unexpected Error: {str(e)}")
            return False, {}

    def test_health_check(self):
        """Test health endpoint"""
        def validate_health(data):
            return data.get('status') == 'healthy'
        
        return self.run_test(
            "Health Check",
            "GET", 
            "api/health",
            200,
            validate_response=validate_health
        )

    def test_create_user(self):
        """Test user creation"""
        test_email = f"test_user_{datetime.now().strftime('%H%M%S')}@example.com"
        test_name = "Test User"
        
        def validate_user(data):
            has_id = 'id' in data and data['id']
            has_email = data.get('email') == test_email
            has_name = data.get('name') == test_name
            return has_id and has_email and has_name
        
        success, response = self.run_test(
            "Create User",
            "POST",
            "api/users",
            200,
            data={"email": test_email, "name": test_name},
            validate_response=validate_user
        )
        
        if success:
            self.test_user_id = response.get('id')
            print(f"   Created user ID: {self.test_user_id}")
        
        return success, response

    def test_get_user(self):
        """Test getting user by ID"""
        if not self.test_user_id:
            print("❌ Skipping - No test user ID available")
            return False, {}
        
        def validate_user_get(data):
            return data.get('id') == self.test_user_id
        
        return self.run_test(
            "Get User",
            "GET",
            f"api/users/{self.test_user_id}",
            200,
            validate_response=validate_user_get
        )

    def test_log_emotion_enhanced(self):
        """Test enhanced emotion logging with new context structure"""
        if not self.test_user_id:
            print("❌ Skipping - No test user ID available")
            return False, {}
        
        emotion_data = {
            "user_id": self.test_user_id,
            "quadrant": "high_energy_high_pleasant",
            "specific_emotion": "Joy",
            "context": {
                "location": "Home",
                "social_setting": "Family",
                "current_activity": "Working"
            }
        }
        
        def validate_emotion(data):
            has_id = 'id' in data and data['id']
            has_message = 'message' in data
            return has_id and has_message
        
        success, response = self.run_test(
            "Log Enhanced Emotion",
            "POST",
            "api/emotions",
            200,
            data=emotion_data,
            validate_response=validate_emotion
        )
        
        if success:
            self.test_emotion_id = response.get('id')
            print(f"   Created emotion ID: {self.test_emotion_id}")
        
        return success, response

    def test_log_emotion(self):
        """Test emotion logging"""
        if not self.test_user_id:
            print("❌ Skipping - No test user ID available")
            return False, {}
        
        emotion_data = {
            "user_id": self.test_user_id,
            "quadrant": "high_energy_high_pleasant",
            "specific_emotion": "Joy",
            "context": {
                "location": "Home",
                "social_setting": "Family", 
                "current_activity": "Working"
            }
        }
        
        def validate_emotion(data):
            has_id = 'id' in data and data['id']
            has_message = 'message' in data
            return has_id and has_message
        
        success, response = self.run_test(
            "Log Emotion",
            "POST",
            "api/emotions",
            200,
            data=emotion_data,
            validate_response=validate_emotion
        )
        
        if success:
            self.test_emotion_id = response.get('id')
            print(f"   Created emotion ID: {self.test_emotion_id}")
        
        return success, response

    def test_get_user_emotions(self):
        """Test getting user emotions"""
        if not self.test_user_id:
            print("❌ Skipping - No test user ID available")
            return False, {}
        
        def validate_emotions(data):
            return isinstance(data, list)
        
        return self.run_test(
            "Get User Emotions",
            "GET",
            f"api/emotions/user/{self.test_user_id}",
            200,
            validate_response=validate_emotions
        )

    def test_get_activities(self):
        """Test getting activities"""
        def validate_activities(data):
            if not isinstance(data, list) or len(data) == 0:
                return False
            
            # Check first activity has required fields
            first_activity = data[0]
            has_id = 'id' in first_activity
            has_name = 'name' in first_activity
            has_categories = 'energy_categories' in first_activity
            
            return has_id and has_name and has_categories
        
        success, response = self.run_test(
            "Get Activities",
            "GET",
            "api/activities",
            200,
            validate_response=validate_activities
        )
        
        if success and response:
            self.test_activity_id = response[0].get('id')
            print(f"   Found activity ID: {self.test_activity_id}")
        
        return success, response

    def test_create_user_activity(self):
        """Test creating user activity"""
        if not self.test_user_id or not self.test_activity_id:
            print("❌ Skipping - Missing user ID or activity ID")
            return False, {}
        
        activity_data = {
            "user_id": self.test_user_id,
            "activity_id": self.test_activity_id,
            "completed": False
        }
        
        def validate_user_activity(data):
            return 'id' in data and 'message' in data
        
        return self.run_test(
            "Create User Activity",
            "POST",
            "api/user-activities",
            200,
            data=activity_data,
            validate_response=validate_user_activity
        )

    def test_get_user_activities(self):
        """Test getting user activities"""
        if not self.test_user_id:
            print("❌ Skipping - No test user ID available")
            return False, {}
        
        def validate_user_activities(data):
            return isinstance(data, list)
        
        return self.run_test(
            "Get User Activities",
            "GET",
            f"api/user-activities/{self.test_user_id}",
            200,
            validate_response=validate_user_activities
        )

    def test_analytics_patterns(self):
        """Test analytics patterns endpoint"""
        if not self.test_user_id:
            print("❌ Skipping - No test user ID available")
            return False, {}
        
        def validate_analytics(data):
            required_keys = ['quadrant_distribution', 'emotion_frequency', 'trigger_analysis', 'total_entries']
            return all(key in data for key in required_keys)
        
        return self.run_test(
            "Get Analytics Patterns",
            "GET",
            f"api/analytics/patterns/{self.test_user_id}",
            200,
            validate_response=validate_analytics
        )

    def test_activity_analytics(self):
        """Test activity analytics endpoint"""
        if not self.test_user_id:
            print("❌ Skipping - No test user ID available")
            return False, {}
        
        def validate_activity_analytics(data):
            required_keys = [
                'total_activities_added', 'completion_rate', 'activity_frequency',
                'category_distribution', 'avg_effectiveness_by_category',
                'avg_effectiveness_by_activity', 'weekly_breakdown', 'most_effective_activities'
            ]
            return all(key in data for key in required_keys)
        
        return self.run_test(
            "Get Activity Analytics",
            "GET",
            f"api/analytics/activities/{self.test_user_id}",
            200,
            validate_response=validate_activity_analytics
        )

    def test_organize_declutter_activity_tag(self):
        """Test that 'Organize/declutter space' activity has only 'emotional' tag"""
        success, activities = self.test_get_activities()
        if not success:
            return False, {}
        
        # Find the "Organize/declutter space" activity
        organize_activity = None
        for activity in activities:
            if activity.get('name') == 'Organize/declutter space':
                organize_activity = activity
                break
        
        if not organize_activity:
            print("❌ Failed - 'Organize/declutter space' activity not found")
            return False, {}
        
        expected_categories = ['emotional']
        actual_categories = organize_activity.get('energy_categories', [])
        
        if actual_categories == expected_categories:
            print("✅ Passed - 'Organize/declutter space' has correct tags: ['emotional']")
            self.tests_passed += 1
            return True, organize_activity
        else:
            print(f"❌ Failed - Expected ['emotional'], got {actual_categories}")
            return False, {}
        
        self.tests_run += 1

    def run_all_tests(self):
        """Run all API tests in sequence"""
        print("🚀 Starting Pome API Tests")
        print("=" * 50)
        
        # Test sequence - order matters for dependencies
        test_methods = [
            self.test_health_check,
            self.test_create_user,
            self.test_get_user,
            self.test_log_emotion_enhanced,
            self.test_get_user_emotions,
            self.test_get_activities,
            self.test_organize_declutter_activity_tag,
            self.test_create_user_activity,
            self.test_get_user_activities,
            self.test_analytics_patterns,
            self.test_activity_analytics
        ]
        
        for test_method in test_methods:
            try:
                test_method()
            except Exception as e:
                print(f"❌ Test {test_method.__name__} failed with exception: {str(e)}")
        
        # Print final results
        print("\n" + "=" * 50)
        print(f"📊 Final Results: {self.tests_passed}/{self.tests_run} tests passed")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All tests passed!")
            return 0
        else:
            print(f"⚠️  {self.tests_run - self.tests_passed} tests failed")
            return 1

def main():
    """Main test runner"""
    tester = PomeAPITester()
    return tester.run_all_tests()

if __name__ == "__main__":
    sys.exit(main())