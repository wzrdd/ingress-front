import React, { useRouter } from 'next/router'
import { useState } from 'react'
import { TextField, Button } from '@mui/material';

import Grid from '@mui/material/Grid';
import Header from '../../components/Header'


export default function UsersPage() {
  const [formData, setFormData] = useState({});

  const router = useRouter()

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const url = `http://localhost:3300/api/v1/user/create`;

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer $2b$10$JwKI.5.tRAwx5UgVqCuwiufDmkbZSUItIDxWe3YwQQk8.tAG3ULUm'
      },
      body: JSON.stringify(formData)
    })
      .then((response) => response.json())
      .then(() => {
        router.push(`/users`)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          sx={{ mt: 25 }}
          spacing={2}
        >
          <Grid item xs={6}>
            <TextField
              name="name"
              label="Nombre"
              onChange={handleChange}
              required
            />
          </Grid>


          <Grid item xs={6}>
            <TextField
              name="lastName"
              label="Apellido"
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              name="password"
              label="Contraseña"
              type="password"
              autoComplete="off"
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              name="rut"
              label="RUT"
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              name="email"
              label="Correo electrónico"
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              name="phone"
              InputLabelProps={{ shrink: true }}
              label="Teléfono"
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={6}>
            <Button type="submit" variant="contained" color="primary">
              Enviar
            </Button>
          </Grid>

        </Grid>
      </form>
    </>
  )
}
