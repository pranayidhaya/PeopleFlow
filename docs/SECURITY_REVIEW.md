# KnowUS security review

The current API uses bcrypt, expiring JWTs, parameterized SQL, role checks and rate limiting. The assistant has a server-side allowlist, rejects tool arguments, derives identity from the JWT-backed database lookup, limits tool rounds and request time, and has no write tools. Questions and tool results are sent to the configured external provider. Tool data and user input are untrusted; prompt instructions are not a guarantee against model manipulation. Tests use a mocked provider, not a real one.

Production gaps include session revocation, MFA, distributed rate limiting, security headers, complete authorization and browser coverage, account provisioning, policy retrieval, and an independent security review. JWTs in session storage remain accessible to injected scripts. The migration baseline is not a schema-drift verifier. Do not use real employee data or expose this instance publicly.
