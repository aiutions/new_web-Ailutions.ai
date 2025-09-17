#!/usr/bin/env python3
"""
Backend API Testing Suite - Supabase Integration
Tests all backend endpoints with new Supabase database integration.
Focus on priority tests: Health Check, Table Auto-Creation, Digital Maturity Assessment, Data Retrieval, Error Handling
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
    """Test the health check endpoint - PRIORITY TEST #1 for Supabase connection"""
    print("\n🔥 PRIORITY TEST #1: Testing health endpoint (Supabase connection verification)...")
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

def test_save_assessment():
    """Test saving a Digital Maturity Assessment - PRIORITY TEST #2 for table auto-creation"""
    print("\n🔥 PRIORITY TEST #2: Testing save assessment endpoint (Table auto-creation verification)...")
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
                print("⚠️  This might indicate table creation issues in Supabase")
            return False, None
    except Exception as e:
        print(f"❌ Save assessment test failed: {str(e)}")
        return False, None

def test_get_assessment(assessment_id):
    """Test retrieving a specific assessment by ID - PRIORITY TEST #3 for data retrieval"""
    print(f"\n🔥 PRIORITY TEST #3: Testing get assessment endpoint with ID: {assessment_id} (Data retrieval verification)...")
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
                    print("✅ Get assessment working correctly - Data properly stored in Supabase JSONB format")
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
    """Test retrieving all assessments - PRIORITY TEST #4 for pagination and filtering"""
    print("\n🔥 PRIORITY TEST #4: Testing get all digital maturity assessments endpoint (Pagination verification)...")
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

def test_assessment_error_handling():
    """Test error handling for assessment endpoints - PRIORITY TEST #5 for error handling"""
    print("\n🔥 PRIORITY TEST #5: Testing assessment error handling (Supabase error scenarios)...")
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

def test_analytics_overview():
    """Test analytics overview endpoint"""
    print("\nTesting analytics overview endpoint...")
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
                print("✅ Analytics overview working correctly")
                return True
            else:
                print("❌ Analytics overview missing required fields")
                return False
        else:
            print(f"❌ Analytics overview failed with status {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Analytics overview test failed: {str(e)}")
        return False

def test_company_analytics():
    """Test company analytics endpoint"""
    print("\nTesting company analytics endpoint...")
    try:
        # Test with the company from our test data
        company_name = "InnovateTech"
        response = requests.get(f"{BACKEND_URL}/analytics/company/{company_name}")
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Company: {data.get('company')}")
            print(f"Total assessments: {data.get('total_assessments')}")
            
            # Verify response structure
            required_fields = ["company", "assessments", "total_assessments"]
            if all(field in data for field in required_fields):
                assessments = data.get("assessments", {})
                if isinstance(assessments, dict):
                    print("✅ Company analytics working correctly")
                    return True
                else:
                    print("❌ Company assessments field is not a dict")
                    return False
            else:
                print("❌ Company analytics missing required fields")
                return False
        else:
            print(f"❌ Company analytics failed with status {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Company analytics test failed: {str(e)}")
        return False

def test_roi_calculator_save():
    """Test saving ROI Calculator results"""
    print("\nTesting ROI Calculator save endpoint...")
    try:
        test_roi_data = {
            "user_info": {
                "name": "Jennifer Martinez",
                "email": "jennifer.martinez@efficiency.com",
                "company": "Efficiency Solutions Inc",
                "role": "Operations Manager"
            },
            "inputs": {
                "current_time_spent": 40,
                "hourly_rate": 75,
                "automation_percentage": 80,
                "implementation_cost": 15000,
                "maintenance_cost_monthly": 500
            },
            "calculations": {
                "weekly_savings_hours": 32,
                "weekly_savings_cost": 2400,
                "monthly_savings": 9600,
                "annual_savings": 115200,
                "roi_percentage": 668,
                "payback_period_months": 1.8,
                "net_benefit_year_1": 100200
            }
        }
        
        response = requests.post(
            f"{BACKEND_URL}/roi-calculator/save",
            json=test_roi_data,
            headers={"Content-Type": "application/json"}
        )
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            if (data.get("message") == "ROI Calculator result saved successfully" and 
                "id" in data and "assessment_url" in data):
                print("✅ ROI Calculator save working correctly")
                return True, data["id"]
            else:
                print("❌ ROI Calculator save returned unexpected response")
                return False, None
        else:
            print(f"❌ ROI Calculator save failed with status {response.status_code}")
            return False, None
    except Exception as e:
        print(f"❌ ROI Calculator save test failed: {str(e)}")
        return False, None

