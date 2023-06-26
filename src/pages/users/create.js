import React, { useRouter } from 'next/router'
import { useState } from 'react'
import { TextField, Button } from '@mui/material';

import Grid from '@mui/material/Grid';
import Header from '../../components/Header'


export default function UsersPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({});

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const url = `http://localhost:3300/api/v1/user/create`;

      const token = localStorage.getItem("token");
      const authorization = `Bearer ${token}`

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authorization
        },
        body: JSON.stringify(formData)
      })

      // TODO handle response.status != 200, for example, duplicate mail

      if (response.status == 200)
        router.push(`/users`)
    } catch (err) {
      console.log(err)
    }

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
