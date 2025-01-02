/*
  # Initial Schema Setup for Communication Tracker

  1. New Tables
    - companies
      - Basic company information
      - Contact details
      - Communication preferences
    - communication_methods
      - Available communication types
      - Sequence and mandatory flags
    - communications
      - Communication records
      - Links to companies and methods
      - Status tracking

  2. Security
    - RLS enabled on all tables
    - Policies for authenticated users
*/

-- Companies table
CREATE TABLE IF NOT EXISTS companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  location text NOT NULL,
  linkedin_profile text NOT NULL,
  emails text[] NOT NULL DEFAULT '{}',
  phone_numbers text[] NOT NULL DEFAULT '{}',
  comments text,
  communication_periodicity integer NOT NULL DEFAULT 14,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Communication methods table
CREATE TABLE IF NOT EXISTS communication_methods (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  sequence integer NOT NULL,
  is_mandatory boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(sequence)
);

-- Communications table
CREATE TABLE IF NOT EXISTS communications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES companies(id) ON DELETE CASCADE,
  method_id uuid REFERENCES communication_methods(id) ON DELETE CASCADE,
  date timestamptz NOT NULL,
  notes text,
  status text NOT NULL CHECK (status IN ('completed', 'pending', 'overdue')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE communication_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE communications ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow authenticated users to read companies"
  ON companies FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert companies"
  ON companies FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update companies"
  ON companies FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to read methods"
  ON communication_methods FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert methods"
  ON communication_methods FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update methods"
  ON communication_methods FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to read communications"
  ON communications FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert communications"
  ON communications FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update communications"
  ON communications FOR UPDATE
  TO authenticated
  USING (true);

-- Insert default communication methods
INSERT INTO communication_methods (name, description, sequence, is_mandatory)
VALUES
  ('LinkedIn Post', 'Share content on company LinkedIn page', 1, true),
  ('LinkedIn Message', 'Direct message to company representatives', 2, true),
  ('Email', 'Email communication', 3, true),
  ('Phone Call', 'Direct phone communication', 4, true),
  ('Other', 'Other forms of communication', 5, false)
ON CONFLICT (sequence) DO NOTHING;