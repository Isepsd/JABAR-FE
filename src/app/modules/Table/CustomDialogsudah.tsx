import React from 'react';
import { Button } from 'react-bootstrap';

const CustomDialog = ({ isOpen, onClose, message }: any) => {
    if (!isOpen) return null;

    return (
        <div className="custom-dialog-overlay">
            <div className="custom-dialog">
                <div>
                    <span className="me-2">
                        <i className="bi bi-exclamation-triangle-fill" style={{ fontSize: '1.5rem', verticalAlign: 'text-bottom' }}></i>
                    </span>
                    Peringatan!
                </div>
                <div>
                    <div>{message}</div>
                </div>
                <div style={{ float: 'right', marginTop: 15 }}>
                    <Button variant='danger' onClick={onClose} style={{ padding: '5px 10px', fontSize: '12px' }}>Close</Button>
                </div>
            </div>
        </div>
    );
};

export default CustomDialog;
