import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { addRequest, removeRequest } from "../utils/requestSlice";

export default function Request() {
  // 1. useSelector: Read the requests array from Redux store (appStore.js)
  const requests = useSelector((store) => store.request);

  // 2. Local state for error or feedback
  const [error, setError] = useState("");

  // 3. useDispatch: Send actions to update the Redux store
  const dispatch = useDispatch();

  // 4. fetchRequests: Calls the backend to get all pending received requests
  const fetchRequests = async () => {
    // Avoid re-fetching if data is already cached in Redux
    if (requests) return;

    try {
      // NOTE: Backend route is "/user/requests/received" with withCredentials: true
      const res = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });

      // Backend sends: res.json({ message: "...", data: connectionRequests })
      // Each item in data has: { _id, fromUserId: { firstName, photoUrl, ... }, status: "interested" }
      dispatch(addRequest(res.data?.data || []));
    } catch (err) {
      console.error("Error fetching requests:", err);
      setError(err?.response?.data || "Failed to load connection requests.");
    }
  };

  // 5. reviewRequest: Calls the backend to Accept or Reject a request
  const reviewRequest = async (status, requestId) => {
    try {
      // Backend route: POST /request/review/:status/:requestId
      await axios.post(
        `${BASE_URL}/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );

      // Once successfully accepted or rejected, remove it from Redux so it disappears from UI
      dispatch(removeRequest(requestId));
    } catch (err) {
      console.error(`Failed to ${status} request:`, err);
    }
  };

  // 6. useEffect: Runs fetchRequests once on component mount
  // Empty dependency array [] prevents infinite loop!
  useEffect(() => {
    fetchRequests();
  }, []);

  // 7. LOADING STATE: Shown while requests === null (fetching in progress)
  if (requests === null) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-140px)] py-8 px-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-base-content flex items-center justify-center gap-2">
          <span>📬</span> Connection Requests
        </h1>
        <p className="text-sm text-base-content/70 mt-1">
          Review developers who are interested in connecting with you
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="alert alert-error text-sm p-3 mb-6 rounded-2xl shadow">
          <span>{error}</span>
        </div>
      )}

      {/* 8. EMPTY STATE: Shown when there are 0 pending requests */}
      {requests.length === 0 ? (
        <div className="card bg-base-200 border border-base-300 shadow-xl rounded-3xl p-10 text-center flex flex-col items-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-base-content mb-2">
            All Caught Up!
          </h2>
          <p className="text-sm text-base-content/70 max-w-md mb-6">
            You don't have any pending connection requests right now. Explore the Feed to find and connect with other developers!
          </p>
          <a href="/" className="btn btn-primary rounded-xl px-6">
            Explore Feed 🚀
          </a>
        </div>
      ) : (
        /* 9. LIST OF INCOMING REQUESTS */
        <div className="space-y-4">
          {requests.map((request) => {
            // fromUserId is the populated developer profile who sent the request
            const { _id: requestId, fromUserId } = request;

            // Safety check if user was deleted
            if (!fromUserId) return null;

            const {
              firstName,
              lastName,
              photoUrl,
              age,
              gender,
              about,
              skills,
            } = fromUserId;

            return (
              <div
                key={requestId}
                className="card bg-base-200 border border-base-300 shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-5"
              >
                {/* Sender Avatar */}
                <div className="avatar">
                  <div className="w-20 h-20 rounded-2xl border-2 border-primary/30 overflow-hidden shadow">
                    <img
                      src={
                        photoUrl ||
                        "https://geographycat.com/wp-content/uploads/2024/10/Utah.jpg"
                      }
                      alt={firstName}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>

                {/* Sender Details */}
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <h2 className="text-xl font-bold text-base-content">
                      {firstName} {lastName || ""}
                    </h2>
                    {age && (
                      <span className="badge badge-neutral text-xs px-2.5 py-1">
                        {age} yrs • {gender || "Developer"}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-base-content/80 mt-1 line-clamp-2">
                    {about || "DevTinder developer interested in connecting with you."}
                  </p>

                  {/* Sender Skills */}
                  {skills && skills.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2 justify-center sm:justify-start">
                      {skills.map((skill, index) => (
                        <span
                          key={index}
                          className="badge badge-outline badge-primary text-xs py-1 px-2"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Action Buttons: Reject & Accept */}
                <div className="flex items-center gap-3">
                  {/* Reject Button */}
                  <button
                    onClick={() => reviewRequest("rejected", requestId)}
                    className="btn btn-outline btn-error btn-sm rounded-xl px-4 flex items-center gap-1 hover:scale-105 transition-all"
                    title="Reject Request"
                  >
                    <span>❌</span> Reject
                  </button>

                  {/* Accept Button */}
                  <button
                    onClick={() => reviewRequest("accepted", requestId)}
                    className="btn btn-success btn-sm text-white rounded-xl px-4 flex items-center gap-1 hover:scale-105 transition-all shadow-md"
                    title="Accept Request"
                  >
                    <span>✅</span> Accept
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
