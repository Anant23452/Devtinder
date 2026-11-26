import { createSlice } from "@reduxjs/toolkit";

// Redux Slice to manage incoming connection requests
const requestSlice = createSlice({
  name: "request",
  // Initial state is null while the network request is pending
  initialState: null,
  reducers: {
    // 1. addRequest: Stores the array of incoming requests from the backend
    addRequest: (state, action) => {
      return action.payload;
    },

    // 2. removeRequest: Removes a single reviewed request (accepted or rejected) from state
    // action.payload is the requestId (_id)
    removeRequest: (state, action) => {
      if (!state) return null;
      // Filter out the request that was just accepted or rejected
      const newArray = state.filter((request) => request._id !== action.payload);
      return newArray;
    },

    // 3. clearRequests: Resets the requests state (e.g., on logout)
    clearRequests: (state, action) => {
      return null;
    },
  },
});

export const { addRequest, removeRequest, clearRequests } = requestSlice.actions;
export default requestSlice.reducer;
