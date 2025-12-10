"use client";

import { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { useRouter } from "next/navigation";
import { TextField, Button, Card, Typography } from "@mui/material";

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const res = await login(username, password);
    if (res.success) {
      router.push("/dashboard");
    } else {
      setError(res.message);
    }
  };

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#f5f5f5"
    }}>
      <Card sx={{ p: 4, width: 350 }}>
        <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
          Login
        </Typography>

        <TextField
          label="Username"
          fullWidth
          sx={{ mb: 2 }}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          sx={{ mb: 2 }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <Typography color="error">{error}</Typography>}

        <Button variant="contained" fullWidth onClick={handleLogin}>
          Login
        </Button>
      </Card>
    </div>
  );
}
