import { Router } from 'express'
import * as user from '../services/User';
import * as T from '../utils/types';

const router = Router();

router.get('/', (_, res: T.Res<T.User[]>) => {
  const users = user.getAllUsers();

  res.send({ data: users });
})
router.get('/:id', (req: T.Req<{ id: string }>, res: T.Res<T.User>) => {
  const foundUser = user.getUser(Number(req.params.id));

  if ('error' in foundUser) return res.status(400).send({ error: foundUser.error });

  res.send({ data: foundUser });
})


router.post('/signup', (req: T.Req<T.NoID<T.User>>, res: T.Res<T.User>) => {
  const newUser = user.signup(req.body);

  if ('error' in newUser) return res.status(400).send({ error: newUser.error });

  res.send({ data: newUser });
})

router.post('/login', (req: T.Req<T.NoID<T.User>>, res: T.Res<T.User>) => {
  const foundUser = user.login(req.body);

  if ('error' in foundUser) return res.status(400).send({ error: foundUser.error });

  res.send({ data: foundUser });
})

export default router