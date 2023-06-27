import React, { useState } from 'react';
import { useRouter } from 'next/router';

import Header from '../../components/Header';

export default function UsersPage() {
  const router = useRouter();
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
      const authorization = `Bearer ${token}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authorization
        },
        body: JSON.stringify(formData)
      });

      // TODO handle response.status != 200, for example, duplicate mail

      if (response.status === 200) {
        router.push(`/users`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Header />
      <br/>
      <br/>
      <br/>
      <div class="row justify-content-md-center">
        <div class="col-md-3">
          <div class="card">
            <div class="card-body">
            <form onSubmit={handleSubmit}>
            <div class="mb-3">
              <label class="form-label" htmlFor="name">Nombre<span class="text-danger"> *</span></label>
              <input
                class="form-control"
                type="text"
                name="name"
                id="name"
                onChange={handleChange}
                required
              />
            </div>

            <div class="mb-3">
              <label class="form-label" htmlFor="lastName">Apellido<span class="text-danger"> *</span></label>
              <input
                class="form-control"
                type="text"
                name="lastName"
                id="lastName"
                onChange={handleChange}
                required
              />
            </div>

            <div class="mb-3">
              <label class="form-label" htmlFor="password">Contraseña<span class="text-danger"> *</span></label>
              <input
                class="form-control"
                type="password"
                name="password"
                id="password"
                autoComplete="off"
                onChange={handleChange}
                required
              />
            </div>

            <div class="mb-3">
              <label class="form-label" htmlFor="rut">RUT<span class="text-danger"> *</span></label>
              <input
                class="form-control"
                type="text"
                name="rut"
                id="rut"
                onChange={handleChange}
                required
              />
            </div>

            <div class="mb-3">
              <label class="form-label" htmlFor="email">Correo electrónico<span class="text-danger"> *</span></label>
              <input
                class="form-control"
                type="email"
                name="email"
                id="email"
                onChange={handleChange}
                required
              />
            </div>

            <div class="mb-3">
              <label class="form-label" htmlFor="phone">Teléfono<span class="text-danger"> *</span></label>
              <input
                class="form-control"
                type="text"
                name="phone"
                id="phone"
                onChange={handleChange}
                required
              />
            </div>

            <div class="mb-3">
              <button class="btn btn-primary" type="submit">Enviar</button>
            </div>
          </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
