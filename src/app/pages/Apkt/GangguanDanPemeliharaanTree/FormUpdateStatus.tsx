import React, { useState } from 'react';
import { Form, Modal, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import ButtonCancel from '@app/components/Button/ButtonCancel';
import FormData from '@app/modules/Form/FormData';

import { API_PATH } from '@app/services/_path.service';
import Button from '@app/components/Button/Button';

interface IFormStatus {
  id_apkt_trans_jar: any;
  setModal?: any;
  isAlreadyClosed?: any;
  handleClose?: any;
}

export default function WoDraftingForm({ isAlreadyClosed,id_apkt_trans_jar,handleClose }: IFormStatus) {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  const validationSchema = Yup.object().shape({
    status_laporan: Yup.string().nullable(),
    id_apkt_trans_jar: Yup.string().nullable(),
  });

  const formModel = {
    status_laporan: '',
    id_apkt_trans_jar: '',
  };

  const {
    handleSubmit,
    setValue,
    setError,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });

  const onSubmitForm = (data: any) => {
    if (isAlreadyClosed === 'close') {
      alert('Data sudah close.');
      return;
    }

    // Jika konfirmasi diperlukan, tampilkan pesan konfirmasi sebelum melanjutkan
    if (isAlreadyClosed === 'open') {
     
        
        data.id_apkt_trans_jar = id_apkt_trans_jar;// Pastikan id_apkt_trans_jar diatur dengan benar
        data.status_laporan = 'close';

        setDataParams(data);
        handleClose();
    }
  };

  return (
    <>
      {isAlreadyClosed === 'close' && (
        <Alert variant="danger" className="text-center mb-4">
          <p>Data yang sudah closed tidak bisa closed kembali.</p>
        </Alert>
      )}

            {(isAlreadyClosed === 'open') && (
              <FormData
                setError={setError}
                setValue={setValue}
                dataParams={dataParams}
                fields={{ id_apkt_trans_jar: undefined, status_laporan: "" }}
                path={API_PATH().apkt.trans_jar}
                customLabel="hide"
                isModal
                onLoading={setLoading}
              >
                <Form noValidate onSubmit={handleSubmit(onSubmitForm)} className="px-4 py-3">
                  <p className="text-center mb-4 fs-5 fw-bold text-primary">
                    Apakah Anda yakin ingin diclose?
                  </p>

                  <Modal.Footer className="d-flex justify-content-center">
                    <Button type="submit" variant="primary" isLoading={loading}>
                      Simpan
                    </Button>
                    <ButtonCancel type="modal" variant="danger" onClick={handleClose}/>
                  </Modal.Footer>
                </Form>
              </FormData>
            )}
    </>
  );
}