def test_automation_assessment_save():
    """Test saving Automation Assessment results"""
    print("\nTesting Automation Assessment save endpoint...")
    try:
        test_automation_data = {
            "user_info": {
                "name": "David Kim",
                "email": "david.kim@streamline.com",
                "company": "Streamline Operations",
                "role": "Process Improvement Specialist"
            },
            "task_analysis": {
                "total_tasks_analyzed": 15,
                "high_automation_potential": 8,
                "medium_automation_potential": 5,
                "low_automation_potential": 2,
                "total_time_weekly": 35,
                "automatable_time_weekly": 28
            },
            "recommendations": [
                "Automate invoice processing using OCR and workflow automation",
                "Implement chatbot for customer service inquiries",
                "Set up automated reporting dashboards",
                "Deploy RPA for data entry tasks",
                "Create automated email marketing sequences"
            ],
            "priority_tasks": [
                {
                    "task": "Invoice Processing",
                    "current_time_weekly": 8,
                    "automation_potential": 95,
                    "priority": "High",
                    "estimated_savings": 7.6
                },
                {
                    "task": "Customer Service Responses",
                    "current_time_weekly": 6,
                    "automation_potential": 70,
                    "priority": "High",
                    "estimated_savings": 4.2
                },
                {
                    "task": "Report Generation",
                    "current_time_weekly": 4,
                    "automation_potential": 90,
                    "priority": "Medium",
                    "estimated_savings": 3.6
                }
            ],
            "automation_score": 78
        }
        
        response = requests.post(
            f"{BACKEND_URL}/automation-assessment/save",
            json=test_automation_data,
            headers={"Content-Type": "application/json"}
        )
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            if (data.get("message") == "Automation Assessment saved successfully" and 
                "id" in data and "assessment_url" in data):
                print("✅ Automation Assessment save working correctly")
                return True, data["id"]
            else:
                print("❌ Automation Assessment save returned unexpected response")
                return False, None
        else:
            print(f"❌ Automation Assessment save failed with status {response.status_code}")
            return False, None
    except Exception as e:
        print(f"❌ Automation Assessment save test failed: {str(e)}")
        return False, None

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
    """Run comprehensive Supabase backend integration tests"""
    print("=" * 80)
    print("SUPABASE BACKEND INTEGRATION TESTING SUITE")
    print("=" * 80)
    print(f"Testing backend at: {BACKEND_URL}")
    print("Focus: Health Check, Table Auto-Creation, Digital Maturity Assessment, Data Retrieval, Error Handling")
    print("=" * 80)
    
    # Test results
    results = []
    
    # Test connectivity first
    connectivity_ok = test_backend_connectivity()
    results.append(("Backend Connectivity", connectivity_ok))
    
    if not connectivity_ok:
        print("\n❌ Backend is not accessible. Skipping API tests.")
        print("=" * 80)
        print("SUMMARY: Backend connectivity failed")
        return False
    
    # Test basic endpoints
    root_ok = test_root_endpoint()
    results.append(("Root Endpoint", root_ok))
    
    # PRIORITY TESTS
    print("\n" + "=" * 80)
    print("🔥 PRIORITY SUPABASE INTEGRATION TESTS")
    print("=" * 80)
    
    health_ok = test_health_endpoint()
    results.append(("🔥 Health Check (Supabase Connection)", health_ok))
    
    save_ok, assessment_id = test_save_assessment()
    results.append(("🔥 Save Assessment (Table Auto-Creation)", save_ok))
    
    if assessment_id:
        get_assessment_ok = test_get_assessment(assessment_id)
        results.append(("🔥 Get Assessment (Data Retrieval)", get_assessment_ok))
    else:
        results.append(("🔥 Get Assessment (Data Retrieval)", False))
    
    get_all_ok = test_get_all_assessments()
    results.append(("🔥 Get All Assessments (Pagination)", get_all_ok))
    
    error_handling_ok = test_assessment_error_handling()
    results.append(("🔥 Error Handling (Supabase Errors)", error_handling_ok))
    
    # Additional tests
    print("\n" + "=" * 80)
    print("ADDITIONAL SUPABASE INTEGRATION TESTS")
    print("=" * 80)
    
    analytics_ok = test_analytics_overview()
    results.append(("Analytics Overview", analytics_ok))
    
    company_ok = test_company_analytics()
    results.append(("Company Analytics", company_ok))
    
    roi_ok, roi_id = test_roi_calculator_save()
    results.append(("ROI Calculator Save", roi_ok))
    
    automation_ok, automation_id = test_automation_assessment_save()
    results.append(("Automation Assessment Save", automation_ok))
    
    # Print summary
    print("\n" + "=" * 80)
    print("SUPABASE INTEGRATION TEST SUMMARY")
    print("=" * 80)
    
    all_passed = True
    priority_tests_passed = 0
    additional_tests_passed = 0
    
    for test_name, passed in results:
        status = "✅ PASS" if passed else "❌ FAIL"
        print(f"{test_name}: {status}")
        if not passed:
            all_passed = False
        
        # Count test categories
        if "🔥" in test_name:
            if passed:
                priority_tests_passed += 1
        elif test_name not in ["Backend Connectivity", "Root Endpoint"]:
            if passed:
                additional_tests_passed += 1
    
    print("=" * 80)
    print(f"Priority Supabase Tests: {priority_tests_passed}/5 passed")
    print(f"Additional Integration Tests: {additional_tests_passed}/4 passed")
    
    if priority_tests_passed == 5:
        print("🎉 ALL PRIORITY SUPABASE INTEGRATION TESTS PASSED!")
        print("✅ Supabase backend integration is fully functional")
        if all_passed:
            print("✅ All additional tests also passed")
        return True
    else:
        print("⚠️  SOME PRIORITY SUPABASE TESTS FAILED!")
        print("❌ Supabase backend integration has critical issues")
        return False

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)