import React from "react";
import {
  Routes,
  Route,
  Outlet,
  Link,
  BrowserRouter as Router,
} from "react-router-dom";
import Join from "./components/Join/Join";
import Chat from "./components/Chat/Chat";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Join />} />
        <Route exact path="/chat" element={<Chat />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
};

export default App;
