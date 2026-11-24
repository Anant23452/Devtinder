import { createSlice } from "@reduxjs/toolkit";

// A "slice" is a piece of the global Redux store dedicated to a specific feature (here: the feed).
const feedSlice = createSlice({
  name: "feed", // Unique name identifying this slice
  initialState: null, // Initial data when the app starts (null means no feed loaded yet)
  reducers: {
    // 1. addFeed: Called when we fetch the feed from the backend to store the array of developers
    addFeed: (state, action) => {
      // NOTE: action.payload is the data passed when calling dispatch(addFeed(data))
      // Fixed typo: was "action.playload", must be "action.payload"
      return action.payload;
    },

    // 2. removeUserFromFeed: Removes a specific developer from the feed after swiping/clicking Ignore or Interested
    removeUserFromFeed: (state, action) => {
      if (!state) return null;
      // action.payload is the userId to remove
      const newFeed = state.filter((user) => user._id !== action.payload);
      return newFeed;
    },

    // 3. removeFeed: Clears the entire feed (e.g. on logout)
    removeFeed: (state, action) => {
      return null;
    },
  },
});

// Export the action creators so our React components can dispatch them
export const { addFeed, removeUserFromFeed, removeFeed } = feedSlice.actions;

// Export the reducer function to be registered in appStore.js
export default feedSlice.reducer;
