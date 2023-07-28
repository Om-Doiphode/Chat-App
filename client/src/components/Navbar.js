import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Navbar = () => {
  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  let location = useLocation();
  useEffect(() => {}, [location]);
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            style={{ textDecoration: "none", color: "white" }}
          >
            Chat App
          </Typography>
          <div style={{ flexGrow: 1 }} />
          <div>
            <Button
              color={location.pathname === "/" ? "primary" : "inherit"}
              component={Link}
              to="/"
            >
              Home
            </Button>
            <Button
              color={location.pathname === "/about" ? "primary" : "inherit"}
              component={Link}
              to="/about"
            >
              About
            </Button>
            {!localStorage.getItem("token") ? (
              <>
                <Button color="inherit" component={Link} to="/login">
                  Login
                </Button>
                <Button color="inherit" component={Link} to="/signup">
                  Sign Up
                </Button>
              </>
            ) : (
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default Navbar;
