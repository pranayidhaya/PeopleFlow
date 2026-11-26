CREATE INDEX IF NOT EXISTS leave_requests_status_created_idx ON leave_requests(status, created_at);
