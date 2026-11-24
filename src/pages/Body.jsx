import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet, useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'
import axios from 'axios'
import { BASE_URL } from '../utils/constant'


function Body() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const fetchUser = async () => {
    // If user is already loaded in Redux, no need to refetch
    if (user) return;

    try {
      const response = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true, // Send JWT cookie to backend
      });

      // Restore user in Redux store!
      dispatch(addUser(response.data));
    } catch (err) {
      console.error("Failed to fetch user profile:", err);
      if (err?.response?.status === 401 || err.status === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default Body