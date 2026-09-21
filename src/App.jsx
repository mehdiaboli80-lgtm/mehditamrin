import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Aboute from "./pages/aboute/Aboute";
import PostDetails from "./pages/PostDetails";
import AddPost from "./pages/AddPost";
import Login from "./components/Loggin"; // ← اضافه کن
import { createContext, useState } from "react";

export const appcontext = createContext(null);

function App() {
  const [isloggin, setIsloggin] = useState(false);

  return (
    <div className="App">
      <appcontext.Provider value={{ isloggin, setIsloggin }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Aboute" element={<Aboute />} />
          <Route path="/PostDetails/:id" element={<PostDetails />} />
          <Route path="/AddPost" element={<AddPost />} />
          <Route path="/Login" element={<Login />} /> {/* ← اضافه کن */}
        </Routes>
      </appcontext.Provider>
    </div>
  );
}

export default App;