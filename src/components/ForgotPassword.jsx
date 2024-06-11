import React, { useRef, useState } from "react";
import {
  Card,
  CardContent,
  Alert,
  Button,
  Box,
  Typography,
  Input,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch (error) {
      setError("Failed to reset password");
    }
    setLoading(false);
  }

  return (
    <>
      <Box sx={{ height: "100vh" }}>
        <Card
          sx={{
            color: "white",
            backgroundColor: "#000",
            textAlign: "center",
            mt: 30,
            maxWidth: "800px",
            mx: "auto",
          }}
          component="form"
          onSubmit={handleSubmit}
        >
          <CardContent sx={{ backgroundColor: "#1e1e1e" }}>
            <Typography variant="h3" sx={{ mb: 4 }}>
              Password Reset
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            {message && <Alert severity="success">{message}</Alert>}
            <Box>
              <FormControl>
                <InputLabel sx={{ color: "white" }}>Email</InputLabel>
                <Input
                  sx={{ color: "white" }}
                  type="email"
                  inputRef={emailRef}
                  required
                />
              </FormControl>
            </Box>
            <Button
              sx={{
                color: "white",
                backgroundColor: "#f31503",
                mt: 5,
                ":hover": { color: "#f31503", backgroundColor: "white" },
              }}
              disabled={loading}
              type="submit"
            >
              Reset Password
            </Button>
            <Box sx={{ mt: 3, width: 100, mx: "auto" }}>
              <Link to="/login">
                <Typography
                  sx={{ color: "white", textDecoration: "underline" }}
                >
                  Log In
                </Typography>
              </Link>
            </Box>
          </CardContent>
        </Card>
        <Box sx={{ mt: 2, width: 200, mx: "auto", display: "flex", gap: 1 }}>
          <Typography sx={{ color: "white" }}>Need an account?</Typography>
          <Link to="/signup">
            <Typography sx={{ color: "white", textDecoration: "underline" }}>
              Sign Up
            </Typography>
          </Link>
        </Box>
      </Box>
    </>
  );
}
