import 'dotenv/config';
import { db } from '../configs/db';
import { usersTable, WireframeToCodeTable } from '../configs/schema';
import { sql } from 'drizzle-orm';

async function main() {
  try {
    console.log('Testing database connection...');
    
    // Count users
    const userCount = await db.select({
      count: sql<number>`count(*)`
    }).from(usersTable);
    console.log(`Users table exists. Current user count: ${userCount[0].count}`);
    
    // Count wireframe entries
    const wireframeCount = await db.select({
      count: sql<number>`count(*)`
    }).from(WireframeToCodeTable);
    console.log(`WireframeToCode table exists. Current entry count: ${wireframeCount[0].count}`);
    
    console.log('Database connection and tables verified successfully!');
  } catch (error) {
    console.error('Error verifying database:', error);
  }
}

main();
