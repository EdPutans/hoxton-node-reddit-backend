import express from 'express'
import cors from 'cors';
import * as user from './services/User';
import * as sub from './services/Subreddits';
import * as post from './services/Posts';
import * as comment from './services/Comments';
import * as T from './utils/types';

const app = express();
app.use(cors());
app.use(express.json());
const port = 4000;

app.get('/users', (_, res: T.Res<T.User[]>) => {
  const users = user.getAllUsers();

  res.send({ data: users });
})

app.get('/users/:id', (req: T.Req, res: T.Res<T.User>) => {
  const foundUser = user.getUser(Number(req.params.id));

  if ('error' in foundUser) return res.status(400).send({ error: foundUser.error });

  res.send({ data: foundUser });
})

app.post('/user/register', (req: T.Req<T.NoID<T.User>>, res: T.Res<T.User>) => {
  const { username, password } = req.body;

  const newUser = user.signup({ username, password })
  if ('error' in newUser) return res.status(400).send({ error: newUser.error });

  res.send({ data: newUser });
})


app.get('/r', (_, res: T.Res<T.Subreddit[]>) => {
  const users = sub.getAllSubreddits();

  res.send({ data: users });
})


app.get('/r/:endpoint', (req: T.Req<{ endpoint: string }>, res: T.Res<T.Subreddit>) => {
  const foundSub = sub.getSubreddit(req.params.endpoint);

  if ('error' in foundSub) return res.status(400).send({ error: foundSub.error });

  res.send({ data: foundSub });
})

app.post('/r', (req: T.Req<T.NoID<T.Subreddit>>, res: T.Res<T.Subreddit>) => {
  const newSub = sub.createSub(req.body)

  if ('error' in newSub) return res.status(400).send({ error: newSub.error });

  res.send({ data: newSub });
})

app.get('/posts', (req, res: T.Res<T.Post[]>) => {
  let posts: T.Query<T.Post[]> = [];

  if (req.query.subreddit_id) {
    posts = post.getPostsBySubId(Number(req.query.subreddit_id));
  } else {
    posts = post.getAllPosts()
  }

  if ('error' in posts) return res.status(404).send({ error: posts.error });


  res.send({ data: posts });
})

app.get('/posts/:id', (req: T.Req<{ id: number }>, res: T.Res<T.Post>) => {
  const foundPost = post.getPostByPostId(Number(req.params.id));

  if ('error' in foundPost) return res.status(404).send({ error: foundPost.error });

  res.send({ data: foundPost });
})

app.post('/posts', (req: T.Req<T.NoID<T.Post>>, res: T.Res<T.Post>) => {
  const newPost = post.createNewPost(req.body)

  if ('error' in newPost) return res.status(400).send({ error: newPost.error });

  res.send({ data: newPost });
})

app.post('/posts/vote/:id', (req: T.Req<T.NoID<T.Vote>>, res: T.Res<T.Post>) => {
  const newPost = post.voteForPost(req.body)

  if ('error' in newPost) return res.status(400).send({ error: newPost.error });

  res.send({ data: newPost });
})

app.get('/comments', (req, res: T.Res<T.Comment[]>) => {
  const postId = Number(req.query.post_id);
  let comments;

  if (!postId) {
    comments = comment.getAllComments();
  } else {
    comments = comment.getCommentsForPostByPostId(postId);
  }

  if ('error' in comments) return res.status(400).send({ error: comments.error });

  res.send({ data: comments })
})

app.post('/comments', (req: T.Req<T.NoID<T.Comment>>, res: T.Res<T.Comment>) => {
  const newComment = comment.createNewComment(req.body)

  if ('error' in newComment) return res.status(400).send({ error: newComment.error });

  res.send({ data: newComment });
})

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
})
