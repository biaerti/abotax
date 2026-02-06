-- Add email tracking columns to petition_signatures table
-- Run this migration in Supabase SQL Editor

ALTER TABLE petition_signatures
ADD COLUMN IF NOT EXISTS confirmation_sent_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS followup_scheduled BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS followup_sent_at TIMESTAMPTZ;

-- Create index for efficient follow-up queries
CREATE INDEX IF NOT EXISTS idx_petition_followup_pending
ON petition_signatures (confirmation_sent_at)
WHERE followup_scheduled = TRUE AND followup_sent_at IS NULL;

-- Comment explaining the columns
COMMENT ON COLUMN petition_signatures.confirmation_sent_at IS 'Timestamp when confirmation email was sent';
COMMENT ON COLUMN petition_signatures.followup_scheduled IS 'Whether follow-up email should be scheduled';
COMMENT ON COLUMN petition_signatures.followup_sent_at IS 'Timestamp when follow-up email was sent (null = not sent yet)';
