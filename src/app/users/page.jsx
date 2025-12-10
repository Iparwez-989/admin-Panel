"use client";

import { useEffect, useState, useCallback } from "react";
import { useUsersStore } from "@/store/usersStore";
import { redirect, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

import {
  Box,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Typography,
  CircularProgress,
} from "@mui/material";
import Navbar from "@/components/Navbar";

export default function UsersPage() {
  const token = useAuthStore(s=>s.token)
  if(!token) redirect('/login')
  const router = useRouter();

  const { users, total, fetchUsers, searchUsers, loading } = useUsersStore();

  const [page, setPage] = useState(1);
  const limit = 10;
  const skip = (page - 1) * limit;

  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query.trim() === "") {
      fetchUsers(limit, skip);
    }
  }, [page]);

  const handleSearch = useCallback((e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      fetchUsers(limit, skip);
    } else {
      searchUsers(value);
    }
  }, []);

  const openUser = (id) => {
    router.push(`/users/${id}`);
  };

  return (
    <>
    <Navbar />
    <Box p={3}>
      <Typography variant="h4" mb={3}>Users</Typography>

      <TextField
        label="Search Users"
        fullWidth
        sx={{ mb: 3 }}
        value={query}
        onChange={handleSearch}
      />

      {loading ? (
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Name</b></TableCell>
                <TableCell><b>Email</b></TableCell>
                <TableCell><b>Gender</b></TableCell>
                <TableCell><b>Phone</b></TableCell>
                <TableCell><b>Company</b></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users?.map((user) => (
                <TableRow
                  key={user.id}
                  hover
                  sx={{ cursor: "pointer" }}
                  onClick={() => openUser(user.id)}
                >
                  <TableCell>{user.firstName} {user.lastName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.gender}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.company?.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

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
