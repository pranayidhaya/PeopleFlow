# Database schema

The schema is in [schema.sql](../server/schema.sql). Employees belong to departments and optional designations; users link an employee to a role. Leave balances are keyed by employee, type and year. Requests reference an employee and type; approval history records decisions. Notifications belong to users and audit records identify actors. The current migration is an idempotent initial schema, not a versioned migration framework; it cannot upgrade a previously different schema.
