import React from 'react';
import { Button } from 'react-bootstrap';

const CustomDialog = ({ isOpen, onClose, onDelete, message }: any) => {
  if (!isOpen) return null;

  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <div className="custom-dialog-overlay">
      <div className="custom-dialog">
        <div>
          <span className="me-2">
            <i className="bi bi-question-circle-fill" style={{ fontSize: '1.5rem', verticalAlign: 'text-bottom' }}></i>
          </span>
          Konfirmasi delete
        </div>
        <div>
          <div>
            {message} {/* Gunakan pesan dinamis yang diteruskan melalui properti */}
          </div>
        </div>
        <div style={{ float: 'right', marginTop: 15 }}>
          <div>
            <Button
              variant="primary"
              onClick={handleDelete}
              style={{ marginRight: 10, padding: '5px 10px', fontSize: '12px' }}
            >
              OK
            </Button>
            <Button
              variant="danger"
              onClick={onClose}
              style={{ padding: '5px 10px', fontSize: '12px' }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomDialog;
