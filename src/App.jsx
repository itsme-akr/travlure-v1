import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Discover from "./pages/Discover";
import MyPlaces from "./pages/MyPlaces";
import PlaceDetail from "./pages/PlaceDetail";
import Profile from "./pages/Profile";
import ProfileQuiz from "./pages/ProfileQuiz";
import MobileNav from "./components/MobileNav";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Footer from "./components/Footer";

import { SaveProvider } from "./context/SaveContext";

<div className="min-h-screen bg-cream">
  <Navbar />
  <Routes />
  <MobileNav />
</div>

export default function App() {
  return (
    
    <SaveProvider>
      <Router>
        {/*Mobile Nav */}
        <Navbar />

        {/*Pages*/}
        <div className="min-h-screen bg-cream pb-20 md:pb-0">{/* space for mobile nav */}
        <Routes>
          <Route path="/" element={<Discover />} />
          <Route path="/places" element={<MyPlaces />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/quiz" element={<ProfileQuiz />} />
          <Route path="/place/:id" element={<PlaceDetail />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        </div>

        <Footer />

        {/*MobileNav */}
        <MobileNav/>
      </Router>
    </SaveProvider>
  );
}
