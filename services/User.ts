import { createUser, getUserById, getUserByName, getUsers } from "../utils/database";
import { NoID, Query, User } from "../utils/types";
import { stripUser } from '../utils/helpers';

export const getAllUsers = (): User[] => {
  const users = getUsers();

  return users.map(stripUser);
}

export const getUser = (id: number): Query<User> => {
  const foundUser = getUserById(id);

  if (!foundUser) return { error: "User not found" };

  return stripUser(foundUser);
}

export const signup = ({ username, password }: NoID<User>): Query<User> => {
  const userExists = getUserByName(username);
  if (userExists) return ({ error: "User already exists" });

  const { lastInsertRowid } = createUser({ username, password });
  const newUser: User = getUserById(Number(lastInsertRowid));

  return newUser;
}

export const login = ({ username, password }: NoID<User>): Query<User> => {
  const user = getUserByName(username);

  if (!user || user?.password !== password)
    return ({ error: "Incorrect details" });

  return stripUser(user);
}
