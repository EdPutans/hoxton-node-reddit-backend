import Database, { RunResult } from 'better-sqlite3';
import * as stmt from './queries'
import { NoID, Post, Subreddit, User, Vote } from './types';

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



export const createSubreddit = async ({ endpoint, name, description, img_url, created_by_user_id }: NoID<Subreddit>): Promise<RunResult> =>
  db.prepare(stmt.createSubreddit).run(endpoint, name, description, img_url, created_by_user_id);

export const getSubredditById = async (id: number): Promise<Subreddit | null> =>
  db.prepare(stmt.getSubredditById).get(id)

export const getSubredditByName = async (name: string): Promise<Subreddit | null> =>
  db.prepare(stmt.getSubredditByName).get(name);

export const getSubredditByEndpoint = async (name: string): Promise<Subreddit | null> =>
  db.prepare(stmt.getSubredditByEndpoint).get(name);

export const getSubreddits = async (): Promise<Subreddit[]> =>
  db.prepare(stmt.getSubreddits).all();



export const getPosts = async (): Promise<Post[]> =>
  db.prepare(stmt.getSubreddits).all();

export const getPostsBySubredditId = async (id: number): Promise<Post[] | null> =>
  db.prepare(stmt.getPostsForSubredditBySubredditId).all(id);

export const getPostsBySubredditEndpoint = async (endpoint: string): Promise<Post[] | null> =>
  db.prepare(stmt.getPostsForSubredditBySubredditId).all(endpoint);

export const getPostById = async (id: number): Promise<Post | null> =>
  db.prepare(stmt.getPostByPostId).get(id)

export const createPost = async ({ img_url, content, title, subreddit_id, user_id, }: NoID<Post>): Promise<RunResult> =>
  db.prepare(stmt.createPost).run(title, content, img_url, user_id, subreddit_id);

export const getRatingForPostId = async (id: number): Promise<RunResult> =>
  db.prepare(stmt.getRatingForPost).get(id);

export const createVote = async ({ post_id, user_id, direction }: NoID<Vote>): Promise<RunResult> =>
  db.prepare(stmt.createVote).run(user_id, post_id, direction);

export const findVotesForUserPost = async ({ post_id, user_id }: Omit<Vote, 'direction' | 'id'>): Promise<Vote> =>
  db.prepare(stmt.findVotesByUserAndPost).get(user_id, post_id);

export const updateVoteForUserPost = async ({ post_id, user_id, direction }: NoID<Vote>): Promise<RunResult> =>
  db.prepare(stmt.updateVote).run(direction, user_id, post_id);

