import React, { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { TextField, Button } from '@mui/material';

import Grid from '@mui/material/Grid';


export default function UsersPage() {
  const router = useRouter()
  const { id } = router.query

  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (!router.isReady) return;

    fetch(
      `http://localhost:3300/api/v1/user/${id}`,
      {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer $2b$10$JwKI.5.tRAwx5UgVqCuwiufDmkbZSUItIDxWe3YwQQk8.tAG3ULUm'
        }
      }
    )
      .then(response => response.json())
      .then(data => setFormData(data.user))
  }, [router.isReady]);

  console.log(formData)

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const url = `http://localhost:3300/api/v1/user/${id}`;

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
        router.push(`/users/${formData.id}`)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="flex-start"
          spacing={1}
        >
          <Grid item xs={6}>
            <TextField
              name="name"
              label="Nombre"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Grid>


          <Grid item xs={6}>
            <TextField
              name="lastName"
              label="Apellido"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              name="rut"
              label="RUT"
              value={formData.rut}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              name="email"
              label="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              name="phone"
              InputLabelProps={{ shrink: true }}
              label="Teléfono"
              value={formData.phone}
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
