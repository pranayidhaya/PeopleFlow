# System architecture

```mermaid
flowchart LR
 UI[React and Vite] -->|REST and bearer JWT| API[Express]
 API -->|transactions and parameterized SQL| DB[(PostgreSQL)]
```

The API enforces authorization and writes leave decisions, balances, history, notifications and audit events transactionally. The browser stores the demo JWT in session storage. The frontend and API run independently.
