import { User } from "./types";

export const stripUser = (user: User): User =>
  user.password ? ({ ...user, password: 'haha nope' }) : user

export const createSubredditEndpoint = (name: string) => name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();