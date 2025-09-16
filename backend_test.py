#!/usr/bin/env python3
"""
Backend API Testing Suite
Tests all backend endpoints to ensure they are working correctly.
"""

import requests
import json
import sys
from datetime import datetime
import uuid

# Get backend URL from environment
BACKEND_URL = "https://luxury-theme-app.preview.emergentagent.com/api"

def test_root_endpoint():
    """Test the root API endpoint"""
    print("Testing root endpoint...")
    try:
        response = requests.get(f"{BACKEND_URL}/")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            if "message" in data and "Ailutions API" in data["message"]:
                print("✅ Root endpoint working correctly")
                return True
            else:
                print("❌ Root endpoint returned unexpected response")
                return False
        else:
            print(f"❌ Root endpoint failed with status {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Root endpoint test failed: {str(e)}")
        return False

def test_health_endpoint():
    """Test the health check endpoint"""
    print("\nTesting health endpoint...")
    try:
        response = requests.get(f"{BACKEND_URL}/health")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get("status") == "healthy" and "ailutions-api" in data.get("service", ""):
                print("✅ Health endpoint working correctly")
                return True
            else:
                print("❌ Health endpoint returned unexpected response")
                return False
        else:
            print(f"❌ Health endpoint failed with status {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Health endpoint test failed: {str(e)}")
        return False

def test_create_status_check():
    """Test creating a status check"""
    print("\nTesting create status check endpoint...")
    try:
        test_data = {
            "client_name": "Test Client for API Testing"
        }
        
        response = requests.post(
            f"{BACKEND_URL}/status",
            json=test_data,
            headers={"Content-Type": "application/json"}
        )
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            if (data.get("client_name") == test_data["client_name"] and 
                "id" in data and "timestamp" in data):
                print("✅ Create status check working correctly")
                return True, data["id"]
            else:
                print("❌ Create status check returned unexpected response")
                return False, None
        else:
            print(f"❌ Create status check failed with status {response.status_code}")
            return False, None
    except Exception as e:
        print(f"❌ Create status check test failed: {str(e)}")
        return False, None

def test_get_status_checks():
    """Test getting all status checks"""
    print("\nTesting get status checks endpoint...")
    try:
        response = requests.get(f"{BACKEND_URL}/status")
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Number of status checks returned: {len(data)}")
            
            if isinstance(data, list):
                if len(data) > 0:
                    # Check if the structure is correct
                    first_item = data[0]
                    if all(key in first_item for key in ["id", "client_name", "timestamp"]):
                        print("✅ Get status checks working correctly")
                        return True
                    else:
                        print("❌ Get status checks returned items with incorrect structure")
                        return False
                else:
                    print("✅ Get status checks working correctly (empty list)")
                    return True
            else:
                print("❌ Get status checks did not return a list")
                return False
        else:
            print(f"❌ Get status checks failed with status {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Get status checks test failed: {str(e)}")
        return False

def test_backend_connectivity():
    """Test basic connectivity to backend"""
    print("Testing backend connectivity...")
    try:
        response = requests.get(BACKEND_URL, timeout=10)
        print(f"Backend connectivity test - Status: {response.status_code}")
        return response.status_code < 500
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to backend - Connection refused")
        return False
    except requests.exceptions.Timeout:
        print("❌ Backend connection timeout")
        return False
    except Exception as e:
        print(f"❌ Backend connectivity test failed: {str(e)}")
        return False

def main():
    """Run all backend tests"""
    print("=" * 60)
    print("BACKEND API TESTING SUITE")
    print("=" * 60)
    print(f"Testing backend at: {BACKEND_URL}")
    print("=" * 60)
    
    # Test results
    results = []
    
    # Test connectivity first
    connectivity_ok = test_backend_connectivity()
    results.append(("Backend Connectivity", connectivity_ok))
    
    if not connectivity_ok:
        print("\n❌ Backend is not accessible. Skipping API tests.")
        print("=" * 60)
        print("SUMMARY: Backend connectivity failed")
        return False
    
    # Test all endpoints
    root_ok = test_root_endpoint()
    results.append(("Root Endpoint", root_ok))
    
    health_ok = test_health_endpoint()
    results.append(("Health Endpoint", health_ok))
    
    create_ok, created_id = test_create_status_check()
    results.append(("Create Status Check", create_ok))
    
    get_ok = test_get_status_checks()
    results.append(("Get Status Checks", get_ok))
    
    # Print summary
    print("\n" + "=" * 60)
    print("TEST SUMMARY")
    print("=" * 60)
    
    all_passed = True
    for test_name, passed in results:
        status = "✅ PASS" if passed else "❌ FAIL"
        print(f"{test_name}: {status}")
        if not passed:
            all_passed = False
    
    print("=" * 60)
    if all_passed:
        print("🎉 ALL BACKEND TESTS PASSED!")
        return True
    else:
        print("⚠️  SOME BACKEND TESTS FAILED!")
        return False

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)