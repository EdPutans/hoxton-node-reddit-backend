import { Router } from 'express'
import * as comment from '../services/Comments';
import * as T from '../utils/types';

const router = Router();

router.get('/', (req, res: T.Res<T.Comment[]>) => {
  const postId = req.query?.post_id;
  let comments;

  if (!postId) {
    comments = comment.getAllComments();
  } else {
    comments = comment.getCommentsForPostByPostId(Number(postId));
  }

  if ('error' in comments) return res.status(400).send({ error: comments.error });

  res.send({ data: comments })
})

router.post('/', (req: T.Req<T.NoID<T.Comment>>, res: T.Res<T.Comment>) => {
  const newComment = comment.createNewComment(req.body)

  if ('error' in newComment) return res.status(400).send({ error: newComment.error });

  res.send({ data: newComment });
})

export default router