import React from "react";

// Reusable Card component for DevTinder
// It accepts either `currentDeveloper` or `user` so it can be used in both Feed and Profile!
function Card({ currentDeveloper, user, handleSendRequest }) {
  // Support both prop names for flexibility:
  const developer = currentDeveloper || user;

  // Safety check: if no developer data is provided, don't crash
  if (!developer) return null;

  const {
    _id,
    firstName,
    lastName,
    photoUrl,
    age,
    gender,
    about,
    skills,
  } = developer;

  return (
    <div className="flex justify-center items-center py-10 px-4">
      {/* DaisyUI Card Component */}
      <div className="card bg-base-200 w-96 shadow-2xl border border-base-300 rounded-3xl overflow-hidden hover:shadow-3xl transition-all duration-300">
        {/* Developer Profile Image */}
        <figure className="h-80 w-full bg-base-300 overflow-hidden relative">
          <img
            src={
              photoUrl ||
              "https://geographycat.com/wp-content/uploads/2024/10/Utah.jpg"
            }
            alt={`${firstName} ${lastName || ""}`}
            className="w-full h-full object-cover"
          />
          {/* Badge over photo showing age & gender if present */}
          {age && (
            <span className="absolute bottom-3 left-4 badge badge-neutral text-sm font-semibold px-3 py-3 shadow">
              {age} yrs • {gender || "Developer"}
            </span>
          )}
        </figure>

        {/* Card Body */}
        <div className="card-body p-6">
          <h2 className="card-title text-2xl font-bold text-base-content">
            {firstName} {lastName || ""}
          </h2>

          <p className="text-sm text-base-content/80 mt-1 line-clamp-3">
            {about || "Passionate software engineer building cool apps."}
          </p>

          {/* Developer Skills Tags */}
          {skills && skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="badge badge-outline badge-primary text-xs font-medium py-2 px-2.5"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}

          {/* Action Buttons: Only render if handleSendRequest function is passed! */}
          {/* (e.g. In Feed page we pass it, but in Profile Preview we don't want buttons) */}
          {handleSendRequest && (
            <div className="card-actions justify-center gap-4 mt-6">
              {/* Ignore Button */}
              <button
                onClick={() => handleSendRequest("ignored", _id)}
                className="btn btn-circle btn-outline btn-error w-14 h-14 text-xl shadow-md hover:scale-105 transition-all"
                title="Ignore"
              >
                ❌
              </button>

              {/* Interested Button */}
              <button
                onClick={() => handleSendRequest("interested", _id)}
                className="btn btn-circle btn-success text-white w-14 h-14 text-xl shadow-md hover:scale-105 transition-all"
                title="Interested"
              >
                💚
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
