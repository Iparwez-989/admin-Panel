"use client";

import { useEffect, useState } from "react";
import { useProductsStore } from "@/store/productsStore";
import { useAuthStore } from "@/store/authStore";
import { redirect, useRouter } from "next/navigation";

import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  Pagination,
  CircularProgress,
} from "@mui/material";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";

export default function ProductsPage() {
  const token = useAuthStore((s) => s.token);
  if (!token) redirect("/login");

  const router = useRouter();

  const {
    products,
    categories,
    total,
    fetchProducts,
    searchProducts,
    fetchCategories,
    filterByCategory,
  } = useProductsStore();

  const [page, setPage] = useState(1);
  const limit = 10;
  const skip = (page - 1) * limit;

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [page, category]);

  const loadProducts = async () => {
    setLoading(true);

    if (category === "all") {
      await fetchProducts(limit, skip);
    } else {
      await filterByCategory(category, limit, skip);
    }

    setLoading(false);
  };

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      loadProducts();
    } else {
      setLoading(true);
      await searchProducts(value);
      setLoading(false);
    }
  };

  return (
    <>
    <Navbar/>
    <Box p={3}>
      <Typography variant="h4" mb={3}>Products</Typography>

      {/* Search + Category Filter */}
      <Box display="flex" gap={2} mb={3} flexWrap="wrap">
        <TextField
          label="Search Products"
          value={query}
          onChange={handleSearch}
          sx={{ flex: 1, minWidth: 250 }}
        />

        <TextField
          label="Category"
          select
          value={category}
          sx={{ width: 250 }}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
        >
          <MenuItem value="all">All</MenuItem>
          {categories.map((cat,index) => (
            <MenuItem key={index} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={6}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {products?.map((p) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={p.id}>
              <ProductCard product={p} onClick={() => router.push(`/products/${p.id}`)} />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Pagination */}
      <Box mt={3} display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil(total / limit)}
          page={page}
          onChange={(e, newPage) => setPage(newPage)}
          color="primary"
        />
      </Box>
    </Box>
  </>
  );

}
