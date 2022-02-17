import { findVotesForUserPost, updateVoteForUserPost } from "../utils/database";
import { Query, Vote, NoID } from "../utils/types";

export const getVoteForUserAndPost = (user_id: Vote['user_id'], post_id: Vote['post_id']): Query<Vote> => {
  const vote = findVotesForUserPost({ user_id, post_id });

  if (!vote) return { error: "Vote not found" }

  return vote;
}

export const handleUpdatePostRating = ({ user_id, post_id, direction }: NoID<Vote>): Query<Vote> => {
  const vote = findVotesForUserPost({ user_id, post_id });

  if (!vote) return { error: "Vote not found" }
  //@ts-ignore
  let newValue: Vote['direction'] = (Number(vote.direction) || 0) + direction;

  if (!vote.direction) newValue = 0;
  //shut up i know what im doing
  if (newValue < -1) newValue = -1;
  if (newValue > 1) newValue = 1;


  const { lastInsertRowid } = updateVoteForUserPost({ user_id, post_id, direction: newValue });
  if (!lastInsertRowid) return { error: "Could not update vote" };

  const updatedVote = getVoteForUserAndPost(user_id, post_id);

  return updatedVote;


}