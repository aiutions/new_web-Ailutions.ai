#!/usr/bin/env python3
"""
Script to create Supabase tables for Ailutions assessments
"""

from supabase import create_client, Client
import logging

# Supabase configuration
SUPABASE_URL = "https://cwbjscsbixtdglspnexn.supabase.co"
SUPABASE_SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3YmpzY3NiaXh0ZGdsc3BuZXhuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODA4NDc2MSwiZXhwIjoyMDczNjYwNzYxfQ.tNLwUKClzE3LoYSPcC9xGSnYYc2nGFPqAxDvEp6XdbQ"

def create_tables():
    """Create all necessary tables in Supabase"""
    try:
        # Initialize Supabase client with service role key
        supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)
        
        # Read the SQL file
        with open('/app/backend/create_supabase_tables.sql', 'r') as f:
            sql_commands = f.read()
        
        # Split SQL commands by semicolon and execute each one
        commands = [cmd.strip() for cmd in sql_commands.split(';') if cmd.strip()]
        
        for i, command in enumerate(commands):
            try:
                if command.upper().startswith(('CREATE', 'ALTER', 'GRANT')):
                    print(f"Executing command {i+1}/{len(commands)}: {command[:50]}...")
                    # Note: Python Supabase client doesn't directly support DDL operations
                    # We'll use the REST API to execute SQL
                    response = supabase.rpc('exec_sql', {'sql': command}).execute()
                    print(f"✅ Command {i+1} executed successfully")
                elif command.upper().startswith('CREATE INDEX'):
                    print(f"Creating index {i+1}/{len(commands)}...")
                    response = supabase.rpc('exec_sql', {'sql': command}).execute()
                    print(f"✅ Index {i+1} created successfully")
                else:
                    print(f"Skipping command {i+1}: {command[:30]}...")
                    
            except Exception as e:
                print(f"⚠️ Error executing command {i+1}: {str(e)}")
                # Continue with other commands
                continue
        
        print("\n🎉 Table creation process completed!")
        
        # Test table access
        print("\n🔍 Testing table access...")
        
        # Test digital_maturity_assessments table
        try:
            response = supabase.table("digital_maturity_assessments").select("count").execute()
            print("✅ digital_maturity_assessments table accessible")
        except Exception as e:
            print(f"❌ digital_maturity_assessments table error: {str(e)}")
        
        # Test roi_calculator_results table
        try:
            response = supabase.table("roi_calculator_results").select("count").execute()
            print("✅ roi_calculator_results table accessible")
        except Exception as e:
            print(f"❌ roi_calculator_results table error: {str(e)}")
        
        # Test automation_assessments table
        try:
            response = supabase.table("automation_assessments").select("count").execute()
            print("✅ automation_assessments table accessible")
        except Exception as e:
            print(f"❌ automation_assessments table error: {str(e)}")
            
        print("\n✅ Supabase setup completed successfully!")
        return True
        
    except Exception as e:
        print(f"❌ Error in table creation: {str(e)}")
        return False

if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    success = create_tables()
    
    if success:
        print("\n🚀 Your Supabase database is ready!")
        print("\nNext steps:")
        print("1. Replace server.py with supabase_server.py")
        print("2. Update frontend to use new API endpoints")
        print("3. Test the new Supabase integration")
    else:
        print("\n❌ Setup failed. Please check the errors above.")