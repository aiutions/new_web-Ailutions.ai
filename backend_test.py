#!/usr/bin/env python3
"""
Backend API Testing Suite - Supabase Integration
Tests all backend endpoints with new Supabase database integration.
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

def test_save_assessment():
    """Test saving a Digital Maturity Assessment"""
    print("\nTesting save assessment endpoint...")
    try:
        # Create comprehensive test assessment data
        test_assessment = {
            "user_info": {
                "name": "Sarah Johnson",
                "email": "sarah.johnson@techcorp.com",
                "company": "TechCorp Solutions",
                "role": "Digital Transformation Manager"
            },
            "answers": {
                "0-0-0": 2,  # Strategy & Leadership - Fully agree
                "0-0-1": 1,  # Strategy & Leadership - Partially agree
                "0-0-2": 2,  # Strategy & Leadership - Fully agree
                "0-0-3": 0,  # Strategy & Leadership - Disagree
                "0-1-0": 2,  # Data & Decisions - Fully agree
                "0-1-1": 1,  # Data & Decisions - Partially agree
                "0-1-2": 2,  # Data & Decisions - Fully agree
                "0-1-3": 1,  # Data & Decisions - Partially agree
                "0-2-0": 1,  # Operations & Processes - Partially agree
                "0-2-1": 2,  # Operations & Processes - Fully agree
                "0-2-2": 0,  # Operations & Processes - Disagree
                "0-3-0": 2,  # Technology & Infrastructure - Fully agree
                "0-3-1": 1,  # Technology & Infrastructure - Partially agree
                "0-3-2": 2,  # Technology & Infrastructure - Fully agree
                "0-4-0": 1,  # Customer & People - Partially agree
                "0-4-1": 2,  # Customer & People - Fully agree
                "0-4-2": 1,  # Customer & People - Partially agree
                "0-4-3": 0,  # Customer & People - Disagree
                "0-5-0": 2,  # Innovation & Growth - Fully agree
                "0-5-1": 1,  # Innovation & Growth - Partially agree
                "0-5-2": 2   # Innovation & Growth - Fully agree
            },
            "results": {
                "percentage": 65,
                "maturity_stage": "Automated",
                "level_name": "Automated Stage",
                "level_description": "Your business has automated key processes and uses data effectively for decision-making.",
                "section_scores": [
                    {
                        "name": "Strategy & Leadership",
                        "score": 62,
                        "status": "Good",
                        "analysis": "Strong leadership commitment with room for improvement in digital strategy execution."
                    },
                    {
                        "name": "Data & Decisions",
                        "score": 75,
                        "status": "Excellent",
                        "analysis": "Excellent use of data for decision-making with real-time dashboards and clean data practices."
                    },
                    {
                        "name": "Operations & Processes",
                        "score": 50,
                        "status": "Needs Improvement",
                        "analysis": "Some automation in place but significant opportunities for process optimization."
                    },
                    {
                        "name": "Technology & Infrastructure",
                        "score": 83,
                        "status": "Excellent",
                        "analysis": "Strong technology foundation with cloud infrastructure and security measures."
                    },
                    {
                        "name": "Customer & People",
                        "score": 50,
                        "status": "Needs Improvement",
                        "analysis": "Good customer experience foundation but team training and omnichannel consistency need attention."
                    },
                    {
                        "name": "Innovation & Growth",
                        "score": 83,
                        "status": "Excellent",
                        "analysis": "Strong innovation culture with effective experimentation and growth strategies."
                    }
                ],
                "detailed_recommendations": [
                    "Implement comprehensive process automation in operations",
                    "Enhance team training programs for digital tools",
                    "Develop omnichannel customer experience strategy",
                    "Strengthen digital strategy execution framework",
                    "Expand data analytics capabilities across all departments"
                ],
                "next_steps": [
                    "Conduct process mapping workshop to identify automation opportunities",
                    "Design quarterly digital skills training program",
                    "Implement customer journey mapping across all touchpoints",
                    "Establish digital transformation steering committee",
                    "Deploy advanced analytics tools for predictive insights"
                ],
                "strengths": [
                    "Strong data-driven decision making culture",
                    "Robust technology infrastructure",
                    "Active innovation and experimentation",
                    "Leadership commitment to digital transformation"
                ],
                "weaknesses": [
                    "Manual processes in operations",
                    "Inconsistent customer experience across channels",
                    "Limited team training on digital tools",
                    "Gap between strategy and execution"
                ],
                "overall_analysis": {
                    "summary": "TechCorp Solutions demonstrates strong digital maturity in data usage and technology infrastructure, with significant opportunities in operations automation and customer experience consistency.",
                    "strategic_recommendation": "Focus on process automation and team development to achieve AI-Powered stage maturity.",
                    "priority_focus": "Operations optimization and customer experience enhancement"
                }
            },
            "ip_address": "192.168.1.100",
            "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        }
        
        response = requests.post(
            f"{BACKEND_URL}/assessment/save",
            json=test_assessment,
            headers={"Content-Type": "application/json"}
        )
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            if (data.get("message") == "Assessment saved successfully" and 
                "id" in data and "assessment_url" in data):
                print("✅ Save assessment working correctly")
                return True, data["id"]
            else:
                print("❌ Save assessment returned unexpected response")
                return False, None
        else:
            print(f"❌ Save assessment failed with status {response.status_code}")
            return False, None
    except Exception as e:
        print(f"❌ Save assessment test failed: {str(e)}")
        return False, None

def test_get_assessment(assessment_id):
    """Test retrieving a specific assessment by ID"""
    print(f"\nTesting get assessment endpoint with ID: {assessment_id}...")
    try:
        response = requests.get(f"{BACKEND_URL}/assessment/{assessment_id}")
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Retrieved assessment for: {data.get('user_info', {}).get('name', 'Unknown')}")
            
            # Verify essential fields are present
            required_fields = ["id", "user_info", "answers", "results", "timestamp"]
            if all(field in data for field in required_fields):
                # Verify nested structures
                user_info = data.get("user_info", {})
                results = data.get("results", {})
                
                if (user_info.get("name") and user_info.get("email") and 
                    results.get("percentage") is not None and results.get("maturity_stage")):
                    print("✅ Get assessment working correctly")
                    return True
                else:
                    print("❌ Get assessment missing required nested fields")
                    return False
            else:
                print("❌ Get assessment missing required fields")
                return False
        elif response.status_code == 404:
            print("❌ Assessment not found (404)")
            return False
        else:
            print(f"❌ Get assessment failed with status {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Get assessment test failed: {str(e)}")
        return False

def test_get_all_assessments():
    """Test retrieving all assessments"""
    print("\nTesting get all assessments endpoint...")
    try:
        response = requests.get(f"{BACKEND_URL}/assessments")
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Number of assessments returned: {len(data)}")
            
            if isinstance(data, list):
                if len(data) > 0:
                    # Check structure of first assessment
                    first_assessment = data[0]
                    required_fields = ["id", "user_info", "answers", "results", "timestamp"]
                    if all(field in first_assessment for field in required_fields):
                        print("✅ Get all assessments working correctly")
                        return True
                    else:
                        print("❌ Get all assessments returned items with incorrect structure")
                        return False
                else:
                    print("✅ Get all assessments working correctly (empty list)")
                    return True
            else:
                print("❌ Get all assessments did not return a list")
                return False
        else:
            print(f"❌ Get all assessments failed with status {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Get all assessments test failed: {str(e)}")
        return False

def test_get_assessment_stats():
    """Test retrieving assessment statistics"""
    print("\nTesting get assessment stats endpoint...")
    try:
        response = requests.get(f"{BACKEND_URL}/assessments/stats")
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Stats response keys: {list(data.keys())}")
            
            # Verify required stats fields
            required_fields = ["total_assessments", "recent_assessments_30_days", 
                             "maturity_stage_distribution", "section_averages", "last_updated"]
            
            if all(field in data for field in required_fields):
                print(f"Total assessments: {data['total_assessments']}")
                print(f"Recent assessments (30 days): {data['recent_assessments_30_days']}")
                print(f"Stage distribution entries: {len(data['maturity_stage_distribution'])}")
                print(f"Section averages entries: {len(data['section_averages'])}")
                print("✅ Get assessment stats working correctly")
                return True
            else:
                print("❌ Get assessment stats missing required fields")
                return False
        else:
            print(f"❌ Get assessment stats failed with status {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Get assessment stats test failed: {str(e)}")
        return False

def test_get_company_assessments():
    """Test retrieving assessments by company"""
    print("\nTesting get company assessments endpoint...")
    try:
        # Test with the company from our test data
        company_name = "TechCorp"
        response = requests.get(f"{BACKEND_URL}/assessments/company/{company_name}")
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Company: {data.get('company')}")
            print(f"Assessment count: {data.get('assessment_count')}")
            
            # Verify response structure
            required_fields = ["company", "assessment_count", "assessments"]
            if all(field in data for field in required_fields):
                assessments = data.get("assessments", [])
                if isinstance(assessments, list):
                    print("✅ Get company assessments working correctly")
                    return True
                else:
                    print("❌ Company assessments field is not a list")
                    return False
            else:
                print("❌ Get company assessments missing required fields")
                return False
        else:
            print(f"❌ Get company assessments failed with status {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Get company assessments test failed: {str(e)}")
        return False

def test_assessment_error_handling():
    """Test error handling for assessment endpoints"""
    print("\nTesting assessment error handling...")
    try:
        # Test invalid assessment ID
        response = requests.get(f"{BACKEND_URL}/assessment/invalid-id-12345")
        if response.status_code == 404:
            print("✅ Invalid assessment ID returns 404 correctly")
            error_handling_ok = True
        else:
            print(f"❌ Invalid assessment ID returned {response.status_code} instead of 404")
            error_handling_ok = False
        
        # Test invalid assessment data
        invalid_data = {"invalid": "data"}
        response = requests.post(
            f"{BACKEND_URL}/assessment/save",
            json=invalid_data,
            headers={"Content-Type": "application/json"}
        )
        if response.status_code in [400, 422]:  # Bad request or validation error
            print("✅ Invalid assessment data returns error correctly")
            error_handling_ok = error_handling_ok and True
        else:
            print(f"❌ Invalid assessment data returned {response.status_code} instead of 400/422")
            error_handling_ok = False
        
        return error_handling_ok
    except Exception as e:
        print(f"❌ Error handling test failed: {str(e)}")
        return False

def main():
    """Run all backend tests including Digital Maturity Assessment endpoints"""
    print("=" * 60)
    print("BACKEND API TESTING SUITE - DIGITAL MATURITY ASSESSMENT")
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
    
    # Test basic endpoints
    root_ok = test_root_endpoint()
    results.append(("Root Endpoint", root_ok))
    
    health_ok = test_health_endpoint()
    results.append(("Health Endpoint", health_ok))
    
    create_ok, created_id = test_create_status_check()
    results.append(("Create Status Check", create_ok))
    
    get_ok = test_get_status_checks()
    results.append(("Get Status Checks", get_ok))
    
    # Test Digital Maturity Assessment endpoints
    print("\n" + "=" * 60)
    print("DIGITAL MATURITY ASSESSMENT API TESTS")
    print("=" * 60)
    
    save_ok, assessment_id = test_save_assessment()
    results.append(("Save Assessment", save_ok))
    
    if assessment_id:
        get_assessment_ok = test_get_assessment(assessment_id)
        results.append(("Get Assessment by ID", get_assessment_ok))
    else:
        results.append(("Get Assessment by ID", False))
    
    get_all_ok = test_get_all_assessments()
    results.append(("Get All Assessments", get_all_ok))
    
    stats_ok = test_get_assessment_stats()
    results.append(("Get Assessment Stats", stats_ok))
    
    company_ok = test_get_company_assessments()
    results.append(("Get Company Assessments", company_ok))
    
    error_handling_ok = test_assessment_error_handling()
    results.append(("Assessment Error Handling", error_handling_ok))
    
    # Print summary
    print("\n" + "=" * 60)
    print("TEST SUMMARY")
    print("=" * 60)
    
    all_passed = True
    basic_tests_passed = 0
    assessment_tests_passed = 0
    
    for test_name, passed in results:
        status = "✅ PASS" if passed else "❌ FAIL"
        print(f"{test_name}: {status}")
        if not passed:
            all_passed = False
        
        # Count test categories
        if test_name in ["Backend Connectivity", "Root Endpoint", "Health Endpoint", "Create Status Check", "Get Status Checks"]:
            if passed:
                basic_tests_passed += 1
        elif "Assessment" in test_name:
            if passed:
                assessment_tests_passed += 1
    
    print("=" * 60)
    print(f"Basic API Tests: {basic_tests_passed}/5 passed")
    print(f"Assessment API Tests: {assessment_tests_passed}/6 passed")
    
    if all_passed:
        print("🎉 ALL BACKEND TESTS PASSED!")
        print("✅ Digital Maturity Assessment API is fully functional")
        return True
    else:
        print("⚠️  SOME BACKEND TESTS FAILED!")
        if assessment_tests_passed < 6:
            print("❌ Digital Maturity Assessment API has issues")
        return False

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)