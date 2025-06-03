-- Add social link columns to users table
ALTER TABLE users 
ADD COLUMN github_url VARCHAR(255),
ADD COLUMN linkedin_url VARCHAR(255),
ADD COLUMN instagram_url VARCHAR(255),
ADD COLUMN portfolio_url VARCHAR(255);
