import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import ModalForm from '@app/components/Modals/ModalForm';
import FormUploadDocumentSLD from '@app/modules/opsisdis/FormUploadDocumentSLD';
import TableSLD from '@app/modules/opsisdis/TableSLD';
import TableSLDGarduHubung from '@app/modules/opsisdis/TableSLDGarduHubung';
import { useSelector } from 'react-redux';

export default function SingleLineGH20kVPage() {
  const { closeModal } = useSelector((state: any) => state.ui);
  let [searchParams] = useSearchParams();
  const sopParams: any = searchParams.get('id_gardu_induk');

  const [selectedRow, setSelectedRow] = useState<any>({ id_ref_lokasi: sopParams });

  const kelompok = 'SLD-GH-20KV'

  /** MODAL */
  const [modal, setModal] = useState<any>({
    approved: false,
    size: 'md',
    title: `Tambah`,
  });

  const handleSelectedRow = (e: any) => {
    setSelectedRow(e);
  };

  useEffect(() => {
    if (closeModal && modal?.show) {
      setModal((prevState: any) => ({
        ...prevState,
        show: false
      }));
    }
  }, [closeModal])

  return (
    <>
      <Row className='mt-4'>
        <Col md={12} className='mb-4 position-static'>
          <Card className='card-widget position-static'>
            <Card.Header className='text-uppercase'>Single Line Diagram GH 20 kV</Card.Header>
            <Card.Body>
              <Row>
                <Col md={4}>
                  <TableSLDGarduHubung onSelectedRow={handleSelectedRow} />
                </Col>
                <Col md={8}>
                  <TableSLD
                    roles="sld-gh-20-kv"
                    module={'Single Line Diagram GH 20kV'}
                    setModal={setModal}
                    filterParams={{ kelompok: kelompok, id_gardu_induk: selectedRow?.id_ref_lokasi || '' }}
                    garduInduk={selectedRow}
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <ModalForm modalProps={modal}>
        <FormUploadDocumentSLD garduInduk={selectedRow} kelompok={kelompok} />
      </ModalForm>
    </>
  );
}
