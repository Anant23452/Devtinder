import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice"; // Import the feedReducer from feedSlice (NOT the feed.jsx component!)

// The appStore is the central Redux store (global warehouse) for the entire app.
// Every slice reducer added inside the `reducer` object becomes a slice of the global state.
const appStore = configureStore({
  reducer: {
    user: userReducer, // Accessible via: store.user
    feed: feedReducer, // Accessible via: store.feed
  },
});

export default appStore;
