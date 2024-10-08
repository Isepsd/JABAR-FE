import React, { useState } from 'react';
import { Row, Button, Form, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import ButtonCancel from '@app/components/Button/ButtonCancel';
import FormData from '@app/modules/Form/FormData';

import RequiredInfo from '@app/components/Info/RequiredInfo';
import { API_PATH } from '@app/services/_path.service';
import { IFasKatDokumen, FasKatDokumenField } from '@app/interface/fasop-kategori-dokumen.interface';

export default function UploadDokumenFormPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    kat_dok_id: Yup.string().nullable(),
    nama: Yup.string().required('Nama Kategori Dokumen Wajib diisi'),
    bidang: Yup.string().required('Bidang Wajib diisi'),
  });

  const [formModel] = useState<any>({});
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  const { errors }: any = formState || {};
  const onSubmitForm = (data: IFasKatDokumen) => {
    setDataParams(data);
  };

  return (
    <>
      <FormData
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        fields={FasKatDokumenField}
        path={API_PATH().opsisdis.dokumen.kategori_dokumen}
        customLabel='state'
        onLoading={setLoading}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row className='mb-3'>
            <Col md='4' xs='12'>
              <Form.Group className='mt-3'>
                <Form.Label>
                  Nama Kategori Dokumen<RequiredInfo />
                </Form.Label>
                <Form.Control {...register('nama')} isInvalid={errors.nama} />
                <Form.Control.Feedback type='invalid'>
                  {errors?.nama?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className='mb-3'>
            <Col md='4' xs='12'>
              <Form.Group className='mt-3'>
                <Form.Label>
                  Bidang<RequiredInfo />
                </Form.Label>
                <Form.Control {...register('bidang')} isInvalid={errors.bidang} />
                <Form.Control.Feedback type='invalid'>
                  {errors?.bidang?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className='mt-4'>
            <Button type='submit' variant='primary' disabled={loading}>
              Simpan
            </Button>
            <ButtonCancel />
          </Form.Group>
        </Form>
      </FormData>
    </>
  );
}
