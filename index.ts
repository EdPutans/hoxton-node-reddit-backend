import express from 'express'
import cors from 'cors';

import subredditController from './routes/subreddit';
import userController from './routes/user';
import postController from './routes/post';
import commentController from './routes/comment';

const app = express();
app.use(cors());
app.use(express.json());

const port = 4000;

app.use('/r', subredditController);
app.use('/users', userController);
app.use('/posts', postController);
app.use('/comments', commentController);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
})
