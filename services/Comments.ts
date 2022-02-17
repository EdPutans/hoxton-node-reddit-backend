import { getCommentsForPost, createComment, getCommentById, getAllComments as getEverySingleComment } from "../utils/database";
import { Comment, NoID, Query } from "../utils/types";

export const getAllComments = (): Comment[] => {
  const comments = getEverySingleComment();

  return comments;
}


export const getCommentsForPostByPostId = (postId: number): Query<Comment[]> => {
  if (!postId) return { error: "Invalid postId provided" };

  const comments = getCommentsForPost(postId);

  return comments;
}

export const createNewComment = (comment: NoID<Comment>): Query<Comment> => {
  if (!comment.post_id) return { error: "Invalid postId provided" };
  if (!comment.user_id) return { error: "Invalid userId provided" };
  if (!comment.content) return { error: "Invalid content provided" };

  const { lastInsertRowid } = createComment(comment);
  if (!lastInsertRowid) return { error: "Could not create comment" };

  const createdComment = getCommentById(Number(lastInsertRowid));

  return createdComment;
}