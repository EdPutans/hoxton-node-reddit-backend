import { User } from "./types";

export const stripUser = (user: User): User => ({ ...user, password: 'haha nope' })