import * as run from './operations';


const seed = () => {
  run.createUser({ username: 'nico@email.com', password: 'password' })
  run.createUser({ username: 'ed@banana.com', password: 'password' })
  run.createUser({ username: 'jurgen@bing.com', password: 'password' })



}

seed()