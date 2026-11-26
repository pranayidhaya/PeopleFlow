# API

All routes except `GET /api/health` and `POST /api/login` require `Authorization: Bearer <token>`. Login accepts `{email,password}`. JSON errors use `{error}`.

| Route | Access | Purpose |
| --- | --- | --- |
| GET/POST /api/departments | authenticated / staff | List/create departments |
| GET/POST /api/employees | staff | Search/list or create employees |
| PUT /api/employees/:id | staff | Update employee |
| GET /api/leave-types, /api/balances | authenticated | Types and own balances |
| GET/POST /api/leave | authenticated | Requests visible to caller / submit own request |
| POST /api/leave/:id/decision | staff | Approve or reject with `{decision}` |
| GET /api/analytics | staff | Aggregate employee and leave data |
| GET /api/notifications | authenticated | Own notifications |
| POST /api/notifications/:id/read | authenticated | Mark own notification read |
| GET /api/audit | staff | Recent audit records |
| GET /api/export/:kind | staff | CSV, kind is `employees` or `leave` |
| GET /api/settings; PUT /api/settings/:id | admin | Read/update leave limits |

Staff means HR or admin. Employee records accept `name`, `email`, `department_id` (number or null), and `status` (`active` or `inactive`). Leave requests accept `leave_type_id`, `start_date`, `end_date` and `reason`. No API has yet been verified against a live database.
