import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Row, Col, Form } from 'react-bootstrap';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import ButtonCancel from '@app/components/Button/ButtonCancel';
import FormData from '@app/modules/Form/FormData';

import { IJaringanSubsistem, JaringanSubsistemField } from '@app/interface/jaringan-subsistem.interface';
import RequiredInfo from '@app/components/Info/RequiredInfo';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
import { API_PATH } from '@app/services/_path.service';
import Button from '@app/components/Button/Button';
export default function JarKantorFormPage() {
  const { id } = useParams();

  const { currentUser } = useSelector((state: any) => state.auth);


  const [loading, setLoading] = useState<boolean>(false);
  const [
    // dataSelected, 
    setDataSelected] = useState<any>();
  const [dataParams, setDataParams] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    nama_lokasi: Yup.string().typeError('Nama Wajib diisi').required('Nama Wajib diisi'),
    path1: Yup.string().nullable(),
    path2: Yup.string().nullable(),
    path3: Yup.string().nullable(),
    status_listrik: Yup.string().nullable().transform((_, v) => (v == '1' ? '1' : '0')),
  });

  const [formModel] = useState<any>({ status_listrik: '1' });
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
  const { errors }: any = formState || {};
  const watchStatus = useWatch({ control, name: 'status_listrik' });

  const onSubmitForm = (data: IJaringanSubsistem) => {
    data.tree_jaringan = 0;
    data.id_ref_jenis_lokasi = JENIS_LOKASI().subsistem;
    if (id) {
      data.id_user_updated = currentUser.id_user
    } else {
      data.id_user_created = currentUser.id_user
    }
    setDataParams(data);
  };

  // console.log("dataSelected", dataSelected);


  return (
    <>
      <FormData
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        fields={JaringanSubsistemField}
        path={API_PATH().master.jaringan.ref_lokasi}
        customLabel='state'
        onLoading={setLoading}
        onGetDataResult={setDataSelected}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row className='mb-3'>
            {/* LEFT COLUMN  */}
            <Col md="7">
              <Form.Group className='mt-3' controlId='nama_lokasi'>
                <Form.Label>
                  Nama Subsistem<RequiredInfo />
                </Form.Label>
                <Form.Control
                  {...register('nama_lokasi')}
                  isInvalid={errors.nama_lokasi}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.nama_lokasi?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className='mt-3' controlId='path1' >
                <Form.Label>Path1</Form.Label>
                <Form.Control {...register('path1')} isInvalid={errors.path1} />
                <Form.Control.Feedback type='invalid'>
                  {errors?.path1?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='mt-3' controlId='path2' >
                <Form.Label>Path2</Form.Label>
                <Form.Control {...register('path2')} isInvalid={errors.path2} />
                <Form.Control.Feedback type='invalid'>
                  {errors?.path2?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='mt-3' controlId='path3' >
                <Form.Label>Path3</Form.Label>
                <Form.Control {...register('path3')} isInvalid={errors.path3} />
                <Form.Control.Feedback type='invalid'>
                  {errors?.path3?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className='mt-3' controlId='status_listrik'>
                <Form.Label>Status Listrik</Form.Label>
                <div className="ms-3 py-2">
                  <Form.Check
                    type="switch"
                    id="status_listrik"
                    {...register("status_listrik")}
                    label={watchStatus ? "Active" : "Inactive"}
                  />
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className='mt-4'>
            <Button type='submit' variant='primary' isLoading={loading}>Simpan</Button>
            <ButtonCancel />
          </Form.Group>
        </Form>
      </FormData>
    </>
  );
}
