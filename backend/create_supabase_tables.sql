-- Create tables for Ailutions assessments in Supabase

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

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_digital_maturity_created_at ON digital_maturity_assessments(created_at);
CREATE INDEX IF NOT EXISTS idx_digital_maturity_company ON digital_maturity_assessments USING GIN((user_info->>'company'));
CREATE INDEX IF NOT EXISTS idx_digital_maturity_email ON digital_maturity_assessments USING GIN((user_info->>'email'));

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

-- Add indexes for ROI calculator
CREATE INDEX IF NOT EXISTS idx_roi_created_at ON roi_calculator_results(created_at);
CREATE INDEX IF NOT EXISTS idx_roi_company ON roi_calculator_results USING GIN((user_info->>'company'));
CREATE INDEX IF NOT EXISTS idx_roi_email ON roi_calculator_results USING GIN((user_info->>'email'));

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

-- Add indexes for automation assessments
CREATE INDEX IF NOT EXISTS idx_automation_created_at ON automation_assessments(created_at);
CREATE INDEX IF NOT EXISTS idx_automation_company ON automation_assessments USING GIN((user_info->>'company'));
CREATE INDEX IF NOT EXISTS idx_automation_email ON automation_assessments USING GIN((user_info->>'email'));
CREATE INDEX IF NOT EXISTS idx_automation_score ON automation_assessments(automation_score);

-- Enable Row Level Security (RLS) for all tables
ALTER TABLE digital_maturity_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE roi_calculator_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE automation_assessments ENABLE ROW LEVEL SECURITY;

-- Create policies to allow service role to access all data
CREATE POLICY IF NOT EXISTS "Enable all operations for service role" ON digital_maturity_assessments
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY IF NOT EXISTS "Enable all operations for service role" ON roi_calculator_results
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY IF NOT EXISTS "Enable all operations for service role" ON automation_assessments
    FOR ALL USING (auth.role() = 'service_role');

-- Optional: Create a view for combined analytics
CREATE OR REPLACE VIEW assessment_analytics AS
SELECT 
    'digital_maturity' as assessment_type,
    user_info->>'company' as company,
    user_info->>'email' as email,
    created_at
FROM digital_maturity_assessments
UNION ALL
SELECT 
    'roi_calculator' as assessment_type,
    user_info->>'company' as company,
    user_info->>'email' as email,
    created_at
FROM roi_calculator_results
UNION ALL
SELECT 
    'automation_readiness' as assessment_type,
    user_info->>'company' as company,
    user_info->>'email' as email,
    created_at
FROM automation_assessments;

-- Grant access to the view
GRANT SELECT ON assessment_analytics TO service_role;