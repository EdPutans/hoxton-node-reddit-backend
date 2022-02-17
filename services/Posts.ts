import { createPost, createVote, getPostsBySubredditId, getPostById, getPosts, getRatingForPostId } from "../utils/database";
import { Query, Post, NoID, Vote } from "../utils/types";
import { getVoteForUserAndPost, handleUpdatePostRating } from './Votes';

export const aggregateRatingForPost = async (post: Post): Promise<Post> => {
  const rating = await getRatingForPostId(post.id);

  const postCopy = { ...post };
  postCopy.rating = 0;

  if (rating) {
    console.log("Post id ", post.id, ' - aggregated raging: ', Number(rating));
    post.rating = Number(rating);
  }

  return postCopy;
}

export const getAllPosts = async (): Promise<Post[]> => {
  const posts = await getPosts();

  const resultPosts: Post[] = [];

  for (const post of posts) {
    const aggregatedPost = await aggregateRatingForPost(post);
    resultPosts.push(aggregatedPost);
  }

  return resultPosts;
}

export const getPostByPostId = async (id: Post['id']): Query<Post> => {
  const foundPost = await getPostById(id);

  if (!foundPost) return { error: "Post not found" };

  const resultPost = await aggregateRatingForPost(foundPost);

  return resultPost;
}

export const getPostsBySubId = async (id: Post['id']): Query<Post[]> => {
  const posts = await getPostsBySubredditId(id);

  if (!posts) return { error: "No posts found" };

  const resultPosts: Post[] = [];

  for (const post of posts) {
    const aggregatedPost = await aggregateRatingForPost(post);
    resultPosts.push(aggregatedPost);
  }

  return resultPosts;
}

export const createNewPost = async (postParam: Omit<Post, 'id' | 'endpoint'>): Query<Post> => {
  const { img_url, content, rating, subreddit_id, title, user_id } = postParam;

  if (content) return { error: "Content required" }
  if (subreddit_id) return { error: "Subreddit id required" }
  if (title) return { error: "Title required" }
  if (user_id) return { error: "User id required" }

  const { lastInsertRowid } = await createPost({ img_url, content, rating, subreddit_id, title, user_id });
  if (!lastInsertRowid) return ({ error: "Error creating post" });

  const newlyCreatedPost: Post | null = await getPostById(Number(lastInsertRowid));

  if (!newlyCreatedPost) return ({ error: "Error creating post" });

  return newlyCreatedPost;
}

export const voteForPost = async (vote: NoID<Vote>): Query<Post> => {
  if (!vote.user_id) return { error: "User id required" }
  if (!vote.post_id) return { error: "Post id required" }

  if (
    !vote.direction ||
    (vote.direction !== 1 && vote.direction !== -1)
  ) return { error: "1/-1 required" };

  const locatedPost = await getPostById(vote.post_id);
  if (!locatedPost) return { error: "Post not found" };

  const userHasPreviousVote = await getVoteForUserAndPost(vote.user_id, vote.post_id);
  if (userHasPreviousVote) await handleUpdatePostRating(vote)

  const { lastInsertRowid } = await createVote(vote);
  if (!lastInsertRowid) return { error: "Could not create vote" };

  const resultPost = await aggregateRatingForPost(locatedPost);
  return resultPost;
}
