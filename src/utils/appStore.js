import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice"; // 👈 1. Import connectionReducer
import requestReducer from  "./requestSlice"

// The appStore is the central Redux store (global warehouse) for the entire app.
const appStore = configureStore({
  reducer: {
    user: userReducer,             // store.user -> Logged-in user's profile
    feed: feedReducer,             // store.feed -> Array of other developers to swipe on
    connection: connectionReducer, // store.connection -> Array of mutual connections (friends)
    request: requestReducer,           // store.request -> Array of incoming connection requests
  },
});

export default appStore;
