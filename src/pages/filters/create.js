import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Header from '../../components/Header';

export default function UsersPage() {
  const router = useRouter();
  const { id } = router.query;
  const [formData, setFormData] = useState({});
  const [authorization, setAuthorization] = useState('');
  const [rows, setRows] = useState([]);

  const fetchProduct = async (authorization) => {
    const response = await fetch(
      `http://localhost:3300/api/v1/arrival/create`,
      {
        method: 'GET',
        headers: {
          'Authorization': authorization
        }
      }
    );

    if (response.status === 200) {
      const data = await response.json();
      setFormData(data.product);
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    const token = localStorage.getItem('token');
    const authorization = `Bearer ${token}`;
    setAuthorization(authorization);

    fetchProduct(authorization);
  }, [router.isReady]);

  const addNewRow = () => {
    const newRow = { data: '', description: '' };
    setRows([...rows, newRow]);
  };

  const removeRow = (index) => {
    setRows(rows.filter((row, i) => i !== index));
  };

  const handleInputChange = (index, field, value) => {
    setRows(rows.map((row, i) => {
      if (i === index) {
        return { ...row, [field]: value };
      }
      return row;
    }));
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const dataToSend = {};
    rows.forEach((row) => {
      dataToSend[row.data] = row.description;
    });
    try {
      const url = `http://localhost:3300/api/v1/arrival/create`;

      const token = localStorage.getItem("token");
      const authorization = `Bearer ${token}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authorization
        },
        body: JSON.stringify({
          ...formData,
          description: dataToSend
        })
      });

      // TODO handle response.status != 200, for example, duplicate mail

      if (response.status === 200) {
        router.push(`/products`);
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
      <div class="row justify-content-md-center">
        <div class="col-md-3">
          <div class="card">
            <div class="card-body">
              <h1>Crear Arrival</h1>
              <form onSubmit={handleSubmit}>
                <div class="mb-3">
                  <label class="form-label" htmlFor="entryDate">Día de Entrada<span class="text-danger"> *</span></label>
                  <input
                    class="form-control"
                    type="datetime-local"
                    name="entryDate"
                    id="entryDate"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div class="mb-3">
                  <label class="form-label" htmlFor="supplierId">Supplier Id<span class="text-danger"> *</span></label>
                  <input
                    class="form-control"
                    type="text"
                    name="supplierId"
                    id="supplierId"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div class="mb-3">
                  <label class="form-label" htmlFor="productId">Id de Producto<span class="text-danger"> *</span></label>
                  <input
                    class="form-control"
                    type="text"
                    name="productId"
                    id="productId"
                    autoComplete="off"
                    onChange={handleChange}
                    required
                  />
                </div>

                <table class="table table-bordered border-primary table-striped table-centered mb-0">
                  <thead>
                    <tr>
                      <th>Nota</th>
                      <th>Descripción</th>
                      <th>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, index) => (
                      <tr key={index}>
                        <td>
                          <input
                            class="form-control"
                            type="text"
                            onChange={(e) => handleInputChange(index, 'note', e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            class="form-control"
                            type="text"
                            onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                          />
                        </td>
                        <td>
                          <button type="button" class="btn btn-danger" onClick={() => removeRow(index)}>Eliminar</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <br/>
                <button class="btn btn-warning" type="button" onClick={addNewRow}>Agregar nueva fila</button>
                <br/>
                <br/>

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
