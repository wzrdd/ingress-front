import React from 'react';
import { useState, useEffect } from 'react'
import Link from 'next/link'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';


export default function ListUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(
      'http://localhost:3300/api/v1/user/users',
      {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer $2b$10$JwKI.5.tRAwx5UgVqCuwiufDmkbZSUItIDxWe3YwQQk8.tAG3ULUm'
        }
      }
    )
      .then(response => response.json())
      .then(data => setUsers(data))
  }, []);

  return (
    <>
      <Box sx={{ mx: 'auto', mt: 10, width: 700 }}>…
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">ID Usuario</TableCell>
                <TableCell align="left">Nombre</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  href={`/users/${user.id}`}
                  component={Link}
                >
                  <TableCell align="left">{user.id}</TableCell>
                  <TableCell align="left">{user.name} {user.lastName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
