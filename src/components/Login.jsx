import React, { useRef, useState } from "react";
import {
  Box,
  Stack,
  Button,
  Card,
  CardContent,
  Typography,
  Alert,
  FormControl,
  InputLabel,
  Input,
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch (error) {
      setError("Failed to log in");
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
              Log In
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <Stack sx={{ maxWidth: "300px", mx: "auto" }}>
              <FormControl>
                <InputLabel sx={{ color: "white" }}>Email</InputLabel>
                <Input
                  type="email"
                  inputRef={emailRef}
                  sx={{ mb: 3, color: "white" }}
                  required
                />
              </FormControl>
              <FormControl>
                <InputLabel sx={{ color: "white" }}>Password</InputLabel>
                <Input
                  type="password"
                  inputRef={passwordRef}
                  sx={{ color: "white" }}
                  required
                />
              </FormControl>
            </Stack>
            <Button
              disabled={loading}
              type="submit"
              sx={{
                color: "white",
                backgroundColor: "#f31503",
                mt: 2,
                ":hover": { color: "#f31503", backgroundColor: "white" },
              }}
            >
              Log In
            </Button>
            <Box sx={{ mx: "auto", mt: 3, maxWidth: 150 }}>
              <Link to="/forgot-password">
                <Typography
                  sx={{ color: "white", textDecoration: "underline" }}
                >
                  Forgot Password?
                </Typography>
              </Link>
            </Box>
          </CardContent>
        </Card>
        <Box sx={{ mx: "auto", mt: 2, display: "flex", gap: 1, maxWidth: 200 }}>
          <Typography sx={{ color: "white" }}>Need an account? </Typography>
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
