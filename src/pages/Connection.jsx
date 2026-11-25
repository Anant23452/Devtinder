import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { addConnection } from "../utils/connectionSlice";

export default function Connection() {
  // 1. useSelector: Read the connections list from our central Redux store
  const connections = useSelector((store) => store.connection);

  // 2. Local state for error or loading feedback
  const [error, setError] = useState("");

  // 3. useDispatch: Send actions to store data into Redux
  const dispatch = useDispatch();

  // 4. fetchConnections: Calls the backend GET /user/connections API
  const fetchConnections = async () => {
    // If we already have the connections cached in Redux, no need to call API again
    if (connections) return;

    try {
      // NOTE: Backend route is "/user/connections" (requires JWT cookie via withCredentials: true)
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });

      // Backend sends: res.json({ data: [...] })
      // So res.data.data is the array of connected user profiles
      dispatch(addConnection(res.data?.data || []));
    } catch (err) {
      console.error("Error fetching connections:", err);
      setError(err?.response?.data || "Failed to load connections.");
    }
  };

  // 5. useEffect: Automatically runs fetchConnections once when this page loads
  useEffect(() => {
    fetchConnections();
  }, []);

  // 6. LOADING STATE: connections is null while network request is in flight
  if (connections === null) {
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
          <span>🤝</span> My Connections
        </h1>
        <p className="text-sm text-base-content/70 mt-1">
          Developers you have matched and connected with
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="alert alert-error text-sm p-3 mb-6 rounded-2xl shadow">
          <span>{error}</span>
        </div>
      )}

      {/* 7. EMPTY STATE: If you have no accepted connections yet */}
      {connections.length === 0 ? (
        <div className="card bg-base-200 border border-base-300 shadow-xl rounded-3xl p-10 text-center flex flex-col items-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-base-content mb-2">
            No Connections Yet!
          </h2>
          <p className="text-sm text-base-content/70 max-w-md mb-6">
            You haven't connected with any developers yet. Head to your Feed, send some requests, and when both developers accept, they will show up here!
          </p>
          <a href="/" className="btn btn-primary rounded-xl px-6">
            Explore Feed 🚀
          </a>
        </div>
      ) : (
        /* 8. LIST OF CONNECTIONS */
        <div className="space-y-4">
          {connections.map((dev) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about, skills } = dev;

            return (
              <div
                key={_id}
                className="card bg-base-200 border border-base-300 shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-5"
              >
                {/* Avatar */}
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

                {/* Details */}
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
                    {about || "DevTinder developer looking to collaborate on projects."}
                  </p>

                  {/* Skills */}
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

                {/* Chat / Connect Button */}
                <div>
                  <button className="btn btn-outline btn-primary btn-sm rounded-xl px-4 flex items-center gap-1.5 shadow-sm hover:scale-105 transition-all">
                    <span>💬</span> Chat
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
