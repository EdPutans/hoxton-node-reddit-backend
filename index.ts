import express from 'express'
import cors from 'cors';
import * as run from './operations';
import * as T from './types';
import { stripUser } from './helpers';

const app = express();
app.use(cors());
const port = 4000;


app.get('/users', async (req, res: T.Res<T.User[]>) => {
  const users = await run.getUsers();
  const data = users.map(stripUser);

  res.send({ data });
})
app.get('/users/:id', async (req: T.Req, res: T.Res<T.User>) => {
  const id = parseInt(req.params.id);

  const user = await run.getUserById(id);
  if (!user) res.status(404).send({ error: "User not found" });

  const data = stripUser(user);
  res.send({ data });
})

app.get('/subreddits', (req, res: T.Res<T.Subreddit[]>) => {

})
app.get('/subreddits', (req, res: T.Res<T.Subreddit>) => {

})


app.listen(port, () => {
  console.log(`Server started on port ${port}`);
})