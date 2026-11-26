import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import axios from "axios";
import { BASE_URL } from "../utils/constant";

export default function Login() {
  // 1. Form input states
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 2. Mode toggle state (true = Login mode, false = Sign Up mode)
  const [isLogin, setIsLogin] = useState(true);

  // 3. Feedback and navigation states
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const useNavigateHook = useNavigate();

  // 4. Unified submit handler for both Login and Signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      if (isLogin) {
        // --- LOGIN FLOW ---
        const response = await axios.post(
          `${BASE_URL}/login`,
          {
            emailId: email,
            password: password,
          },
          {
            withCredentials: true, // Sends & receives JWT cookie
          }
        );

        // For /login, user object is directly in response.data
        const userData = response.data;
        dispatch(addUser(userData));
        useNavigateHook("/");
      } else {
        // --- SIGNUP FLOW ---
        // NOTE: Backend expects firstName & lastName (camelCase)
        const response = await axios.post(
          `${BASE_URL}/signup`,
          {
            firstName: firstname,
            lastName: lastname,
            emailId: email,
            password: password,
          },
          {
            withCredentials: true, // Sends & receives JWT cookie
          }
        );

        // For /signup, backend returns { message: "...", data: savedUser }
        const userData = response.data?.data || response.data;
        setSuccess("Account created successfully! 🎉");
        dispatch(addUser(userData));
        useNavigateHook("/");
      }
    } catch (err) {
      // Extract error message sent by backend (e.g. "Invalid credentials", "Password not strong")
      setError(err?.response?.data || err.message);
      console.error("Auth failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to toggle between Login and Sign Up and clear errors
  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setSuccess("");
  };

  return (
    <div className="flex justify-center items-center min-h-[75vh] py-10 px-4">
      <div className="card w-full max-w-md bg-base-200 shadow-2xl p-8 border border-base-300 rounded-3xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-base-content">
          {isLogin ? "Welcome Back to DevTinder" : "Create an Account"}
        </h2>

        {/* Error Alert */}
        {error && (
          <div className="alert alert-error text-sm p-3 mb-4 rounded-xl shadow">
            <span>{error}</span>
          </div>
        )}

        {/* Success Alert */}
        {success && (
          <div className="alert alert-success text-sm p-3 mb-4 rounded-xl shadow">
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* First Name & Last Name (Shown ONLY when signing up) */}
          {!isLogin && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">First Name</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Alex"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  required
                  className="input input-bordered w-full rounded-xl"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Last Name</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sharma"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  className="input input-bordered w-full rounded-xl"
                />
              </div>
            </div>
          )}

          {/* Email Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Email ID</span>
            </label>
            <input
              type="email"
              placeholder="developer@devtinder.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input input-bordered w-full rounded-xl"
            />
          </div>

          {/* Password Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Password</span>
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input input-bordered w-full rounded-xl"
            />
            {!isLogin && (
              <span className="text-xs text-base-content/60 mt-1">
                Must be at least 8 chars with uppercase, lowercase, number & symbol.
              </span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary mt-2 w-full rounded-xl font-semibold shadow-md cursor-pointer"
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : isLogin ? (
              "Login"
            ) : (
              "Sign Up"
            )}
          </button>

          {/* Toggle between Login and Sign Up */}
          <div className="text-center mt-2 text-sm text-base-content/70">
            {isLogin ? (
              <p>
                Don't have an account?{" "}
                {/* NOTE: type="button" is REQUIRED so clicking this button doesn't trigger form submit! */}
                <button
                  type="button"
                  className="text-primary font-semibold hover:underline cursor-pointer"
                  onClick={toggleAuthMode}
                >
                  Sign Up
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <button
                  type="button"
                  className="text-primary font-semibold hover:underline cursor-pointer"
                  onClick={toggleAuthMode}
                >
                  Login
                </button>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
