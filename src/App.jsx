import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import {
  Navbar,
  Feed,
  VideoDetail,
  ChannelDetail,
  SearchFeed,
  // Dashboard,
  // UpdateProfile,
  // Signup,
  // Login,
  // ForgotPassword,
} from "./components";
import Dashboard from "./components/Dashboard";
import UpdateProfile from "./components/UpdateProfile";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import { AuthProvider } from "./contexts/AuthContext";

const App = () => (
  <>
    <BrowserRouter>
      <Box sx={{ backgroundColor: "#000" }}>
        <Navbar />
        <AuthProvider>
          <Routes>
            <Route path="/" exact element={<Feed />} />
            <Route path="/video/:id" element={<VideoDetail />} />
            <Route path="/channel/:id" element={<ChannelDetail />} />
            <Route path="/search/:searchTerm" element={<SearchFeed />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/update-profile" element={<UpdateProfile />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </AuthProvider>
      </Box>
    </BrowserRouter>
  </>
);

export default App;
