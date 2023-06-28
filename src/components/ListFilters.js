import { useState, useEffect } from 'react';

import Link from 'next/link';

export default function listProducts(){
    const [arrivals, setArrival] = useState([]);
    const [arrivalsFetched, setArrivalsFetched] = useState(false);


    const fetchUsers = async (authorization) => {
        const response = await fetch(
          'http://localhost:3300/api/v1/arrival/arrivals',
          {
            method: 'POST',
            headers: {
              'Authorization': authorization

            },
            body: {
                'days': 30
            }
          }
        );
    
        if (response.status === 200) {
          const fetchedArrival = await response.json();
          setArrival(fetchedArrival);
          setArrivalsFetched(true);
        }
      };
    
      useEffect(() => {
        const token = localStorage.getItem("token");
        const authorization = `Bearer ${token}`;
        fetchUsers(authorization);
      }, []);
    
      return (
        <>
          {arrivalsFetched ? <ArrivalsTable arrivals={arrivals} /> : <ErrorMessage />}
        </>
      );
}
    
function ErrorMessage() {
      return (
        <>
          <h1>Cargando...</h1>
          <h2>
            <Link href="/">Regresar a la página de inicio</Link>
          </h2>
        </>
      );
}

function ArrivalsTable({ arrivals }) {
    console.log(arrivals);
    return (
      <>
      <div class="row justify-content-md-center">
        <div class="col-md-auto">
        <div class="btn btn-primary">
            <Link class="text-dark" href="/filters/create">Crear Arrival</Link>
        </div>
        <br/>
        <br/>
          <table class="table table-bordered border-primary table-striped table-centered mb-0">
            <thead>
              <tr>
                <th>Día de Entrada</th>
                <th>Supplier Id</th>
                <th>Id de Producto</th>
                <th>Notas Adicionales</th>
              </tr>
            </thead>
            <tbody>
            {arrivals.map((arrival) => (
              <tr key={arrival.id}>
                <td>{arrival.entryDate}</td>
                <td>{arrival.supplierId}</td>
                <td>{arrival.productId}</td>
                <td>{arrival.aditionalNotes}</td>
              </tr>
            ))}
            </tbody>
          </table>

        </div>
      </div>
      </>
    );
  }