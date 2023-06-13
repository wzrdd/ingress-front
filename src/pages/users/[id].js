import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import Button from '@mui/material/Button';


import Header from '../../components/Header'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

export default function UserDetails() {
  const router = useRouter()
  const { id } = router.query

  const [user, setUser] = useState({});

  useEffect(() => {
    fetch(
      `http://localhost:3300/api/v1/user/${id}`,
      {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer $2b$10$c9kQ3oPKrbpvhXdMW5Oo6OU4B9J.S/t59SbhiwcOycAKwLnaiFgR.'
        }
      }
    )
      .then(response => response.json())
      .then(data => setUser(data.user))
  }, [id]);

  return (
    <>
      <Header />
      <Box
        sx={{ mt: 10, mx: 'auto', width: 700 }}
        component={Paper}
        variant={'outlined'}
        align='center'
      >
        <h1>Datos de {user.name} {user.lastName}</h1>

        <Box component={Paper} variant={'outlined'}>
          <Box component={Paper} variant={'outlined'}>
            <h2>Contacto</h2>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableBody>
                <TableRow
                  key={user.phone}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center">Teléfono:</TableCell>
                  <TableCell align="center">{user.phone}</TableCell>
                </TableRow>
                <TableRow
                  key={user.email}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center">Email:</TableCell>
                  <TableCell align="center">{user.email}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box component={Paper} variant={'outlined'}>
          <Box component={Paper} variant={'outlined'}>
            <h2>Datos Personales</h2>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableBody>
                <TableRow
                  key={user.phone}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center">RUT:</TableCell>
                  <TableCell align="center">{user.rut}</TableCell>
                </TableRow>
                <TableRow
                  key={user.email}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center">ID Interno de Usuario:</TableCell>
                  <TableCell align="center">{user.id}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box component={Paper} variant={'outlined'}>
          <Button
            sx={{ mt: 2, mb: 2 }}
            color='error'
            variant="contained"
            onClick={() => {
              Swal.fire({
                title: '¿Confirmas la eliminación de este usuario?',
                text: "Esta operación no se puede revertir.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminarlo.',
                cancelButtonText: 'Cancelarlo.'
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  )
                }
              })
            }}>
            Eliminar Usuario
          </Button>
        </Box>
      </Box >
    </>
  )
}
