import React, { useRef, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Button,
  Alert,
  FormControl,
  Input,
  InputLabel,
  Stack,
  Typography,
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updateEmail, updatePassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];

    setError("");
    setLoading(true);

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => navigate("/dashboard"))
      .catch(() => setError("Failed to update account"))
      .finally(() => setLoading(false));
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
              Update Profile
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <Stack sx={{ maxWidth: 300, mx: "auto" }}>
              <FormControl>
                <InputLabel sx={{ color: "white" }}>Email</InputLabel>
                <Input
                  type="email"
                  inputRef={emailRef}
                  defaultValue={currentUser.email}
                  sx={{ mb: 3, color: "white" }}
                  required
                />
              </FormControl>
              <FormControl>
                <InputLabel sx={{ color: "white" }}>Password</InputLabel>
                <Input
                  type="password"
                  inputRef={passwordRef}
                  placeholder="Leave blank to keep the same"
                  sx={{ mb: 3, color: "white" }}
                />
              </FormControl>
              <FormControl>
                <InputLabel sx={{ color: "white" }}>
                  Password-Confirm
                </InputLabel>
                <Input
                  type="password"
                  inputRef={passwordConfirmRef}
                  placeholder="Leave blank to keep the same"
                  sx={{ color: "white" }}
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
                mt: 2,
                ":hover": { color: "#f31503", backgroundColor: "white" },
              }}
            >
              Update
            </Button>
          </CardContent>
        </Card>
        <Box sx={{ mt: 2, maxWidth: 100, mx: "auto" }}>
          <Link to="/dashboard">
            <Typography
              sx={{
                color: "white",
                textDecoration: "underline",
              }}
            >
              Cancel
            </Typography>
          </Link>
        </Box>
      </Box>
    </>
  );
}
