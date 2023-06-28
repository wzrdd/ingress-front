import { useState, useEffect } from 'react';
import Link from 'next/link';

import Header from '../../components/Header'
import Filters from '../../components/ListFilters'

export default function ProductsPage() {
  const [arrivals, setArrivals] = useState([]);
  const [arrivalsFetched, setArrivalsFetched] = useState(false);

  const fetchArrivals = async (days) => {
    try {
      const token = localStorage.getItem("token");
      const authorization = `Bearer ${token}`;

      const response = await fetch('http://localhost:3300/api/v1/arrival/arrivals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authorization
        },
        body: JSON.stringify({ "days": days })
      });

      if (response.status === 200) {
        const fetchedArrivals = await response.json();
        setArrivals(fetchedArrivals);
        setArrivalsFetched(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchArrivals(1);
  }, []);

  return (
    <>
      <Header />
      <br/>
      <div class="row justify-content-md-center">
        <div class="col-md-auto">
          <div class="row">
            <div class="col-2">
              <div class="btn btn-primary" onClick={() => fetchArrivals(0)}>Hoy</div>
            </div>
            <div class="col-3">
              <div class="btn btn-warning" onClick={() => fetchArrivals(1)}>Mañana</div>
            </div>
            <div class="col-3">
              <div class="btn btn-danger" onClick={() => fetchArrivals(7)}>7 Días</div>
            </div>
            <div class="col-4">
              <div class="btn btn-success" onClick={() => fetchArrivals(30)}>30 días</div>
            </div>
          </div>
        </div>
      </div>
      <br/>
      <br/>
      {arrivalsFetched ? <Filters arrivals={arrivals} /> : <ErrorMessage />}
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

