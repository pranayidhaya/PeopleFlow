# Testing report

On 2026-11-26, server `npm test` passed 3 tests and failed 0: health, anonymous access rejection, and login input validation. These do not connect to PostgreSQL. The client production build succeeded with a bundle-size warning. Dependency audits after upgrades reported no known vulnerabilities at installation time.

The PostgreSQL 18 service was running, but a passwordless connection to localhost as `postgres` failed with `fe_sendauth: no password supplied`. Migrations, seeds, authentication, authorization with real accounts, leave rules, analytics, UI interaction and end-to-end flows were not tested. Frontend tests and lint checks have not been configured. No screenshots were captured.
