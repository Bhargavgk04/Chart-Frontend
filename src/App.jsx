import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Signup from "./auth/SignUp";
import Login from "./auth/Login";
import { Button } from "./components/ui/button";
import "./App.css";
import { Toaster } from "sonner";
import { useEffect } from "react";
import StudentCards from "./components/StudentCards";
import ChatBox from "./components/ChatBox";
import { useAuthStore } from "./store/useAuthStore";

const Home = () => {
  const navigate = useNavigate();

  return <Button onClick={() => navigate("/signup")}>Let's Start</Button>;
};

function App() {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();

  console.log({ onlineUsers });

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/studentslist" element={<StudentCards />} />
          <Route path="/chatbox/:studentId" element={<ChatBox />} />
        </Routes>
      </Router>
      <Toaster position="top-center" />
    </>
  );
}

export default App;
