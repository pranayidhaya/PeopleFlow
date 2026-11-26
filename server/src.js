import { app } from './app.js';
if(!process.env.JWT_SECRET || !process.env.DATABASE_URL) throw new Error('DATABASE_URL and JWT_SECRET are required');
app.listen(process.env.PORT||4000,()=>console.log(`API listening on port ${process.env.PORT||4000}`));
