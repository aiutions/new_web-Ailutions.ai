-- Supabase Table Creation Script
-- Execute this SQL in the Supabase SQL Editor to create required tables

-- Digital Maturity Assessments table
CREATE TABLE IF NOT EXISTS digital_maturity_assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_info JSONB NOT NULL,
    answers JSONB NOT NULL,
    results JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    ip_address TEXT,
    user_agent TEXT
);

-- ROI Calculator Results table
CREATE TABLE IF NOT EXISTS roi_calculator_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_info JSONB NOT NULL,
    inputs JSONB NOT NULL,
    calculations JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    ip_address TEXT,
    user_agent TEXT
);

-- Automation Readiness Assessments table
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

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_digital_maturity_created_at ON digital_maturity_assessments(created_at);
CREATE INDEX IF NOT EXISTS idx_digital_maturity_company ON digital_maturity_assessments USING GIN ((user_info->>'company'));

CREATE INDEX IF NOT EXISTS idx_roi_calculator_created_at ON roi_calculator_results(created_at);
CREATE INDEX IF NOT EXISTS idx_roi_calculator_company ON roi_calculator_results USING GIN ((user_info->>'company'));

CREATE INDEX IF NOT EXISTS idx_automation_created_at ON automation_assessments(created_at);
CREATE INDEX IF NOT EXISTS idx_automation_company ON automation_assessments USING GIN ((user_info->>'company'));

-- Enable Row Level Security (RLS) - Optional but recommended
ALTER TABLE digital_maturity_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE roi_calculator_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE automation_assessments ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (adjust as needed for your security requirements)
CREATE POLICY "Allow public read access" ON digital_maturity_assessments FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON digital_maturity_assessments FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read access" ON roi_calculator_results FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON roi_calculator_results FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read access" ON automation_assessments FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON automation_assessments FOR INSERT WITH CHECK (true);