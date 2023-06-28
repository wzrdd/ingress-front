import Header from '../../components/Header'

import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function ProductsPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({});
    const [rows, setRows] = useState([
        { id: 1, data: '', description: '' }
      ]);

      const addNewRow = () => {
        const newRow = { id: 2, data: '', description: ''};
        setRows([...rows, newRow]);
      };
  
    const handleChange = (event) => {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value
      });
    };

    const handleInputChange = (id, field, value) => {
        const updatedRows = rows.map((row) => {
          if (row.id === id) {
            return { ...row, [field]: value };
          }
          return row;
        });
        setRows(updatedRows);
      };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const dataToSend = {};
      rows.forEach((row) => {
        dataToSend[row.data] = row.description;
      });
  
      console.log(dataToSend);
      try {
        const url = `http://localhost:3300/api/v1/product/create`;
  
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
                    <table class="table table-bordered border-primary table-striped table-centered mb-0">
                        <thead>
                        <tr>
                            <th>Dato</th>
                            <th>Descripción</th>
                        </tr>
                        </thead>
                        <tbody>
                        {rows.map((row) => (
                            <tr key={row.id}>
                            <td>
                                <input
                                class="form-control"
                                type="text"
                                value={row.data}
                                onChange={(e) => handleInputChange(row.id, 'data', e.target.value)}
                                />
                            </td>
                            <td>
                                <input
                                class="form-control"
                                type="text"
                                value={row.description}
                                onChange={(e) => handleInputChange(row.id, 'description', e.target.value)}
                                />
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
    )
}
