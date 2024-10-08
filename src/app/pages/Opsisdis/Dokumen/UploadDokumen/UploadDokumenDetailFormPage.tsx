import React, { useState } from 'react';
import { Col, Form, Modal } from 'react-bootstrap';

import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Alert } from 'react-bootstrap';

import FormData from '@app/modules/Form/FormData';
import ButtonCancel from '@app/components/Button/ButtonCancel';
import { API_PATH } from '@app/services/_path.service';
import Button from '@app/components/Button/Button';
// import RequiredInfo from '@app/components/Info/RequiredInfo';
import { IFasUploadKatDokumen, FasUploadKatDokumenField } from '@app/interface/fasop-upload-kategori-dokumen.interface';
import InputUpload from '@app/components/Upload/InputUpload';
import { useDispatch } from 'react-redux';
import { notificationTemplate } from '@app/helper/notificationTemplate';
import { addNotification } from '@app/store/notification/notification.action';

interface IFormUploadDocument {
  kat_dok_id: any;
}

function UploadDokumenDetailFormPage({ kat_dok_id }: IFormUploadDocument) {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    kat_dok_detail_id: Yup.string().nullable(),
    keterangan: Yup.string().nullable(),
    nama: Yup.string().nullable(),
    created_at: Yup.string().nullable(),
  });

  const [formModel] = useState<any>({});

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    control,
    formState,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  const { errors }: any = formState;
  const watchNamaFile = useWatch({ control, name: 'nama' })
  const dispatch = useDispatch();
  /** NOTIFICATION HANDLER */
  const dispatchNotification = (msg: string = '', type: string = '') => {
    const notification = notificationTemplate(msg, type);
    dispatch(addNotification({ ...notification, message: msg, type: type }));
  };

  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: IFasUploadKatDokumen) => {

    data.kat_dok_id = kat_dok_id
    if (watchNamaFile) {
      setDataParams(data);
    } else {
      dispatchNotification("Belum Pilih File", 'danger');
    }
  };

  const handleUploaded = (e: any) => {
    // console.log(e)
    setValue('nama', e)
  }

  const id = kat_dok_id
  const isAllreadyId = {
    kat_dok_id: id
  }
  return (
    <>
      {isAllreadyId.kat_dok_id === null && (
        <Alert variant="danger" className="text-center mb-4">
          Silahkan Pilih Kategori Dokumen Terlebih Dahulu!
        </Alert>
      )}
      {isAllreadyId.kat_dok_id && (
        <FormData
          setError={setError}
          setValue={setValue}
          dataParams={dataParams}
          fields={FasUploadKatDokumenField}
          path={API_PATH().opsisdis.dokumen.kategori_dokumen_detail}
          onLoading={setLoading}
          customLabel={'hide'}
          isModal={true}
          overrideType={{ created_at: 'datetime' }}
        >
          <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
            <Modal.Body>
              <Form.Group as={Col} className='mb-3'>
                <Form.Label>
                  Nama Dokumen
                </Form.Label>
                <Form.Control
                  {...register('keterangan')}
                  isInvalid={errors.keterangan}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.keterangan?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} className='mb-3'>
                <Form.Label>
                  File
                </Form.Label>
                <InputUpload
                  fieldName='nama'
                  onUploaded={handleUploaded}
                  previewUrl={watchNamaFile}
                  folder={'upload_dokumen'}
                  accept=".vsdx,.vsd,.pdf,application/pdf,image/*,.xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.csv,application/csv" />
                <Form.Control.Feedback type='invalid'>
                  {errors?.nama?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Modal.Body>

            <Modal.Footer>
              <div className='d-flex gap-2'>
                <ButtonCancel type='modal' ids='id' />
                <Button type='submit' variant='primary' isLoading={loading}>
                  Simpan
                </Button>
              </div>
            </Modal.Footer>
          </Form>
        </FormData>
      )}
    </>
  );
}

export default UploadDokumenDetailFormPage