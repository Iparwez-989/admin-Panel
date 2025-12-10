"use client";

import { useEffect, useState,use } from "react";
import { useAuthStore } from "../../../store/authStore";
import { redirect, useRouter } from "next/navigation";

import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";

export default function SingleUserPage({ params }) {
  const token = useAuthStore((s) => s.token);
//   if (!token) redirect("/login");

  const router = useRouter();
  const {id:userId} = use(params);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    const res = await fetch(`https://dummyjson.com/users/${userId}`);
    const data = await res.json();
    setUser(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box p={3}>
      <Button variant="outlined" onClick={() => router.push("/users")}>
        ← Back to Users
      </Button>

      <Card sx={{ mt: 3, p: 2 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <img
                src={user.image}
                alt={user.firstName}
                style={{ width: "100%", borderRadius: 12 }}
              />
            </Grid>

            <Grid item xs={12} md={8}>
              <Typography variant="h4">
                {user.firstName} {user.lastName}
              </Typography>

              <Typography variant="h6" mt={2}>Personal Details</Typography>
              <Typography>Email: {user.email}</Typography>
              <Typography>Phone: {user.phone}</Typography>
              <Typography>Gender: {user.gender}</Typography>
              <Typography>Age: {user.age}</Typography>

              <Typography variant="h6" mt={3}>Address</Typography>
              <Typography>
                {user.address?.address}, {user.address?.city}, {user.address?.state}
              </Typography>

              <Typography variant="h6" mt={3}>Company</Typography>
              <Typography>Name: {user.company?.name}</Typography>
              <Typography>Title: {user.company?.title}</Typography>
              <Typography>Department: {user.company?.department}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
