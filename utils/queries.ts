// used only for syntax highlighter to kick in : forbeslindesay.vscode-sql-template-literal
function sql(r: TemplateStringsArray): string {
  return r[0];
}

export const createTableUsers = sql`CREATE TABLE IF NOT EXISTS users (
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    id INTEGER PRIMARY KEY AUTOINCREMENT
  );
`;

export const createTableSubreddits = sql`CREATE TABLE IF NOT EXISTS subreddits (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  endpoint TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  img_url TEXT,

  created_by_user_id INTEGER NOT NULL,
  FOREIGN KEY(created_by_user_id) REFERENCES users(id)
);
`;

export const createTablePosts = sql`CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT,
    img_url TEXT,

    user_id INTEGER NOT NULL,
    subreddit_id INTEGER NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(subreddit_id) REFERENCES subreddits(id)
  );
`;

export const createTableVotes = sql`CREATE TABLE IF NOT EXISTS votes (\
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  post_id INTEGER NOT NULL,
  direction TEXT NOT NULL,

  FOREIGN KEY(user_id) REFERENCES users(id),
  FOREIGN KEY(post_id) REFERENCES posts(id)
);`

export const createTableComments = sql`CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    post_id INTEGER NOT NULL,

    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (post_id) REFERENCES posts(id)
  );
`;

export const getSubreddits = sql`SELECT * FROM subreddits;`;
export const getSubredditById = sql`SELECT * FROM subreddits WHERE id = ?;`;
export const getSubredditByName = sql`SELECT * FROM subreddits WHERE name = ?;`;
export const getSubredditByEndpoint = sql`SELECT * FROM subreddits WHERE endpoint = ?;`;

export const getUsers = sql`SELECT * FROM users;`;
export const getUserById = sql`SELECT * FROM users WHERE id = ?;`;
export const getUserByUsername = sql`SELECT * FROM users WHERE username = ?;`;

export const getAllPosts = sql`SELECT * FROM posts;`;
export const getPostByPostId = sql`SELECT * FROM posts WHERE id = ? LIMIT 1;`;
export const getPostsForSubredditBySubredditId = sql`SELECT * FROM posts WHERE subreddit_id = ?;`;

export const getAllComments = sql`SELECT * FROM comments;`;
export const getCommentsForPostByPostId = sql`SELECT * FROM comments WHERE post_id = ?;`;
export const getCommentById = sql`SELECT * FROM comments WHERE id = ?;`;

export const createUser = sql`INSERT INTO users (username, password) VALUES (?, ?);`;
export const createSubreddit = sql`INSERT INTO subreddits (endpoint, name, description, img_url, created_by_user_id) VALUES (?, ?, ?, ?, ?);`;
export const createPost = sql`INSERT INTO posts (title, content, img_url, user_id, subreddit_id) VALUES (?, ?, ?, ?, ?);`;
export const createComment = sql`INSERT INTO comments (content, user_id, post_id) VALUES (?, ?, ?);`;

export const getRatingForPost = sql`SELECT direction FROM votes WHERE post_id = ?;`;
export const createVote = sql`INSERT INTO votes (user_id, post_id, direction) VALUES (?, ?, ?);`;
export const findVotesByUserAndPost = sql`SELECT * FROM votes WHERE user_id = ? AND post_id = ?;`;

export const updateVote = sql`UPDATE votes SET direction = ? WHERE user_id = ? AND post_id = ?;`;