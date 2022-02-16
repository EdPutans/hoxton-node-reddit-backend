import * as run from './utils/database';

const seed = () => {
  run.createUser({ username: 'nico@email.com', password: 'password' });
  run.createUser({ username: 'ed@banana.com', password: 'password' });
  run.createUser({ username: 'jurgen@bing.com', password: 'password' });

  run.createSubreddit({
    endpoint: 'unstirredpaint',
    name: 'Unstirred paint',
    description: 'Paint that hasnt been mixed looks cool',
    img_url: 'https://i.imgur.com/w3duRtb.jpg',
    created_by_user_id: 1
  });

  run.createSubreddit({
    endpoint: 'aww',
    name: 'Aww',
    description: 'Cute stuff',
    img_url: 'https://i.imgur.com/w3duRtb.jpg',
    created_by_user_id: 2
  });

  run.createSubreddit({
    endpoint: 'gifs',
    name: 'Gifs',
    description: 'Gifs',
    img_url: 'https://i.imgur.com/w3duRtb.jpg',
    created_by_user_id: 3
  });

  run.createSubreddit({
    endpoint: 'pics',
    name: 'Pics',
    description: 'Pics',
    img_url: 'https://i.imgur.com/w3duRtb.jpg',
    created_by_user_id: 1
  });

  run.createSubreddit({
    endpoint: 'videos',
    name: 'Videos',
    description: 'Videos',
    img_url: 'https://i.imgur.com/w3duRtb.jpg',
    created_by_user_id: 1
  });

}

seed()