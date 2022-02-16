import { Request, Response } from "express";
export type ErrorType = { error: string }

type Body<T> = { data: T } | ErrorType;

export type Query<T> = Promise<T | ErrorType>

export type Req<T = { id: string }> = Request<T> & { body: Body<T> };
export type Res<T> = Response<Body<T>>

export type User = {
  username: string;
  password: string;
  id: number;
}

export type Subreddit = {
  endpoint: string;
  name: string;
  description: string;
  img_url: string;
  created_by_user_id: number;
}

export type Post = {
  id: number;
  title: string;
  content: string;
  img_url: string;
  rating: number;
  user_id: number;
  subreddit_id: number;
}

export type Comment = {
  id: number;
  content: string;
  user_id: number;
  post_id: number;
}


export type NoID<T> = Omit<T, 'id'>;