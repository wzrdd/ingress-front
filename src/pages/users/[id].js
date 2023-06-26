// Import from Library
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Link } from 'next/link'
import Swal from 'sweetalert2'

// Custom Components
import Header from '../../components/Header'

// MaterialUI
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

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
  const [authorization, setAuthorization] = useState("")

  const fetchData = async (authorization) => {
    const response = await fetch(
      `http://localhost:3300/api/v1/user/${id}`,
      {
        method: 'GET',
        headers: {
          'Authorization': authorization
        }
      }
    )

    const parsedResponse = await response.json()
    setUser(parsedResponse.user)
  }

  const deleteRequest = async () => {
    const response = await fetch(
      `http://localhost:3300/api/v1/user/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': authorization
        }
      }
    )

    const parsedResponse = await response.json()

    if (parsedResponse.deleted) {
      const successMessage = await Swal.fire(
        'Eliminado!',
        'Este usuario fue eliminado con éxito.',
        'success'
      )

      if (successMessage.isConfirmed) {
        router.push('/users')
      }
    } else {
      const successMessage = await Swal.fire(
        'Error',
        'El usuario no se pudo eliminar correctamente.',
        'error'
      )
      if (successMessage.isConfirmed) {
        router.push('/users')
      }
    }
  }

  const deleteConfirmation = async () => {
    try {
      const alert = await Swal.fire({
        title: '¿Confirmas la eliminación de este usuario?',
        text: "Esta operación no se puede revertir.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminarlo.',
        cancelButtonText: 'Cancelarlo.'
      })

      if (alert.isConfirmed) {
        deleteRequest()
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    try {
      if (!router.isReady) return;
      const token = localStorage.getItem("token");
      const authorization = `Bearer ${token}`
      setAuthorization(authorization)

      fetchData(authorization)
    } catch (err) {
      console.log(err)
    }
  }, [router.isReady]);

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
            sx={{ mr: 2, mt: 2, mb: 2 }}
            color='error'
            variant='contained'
            onClick={() => deleteConfirmation()}
            startIcon={<DeleteIcon />}>
            Eliminar Usuario
          </Button>

          <Button
            sx={{ ml: 2, mt: 2, mb: 2 }}
            variant="contained"
            startIcon={<EditIcon />}
            component={Link}
            href={`/users/${user.id}/edit`}
          >
            Editar
          </Button>
        </Box>
      </Box >
    </>
  )
}
