import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Alert,
  Button,
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [error, setError] = useState();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <Box sx={{ height: "100vh" }}>
        <Card
          sx={{
            backgroundColor: "#000",
            color: "white",
            textAlign: "center",
            mt: 30,
            maxWidth: "800px",
            mx: "auto",
          }}
        >
          <CardContent sx={{ backgroundColor: "#1e1e1e" }}>
            <Typography variant="h3" sx={{ textAlign: "center", mb: 4 }}>
              Profile
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <Box sx={{ display: "flex", gap: 1, mx: "auto", maxWidth: 200 }}>
              <Typography fontWeight="bold">Email:</Typography>{" "}
              <Typography>{currentUser.email}</Typography>
            </Box>
            <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
              <Button
                sx={{
                  color: "white",
                  backgroundColor: "#f31503",
                  mt: 3,
                  ":hover": { color: "#f31503", backgroundColor: "white" },
                }}
              >
                Update Profile
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Box
          sx={{ mt: 2, mx: "auto", maxWidth: 100 }}
          className="w-100 text-center mt-2"
        >
          <Button
            sx={{
              color: "white",
              textDecoration: "underline",
            }}
            onClick={handleLogout}
          >
            Log Out
          </Button>
        </Box>
      </Box>
    </>
  );
}
