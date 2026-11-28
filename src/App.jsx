import {Provider} from "react-redux"
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router";

import Body from "./pages/Body";
import Login from "./components/login";
import appStore from "./utils/appStore";
import Feed from "./pages/feed";
import Profile from "./pages/Profile";
import Connection from "./pages/Connection";
import Request from "./pages/Request";
import Premium from "./components/Premium";


function App() {
  return (
   <Provider store= {appStore}>
     <BrowserRouter>
      <Routes>
        {/* Parent layout route (renders Navbar + Outlet + Footer) */}
        <Route path="/" element={<Body />}>
          {/* Child routes rendered inside Body's <Outlet /> */}
          <Route path="/" element={<Feed />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/connection" element={<Connection />} />
          <Route path="/request" element={<Request />} />
          <Route path="/premium" element={<Premium />} />
        </Route>
        
      </Routes>
        
    </BrowserRouter>
    </Provider>
    
  );
}

export default App;