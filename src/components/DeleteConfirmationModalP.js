import { useState } from 'react';

const DeleteConfirmationModal = ({ id, authorization, deleteSuccessCallback, deleteErrorCallback, onClose }) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(true);

  const deleteRequest = async () => {
    try {
      const response = await fetch(
        `http://localhost:3300/api/v1/product/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': authorization
          }
        }
      );

      const parsedResponse = await response.json();

      if (parsedResponse.deleted) {
        // Eliminación exitosa
        deleteSuccessCallback();
      } else {
        // Error al eliminar el usuario
        deleteErrorCallback();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const closeModal = () => {
    setShowConfirmationModal(false);
    onClose();
  };

  return (
    <>
      {/* Modal */}
      <div id="info-alert-modal" className={`modal fade ${showConfirmationModal ? 'show' : ''}`} tabIndex="-1" role="dialog" aria-hidden="true" style={{ display: showConfirmationModal ? 'block' : 'none' }}>
        <div className="modal-dialog modal-sm">
          <div className="modal-content">
            <div className="modal-body p-4">
              <div className="text-center">
                <i className="dripicons-information h1 text-danger"></i>
                <h4 className="mt-2">¿Confirmas la eliminación de este producto?</h4>
                <p className="mt-3">Esta operación no se puede revertir.</p>
                <button
                  type="button"
                  className="btn btn-danger my-2"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    deleteRequest();
                    closeModal();
                  }}
                >
                  Sí, eliminarlo.
                </button>
                <button className="btn btn-secondary my-2" data-bs-dismiss="modal" onClick={() => {
                    closeModal();
                  }}>
                
                Cancelarlo.
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteConfirmationModal;
