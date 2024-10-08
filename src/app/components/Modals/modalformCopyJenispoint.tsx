import React from 'react';
import { Modal } from 'react-bootstrap';

const ModalformCopyJenispoint = ({ modalProps, children }:any) => {
  return (
    <Modal show={modalProps.show} onHide={() => modalProps.setShow(false)} size={modalProps.size}>
      <Modal.Header closeButton>
        <Modal.Title>{modalProps.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
    </Modal>
  );
};

export default ModalformCopyJenispoint;
