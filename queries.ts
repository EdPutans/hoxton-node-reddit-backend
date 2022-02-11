// used only for syntax highlighter to kick in : forbeslindesay.vscode-sql-template-literal
const sql = (r: any) => r;

export const createTableUsers = sql`CREATE TABLE users (
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    id INTEGER PRIMARY KEY AUTOINCREMENT
  );
`;

export const createTableSubreddits = sql`CREATE TABLE subreddits (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  endpoint TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  img_url TEXT,

  created_by_user_id INTEGER NOT NULL,
  FOREIGN KEY(created_by_user_id) REFERENCES users(id),
);
`;

export const createTablePosts = sql`CREATE TABLE posts(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT,
    img_url TEXT,
    rating INTEGER NOT NULL default 0,

    user_id INTEGER NOT NULL,
    subreddit_id INTEGER NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(subreddit_id) REFERENCES subreddits(id)
  );
`;

export const createTableComments = sql`CREATE TABLE comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    post_id INTEGER NOT NULL,

    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (post_id) REFERENCES posts(id)
  );
`;
