import { createSlice } from "@reduxjs/toolkit";

// 1. Create a Redux Slice for storing all accepted connections
const connectionSlice = createSlice({
  name: "connection",
  // Initial state is null to represent that we haven't fetched from the API yet
  initialState: null,
  reducers: {
    // Action 1: addConnection -> Stores the array of connected users in Redux
    addConnection: (state, action) => {
      return action.payload;
    },
    // Action 2: removeConnection -> Resets connection list (e.g., on logout)
    removeConnection: (state, action) => {
      return null;
    },
  },
});

// 2. Export actions so components can dispatch them
export const { addConnection, removeConnection } = connectionSlice.actions;

// 3. Export the reducer to add to appStore.js
export default connectionSlice.reducer;
