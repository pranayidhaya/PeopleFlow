# Development log

## 2026-11-26

- Inspected the workspace and created a separate project without modifying the existing TaskFlow folder.
- Found Node 22.16.0, npm 10.9.2, Git and a running PostgreSQL 18 service. PowerShell's npm script shim was blocked; `npm.cmd` works.
- Created an initial schema, seed script, API and client. Installed dependencies. Updated Zod and React Router after npm audit findings.
- A PostgreSQL connection without a password failed. No existing database or service configuration was changed. Database-backed functionality is not verified.
- Server smoke tests passed 3/3; frontend production build succeeded with a large-chunk warning. Full integration, frontend and end-to-end tests remain outstanding.
- Initialized a separate password-protected local PostgreSQL cluster on port 55432; applied the schema and seeded demo data. Started the API and verified admin login and analytics return three active employees. Browser interaction was not verified.
- Audited the existing application using separately created test databases. Fixed PostgreSQL 18 leave submission syntax, authentication error classification, profile and history authorization, notification ownership response, employee account email synchronization, and export route validation. Added profile and history views, integration tests, rollback fault injection, and basic lint rules. Test databases are retained and were not deleted.
- Rebranded the UI to KnowUS, added transactional tracked migrations and a repeatable fictional directory seed, and added a configurable read-only LLM assistant with an allowlist and mocked tests. No provider credentials were available for live AI verification. See the testing report for results and limitations.
