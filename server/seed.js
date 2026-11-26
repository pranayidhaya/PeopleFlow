import bcrypt from 'bcryptjs';
import { pool } from './db.js';
const c=await pool.connect();
try {
 await c.query('BEGIN');
 for(const role of ['admin','hr','employee']) await c.query('INSERT INTO roles(name) VALUES($1) ON CONFLICT DO NOTHING',[role]);
 for(const name of ['People Operations','Engineering','Human Resources','Finance','Marketing','Sales','Operations']) await c.query('INSERT INTO departments(name) VALUES($1) ON CONFLICT DO NOTHING',[name]);
 for(const name of ['Administrator','HR Partner','Software Engineer']) await c.query('INSERT INTO designations(name) VALUES($1) ON CONFLICT DO NOTHING',[name]);
 for(const [name,limit] of [['Annual leave',20],['Sick leave',10],['Casual leave',5]]) { const r=await c.query('INSERT INTO leave_types(name,annual_limit) VALUES($1,$2) ON CONFLICT(name) DO UPDATE SET name=EXCLUDED.name RETURNING id',[name,limit]); await c.query('INSERT INTO leave_policies(leave_type_id) VALUES($1) ON CONFLICT DO NOTHING',[r.rows[0].id]); }
 const hash=await bcrypt.hash('DemoPass123!',12);
 for(const [name,email,role,department,designation] of [['Alex Morgan','admin@example.test','admin','People Operations','Administrator'],['Sam Taylor','hr@example.test','hr','People Operations','HR Partner'],['Jordan Lee','employee@example.test','employee','Engineering','Software Engineer']]) {
  const e=await c.query('INSERT INTO employees(name,email,department_id,designation_id) VALUES($1,$2,(SELECT id FROM departments WHERE name=$3),(SELECT id FROM designations WHERE name=$4)) ON CONFLICT(email) DO UPDATE SET email=EXCLUDED.email RETURNING id',[name,email,department,designation]);
  await c.query('INSERT INTO users(email,password_hash,role_id,employee_id) VALUES($1,$2,(SELECT id FROM roles WHERE name=$3),$4) ON CONFLICT(email) DO NOTHING',[email,hash,role,e.rows[0].id]);
  await c.query('INSERT INTO leave_balances SELECT $1,id,EXTRACT(YEAR FROM CURRENT_DATE)::int,annual_limit FROM leave_types ON CONFLICT DO NOTHING',[e.rows[0].id]);
 }
 const departments=['Engineering','Human Resources','Finance','Marketing','Sales','Operations'];
 const first=['Avery','Blair','Casey','Devin','Ellis','Finley','Harper','Indigo','Jules','Kai','Logan','Morgan','Noel','Parker','Quinn','Reese','Riley','Sawyer','Skyler','Tatum','Taylor','Val','Winter','Alexis','Cameron','Drew','Emery','Frankie','Hayden','Jamie','Kendall','Lane'];
 for(let i=0;i<first.length;i++){
  const email=`nexa${String(i+1).padStart(2,'0')}@example.test`;
  const e=await c.query("INSERT INTO employees(name,email,department_id,hired_on) VALUES($1,$2,(SELECT id FROM departments WHERE name=$3),CURRENT_DATE-($4::int)) ON CONFLICT(email) DO UPDATE SET email=EXCLUDED.email RETURNING id",[`${first[i]} ${['Stone','Rivera','Kim','Patel'][i%4]}`,email,departments[i%departments.length],100+i*45]);
  await c.query('INSERT INTO leave_balances SELECT $1,id,EXTRACT(YEAR FROM CURRENT_DATE)::int,annual_limit FROM leave_types ON CONFLICT DO NOTHING',[e.rows[0].id]);
 }
 await c.query('COMMIT'); console.log('Demo data seeded');
} catch(e) { await c.query('ROLLBACK'); throw e; } finally { c.release(); await pool.end(); }
