import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

// Custom Components
import Header from '../../components/Header';
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal';

export default function UserDetails() {
  const router = useRouter();
  const { id } = router.query;

  const [user, setUser] = useState({});
  const [authorization, setAuthorization] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const fetchData = async (authorization) => {
    try {
      const response = await fetch(
        `http://localhost:3300/api/v1/user/${id}`,
        {
          method: 'GET',
          headers: {
            'Authorization': authorization
          }
        }
      );

      const parsedResponse = await response.json();
      setUser(parsedResponse.user);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteSuccessCallback = () => {
    router.push('/users');
  };

  const deleteErrorCallback = () => {
    router.push('/users');
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

  return (
    <>
      <Header />
      <br />
      <div className="row justify-content-md-center">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body text-center">
              <div>
                <h1>Datos de {user.name} {user.lastName}</h1>

                <div>
                  <div>
                    <h2>Contacto</h2>
                  </div>
                  <div>
                    <table className="table table-bordered border-primary table-centered mb-0">
                      <tbody>
                        <tr>
                          <td align="center">Teléfono:</td>
                          <td align="center">{user.phone}</td>
                        </tr>
                        <tr>
                          <td align="center">Email:</td>
                          <td align="center">{user.email}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <div>
                    <h2>Datos Personales</h2>
                  </div>
                  <div>
                    <table className="table table-bordered border-primary table-centered mb-0">
                      <tbody>
                        <tr>
                          <td align="center">RUT:</td>
                          <td align="center">{user.rut}</td>
                        </tr>
                        <tr>
                          <td align="center">ID Interno de Usuario:</td>
                          <td align="center">{user.id}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <br />
                <div className="mx-auto">
                  <button
                    onClick={openConfirmationModal}
                    className="btn btn-danger"
                  >
                    Eliminar Usuario
                  </button>

                  <Link href={`/users/${user.id}/edit`}>
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
