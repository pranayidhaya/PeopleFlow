import { readFile, readdir } from 'node:fs/promises';
import { pool } from './db.js';
const c=await pool.connect();
try {
 await c.query('BEGIN');
 await c.query('SELECT pg_advisory_xact_lock($1)',[18473921]);
 await c.query('CREATE TABLE IF NOT EXISTS schema_migrations(version text PRIMARY KEY, applied_at timestamptz NOT NULL DEFAULT now())');
 const migrations=[['001_initial',new URL('./schema.sql',import.meta.url)],...(await readdir(new URL('./migrations/',import.meta.url))).filter(x=>/^\d+_[\w-]+\.sql$/.test(x)).sort().map(x=>[x.slice(0,-4),new URL(`./migrations/${x}`,import.meta.url)])];
 for(const [version,file] of migrations){const seen=await c.query('SELECT 1 FROM schema_migrations WHERE version=$1',[version]);if(!seen.rowCount){await c.query(await readFile(file,'utf8'));await c.query('INSERT INTO schema_migrations(version) VALUES($1)',[version]);console.log(`Applied ${version}`);}}
 await c.query('COMMIT');console.log('Migrations up to date');
} catch(e){await c.query('ROLLBACK');throw e;} finally {c.release();await pool.end();}
