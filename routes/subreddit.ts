import { Router } from 'express'
import * as sub from '../services/Subreddits';
import * as T from '../utils/types';

const router = Router();

router.get('', (req, res: T.Res<T.Subreddit[] | T.Subreddit>) => {
  let result;
  if (req.query.id) {
    result = sub.getSubById(Number(req.query.id));
  } else {
    result = sub.getAllSubreddits();
  }

  if (!result) return res.status(500).send({ error: "Something weird happened, investigate" });
  if ('error' in result) return res.status(400).send({ error: result.error });

  res.send({ data: result });
})


router.get('/:endpoint', (req: T.Req<{ endpoint: string }>, res: T.Res<T.Subreddit>) => {
  const foundSub = sub.getSubreddit(req.params.endpoint);

  if ('error' in foundSub) return res.status(400).send({ error: foundSub.error });

  res.send({ data: foundSub });
})



router.post('', (req: T.Req<T.NoID<T.Subreddit>>, res: T.Res<T.Subreddit>) => {
  const newSub = sub.createSub(req.body)

  if ('error' in newSub) return res.status(400).send({ error: newSub.error });

  res.send({ data: newSub });
})


router.get('/:endpoint', (req: T.Req<{ endpoint: string }>, res: T.Res<T.Subreddit>) => {
  const foundSub = sub.getSubreddit(req.params.endpoint);

  if ('error' in foundSub) return res.status(400).send({ error: foundSub.error });

  res.send({ data: foundSub });
})



router.post('', (req: T.Req<T.NoID<T.Subreddit>>, res: T.Res<T.Subreddit>) => {
  const newSub = sub.createSub(req.body)

  if ('error' in newSub) return res.status(400).send({ error: newSub.error });

  res.send({ data: newSub });
})

export default router