import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { addFeed, removeUserFromFeed } from "../utils/feedSlice";
import Card from "../components/Card"; // 👈 Import the Card component!

function Feed() {
  // 1. useSelector: Reads the "feed" array from our central Redux store (appStore)
  const feed = useSelector((store) => store.feed);

  // 2. useDispatch: Gives us the dispatch function to send actions into Redux
  const dispatch = useDispatch();

  // 3. getFeed: Async function that calls the backend API to fetch developers
  const getFeed = async () => {
    // If we already have developers cached in Redux, skip fetching again
    if (feed) return;

    try {
      // NOTE: withCredentials: true is REQUIRED so the browser sends our JWT login cookie!
      const res = await axios.get(`${BASE_URL}/feed`, {
        withCredentials: true,
      });

      // The backend returns { data: [user1, user2, ...] }
      // So res.data.data is the actual array of users!
      dispatch(addFeed(res.data?.data || []));
    } catch (err) {
      console.error("Error fetching feed:", err);
    }
  };

  // 4. useEffect: Runs once when this component mounts onto the screen
  // Without this, getFeed() would NEVER be called!
  useEffect(() => {
    getFeed();
  }, []);

  // 5. handleSendRequest: Sends an "interested" or "ignored" connection request to the backend
  const handleSendRequest = async (status, toUserId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${toUserId}`,
        {},
        { withCredentials: true }
      );

      // Once sent, remove that user from our Redux feed so the next card appears!
      dispatch(removeUserFromFeed(toUserId));
    } catch (err) {
      console.error("Failed to send request:", err);
    }
  };

  // LOADING STATE: If feed is null, data is still being fetched from the server
  if (feed === null) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // EMPTY STATE: If there are no users left in the feed to swipe on
  if (feed.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <div className="text-6xl mb-4">🚀</div>
        <h2 className="text-2xl font-bold mb-2">No New Developers Found!</h2>
        <p className="text-base-content/70 max-w-sm">
          You've explored all available developers for now. Check back soon for new profiles!
        </p>
      </div>
    );
  }

  // ACTIVE CARD: Get the top developer from the feed array (Tinder-style card)
  const currentDeveloper = feed[0];

  return (
    <Card
      currentDeveloper={currentDeveloper}
      handleSendRequest={handleSendRequest}
    />
  );
}

export default Feed;
