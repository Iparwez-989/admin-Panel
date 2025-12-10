"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import {
  Box,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { useAuthStore } from "@/store/authStore";
import { redirect } from "next/navigation";

const Dashboard = () => {
  const token = useAuthStore((s) => s.token);
  if (!token) redirect("/login");

  const [usersTotal, setUsersTotal] = useState(0);
  const [productsTotal, setProductsTotal] = useState(0);
  const [categoriesTotal, setCategoriesTotal] = useState(0);
  const [latestUsers, setLatestUsers] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);

  // Fetch total users
  const fetchUsers = async () => {
    const res = await fetch("https://dummyjson.com/users?limit=1");
    const data = await res.json();
    setUsersTotal(data.total);

    // Fetch latest 5 users
    const latestRes = await fetch("https://dummyjson.com/users?limit=5&skip=0");
    const latestData = await latestRes.json();
    setLatestUsers(latestData.users);
  };

  // Fetch total products
  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=1");
    const data = await res.json();
    setProductsTotal(data.total);

    // Fetch latest 5 products
    const latestRes = await fetch("https://dummyjson.com/products?limit=5&skip=0");
    const latestData = await latestRes.json();
    setLatestProducts(latestData.products);
  };

  // Fetch categories
  const fetchCategories = async () => {
    const res = await fetch("https://dummyjson.com/products/categories");
    const data = await res.json();
    setCategoriesTotal(data.length);
  };

  useEffect(() => {
    fetchUsers();
    fetchProducts();
    fetchCategories();
  }, []);

  return (
    <>
      <Navbar />
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" fontWeight="bold" mb={3}>
          Dashboard
        </Typography>

        {/* Top Statistics */}
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6">Total Users</Typography>
              <Typography variant="h4" fontWeight="bold">
                {usersTotal}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6">Total Products</Typography>
              <Typography variant="h4" fontWeight="bold">
                {productsTotal}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6">Total Categories</Typography>
              <Typography variant="h4" fontWeight="bold">
                {categoriesTotal}
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Latest Users & Products */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" mb={2}>
                Latest Users
              </Typography>
              <List>
                {latestUsers.map((user) => (
                  <React.Fragment key={user.id}>
                    <ListItem>
                      <ListItemText
                        primary={`${user.firstName} ${user.lastName}`}
                        secondary={user.email}
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" mb={2}>
                Latest Products
              </Typography>
              <List>
                {latestProducts.map((product) => (
                  <React.Fragment key={product.id}>
                    <ListItem>
                      <ListItemText
                        primary={product.title}
                        secondary={`Price: $${product.price}`}
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;
