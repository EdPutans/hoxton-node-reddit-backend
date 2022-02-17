import { createSubreddit, getSubredditByEndpoint, getSubredditById, getSubredditByName, getSubreddits } from "../utils/database";
import { Query, Subreddit } from "../utils/types";
import { createSubredditEndpoint } from "../utils/helpers";

export const getAllSubreddits = (): Subreddit[] => {
  const subs = getSubreddits();
  return subs
}

export const getSubreddit = (endpoint: Subreddit['endpoint']): Query<Subreddit> => {
  const foundSubreddit = getSubredditByEndpoint(endpoint);

  if (!foundSubreddit) return { error: "Subreddit not found" };

  return foundSubreddit;
}

export const createSub = (subredditParam: Omit<Subreddit, 'id' | 'endpoint'>): Query<Subreddit> => {
  const { name, description, img_url, created_by_user_id } = subredditParam;

  if (!name) return { error: "Name required" }
  if (!description) return { error: "Description required" }
  if (!img_url) return { error: "Image url required" }
  if (!created_by_user_id) return { error: "User id required" }

  const endpoint = createSubredditEndpoint(name);

  const subredditExists = getSubredditByEndpoint(endpoint);
  if (subredditExists) return ({ error: "Subreddit already exists" });

  const { lastInsertRowid } = createSubreddit({ ...subredditParam, endpoint });
  const newSubreddit: Subreddit | null = getSubredditById(Number(lastInsertRowid));

  if (!newSubreddit) return ({ error: "Something weird happened." });

  return newSubreddit;
}
