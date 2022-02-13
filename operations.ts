import Database from 'better-sqlite3';
import * as stmt from './queries'
import { NoID, User } from './types';

export const db = new Database(
  'database.db',
  { verbose: console.log }
);

db.prepare(stmt.createTableUsers).run();
db.prepare(stmt.createTableComments).run();
db.prepare(stmt.createTablePosts).run();
db.prepare(stmt.createTableSubreddits).run();

export const createUser = ({ username, password }: NoID<User>) => db.prepare(stmt.createUser).run(username, password);
export const getUserById = (id: number) => db.prepare(stmt.getUserById).get(id);
export const getUsers = async () => db.prepare(stmt.getUsers).all();