"use client";
import React, { useActionState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
const Navbar = () => {
  const Logout = useAuthStore(s=>s.logout)
const handleLogout = ()=>{
  Logout();
}
  
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Admin Panel
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Link href="/dashboard">
            <Button color="default">Dashboard</Button>
          </Link>

          <Link href="/users">
            <Button color="inherit">Users</Button>
          </Link>

          <Link href="/products">
            <Button color="inherit">Products</Button>
          </Link>
          <Button onClick={handleLogout} color="error">Logout</Button>
          
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
