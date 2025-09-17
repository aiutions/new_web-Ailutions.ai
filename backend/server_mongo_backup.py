from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Dict, Optional, Any
import uuid
from datetime import datetime


# Load environment variables
load_dotenv()

# MongoDB connection - use environment variable
mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
db_name = os.environ.get('DB_NAME', 'ailutions_db')

client = AsyncIOMotorClient(mongo_url)
db = client[db_name]

# Create the main app
app = FastAPI(title="Ailutions API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# Digital Maturity Tracker Models
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

class DigitalMaturityAssessment(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_info: UserInfo
    answers: Dict[str, int]  # question_key: score mapping
    results: AssessmentResults
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None

class DigitalMaturityAssessmentCreate(BaseModel):
    user_info: UserInfo
    answers: Dict[str, int]
    results: AssessmentResults
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None

class DigitalMaturityAssessmentResponse(BaseModel):
    id: str
    message: str
    assessment_url: Optional[str] = None

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Ailutions API - Ready for automation!"}

@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "service": "ailutions-api"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Digital Maturity Tracker Endpoints
@api_router.post("/assessment/save", response_model=DigitalMaturityAssessmentResponse)
async def save_assessment(assessment_data: DigitalMaturityAssessmentCreate):
    """Save a completed Digital Maturity Assessment to the database"""
    try:
        # Create the assessment object with ID and timestamp
        assessment = DigitalMaturityAssessment(**assessment_data.dict())
        
        # Convert to dict for MongoDB storage
        assessment_dict = assessment.dict()
        
        # Convert datetime to ISO string for MongoDB
        assessment_dict['timestamp'] = assessment.timestamp.isoformat()
        
        # Insert into database
        result = await db.maturity_assessments.insert_one(assessment_dict)
        
        if result.inserted_id:
            return DigitalMaturityAssessmentResponse(
                id=assessment.id,
                message="Assessment saved successfully",
                assessment_url=f"/api/assessment/{assessment.id}"
            )
        else:
            raise HTTPException(status_code=500, detail="Failed to save assessment")
            
    except Exception as e:
        logger.error(f"Error saving assessment: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error saving assessment: {str(e)}")

@api_router.get("/assessment/{assessment_id}")
async def get_assessment(assessment_id: str):
    """Retrieve a specific assessment by ID"""
    try:
        assessment = await db.maturity_assessments.find_one({"id": assessment_id})
        if not assessment:
            raise HTTPException(status_code=404, detail="Assessment not found")
        
        # Remove MongoDB's _id field
        assessment.pop('_id', None)
        return assessment
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error retrieving assessment: {str(e)}")
        raise HTTPException(status_code=500, detail="Error retrieving assessment")

@api_router.get("/assessments", response_model=List[Dict[str, Any]])
async def get_all_assessments(limit: int = 100, skip: int = 0):
    """Retrieve all assessments with pagination"""
    try:
        assessments = await db.maturity_assessments.find().skip(skip).limit(limit).to_list(limit)
        
        # Remove MongoDB's _id field from each assessment
        for assessment in assessments:
            assessment.pop('_id', None)
            
        return assessments
        
    except Exception as e:
        logger.error(f"Error retrieving assessments: {str(e)}")
        raise HTTPException(status_code=500, detail="Error retrieving assessments")

@api_router.get("/assessments/stats")
async def get_assessment_stats():
    """Get assessment statistics and analytics"""
    try:
        # Total assessments count
        total_count = await db.maturity_assessments.count_documents({})
        
        # Get assessments from last 30 days
        from datetime import timedelta
        thirty_days_ago = datetime.utcnow() - timedelta(days=30)
        recent_count = await db.maturity_assessments.count_documents({
            "timestamp": {"$gte": thirty_days_ago.isoformat()}
        })
        
        # Aggregate maturity stages
        pipeline = [
            {"$group": {"_id": "$results.maturity_stage", "count": {"$sum": 1}}},
            {"$sort": {"count": -1}}
        ]
        stage_distribution = await db.maturity_assessments.aggregate(pipeline).to_list(10)
        
        # Average scores by section
        section_pipeline = [
            {"$unwind": "$results.section_scores"},
            {"$group": {
                "_id": "$results.section_scores.name",
                "avg_score": {"$avg": "$results.section_scores.score"},
                "count": {"$sum": 1}
            }},
            {"$sort": {"avg_score": -1}}
        ]
        section_averages = await db.maturity_assessments.aggregate(section_pipeline).to_list(10)
        
        return {
            "total_assessments": total_count,
            "recent_assessments_30_days": recent_count,
            "maturity_stage_distribution": stage_distribution,
            "section_averages": section_averages,
            "last_updated": datetime.utcnow().isoformat()
        }
        
    except Exception as e:
        logger.error(f"Error retrieving assessment stats: {str(e)}")
        raise HTTPException(status_code=500, detail="Error retrieving assessment statistics")

@api_router.get("/assessments/company/{company}")
async def get_assessments_by_company(company: str, limit: int = 50):
    """Retrieve assessments for a specific company"""
    try:
        assessments = await db.maturity_assessments.find(
            {"user_info.company": {"$regex": company, "$options": "i"}}
        ).limit(limit).to_list(limit)
        
        # Remove MongoDB's _id field from each assessment
        for assessment in assessments:
            assessment.pop('_id', None)
            
        return {
            "company": company,
            "assessment_count": len(assessments),
            "assessments": assessments
        }
        
    except Exception as e:
        logger.error(f"Error retrieving company assessments: {str(e)}")
        raise HTTPException(status_code=500, detail="Error retrieving company assessments")

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

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

# Vercel serverless function handler
def handler(request):
    return app(request)
