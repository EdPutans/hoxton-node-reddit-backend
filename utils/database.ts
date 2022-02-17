import Database, { RunResult } from 'better-sqlite3';
import * as stmt from './queries'
import { NoID, Post, Subreddit, User, Vote, Comment } from './types';

export const db = new Database(
  'database.db',
  { verbose: console.log }
);

db.prepare(stmt.createTableUsers).run();
db.prepare(stmt.createTableComments).run();
db.prepare(stmt.createTablePosts).run();
db.prepare(stmt.createTableSubreddits).run();
db.prepare(stmt.createTableVotes).run();

export const createUser = ({ username, password }: NoID<User>) =>
  db.prepare(stmt.createUser).run(username, password);

export const getUserById = (id: number) =>
  db.prepare(stmt.getUserById).get(id);

export const getUserByName = (name: string) =>
  db.prepare(stmt.getUserByUsername).get(name);

export const getUsers = () =>
  db.prepare(stmt.getUsers).all();



export const createSubreddit = ({ endpoint, name, description, img_url, created_by_user_id }: NoID<Subreddit>): RunResult =>
  db.prepare(stmt.createSubreddit).run(endpoint, name, description, img_url, created_by_user_id);

export const getSubredditById = (id: number): Subreddit | null =>
  db.prepare(stmt.getSubredditById).get(id)

export const getSubredditByName = (name: string): Subreddit | null =>
  db.prepare(stmt.getSubredditByName).get(name);

export const getSubredditByEndpoint = (name: string): Subreddit | null =>
  db.prepare(stmt.getSubredditByEndpoint).get(name);

export const getSubreddits = (): Subreddit[] =>
  db.prepare(stmt.getSubreddits).all();



export const getPosts = (): Post[] =>
  db.prepare(stmt.getAllPosts).all();

export const getPostsBySubredditId = (id: number): Post[] | null =>
  db.prepare(stmt.getPostsForSubredditBySubredditId).all(id);

export const getPostsBySubredditEndpoint = (endpoint: string): Post[] | null =>
  db.prepare(stmt.getPostsForSubredditBySubredditId).all(endpoint);

export const getPostById = (id: number): Post | null =>
  db.prepare(stmt.getPostByPostId).get(id);

export const createPost = ({ img_url, content, title, subreddit_id, user_id, }: Omit<Post, 'id' | 'rating'>): RunResult =>
  db.prepare(stmt.createPost).run(title, content, img_url, user_id, subreddit_id);

export const getRatingForPostId = (id: number): { direction: Vote['direction'] }[] =>
  db.prepare(stmt.getRatingForPost).all(id);

export const createVote = ({ post_id, user_id, direction }: NoID<Vote>): RunResult =>
  db.prepare(stmt.createVote).run(user_id, post_id, direction);

export const findVotesForUserPost = ({ post_id, user_id }: Omit<Vote, 'direction' | 'id'>): Vote =>
  db.prepare(stmt.findVotesByUserAndPost).get(user_id, post_id);

export const updateVoteForUserPost = ({ post_id, user_id, direction }: NoID<Vote>): RunResult =>
  db.prepare(stmt.updateVote).run(direction, user_id, post_id);



export const getAllComments = (): Comment[] =>
  db.prepare(stmt.getAllComments).all();

export const getCommentsForPost = (post_id: number): Comment[] =>
  db.prepare(stmt.getCommentsForPostByPostId).all(post_id);

export const getCommentById = (id: number): Comment =>
  db.prepare(stmt.getCommentById).get(id);

export const createComment = (comment: NoID<Comment>): RunResult =>
  db.prepare(stmt.createComment).run(comment);