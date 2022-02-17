import express from 'express'
import cors from 'cors';
import * as user from './services/User';
import * as sub from './services/Subreddits';
import * as post from './services/Posts';
import * as T from './utils/types';

const app = express();
app.use(cors());
const port = 4000;

app.get('/users', async (_, res: T.Res<T.User[]>) => {
  const users = await user.getAllUsers();

  res.send({ data: users });
})

app.get('/users/:id', async (req: T.Req, res: T.Res<T.User>) => {
  const foundUser = await user.getUser(Number(req.params.id));

  if ('error' in foundUser) return res.send({ error: foundUser.error });

  res.send({ data: foundUser });
})

app.post('/user/register', async (req: T.Req<T.NoID<T.User>>, res: T.Res<T.NoID<T.User>>) => {
  const { username, password } = req.body;

  const newUser = await user.signup({ username, password })
  if ('error' in newUser) return res.send({ error: newUser.error });

  res.send({ data: newUser });
})


app.get('/r', async (_, res: T.Res<T.Subreddit[]>) => {
  const users = await sub.getAllSubreddits();

  res.send({ data: users });
})


app.get('/r/:endpoint', async (req: T.Req<{ endpoint: string }>, res: T.Res<T.Subreddit>) => {
  const foundSub = await sub.getSubreddit(req.params.endpoint);

  if ('error' in foundSub) return res.send({ error: foundSub.error });

  res.send({ data: foundSub });
})

app.post('/r', async (req: T.Req<T.NoID<T.Subreddit>>, res: T.Res<T.NoID<T.Subreddit>>) => {
  const newSub = await sub.createSub(req.body)

  if ('error' in newSub) return res.send({ error: newSub.error });

  res.send({ data: newSub });
})



app.get('/posts', async (req, res: T.Res<T.Post[]>) => {
  console.log(JSON.stringify(req.params));

  const posts = await post.getAllPosts()

  res.send({ data: posts });
})

app.get('/posts/:id', async (req: T.Req<{ id: number }>, res: T.Res<T.Post>) => {
  const foundPost = await post.getPostByPostId(req.params.id);

  if ('error' in foundPost) return res.status(404).send({ error: foundPost.error });

  res.send({ data: foundPost });
})

app.post('/posts', async (req: T.Req<T.NoID<T.Post>>, res: T.Res<T.NoID<T.Post>>) => {
  const newPost = await post.createNewPost(req.body)

  if ('error' in newPost) return res.send({ error: newPost.error });

  res.send({ data: newPost });
})

app.post('/posts/:id/vote', async (req: T.Req<T.NoID<T.Vote>>, res: T.Res<T.NoID<T.Post>>) => {
  const newPost = await post.createVoteForPost(req.body)

  if ('error' in newPost) return res.send({ error: newPost.error });

  res.send({ data: newPost });
})


app.listen(port, () => {
  console.log(`Server started on port ${port}`);
})







