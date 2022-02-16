import { createSubreddit, getSubredditByEndpoint, getSubredditById, getSubredditByName, getSubreddits } from "../utils/database";
import { Query, Subreddit } from "../utils/types";
import { createSubredditEndpoint } from "../utils/helpers";

export const getAllSubreddits = async (): Promise<Subreddit[]> => {
  const subs = await getSubreddits();
  return subs
}

export const getSubreddit = async (endpoint: Subreddit['endpoint']): Query<Subreddit> => {
  const foundSubreddit = await getSubredditByEndpoint(endpoint);

  if (!foundSubreddit) return { error: "Subreddit not found" };

  return foundSubreddit;
}

export const createSub = async (subredditParam: Omit<Subreddit, 'id' | 'endpoint'>): Query<Subreddit> => {
  const { name, description, img_url, created_by_user_id } = subredditParam;

  if (!name) return { error: "Name required" }
  if (!description) return { error: "Description required" }
  if (!img_url) return { error: "Image url required" }
  if (!created_by_user_id) return { error: "User id required" }

  const endpoint = createSubredditEndpoint(name);

  const subredditExists = await getSubredditByEndpoint(endpoint);
  if (subredditExists) return ({ error: "Subreddit already exists" });

  const { lastInsertRowid } = await createSubreddit({ ...subredditParam, endpoint });
  const newSubreddit: Subreddit = await getSubredditById(Number(lastInsertRowid));

  return newSubreddit;
}
