import * as run from './utils/database';

const seed = () => {
  run.createUser({ username: 'nico@email.com', password: 'password' });
  run.createUser({ username: 'ed@banana.com', password: 'password' });
  run.createUser({ username: 'jurgen@bing.com', password: 'password' });

  run.createSubreddit({
    endpoint: 'unstirredpaint',
    name: 'Unstirred paint',
    description: 'Paint that hasnt been mixed looks cool',
    img_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl-LU9nKJ-K_Dre2WfX_BYJxey8w5S8pdJUA&usqp=CAU',
    created_by_user_id: 1
  });

  run.createSubreddit({
    endpoint: 'aww',
    name: 'Aww',
    description: 'Cute stuff',
    img_url: 'http://3.bp.blogspot.com/_N0qfjpJBHrI/TVEkaTSMHKI/AAAAAAAAA3A/SLhad6ZxqkY/s1600/imsdfsages.jpeg',
    created_by_user_id: 2
  });

  run.createSubreddit({
    endpoint: 'gifs',
    name: 'Gifs',
    description: 'Gifs',
    img_url: 'https://64.media.tumblr.com/bd430eb6e8b3bc325ad188d3525cbd74/8223b809e6569674-8f/s540x810/73905fdc361e786113185193b6960aba14756840.png',
    created_by_user_id: 3
  });

  run.createSubreddit({
    endpoint: 'pics',
    name: 'Pics',
    description: 'Pics',
    img_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXDdTKxLdGikjYzupK29D3DlHmiwaB5PyB_g&usqp=CAU',
    created_by_user_id: 1
  });

  run.createSubreddit({
    endpoint: 'videos',
    name: 'Videos',
    description: 'Videos',
    img_url: 'https://i.imgur.com/w3duRtb.jpg',
    created_by_user_id: 1
  });

  run.createPost({
    img_url: 'https://live.staticflickr.com/8492/28896348114_bb01282f3f_b.jpg',
    content: 'This is a post',
    title: 'Post title',
    subreddit_id: 1,
    user_id: 1,
    rating: 0
  })
  run.createPost({
    content: 'No image thing!!',
    title: 'Nae nae title!',
    subreddit_id: 1,
    user_id: 1,
    rating: 0
  })
  run.createPost({
    img_url: null,
    content: 'More stuff!',
    title: 'img url is null here!',
    subreddit_id: 1,
    user_id: 1,
    rating: 0
  })
}

seed()