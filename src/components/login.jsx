import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import axios from "axios";
import { BASE_URL } from "../utils/constant";

export default function Login() {
  const [email, setEmail] = useState("testuser@devtinder.com");
  const [password, setPassword] = useState("Password@123");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        `${BASE_URL}/login`,
        {
          emailId: email,
          password: password,
        },
        {
          withCredentials: true, // Essential for receiving and sending the JWT cookie
        }
      );

      const userData = response.data;
      setSuccess(`Welcome back, ${userData.firstName}! 🎉`);
      console.log("Logged in user:", userData);
      // Dispatch the user data to the Redux store
      dispatch(addUser(userData));
      // Redirect to home page
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || err.message);
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="card w-96 bg-base-200 shadow-xl p-8 border border-base-300">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {/* Error Alert */}
        {error && (
          <div className="alert alert-error text-sm p-3 mb-4 rounded-lg">
            <span>{error}</span>
          </div>
        )}

        {/* Success Alert */}
        {success && (
          <div className="alert alert-success text-sm p-3 mb-4 rounded-lg">
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          {/* Email Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Email ID</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input input-bordered w-full"
            />
          </div>

          {/* Password Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input input-bordered w-full"
            />
          </div>

          {/* Login Button */}
          <button type="submit" className="btn btn-primary mt-4 w-full">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
