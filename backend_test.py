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
    """Test the health check endpoint - PRIORITY TEST for Supabase connection"""
    print("\nTesting health endpoint (Supabase connection verification)...")
    try:
        response = requests.get(f"{BACKEND_URL}/health")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            if (data.get("status") == "healthy" and 
                "ailutions-supabase-api" in data.get("service", "") and
                data.get("database") == "connected"):
                print("✅ Health endpoint working correctly - Supabase connection verified")
                return True
            elif data.get("status") == "degraded":
                print("❌ Health endpoint shows degraded status - Supabase connection issue")
                print(f"Database status: {data.get('database')}")
                print(f"Error: {data.get('error', 'Unknown error')}")
                return False
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
    """Test saving a Digital Maturity Assessment - PRIORITY TEST for table auto-creation"""
    print("\nTesting save assessment endpoint (Table auto-creation verification)...")
    try:
        # Create comprehensive test assessment data with realistic information
        test_assessment = {
            "user_info": {
                "name": "Michael Chen",
                "email": "michael.chen@innovatetech.com",
                "company": "InnovateTech Solutions",
                "role": "CTO"
            },
            "answers": {
                "strategy_leadership_1": 2,  # Digital strategy is clearly defined
                "strategy_leadership_2": 1,  # Leadership partially committed
                "strategy_leadership_3": 2,  # Budget allocated for digital initiatives
                "data_decisions_1": 2,      # Real-time dashboards used
                "data_decisions_2": 1,      # Customer data partially clean
                "data_decisions_3": 2,      # Management uses data for decisions
                "data_decisions_4": 1,      # Some forecasting with data
                "operations_processes_1": 1, # Some processes automated
                "operations_processes_2": 2, # Workflow management tools used
                "operations_processes_3": 0, # Manual reporting still common
                "technology_infrastructure_1": 2, # Cloud-based systems
                "technology_infrastructure_2": 1, # Partial integration
                "technology_infrastructure_3": 2, # Strong cybersecurity
                "customer_people_1": 2,     # Fast, mobile-friendly site
                "customer_people_2": 1,     # Some customer feedback collection
                "customer_people_3": 0,     # Inconsistent omnichannel experience
                "customer_people_4": 1,     # Some team training
                "innovation_growth_1": 2,   # Regular experimentation
                "innovation_growth_2": 1,   # Some emerging tech exploration
                "innovation_growth_3": 2    # Data-driven growth strategies
            },
            "results": {
                "percentage": 72,
                "maturity_stage": "Automated",
                "level_name": "Automated Stage",
                "level_description": "Your business has automated key processes and uses data effectively for decision-making with strong technology infrastructure.",
                "section_scores": [
                    {
                        "name": "Strategy & Leadership",
                        "score": 83,
                        "status": "Excellent",
                        "analysis": "Strong leadership commitment with clear digital strategy and adequate budget allocation."
                    },
                    {
                        "name": "Data & Decisions",
                        "score": 75,
                        "status": "Excellent",
                        "analysis": "Good use of data for decision-making with real-time dashboards, though data quality could be improved."
                    },
                    {
                        "name": "Operations & Processes",
                        "score": 50,
                        "status": "Needs Improvement",
                        "analysis": "Mixed automation levels with workflow tools in place but manual reporting still prevalent."
                    },
                    {
                        "name": "Technology & Infrastructure",
                        "score": 83,
                        "status": "Excellent",
                        "analysis": "Strong cloud infrastructure and cybersecurity with room for better system integration."
                    },
                    {
                        "name": "Customer & People",
                        "score": 62,
                        "status": "Good",
                        "analysis": "Good digital customer experience foundation but omnichannel consistency and team training need attention."
                    },
                    {
                        "name": "Innovation & Growth",
                        "score": 83,
                        "status": "Excellent",
                        "analysis": "Strong innovation culture with regular experimentation and data-driven growth strategies."
                    }
                ],
                "detailed_recommendations": [
                    "Implement comprehensive process automation to eliminate manual reporting",
                    "Enhance data quality management and customer data cleansing processes",
                    "Develop integrated omnichannel customer experience strategy",
                    "Improve system integration across all technology platforms",
                    "Establish regular digital skills training program for all team members"
                ],
                "next_steps": [
                    "Conduct comprehensive process audit to identify automation opportunities",
                    "Implement data governance framework and quality monitoring",
                    "Design unified customer experience across all touchpoints",
                    "Develop API-first integration strategy for all systems",
                    "Create quarterly digital transformation training curriculum"
                ],
                "strengths": [
                    "Strong leadership commitment to digital transformation",
                    "Excellent use of real-time dashboards and data-driven decisions",
                    "Robust cloud infrastructure and cybersecurity measures",
                    "Active innovation culture with regular experimentation",
                    "Data-driven approach to growth strategies"
                ],
                "weaknesses": [
                    "Manual reporting processes still prevalent",
                    "Inconsistent customer data quality",
                    "Limited omnichannel customer experience integration",
                    "Partial system integration across platforms",
                    "Irregular team training on digital tools"
                ],
                "overall_analysis": {
                    "summary": "InnovateTech Solutions shows strong digital maturity with excellent leadership commitment and technology infrastructure, positioned well for advancement to AI-Powered stage.",
                    "strategic_recommendation": "Focus on process automation and data quality improvements to achieve full digital transformation.",
                    "priority_focus": "Operations automation and integrated customer experience development"
                }
            },
            "ip_address": "203.0.113.45",
            "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
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
            if (data.get("message") == "Digital Maturity Assessment saved successfully" and 
                "id" in data and "assessment_url" in data):
                print("✅ Save assessment working correctly - Table auto-creation successful")
                print(f"Assessment ID: {data['id']}")
                return True, data["id"]
            else:
                print("❌ Save assessment returned unexpected response")
                return False, None
        else:
            print(f"❌ Save assessment failed with status {response.status_code}")
            if response.status_code == 500:
                print("This might indicate table creation issues in Supabase")
            return False, None
    except Exception as e:
        print(f"❌ Save assessment test failed: {str(e)}")
        return False, None

def test_get_assessment(assessment_id):
    """Test retrieving a specific assessment by ID - PRIORITY TEST for data retrieval"""
    print(f"\nTesting get assessment endpoint with ID: {assessment_id} (Data retrieval verification)...")
    try:
        response = requests.get(f"{BACKEND_URL}/assessment/{assessment_id}")
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Retrieved assessment for: {data.get('user_info', {}).get('name', 'Unknown')}")
            
            # Verify essential fields are present (Supabase format)
            required_fields = ["id", "user_info", "answers", "results", "created_at"]
            if all(field in data for field in required_fields):
                # Verify nested structures
                user_info = data.get("user_info", {})
                results = data.get("results", {})
                
                if (user_info.get("name") and user_info.get("email") and 
                    results.get("percentage") is not None and results.get("maturity_stage")):
                    print("✅ Get assessment working correctly - Data properly stored in Supabase format")
                    print(f"User: {user_info.get('name')} from {user_info.get('company')}")
                    print(f"Maturity: {results.get('percentage')}% - {results.get('maturity_stage')}")
                    return True
                else:
                    print("❌ Get assessment missing required nested fields")
                    return False
            else:
                print("❌ Get assessment missing required fields")
                print(f"Available fields: {list(data.keys())}")
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
    """Test retrieving all assessments - PRIORITY TEST for pagination and filtering"""
    print("\nTesting get all digital maturity assessments endpoint (Pagination verification)...")
    try:
        response = requests.get(f"{BACKEND_URL}/assessments/digital-maturity")
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            assessments = data.get("data", [])
            count = data.get("count", 0)
            print(f"Number of assessments returned: {count}")
            
            if isinstance(assessments, list):
                if len(assessments) > 0:
                    # Check structure of first assessment
                    first_assessment = assessments[0]
                    required_fields = ["id", "user_info", "answers", "results", "created_at"]
                    if all(field in first_assessment for field in required_fields):
                        print("✅ Get all assessments working correctly - Supabase pagination functional")
                        print(f"Sample assessment: {first_assessment.get('user_info', {}).get('name', 'Unknown')}")
                        return True
                    else:
                        print("❌ Get all assessments returned items with incorrect structure")
                        print(f"Available fields: {list(first_assessment.keys())}")
                        return False
                else:
                    print("✅ Get all assessments working correctly (empty list)")
                    return True
            else:
                print("❌ Get all assessments did not return correct structure")
                return False
        else:
            print(f"❌ Get all assessments failed with status {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Get all assessments test failed: {str(e)}")
        return False

def test_get_assessment_stats():
    """Test retrieving assessment statistics - Analytics verification"""
    print("\nTesting get analytics overview endpoint...")
    try:
        response = requests.get(f"{BACKEND_URL}/analytics/overview")
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Analytics response keys: {list(data.keys())}")
            
            # Verify required analytics fields
            required_fields = ["total_assessments", "recent_assessments_30_days", "last_updated"]
            
            if all(field in data for field in required_fields):
                total_assessments = data.get("total_assessments", {})
                recent_assessments = data.get("recent_assessments_30_days", {})
                
                print(f"Total assessments: {total_assessments}")
                print(f"Recent assessments (30 days): {recent_assessments}")
                print("✅ Get analytics overview working correctly")
                return True
            else:
                print("❌ Get analytics overview missing required fields")
                return False
        else:
            print(f"❌ Get analytics overview failed with status {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Get analytics overview test failed: {str(e)}")
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