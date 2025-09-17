from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Dict, Optional, Any
import uuid
from datetime import datetime
from supabase import create_client, Client

# Load environment variables
load_dotenv()

# Supabase configuration
SUPABASE_URL = "https://cwbjscsbixtdglspnexn.supabase.co"
SUPABASE_SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3YmpzY3NiaXh0ZGdsc3BuZXhuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODA4NDc2MSwiZXhwIjoyMDczNjYwNzYxfQ.tNLwUKClzE3LoYSPcC9xGSnYYc2nGFPqAxDvEp6XdbQ"

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)

# Create the main app
app = FastAPI(title="Ailutions API with Supabase", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Define Models
class UserInfo(BaseModel):
    name: str
    email: str
    company: str
    role: str

class SectionScore(BaseModel):
    name: str
    score: int
    status: str
    analysis: str

class AssessmentResults(BaseModel):
    percentage: int
    maturity_stage: str
    level_name: str
    level_description: str
    section_scores: List[SectionScore]
    detailed_recommendations: List[str]
    next_steps: List[str]
    strengths: List[str]
    weaknesses: List[str]
    overall_analysis: Dict[str, str]

# Digital Maturity Tracker Models
class DigitalMaturityAssessment(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_info: UserInfo
    answers: Dict[str, int]
    results: AssessmentResults
    created_at: datetime = Field(default_factory=datetime.utcnow)
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None

class DigitalMaturityAssessmentCreate(BaseModel):
    user_info: UserInfo
    answers: Dict[str, int]
    results: AssessmentResults
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None

# ROI Calculator Models
class ROICalculatorResult(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_info: UserInfo
    inputs: Dict[str, Any]  # Time spent, hourly rates, etc.
    calculations: Dict[str, Any]  # Savings, ROI percentages, etc.
    created_at: datetime = Field(default_factory=datetime.utcnow)
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None

class ROICalculatorCreate(BaseModel):
    user_info: UserInfo
    inputs: Dict[str, Any]
    calculations: Dict[str, Any]
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None

# Automation Readiness Assessment Models
class AutomationAssessmentResult(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_info: UserInfo
    task_analysis: Dict[str, Any]  # Tasks, time spent, automation potential
    recommendations: List[str]
    priority_tasks: List[Dict[str, Any]]
    automation_score: int
    created_at: datetime = Field(default_factory=datetime.utcnow)
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None

class AutomationAssessmentCreate(BaseModel):
    user_info: UserInfo
    task_analysis: Dict[str, Any]
    recommendations: List[str]
    priority_tasks: List[Dict[str, Any]]
    automation_score: int
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None

class AssessmentResponse(BaseModel):
    id: str
    message: str
    assessment_url: Optional[str] = None

# Database initialization
async def create_tables():
    """Create Supabase tables if they don't exist"""
    try:
        # Digital Maturity Assessments table
        maturity_table = """
        CREATE TABLE IF NOT EXISTS digital_maturity_assessments (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_info JSONB NOT NULL,
            answers JSONB NOT NULL,
            results JSONB NOT NULL,
            created_at TIMESTAMPTZ DEFAULT NOW(),
            ip_address TEXT,
            user_agent TEXT
        );
        """
        
        # ROI Calculator Results table
        roi_table = """
        CREATE TABLE IF NOT EXISTS roi_calculator_results (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_info JSONB NOT NULL,
            inputs JSONB NOT NULL,
            calculations JSONB NOT NULL,
            created_at TIMESTAMPTZ DEFAULT NOW(),
            ip_address TEXT,
            user_agent TEXT
        );
        """
        
        # Automation Readiness Assessments table
        automation_table = """
        CREATE TABLE IF NOT EXISTS automation_assessments (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_info JSONB NOT NULL,
            task_analysis JSONB NOT NULL,
            recommendations JSONB NOT NULL,
            priority_tasks JSONB NOT NULL,
            automation_score INTEGER NOT NULL,
            created_at TIMESTAMPTZ DEFAULT NOW(),
            ip_address TEXT,
            user_agent TEXT
        );
        """
        
        # Execute table creation (Note: Supabase Python client doesn't directly support DDL)
        # These tables should be created via Supabase dashboard or SQL editor
        logger.info("Tables structure defined. Please create tables in Supabase dashboard if not exist.")
        
    except Exception as e:
        logger.error(f"Error in table creation setup: {str(e)}")

# Basic health endpoints
@api_router.get("/")
async def root():
    return {"message": "Ailutions API with Supabase - Ready for automation!"}

@api_router.get("/health")
async def health_check():
    try:
        # Test Supabase connection
        response = supabase.table("digital_maturity_assessments").select("count").execute()
        return {"status": "healthy", "service": "ailutions-supabase-api", "database": "connected"}
    except Exception as e:
        return {"status": "degraded", "service": "ailutions-supabase-api", "database": "error", "error": str(e)}

# Digital Maturity Tracker Endpoints
@api_router.post("/assessment/save", response_model=AssessmentResponse)
async def save_maturity_assessment(assessment_data: DigitalMaturityAssessmentCreate):
    """Save a completed Digital Maturity Assessment to Supabase"""
    try:
        # Create the assessment object with ID and timestamp
        assessment = DigitalMaturityAssessment(**assessment_data.dict())
        
        # Prepare data for Supabase
        supabase_data = {
            "id": assessment.id,
            "user_info": assessment.user_info.dict(),
            "answers": assessment.answers,
            "results": assessment.results.dict(),
            "created_at": assessment.created_at.isoformat(),
            "ip_address": assessment.ip_address,
            "user_agent": assessment.user_agent
        }
        
        # Insert into Supabase
        response = supabase.table("digital_maturity_assessments").insert(supabase_data).execute()
        
        if response.data:
            return AssessmentResponse(
                id=assessment.id,
                message="Digital Maturity Assessment saved successfully",
                assessment_url=f"/api/assessment/{assessment.id}"
            )
        else:
            raise HTTPException(status_code=500, detail="Failed to save assessment to Supabase")
            
    except Exception as e:
        logger.error(f"Error saving digital maturity assessment: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error saving assessment: {str(e)}")

@api_router.get("/assessment/{assessment_id}")
async def get_maturity_assessment(assessment_id: str):
    """Retrieve a specific Digital Maturity Assessment by ID"""
    try:
        response = supabase.table("digital_maturity_assessments").select("*").eq("id", assessment_id).execute()
        
        if not response.data:
            raise HTTPException(status_code=404, detail="Assessment not found")
        
        return response.data[0]
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error retrieving assessment: {str(e)}")
        raise HTTPException(status_code=500, detail="Error retrieving assessment")

@api_router.get("/assessments/digital-maturity")
async def get_all_maturity_assessments(limit: int = 100, offset: int = 0):
    """Retrieve all Digital Maturity Assessments with pagination"""
    try:
        response = supabase.table("digital_maturity_assessments").select("*").range(offset, offset + limit - 1).execute()
        return {"data": response.data, "count": len(response.data)}
        
    except Exception as e:
        logger.error(f"Error retrieving maturity assessments: {str(e)}")
        raise HTTPException(status_code=500, detail="Error retrieving assessments")

# ROI Calculator Endpoints
@api_router.post("/roi-calculator/save", response_model=AssessmentResponse)
async def save_roi_calculation(roi_data: ROICalculatorCreate):
    """Save ROI Calculator results to Supabase"""
    try:
        roi_result = ROICalculatorResult(**roi_data.dict())
        
        supabase_data = {
            "id": roi_result.id,
            "user_info": roi_result.user_info.dict(),
            "inputs": roi_result.inputs,
            "calculations": roi_result.calculations,
            "created_at": roi_result.created_at.isoformat(),
            "ip_address": roi_result.ip_address,
            "user_agent": roi_result.user_agent
        }
        
        response = supabase.table("roi_calculator_results").insert(supabase_data).execute()
        
        if response.data:
            return AssessmentResponse(
                id=roi_result.id,
                message="ROI Calculator result saved successfully",
                assessment_url=f"/api/roi-calculator/{roi_result.id}"
            )
        else:
            raise HTTPException(status_code=500, detail="Failed to save ROI calculation")
            
    except Exception as e:
        logger.error(f"Error saving ROI calculation: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error saving ROI calculation: {str(e)}")

@api_router.get("/roi-calculator/{result_id}")
async def get_roi_calculation(result_id: str):
    """Retrieve a specific ROI calculation by ID"""
    try:
        response = supabase.table("roi_calculator_results").select("*").eq("id", result_id).execute()
        
        if not response.data:
            raise HTTPException(status_code=404, detail="ROI calculation not found")
        
        return response.data[0]
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error retrieving ROI calculation: {str(e)}")
        raise HTTPException(status_code=500, detail="Error retrieving ROI calculation")

@api_router.get("/roi-calculator/results")
async def get_all_roi_calculations(limit: int = 100, offset: int = 0):
    """Retrieve all ROI calculations with pagination"""
    try:
        response = supabase.table("roi_calculator_results").select("*").range(offset, offset + limit - 1).execute()
        return {"data": response.data, "count": len(response.data)}
        
    except Exception as e:
        logger.error(f"Error retrieving ROI calculations: {str(e)}")
        raise HTTPException(status_code=500, detail="Error retrieving ROI calculations")

# Automation Readiness Assessment Endpoints
@api_router.post("/automation-assessment/save", response_model=AssessmentResponse)
async def save_automation_assessment(automation_data: AutomationAssessmentCreate):
    """Save Automation Readiness Assessment to Supabase"""
    try:
        automation_result = AutomationAssessmentResult(**automation_data.dict())
        
        supabase_data = {
            "id": automation_result.id,
            "user_info": automation_result.user_info.dict(),
            "task_analysis": automation_result.task_analysis,
            "recommendations": automation_result.recommendations,
            "priority_tasks": automation_result.priority_tasks,
            "automation_score": automation_result.automation_score,
            "created_at": automation_result.created_at.isoformat(),
            "ip_address": automation_result.ip_address,
            "user_agent": automation_result.user_agent
        }
        
        response = supabase.table("automation_assessments").insert(supabase_data).execute()
        
        if response.data:
            return AssessmentResponse(
                id=automation_result.id,
                message="Automation Assessment saved successfully",
                assessment_url=f"/api/automation-assessment/{automation_result.id}"
            )
        else:
            raise HTTPException(status_code=500, detail="Failed to save automation assessment")
            
    except Exception as e:
        logger.error(f"Error saving automation assessment: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error saving automation assessment: {str(e)}")

@api_router.get("/automation-assessment/{assessment_id}")
async def get_automation_assessment(assessment_id: str):
    """Retrieve a specific Automation Assessment by ID"""
    try:
        response = supabase.table("automation_assessments").select("*").eq("id", assessment_id).execute()
        
        if not response.data:
            raise HTTPException(status_code=404, detail="Automation assessment not found")
        
        return response.data[0]
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error retrieving automation assessment: {str(e)}")
        raise HTTPException(status_code=500, detail="Error retrieving automation assessment")

@api_router.get("/automation-assessment/results")
async def get_all_automation_assessments(limit: int = 100, offset: int = 0):
    """Retrieve all Automation Assessments with pagination"""
    try:
        response = supabase.table("automation_assessments").select("*").range(offset, offset + limit - 1).execute()
        return {"data": response.data, "count": len(response.data)}
        
    except Exception as e:
        logger.error(f"Error retrieving automation assessments: {str(e)}")
        raise HTTPException(status_code=500, detail="Error retrieving automation assessments")

# Analytics Endpoints
@api_router.get("/analytics/overview")
async def get_analytics_overview():
    """Get comprehensive analytics across all assessment types"""
    try:
        # Get counts for each assessment type
        maturity_count = supabase.table("digital_maturity_assessments").select("id", count="exact").execute()
        roi_count = supabase.table("roi_calculator_results").select("id", count="exact").execute()
        automation_count = supabase.table("automation_assessments").select("id", count="exact").execute()
        
        # Get recent assessments (last 30 days)
        thirty_days_ago = (datetime.utcnow().replace(microsecond=0).isoformat() + "Z")
        
        recent_maturity = supabase.table("digital_maturity_assessments").select("id", count="exact").gte("created_at", thirty_days_ago).execute()
        recent_roi = supabase.table("roi_calculator_results").select("id", count="exact").gte("created_at", thirty_days_ago).execute()
        recent_automation = supabase.table("automation_assessments").select("id", count="exact").gte("created_at", thirty_days_ago).execute()
        
        return {
            "total_assessments": {
                "digital_maturity": maturity_count.count,
                "roi_calculator": roi_count.count,
                "automation_readiness": automation_count.count,
                "total": (maturity_count.count or 0) + (roi_count.count or 0) + (automation_count.count or 0)
            },
            "recent_assessments_30_days": {
                "digital_maturity": recent_maturity.count,
                "roi_calculator": recent_roi.count,
                "automation_readiness": recent_automation.count,
                "total": (recent_maturity.count or 0) + (recent_roi.count or 0) + (recent_automation.count or 0)
            },
            "last_updated": datetime.utcnow().isoformat()
        }
        
    except Exception as e:
        logger.error(f"Error retrieving analytics: {str(e)}")
        raise HTTPException(status_code=500, detail="Error retrieving analytics")

@api_router.get("/analytics/company/{company}")
async def get_company_analytics(company: str):
    """Get analytics for a specific company across all assessment types"""
    try:
        # Search across all tables for the company
        maturity_data = supabase.table("digital_maturity_assessments").select("*").ilike("user_info->>company", f"%{company}%").execute()
        roi_data = supabase.table("roi_calculator_results").select("*").ilike("user_info->>company", f"%{company}%").execute()
        automation_data = supabase.table("automation_assessments").select("*").ilike("user_info->>company", f"%{company}%").execute()
        
        return {
            "company": company,
            "assessments": {
                "digital_maturity": {"count": len(maturity_data.data), "data": maturity_data.data},
                "roi_calculator": {"count": len(roi_data.data), "data": roi_data.data},
                "automation_readiness": {"count": len(automation_data.data), "data": automation_data.data}
            },
            "total_assessments": len(maturity_data.data) + len(roi_data.data) + len(automation_data.data)
        }
        
    except Exception as e:
        logger.error(f"Error retrieving company analytics: {str(e)}")
        raise HTTPException(status_code=500, detail="Error retrieving company analytics")

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],  # In production, specify your domain
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_event():
    await create_tables()
    logger.info("Supabase API server started successfully")

# Vercel serverless function handler
def handler(request):
    return app(request)