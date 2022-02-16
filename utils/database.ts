import Database from 'better-sqlite3';
import * as stmt from './queries'
import { NoID, Subreddit, User } from './types';

export const db = new Database(
  'database.db',
  { verbose: console.log }
);

db.prepare(stmt.createTableUsers).run();
db.prepare(stmt.createTableComments).run();
db.prepare(stmt.createTablePosts).run();
db.prepare(stmt.createTableSubreddits).run();


export const createUser = ({ username, password }: NoID<User>) =>
  db.prepare(stmt.createUser).run(username, password);

export const getUserById = (id: number) =>
  db.prepare(stmt.getUserById).get(id);

export const getUserByName = (name: string) =>
  db.prepare(stmt.getUserByUsername).get(name);

export const getUsers = async () =>
  db.prepare(stmt.getUsers).all();



export const createSubreddit = async ({ endpoint, name, description, img_url, created_by_user_id }: NoID<Subreddit>) =>
  db.prepare(stmt.createSubreddit).run(endpoint, name, description, img_url, created_by_user_id);

export const getSubredditById = async (id: number) =>
  db.prepare(stmt.getSubredditById).get(id)

export const getSubredditByName = async (name: string) =>
  db.prepare(stmt.getSubredditByName).get(name);

export const getSubredditByEndpoint = async (name: string) =>
  db.prepare(stmt.getSubredditByEndpoint).get(name);

export const getSubreddits = async () =>
  db.prepare(stmt.getSubreddits).all();
