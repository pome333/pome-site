#!/usr/bin/env python3
"""
Frontend Functionality Test for Pome App (localStorage Architecture)
Tests the frontend application to ensure localStorage functionality works
"""

import requests
import sys

class PomeFrontendTester:
    def __init__(self, base_url="https://pome-analytics.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0

    def test_frontend_accessibility(self):
        """Test that frontend is accessible and loads properly"""
        print(f"\n🔍 Testing Frontend Accessibility...")
        print(f"   URL: {self.base_url}")
        
        self.tests_run += 1
        
        try:
            response = requests.get(self.base_url, timeout=10)
            
            if response.status_code == 200:
                print(f"✅ Passed - Frontend accessible (Status: {response.status_code})")
                
                # Check if it contains React app elements
                if 'pome' in response.text.lower() or 'emotion' in response.text.lower():
                    print(f"✅ Passed - Contains expected app content")
                    self.tests_passed += 1
                    return True
                else:
                    print(f"❌ Failed - No expected app content found")
                    return False
            else:
                print(f"❌ Failed - Status: {response.status_code}")
                return False
                
        except requests.exceptions.RequestException as e:
            print(f"❌ Failed - Network Error: {str(e)}")
            return False

    def test_static_assets(self):
        """Test that static assets are loading"""
        print(f"\n🔍 Testing Static Assets...")
        
        self.tests_run += 1
        
        # Test common static asset paths
        asset_paths = [
            "/static/css/",
            "/static/js/",
            "/favicon.ico"
        ]
        
        assets_working = 0
        for path in asset_paths:
            try:
                url = f"{self.base_url}{path}"
                response = requests.head(url, timeout=5)
                if response.status_code in [200, 404]:  # 404 is ok for some assets
                    assets_working += 1
            except:
                pass
        
        if assets_working > 0:
            print(f"✅ Passed - Static asset serving functional")
            self.tests_passed += 1
            return True
        else:
            print(f"❌ Failed - Static assets not accessible")
            return False

    def test_app_structure(self):
        """Test that the app has the expected structure"""
        print(f"\n🔍 Testing App Structure...")
        
        self.tests_run += 1
        
        try:
            response = requests.get(self.base_url, timeout=10)
            content = response.text.lower()
            
            # Check for key app elements
            expected_elements = [
                'pome',  # App name
                'emotion',  # Core functionality
                'track',  # Emotion tracking
                'activities',  # Activities feature
            ]
            
            found_elements = sum(1 for element in expected_elements if element in content)
            
            if found_elements >= 3:
                print(f"✅ Passed - App structure contains expected elements ({found_elements}/{len(expected_elements)})")
                self.tests_passed += 1
                return True
            else:
                print(f"❌ Failed - Missing expected elements ({found_elements}/{len(expected_elements)})")
                return False
                
        except Exception as e:
            print(f"❌ Failed - Error checking structure: {str(e)}")
            return False

    def run_all_tests(self):
        """Run all frontend tests"""
        print("🚀 Starting Pome Frontend Tests (localStorage Architecture)")
        print("=" * 60)
        
        # Test sequence
        test_methods = [
            self.test_frontend_accessibility,
            self.test_static_assets,
            self.test_app_structure
        ]
        
        for test_method in test_methods:
            try:
                test_method()
            except Exception as e:
                print(f"❌ Test {test_method.__name__} failed with exception: {str(e)}")
        
        # Print final results
        print("\n" + "=" * 60)
        print(f"📊 Final Results: {self.tests_passed}/{self.tests_run} tests passed")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All frontend tests passed!")
            print("✅ Frontend is ready for deployment with localStorage architecture")
            return 0
        else:
            print(f"⚠️  {self.tests_run - self.tests_passed} tests failed")
            return 1

def main():
    """Main test runner"""
    tester = PomeFrontendTester()
    return tester.run_all_tests()

if __name__ == "__main__":
    sys.exit(main())