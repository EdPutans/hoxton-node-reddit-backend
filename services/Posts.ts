import { createPost, createVote, getPostsBySubredditId, getPostById, getPosts, getRatingForPostId } from "../utils/database";
import { Query, Post, NoID, Vote } from "../utils/types";
import { getVoteForUserAndPost, handleUpdatePostRating } from './Votes';

export const aggregateRatingForPost = (post: Post): Post => {
  const ratings = getRatingForPostId(post.id);

  const postCopy = { ...post };
  postCopy.rating = 0;

  if (ratings) {
    ratings.forEach(rating => {
      postCopy.rating += Number(rating.direction);
    })
  }

  return postCopy;
}

export const getAllPosts = (): Post[] => {
  const posts = getPosts();

  const resultPosts: Post[] = [];

  for (const post of posts) {
    const aggregatedPost = aggregateRatingForPost(post);
    resultPosts.push(aggregatedPost);
  }

  return resultPosts;
}

export const getPostByPostId = (id: Post['id']): Query<Post> => {
  const foundPost = getPostById(id);

  if (!foundPost) return { error: "Post not found" };

  const resultPost = aggregateRatingForPost(foundPost);

  return resultPost;
}

export const getPostsBySubId = (id: Post['id']): Query<Post[]> => {
  const posts = getPostsBySubredditId(id);

  if (!posts) return { error: "No posts found" };

  const resultPosts: Post[] = [];

  for (const post of posts) {
    const aggregatedPost = aggregateRatingForPost(post);
    resultPosts.push(aggregatedPost);
  }

  return resultPosts;
}

export const createNewPost = (postParam: Omit<Post, 'id' | 'endpoint'>): Query<Post> => {
  const { img_url, content, subreddit_id, title, user_id } = postParam;

  if (!content) return { error: "Content required" }
  if (!subreddit_id) return { error: "Subreddit id required" }
  if (!title) return { error: "Title required" }
  if (!user_id) return { error: "User id required" }

  const { lastInsertRowid } = createPost({ img_url, content, subreddit_id, title, user_id });
  if (!lastInsertRowid) return ({ error: "Error creating post" });

  const newlyCreatedPost: Post | null = getPostById(Number(lastInsertRowid));

  if (!newlyCreatedPost) return ({ error: "Error creating post" });

  return newlyCreatedPost;
}

export const voteForPost = (vote: NoID<Vote>): Query<Post> => {
  if (!vote.user_id) return { error: "User id required" }
  if (!vote.post_id) return { error: "Post id required" }

  if (
    !vote.direction ||
    (vote.direction !== 1 && vote.direction !== -1)
  ) return { error: "1/-1 required" };

  const locatedPost = getPostById(vote.post_id);

  if (!locatedPost) return { error: "Post not found" };

  const userHasPreviousVote = getVoteForUserAndPost(vote.user_id, vote.post_id);
  if (userHasPreviousVote) {
    handleUpdatePostRating(vote)
  } else {
    const { lastInsertRowid } = createVote(vote);
    if (!lastInsertRowid) return { error: "Could not create vote" };
  }

  const resultPost = aggregateRatingForPost(locatedPost);
  return resultPost;
}
