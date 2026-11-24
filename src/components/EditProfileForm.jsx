import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { addUser } from "../utils/userSlice";
import Card from "./Card";

function EditProfileForm({ user }) {
  // 1. Local state for all editable form fields (initialized with existing user data)
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "male");
  const [about, setAbout] = useState(user.about || "");

  // 2. State for feedback messages and loading
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const dispatch = useDispatch();

  // 3. saveProfile: Calls the PATCH /profile/edit API
  const saveProfile = async (e) => {
    e.preventDefault();
    setError("");
    setIsSaving(true);

    try {
      // NOTE: We use PATCH because we are updating existing fields on the user profile.
      // withCredentials: true ensures our authentication cookie is sent to Express.
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        {
          firstName,
          lastName,
          photoUrl,
          age: age ? Number(age) : undefined,
          gender,
          about,
        },
        {
          withCredentials: true,
        }
      );

      // 4. Update the central Redux store so Navbar and other components reflect the new changes immediately!
      dispatch(addUser(res.data?.data));

      // 5. Trigger the success toast pop-up
      setShowToast(true);

      // 6. Use setTimeout to automatically dismiss the pop-up after 3 seconds (3000ms)
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      console.error("Save profile error:", err);
      setError(err?.response?.data || "Failed to update profile. Please check your data.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="relative py-8 px-4 max-w-6xl mx-auto">
      {/* SUCCESS TOAST POP-UP (Auto-dismisses after 3 seconds) */}
      {showToast && (
        <div className="toast toast-top toast-center z-50 transition-all duration-300">
          <div className="alert alert-success shadow-xl text-white font-semibold flex gap-2">
            <span>🎉 Profile saved successfully!</span>
          </div>
        </div>
      )}

      {/* Main Container: Split side-by-side layout (Form on Left, Live Preview Card on Right) */}
      <div className="flex flex-col lg:flex-row justify-center items-start gap-10">
        
        {/* LEFT COLUMN: EDIT FORM */}
        <div className="w-full lg:w-1/2">
          <div className="card bg-base-200 border border-base-300 shadow-xl p-6 sm:p-8 rounded-3xl">
            <h2 className="text-2xl font-bold mb-2 text-base-content">Edit Profile</h2>
            <p className="text-sm text-base-content/70 mb-6">
              Update your personal details below. Changes reflect on the card in real-time!
            </p>

            {/* Error Message Alert */}
            {error && (
              <div className="alert alert-error text-sm p-3 mb-4 rounded-xl">
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={saveProfile} className="space-y-4">
              {/* First Name & Last Name (Grid) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">First Name</span>
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    placeholder="e.g. Alex"
                    className="input input-bordered w-full rounded-xl"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Last Name</span>
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="e.g. Sharma"
                    className="input input-bordered w-full rounded-xl"
                  />
                </div>
              </div>

              {/* Photo URL */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Profile Photo URL</span>
                </label>
                <input
                  type="url"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  placeholder="Paste direct image link (https://...)"
                  className="input input-bordered w-full rounded-xl"
                />
              </div>

              {/* Age & Gender (Grid) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Age</span>
                  </label>
                  <input
                    type="number"
                    min="18"
                    max="100"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="e.g. 24"
                    className="input input-bordered w-full rounded-xl"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Gender</span>
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="select select-bordered w-full rounded-xl"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* About Section */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">About</span>
                </label>
                <textarea
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  rows="3"
                  placeholder="Tell other developers about yourself, your interests, and what you build..."
                  className="textarea textarea-bordered w-full rounded-xl"
                ></textarea>
              </div>

              {/* Save Profile Button */}
              <button
                type="submit"
                disabled={isSaving}
                className="btn btn-primary w-full mt-4 rounded-xl font-semibold shadow-md cursor-pointer"
              >
                {isSaving ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Save Profile"
                )}
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: REAL-TIME LIVE CARD PREVIEW */}
        <div className="w-full lg:w-1/2 flex flex-col items-center">
          <div className="mb-2 text-center">
            <span className="badge badge-primary badge-outline text-xs uppercase tracking-wider font-bold py-2.5 px-3">
              Live Card Preview
            </span>
            <p className="text-xs text-base-content/60 mt-1">
              This is how other developers will see you on DevTinder!
            </p>
          </div>

          {/* We pass our local form state directly to Card! */}
          {/* Because React state updates on every keystroke, this card re-renders in REAL-TIME! */}
          <Card
            user={{
              firstName: firstName || "Your Name",
              lastName,
              photoUrl,
              age,
              gender,
              about: about || "Your bio will appear here...",
              skills: user.skills || [],
            }}
          />
        </div>

      </div>
    </div>
  );
}

export default EditProfileForm;
