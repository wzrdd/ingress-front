import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

// Custom Components
import Header from '../../components/Header';
import DeleteConfirmationModal from '../../components/DeleteConfirmationModalA';

export default function UserDetails() {
  const router = useRouter();
  const { id } = router.query;

  const [arrival, setArrival] = useState({});
  const [authorization, setAuthorization] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const fetchData = async (authorization) => {
    try {
      const response = await fetch(
        `http://localhost:3300/api/v1/arrival/${id}`,
        {
          method: 'GET',
          headers: {
            'Authorization': authorization
          }
        }
      );

      const parsedResponse = await response.json();
      setArrival(parsedResponse.arrival);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteSuccessCallback = () => {
    router.push('/arrivals');
  };

  const deleteErrorCallback = () => {
    router.push('/arrivals');
  };

  useEffect(() => {
    try {
      if (!router.isReady) return;
      const token = localStorage.getItem("token");
      const authorization = `Bearer ${token}`;
      setAuthorization(authorization);

      fetchData(authorization);
    } catch (err) {
      console.log(err);
    }
  }, [router.isReady]);

  const openConfirmationModal = () => {
    setShowConfirmationModal(true);
  };

  const closeConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  const renderDescriptionTable = () => {
    let descriptionObj = {};
    try {
      descriptionObj = JSON.parse(arrival.aditionalNotes);
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  
    const rows = Object.entries(descriptionObj);
  
    return (
      <table className="table table-bordered border-primary table-centered mb-0">
        <tbody>
          {rows.map(([key, value]) => (
            <tr key={key}>
              <td align="center">{key}</td>
              <td align="center">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  

  return (
    <>
      <Header />
      <br />
      <div className="row justify-content-md-center">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body text-center">
              <div>
                <h1>Datos de Arrival</h1>
                <div>
                  <div>
                    <table className="table table-bordered border-primary table-centered mb-0">
                      <tbody>
                        <tr>
                          <td align="center">Día de entrada:</td>
                          <td align="center">{arrival.entryDate}</td>
                        </tr>
                        <tr>
                          <td align="center">SupplierId</td>
                          <td align="center">{arrival.supplierId}</td>
                        </tr>
                        <tr>
                          <td align="center">Id de Producto</td>
                          <td align="center">{arrival.productId?.join(", ")}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  <div>
                    <h2>Descripción</h2>
                  </div>
                  <div>
                    {renderDescriptionTable()}
                  </div>
                </div>
                <br />
                <div className="mr-auto">
                  <button
                    onClick={openConfirmationModal}
                    className="btn btn-danger"
                  >
                    Eliminar Arrival
                  </button>

                  <Link href={`/arrivals/${arrival.id}/edit`}>
                    <button className="btn btn-primary">Editar</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showConfirmationModal && (
        <DeleteConfirmationModal
          id={id}
          authorization={authorization}
          deleteSuccessCallback={deleteSuccessCallback}
          deleteErrorCallback={deleteErrorCallback}
          onClose={closeConfirmationModal}
        />
      )}
    </>
  );
}
