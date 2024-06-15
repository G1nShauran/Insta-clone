import "./Apps.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";


function App() {
  return (
    <div className="Apps">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;