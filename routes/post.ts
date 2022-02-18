import { Router } from 'express'
import * as post from '../services/Posts';
import * as T from '../utils/types';

const router = Router();

router.get('', (req, res: T.Res<T.Post[]>) => {
  let posts: T.Query<T.Post[]> = [];

  if (req.query.subreddit_id) {
    posts = post.getPostsBySubId(Number(req.query.subreddit_id));
  } else {
    posts = post.getAllPosts()
  }

  if ('error' in posts) return res.status(404).send({ error: posts.error });


  res.send({ data: posts });
})

router.get('/:id', (req: T.Req<{ id: number }>, res: T.Res<T.Post>) => {
  const foundPost = post.getPostByPostId(Number(req.params.id));

  if ('error' in foundPost) return res.status(404).send({ error: foundPost.error });

  res.send({ data: foundPost });
})

router.post('', (req: T.Req<T.NoID<T.Post>>, res: T.Res<T.Post>) => {
  const newPost = post.createNewPost(req.body)

  if ('error' in newPost) return res.status(400).send({ error: newPost.error });

  res.send({ data: newPost });
})

router.post('/vote/:id', (req: T.Req<T.NoID<T.Vote>>, res: T.Res<T.Post>) => {
  const newPost = post.voteForPost(req.body)

  if ('error' in newPost) return res.status(400).send({ error: newPost.error });

  res.send({ data: newPost });
})

export default router