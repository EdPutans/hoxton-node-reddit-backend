import express from 'express'
import cors from 'cors';
import Database from 'better-sqlite3';

const app = express();
app.use(cors());
app.set('port', 4000);

const db = new Database(
  'database.db',
  { verbose: console.log }
);


app.get('/banana', (rq, res) => { res.send({ dab: 'bananananaa' }) })
// to change your ports for different cors stuff:
app.listen(app.get('port'), function () {
  console.log('we are listening on: ',
    app.get('port'))
});
