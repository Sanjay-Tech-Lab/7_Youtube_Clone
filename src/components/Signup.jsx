import React, { useRef, useState } from "react";
import {
  Card,
  CardContent,
  Alert,
  Button,
  Box,
  Typography,
  InputLabel,
  Input,
  FormControl,
  Stack,
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch (error) {
      setError("Failed to create an account");
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
              Sign Up
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <Stack sx={{ maxWidth: "300px", mx: "auto" }}>
              <FormControl>
                <InputLabel sx={{ color: "white" }}>Email</InputLabel>
                <Input
                  sx={{ mb: 3, color: "white" }}
                  type="email"
                  inputRef={emailRef}
                  required
                />
              </FormControl>
              <FormControl>
                <InputLabel sx={{ color: "white" }}>Password</InputLabel>
                <Input
                  sx={{ mb: 3, color: "white" }}
                  type="password"
                  inputRef={passwordRef}
                  required
                />
              </FormControl>
              <FormControl>
                <InputLabel sx={{ color: "white" }}>
                  Password-Confirm
                </InputLabel>
                <Input
                  sx={{ color: "white" }}
                  type="password"
                  inputRef={passwordConfirmRef}
                  required
                />
              </FormControl>
            </Stack>
            <Button
              disabled={loading}
              className="w-100"
              type="submit"
              sx={{
                color: "white",
                backgroundColor: "#f31503",
                mt: 3,
                ":hover": { color: "#f31503", backgroundColor: "white" },
              }}
            >
              Sign Up
            </Button>
          </CardContent>
        </Card>
        <Box sx={{ mx: "auto", mt: 2, display: "flex", gap: 1, maxWidth: 300 }}>
          <Typography sx={{ color: "white" }}>
            Already have an account?
          </Typography>
          <Link to="/login">
            <Typography sx={{ color: "white", textDecoration: "underline" }}>
              Log In
            </Typography>
          </Link>
        </Box>
      </Box>
    </>
  );
}
