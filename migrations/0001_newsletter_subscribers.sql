-- Newsletter subscribers: consent must be explicit, and re-signups update consent.
-- Do not add analytics IP addresses or browser fingerprints to this table.
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  full_name TEXT NOT NULL CHECK (length(full_name) BETWEEN 2 AND 120),
  email TEXT NOT NULL COLLATE NOCASE UNIQUE,
  consented_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  unsubscribed_at TEXT,
  unsubscribe_token_hash TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS newsletter_subscribers_status
ON newsletter_subscribers(unsubscribed_at);
