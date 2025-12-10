"use client";

import { use, useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { redirect, useRouter } from "next/navigation";

import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";

export default function SingleProductPage({ params }) {
  const token = useAuthStore((s) => s.token);
//   if (!token) redirect("/login");

  const {id:productId} = use(params);
  const router = useRouter();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    const res = await fetch(`https://dummyjson.com/products/${productId}`);
    const data = await res.json();
    setProduct(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box p={3}>
      <Button variant="outlined" onClick={() => router.push("/products")}>
        ← Back to Products
      </Button>

      <Card sx={{ mt: 3, p: 3 }}>
        <Grid container spacing={3}>
          {/* Image Section */}
          <Grid item xs={12} md={5}>
            <img
              src={product.thumbnail}
              alt={product.title}
              style={{ width: "100%", borderRadius: 12 }}
            />
          </Grid>

          {/* Product Info */}
          <Grid item xs={12} md={7}>
            <Typography variant="h4">{product.title}</Typography>

            <Typography variant="h6" mt={2}>Price: ${product.price}</Typography>
            <Typography>Brand: {product.brand}</Typography>
            <Typography>Category: {product.category}</Typography>
            <Typography>Rating: {product.rating}</Typography>
            <Typography>Stock: {product.stock}</Typography>

            <Typography variant="h6" mt={3}>Description</Typography>
            <Typography>{product.description}</Typography>

            <Typography variant="h6" mt={3}>Images</Typography>
            <Box display="flex" gap={2} mt={1} flexWrap="wrap">
              {product.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  style={{ width: 120, borderRadius: 8 }}
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}
