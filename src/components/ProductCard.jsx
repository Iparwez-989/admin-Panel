"use client";

import {
  Card,
  CardMedia,
  CardContent,
  Typography
} from "@mui/material";

export default function ProductCard({ product, onClick }) {
  return (
    <Card sx={{ cursor: "pointer" }} onClick={onClick}>
      <CardMedia
        component="img"
        height="180"
        image={product.thumbnail}
        alt={product.title}
      />

      <CardContent>
        <Typography variant="h6">{product.title}</Typography>
        <Typography>Price: ${product.price}</Typography>
        <Typography>Category: {product.category}</Typography>
        <Typography>Rating: {product.rating}</Typography>
      </CardContent>
    </Card>
  );
}
