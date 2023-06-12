import React from 'react';
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '../components/Header'

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
          'Authorization': 'Bearer $2b$10$c9kQ3oPKrbpvhXdMW5Oo6OU4B9J.S/t59SbhiwcOycAKwLnaiFgR.'
        }
      }
    )
      .then(response => response.json())
      .then(data => setUsers(data))
  }, []);

  return (
    <>
      <Header />
      <Box sx={{ mx: 'auto', mt: 10, width: 1000 }}>…
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Nombre</TableCell>
                <TableCell align="right">Teléfono</TableCell>
                <TableCell align="right">Mail</TableCell>
                <TableCell align="right">RUT</TableCell>
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
                  <TableCell align="right">{user.name} {user.lastName}</TableCell>
                  <TableCell align="right">{user.phone}</TableCell>
                  <TableCell align="right">{user.email}</TableCell>
                  <TableCell align="right">{user.rut}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
