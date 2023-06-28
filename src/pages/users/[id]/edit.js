import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Header from '../../../components/Header';

export default function UsersPage() {
  const router = useRouter();
  const { id } = router.query;

  const [formData, setFormData] = useState({});
  const [authorization, setAuthorization] = useState('');

  const fetchUser = async (authorization) => {
    const response = await fetch(
      `http://localhost:3300/api/v1/user/${id}`,
      {
        method: 'GET',
        headers: {
          'Authorization': authorization
        }
      }
    );

    if (response.status === 200) {
      const data = await response.json();
      setFormData(data.user);
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    const token = localStorage.getItem('token');
    const authorization = `Bearer ${token}`;
    setAuthorization(authorization);

    fetchUser(authorization);
  }, [router.isReady]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const url = `http://localhost:3300/api/v1/user/${id}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authorization
        },
        body: JSON.stringify(formData)
      });

      if (response.status === 200) {
        router.push(`/users/${formData.id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Header />
      <br/>
      <div class="row justify-content-md-center">
        <div class="col-md-3">
          <div class="card">
            <div class="card-body">
            <form onSubmit={handleSubmit}>
                <div class="mb-3">
                  <label class="form-label" htmlFor="name">Nombre</label>
                  <input
                    class="form-control"
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div class="mb-3">
                  <label class="form-label" htmlFor="lastName">Apellido</label>
                  <input
                    class="form-control"
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label" htmlFor="role">Rol<span class="text-danger"> *</span></label>
                  <select
                    class="form-control"
                    name="role"
                    id="role"
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled selected >Seleccione un rol</option>
                    <option value="Logistico">Logistico</option>
                    <option value="Operario">Operario</option>
                    <option value="Cliente">Cliente</option>
                  </select>
                </div>       
                <div class="mb-3">
                  <label class="form-label" htmlFor="rut">RUT</label>
                  <input
                    class="form-control"
                    type="text"
                    name="rut"
                    id="rut"
                    value={formData.rut}
                    onChange={handleChange}
                    required
                    disabled
                  />
                </div>

                <div class="mb-3">
                  <label class="form-label" htmlFor="email">Correo electrónico</label>
                  <input
                    class="form-control"
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div class="mb-3">
                  <label class="form-label" htmlFor="phone">Teléfono</label>
                  <input
                    class="form-control"
                    type="text"
                    name="phone"
                    id="phone"
                    value={formData.phone}
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
