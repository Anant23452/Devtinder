import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { removeUser } from "../utils/userSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constant";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        `${BASE_URL}/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      // Clear user from Redux store
      dispatch(removeUser());
      // Redirect to login page
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      <div className="flex-1">
        <a onClick={() => navigate("/")} className="btn btn-ghost text-xl cursor-pointer">
          🔥 DevTinder
        </a>
      </div>

      <div className="flex gap-3 items-center">
        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">Welcome, {user.firstName}!</span>

            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full border border-base-300">
                  <img
                    alt={user.firstName}
                    src={user.photoUrl}
                  />
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-200 rounded-box z-10 mt-3 w-52 p-2 shadow-lg border border-base-300"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge badge-primary">New</span>
                  </a>
                </li>
                <li><a>Settings</a></li>
                <li>
                  <button onClick={handleLogout} className="text-error font-semibold">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="btn btn-primary btn-sm"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
