import React from "react";
import { useSelector } from "react-redux";
import EditProfileForm from "../components/EditProfileForm";

function Profile() {
  // Read the current logged-in user from the central Redux store (appStore)
  const user = useSelector((store) => store.user);

  // If user data hasn't loaded yet (e.g. initial fetch in Body.jsx), display a loading spinner
  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // Once user data is ready in Redux, render the EditProfileForm component
  return (
    <div className="min-h-[calc(100vh-140px)] bg-base-100">
      <EditProfileForm user={user} />
    </div>
  );
}

export default Profile;
