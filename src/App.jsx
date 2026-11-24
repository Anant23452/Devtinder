import {
  BrowserRouter,
  Routes,
  Route
} from "react-router";

import Body from "./pages/Body";
import Login from "./components/login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* //parent route  */}
        <Route path="/" element={<Body />} >
        {/* childeren route  */}
        
       
        <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
        
    </BrowserRouter>
    
  );
}

export default App;