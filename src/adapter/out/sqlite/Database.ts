import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import * as path from 'path';

const DB_PATH = process.env.DB_PATH || path.join(__dirname, '../../../../db_sqlite/database.sqlite');

export default async function openDb() {
  return open({
    filename: DB_PATH,
    driver: sqlite3.Database
  });
}
