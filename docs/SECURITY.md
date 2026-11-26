# Security notes

Passwords use bcrypt; JWTs expire after eight hours; login is rate limited; SQL values are parameterized; and role and active-status checks occur on each authenticated request. CSV cells beginning with spreadsheet formula characters are prefixed. CORS is restricted by `CLIENT_ORIGIN`.

This is not production-ready. JWTs in session storage are exposed to injected scripts; there is no server-side logout/revocation, password reset, account provisioning, MFA, security headers, durable distributed rate limit, or comprehensive audit coverage. Demo credentials are public and must never be used outside local development. No security or penetration test has been performed. Error handling and authorization require integration testing against PostgreSQL.
