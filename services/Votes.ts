import { findVotesForUserPost, updateVoteForUserPost } from "../utils/database";
import { Query, Vote, NoID } from "../utils/types";



export const getVoteForUserAndPost = async (user_id: Vote['user_id'], post_id: Vote['post_id']): Query<Vote> => {
  const vote = await findVotesForUserPost({ user_id, post_id });

  if (!vote) return { error: "Vote not found" }

  return vote;
}

export const handleUpdatePostRating = async ({ user_id, post_id, direction }: NoID<Vote>): Query<Vote> => {
  const vote = await findVotesForUserPost({ user_id, post_id });

  if (!vote) return { error: "Vote not found" }

  let newDirection: Vote['direction'] | null = null;

  // do nothing
  if (vote.direction === direction) return vote;
  // -1 => -1, +1 => +1

  if (vote.direction === -1 && direction === 1) newDirection = 0; // -1 => 0
  if (vote.direction === 1 && direction === -1) newDirection = 0; // +1 => 0
  if (vote.direction === 0 && direction === 1) newDirection = 1; // 0 => +1
  if (vote.direction === 0 && direction === -1) newDirection = -1; // 0 => -1


  if (!newDirection) return vote;

  const { lastInsertRowid } = await updateVoteForUserPost({ user_id, post_id, direction: newDirection });
  if (!lastInsertRowid) return { error: "Could not update vote" };

  const updatedVote = await getVoteForUserAndPost(user_id, post_id);
  return updatedVote;

}