// Import from Library
import { useState, useEffect } from 'react';
import Link from 'next/link'

// MaterialUI
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';

export default function ListUsers() {
  const [users, setUsers] = useState([]);
  const [usersFetched, setUsersFetched] = useState(false);

  const fetchUsers = async (authorization) => {
    const response = await fetch(
      'http://localhost:3300/api/v1/user/users',
      {
        method: 'GET',
        headers: {
          'Authorization': authorization
        }
      }
    )

    if (response.status == 200) {
      const fetchedUsers = await response.json()
      setUsers(fetchedUsers)

      setUsersFetched(true)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    const authorization = `Bearer ${token}`

    fetchUsers(authorization)
  }, []);

  return (
    <>
      {usersFetched
        ? <UsersTable users={users} />
        : <ErrorMessage />
      }
    </>
  );
}

function ErrorMessage() {
  return (
    <>
      <Grid
        container
        spacing={2}
        direction="column"
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 10 }}>
        <h1>Cargando...</h1>
        <h2>
          <Link href="/">Regresar a la página de inicio</Link>
        </h2>
      </Grid>
    </>
  )
}

function UsersTable({ users }) {
  console.log(users)
  return (
    <>
      <Box component={Paper} sx={{ mx: 'auto', mt: 10, width: 700 }}>
        <TableContainer>
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
                  href={`/users/${user.id}`}
                  component={Link}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="left">{user.id}</TableCell>
                  <TableCell align="left"> {user.name} {user.lastName} </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box sx={{ mx: 'auto', mt: 1, width: 700 }}>
        <Button
          sx={{ ml: 2, mt: 2, mb: 2 }}
          variant="contained"
          startIcon={<AddIcon />}
          component={Link}
          href={`/users/create`}
        >
          Crear Usuario
        </Button>
      </Box>
    </>
  )
}
