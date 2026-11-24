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


function App() {
  return (
   <Provider store= {appStore}>
     <BrowserRouter>
      <Routes>
        {/* //parent route  */}
        <Route path="/" element={<Body />} >
        {/* childeren route  */}
        <Route path="/" element={<Feed />} />
       
        <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
        
    </BrowserRouter>
    </Provider>
    
  );
}

export default App;