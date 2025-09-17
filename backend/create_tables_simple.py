#!/usr/bin/env python3
"""
Simple approach to create Supabase tables by attempting inserts
"""

from supabase import create_client, Client
import requests
import json

# Supabase configuration
SUPABASE_URL = "https://cwbjscsbixtdglspnexn.supabase.co"
SUPABASE_SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3YmpzY3NiaXh0ZGdsc3BuZXhuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODA4NDc2MSwiZXhwIjoyMDczNjYwNzYxfQ.tNLwUKClzE3LoYSPcC9xGSnYYc2nGFPqAxDvEp6XdbQ"

def create_tables_via_sql_api():
    """Create tables using Supabase SQL API"""
    
    sql_commands = [
        """
        CREATE TABLE IF NOT EXISTS digital_maturity_assessments (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_info JSONB NOT NULL,
            answers JSONB NOT NULL,
            results JSONB NOT NULL,
            created_at TIMESTAMPTZ DEFAULT NOW(),
            ip_address TEXT,
            user_agent TEXT
        );
        """,
        """
        CREATE TABLE IF NOT EXISTS roi_calculator_results (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            user_info JSONB NOT NULL,
            inputs JSONB NOT NULL,
            calculations JSONB NOT NULL,
            created_at TIMESTAMPTZ DEFAULT NOW(),
            ip_address TEXT,
            user_agent TEXT
        );
        """,
        """
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
    ]
    
    headers = {
        'apikey': SUPABASE_SERVICE_KEY,
        'Authorization': f'Bearer {SUPABASE_SERVICE_KEY}',
        'Content-Type': 'application/json'
    }
    
    # Try direct SQL execution using REST API
    sql_url = f"{SUPABASE_URL}/rest/v1/rpc/exec_sql"
    
    for i, sql in enumerate(sql_commands, 1):
        try:
            payload = {"sql": sql.strip()}
            response = requests.post(sql_url, headers=headers, json=payload)
            
            if response.status_code == 200:
                print(f"✅ Table {i} created successfully")
            else:
                print(f"⚠️ Table {i} creation failed: {response.status_code} - {response.text}")
                
        except Exception as e:
            print(f"❌ Error creating table {i}: {str(e)}")
    
    # Test table access
    print("\n🔍 Testing table access...")
    supabase = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)
    
    tables = ["digital_maturity_assessments", "roi_calculator_results", "automation_assessments"]
    
    for table in tables:
        try:
            response = supabase.table(table).select("count").execute()
            print(f"✅ {table} table accessible")
        except Exception as e:
            print(f"❌ {table} table error: {str(e)}")

def test_supabase_connection():
    """Test basic Supabase connection"""
    try:
        supabase = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)
        
        # Try to list existing tables
        print("🔍 Testing Supabase connection...")
        
        # This should work if connection is good
        response = supabase.table('_supabase_versions').select('*').execute()
        print("✅ Supabase connection successful")
        return True
        
    except Exception as e:
        print(f"❌ Supabase connection failed: {str(e)}")
        return False

if __name__ == "__main__":
    print("🚀 Setting up Supabase tables for Ailutions...")
    
    if test_supabase_connection():
        create_tables_via_sql_api()
        print("\n✅ Setup completed! Tables should be ready.")
    else:
        print("\n❌ Connection failed. Please check your credentials.")