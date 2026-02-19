"use client"; 

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./AuthForm.module.css";
/* MUI */
import {
  Box,
  Paper,
  Tabs,
  Tab,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Link
} from "@mui/material";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter(); 

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

 const handleLogin = () => {
  if (email === "admin@gmail.com" && password === "admin123") {
    const userData = {
      email,
      role: "admin",
      isAuthenticated: true,
    };

    // Save login session (middleware reads this)
    document.cookie = `user=${JSON.stringify(userData)}; path=/`;

    // Go to dashboard
    router.push("/dashboard");

  } else {
    setError("Invalid admin credentials");
  }
};
  return (
    <div
  className={styles.authPage}
  style={{ backgroundImage: `url(/assets/bg.jpg)` }}
>
  <Paper elevation={10} className={styles.muiCard}>

        <Tabs
          value={isLogin ? 0 : 1}
          onChange={(e, val) => setIsLogin(val === 0)}
          centered
        >
          <Tab label="Login" />
          <Tab label="Sign Up" />
        </Tabs>

        <Box p={4}>

          {isLogin ? (
            <>
              <Typography variant="h5" fontWeight="bold" mb={2}>
                Login
              </Typography>

              {error && (
                <Typography color="error" mb={1}>
                  {error}
                </Typography>
              )}

              <TextField
                fullWidth
                label="Email"
                margin="normal"
                autoComplete="off"
                InputLabelProps={{ shrink: true }}
               value={email ?? ""}
                onChange={(e) => setEmail(e.target.value)}
              />

              <TextField
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                autoComplete="current-password"
                InputLabelProps={{ shrink: true }}
               value={password ?? ""}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
                <FormControlLabel control={<Checkbox />} label="Remember me" />
                <Link href="#" underline="hover">Forgot password?</Link>
              </Box>

              <Button
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 3, py: 1.4 }}
                onClick={handleLogin}
              >
                Login
              </Button>

              <Typography mt={2} align="center">
                Not a member?{" "}
                <Link component="button" onClick={() => setIsLogin(false)}>
                  Create Account
                </Link>
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="h5" fontWeight="bold" mb={2}>
                Create Account
              </Typography>

              <TextField fullWidth label="Email" margin="normal" />
              <TextField fullWidth label="Password" type="password" margin="normal" />
              <TextField fullWidth label="Confirm Password" type="password" margin="normal" />

              <Button fullWidth variant="contained" size="large" sx={{ mt: 3, py: 1.4 }}>
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Paper>
    </div>
  );
};

export default AuthForm;