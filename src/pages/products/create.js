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
      `http://localhost:3300/api/v1/product/create`,
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
      const url = `http://localhost:3300/api/v1/product/create`;

      const token = localStorage.getItem("token");
      const authorization = `Bearer ${token}`;

      console.log(formData)

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
      <br />
      <br />
      <div class="row justify-content-md-center">
        <div class="col-md-3">
          <div class="card">
            <div class="card-body">
              <h1>Crear Producto</h1>
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
                  <label class="form-label" htmlFor="quantityUnit">Unidad de Medida<span class="text-danger"> *</span></label>
                  <input
                    class="form-control"
                    type="text"
                    name="quantityUnit"
                    id="quantityUnit"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div class="mb-3">
                  <label class="form-label" htmlFor="quantityValue">Cantidad<span class="text-danger"> *</span></label>
                  <input
                    class="form-control"
                    type="number"
                    name="quantityValue"
                    id="quantityValue"
                    autoComplete="off"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div class="mb-3">
                  <label class="form-label" htmlFor="productType">Tipo de Producto<span class="text-danger"> *</span></label>
                  <input
                    class="form-control"
                    type="text"
                    name="productType"
                    id="productType"
                    autoComplete="off"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div class="mb-3">
                  <label class="form-label" htmlFor="productType">Tipo de Producto<span class="text-danger"> *</span></label>
                  <select
                    class="form-control"
                    type="text"
                    name="productType"
                    id="productType"
                    value={formData.productType}
                    autoComplete="off"
                    onChange={handleChange}
                    required
                  >
                    <option value=""></option>
                    <option value="Materia Prima">Materia Prima</option>
                    <option value="Consumible">Consumible</option>
                    <option value="Producto Semi-Terminado">Producto Semi-Terminado</option>
                    <option value="Produco Terminado">Producto Terminado</option>
                  </select>
                </div>

                <table class="table table-bordered border-primary table-striped table-centered mb-0">
                  <thead>
                    <tr>
                      <th>Dato</th>
                      <th>Descripción</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, index) => (
                      <tr key={index}>
                        <td>
                          <input
                            class="form-control"
                            type="text"
                            value={row.data}
                            onChange={(e) => handleInputChange(index, 'data', e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            class="form-control"
                            type="text"
                            value={row.description}
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

                <br />
                <button class="btn btn-warning" type="button" onClick={addNewRow}>Agregar nueva fila</button>
                <br />
                <br />

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
