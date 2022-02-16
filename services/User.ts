import { createUser, getUserById, getUserByName, getUsers } from "../utils/database";
import { NoID, Query, User } from "../utils/types";
import { stripUser } from '../utils/helpers';

export const getAllUsers = async (): Promise<User[]> => {
  const users = await getUsers();

  return users.map(stripUser);
}

export const getUser = async (id: number): Query<User> => {
  const foundUser = await getUserById(id);

  if (!foundUser) return { error: "User not found" };

  return stripUser(foundUser);
}

export const signup = async ({ username, password }: NoID<User>): Query<User> => {
  const userExists = await getUserByName(username);
  if (userExists) return ({ error: "User already exists" });

  const { lastInsertRowid } = await createUser({ username, password });
  const newUser: User = await getUserById(Number(lastInsertRowid));

  return newUser;
}

export const login = async ({ username, password }: NoID<User>): Query<User> => {
  const user = await getUserByName(username);

  if (!user || user?.password !== password)
    return ({ error: "Incorrect details" });

  return stripUser(user);
}
