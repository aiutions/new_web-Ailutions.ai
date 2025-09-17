#!/usr/bin/env python3
"""
Programmatic Supabase Table Creation
Attempts to create tables using direct SQL execution via Supabase client
"""

from supabase import create_client, Client
import os

# Supabase configuration
SUPABASE_URL = "https://cwbjscsbixtdglspnexn.supabase.co"
SUPABASE_SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3YmpzY3NiaXh0ZGdsc3BuZXhuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODA4NDc2MSwiZXhwIjoyMDczNjYwNzYxfQ.tNLwUKClzE3LoYSPcC9xGSnYYc2nGFPqAxDvEp6XdbQ"

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)

def create_tables():
    """Attempt to create tables programmatically"""
    
    # Table creation SQL
    tables_sql = [
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
    
    print("Attempting to create Supabase tables programmatically...")
    
    # Try different approaches to execute SQL
    for i, sql in enumerate(tables_sql, 1):
        table_name = ["digital_maturity_assessments", "roi_calculator_results", "automation_assessments"][i-1]
        print(f"\nAttempting to create table {i}: {table_name}")
        
        try:
            # Method 1: Try using rpc function (if exists)
            print("  Method 1: Trying rpc function...")
            response = supabase.rpc('sql', {'query': sql}).execute()
            print(f"  ✅ Success via rpc: {response}")
            continue
        except Exception as e:
            print(f"  ❌ rpc method failed: {str(e)}")
        
        try:
            # Method 2: Try direct SQL execution (if supported)
            print("  Method 2: Trying direct SQL execution...")
            response = supabase.postgrest.rpc('sql', {'query': sql}).execute()
            print(f"  ✅ Success via postgrest: {response}")
            continue
        except Exception as e:
            print(f"  ❌ postgrest method failed: {str(e)}")
        
        print(f"  ⚠️  Could not create table {table_name} programmatically")
    
    print("\n" + "="*60)
    print("PROGRAMMATIC TABLE CREATION SUMMARY")
    print("="*60)
    print("❌ Supabase Python client does not support DDL operations")
    print("📋 Manual table creation required via Supabase dashboard")
    print("📄 SQL script created: /app/create_supabase_tables.sql")
    print("="*60)

def test_table_existence():
    """Test if tables exist by trying to query them"""
    tables = ["digital_maturity_assessments", "roi_calculator_results", "automation_assessments"]
    
    print("\nTesting table existence...")
    for table in tables:
        try:
            response = supabase.table(table).select("count").execute()
            print(f"✅ Table '{table}' exists and is accessible")
        except Exception as e:
            print(f"❌ Table '{table}' does not exist or is not accessible: {str(e)}")

if __name__ == "__main__":
    create_tables()
    test_table_existence()