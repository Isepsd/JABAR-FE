import React, { useState } from 'react';
import { Row, Button, Form, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import ButtonCancel from '@app/components/Button/ButtonCancel';
import FormData from '@app/modules/Form/FormData';

// import RequiredInfo from '@app/components/Info/RequiredInfo';
import { API_PATH } from '@app/services/_path.service';
import { IFasSistemScada, FasSistemScadaField } from '@app/interface/master-fasop-sistem-scada';

export default function FasSistemScadaFormPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    name: Yup.string().nullable(),
    jenis_scada: Yup.string().nullable(),
    jenis_koneksi: Yup.string().nullable(),
    ip_db1: Yup.string().nullable(),
    name_db1: Yup.string().nullable(),
    instance_db1: Yup.string().nullable(),
    port_db1: Yup.string().nullable(),
    username_db1: Yup.string().nullable(),
    password_db1: Yup.string().nullable(),
    status_db1: Yup.string().nullable(),
    ip_db2: Yup.string().nullable(),
    name_db2: Yup.string().nullable(),
    instance_db2: Yup.string().nullable(),
    port_db2: Yup.string().nullable(),
    username_db2: Yup.string().nullable(),
    password_db2: Yup.string().nullable(),
    status_db2: Yup.string().nullable(),
  });

  const [formModel] = useState<any>({ status_listrik: '1', lat: 0, lon: 0 });
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
  const onSubmitForm = (data: IFasSistemScada) => {
    setDataParams(data);
  };

  return (
    <>
      <FormData
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        fields={FasSistemScadaField}
        path={API_PATH().master.fasop.sistem_scada}
        customLabel='state'
        onLoading={setLoading}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row className='mb-3'>
            <Col md='6' xs='12'>
              <Form.Group className='mt-3'>
                <Form.Label>
                  Nama 
                </Form.Label>
                <Form.Control {...register('name')} isInvalid={errors.name} />
                <Form.Control.Feedback type='invalid'>
                  {errors?.name?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mt-3' controlId='jenis_scada'>
                <Form.Label>Jenis SCADA</Form.Label>
                <Form.Control {...register('jenis_scada')} isInvalid={errors.jenis_scada} />
                <Form.Control.Feedback type='invalid'>
                  {errors?.jenis_scada?.message}
                </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mt-3' controlId='jenis_koneksi'>
                <Form.Label>Jenis Koneksi</Form.Label>
                <Form.Control {...register('jenis_koneksi')} isInvalid={errors.jenis_koneksi} />
                <Form.Control.Feedback type='invalid'>
                  {errors?.jenis_koneksi?.message}
                </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mt-3' controlId='ip_db1'>
                <Form.Label>IP DB1</Form.Label>
                <Form.Control {...register('ip_db1')} isInvalid={errors.ip_db1} />
                <Form.Control.Feedback type='invalid'>
                  {errors?.ip_db1?.message}
                </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mt-3' controlId='name_db1'>
                <Form.Label>Nama DB1</Form.Label>
                <Form.Control {...register('name_db1')} isInvalid={errors.name_db1} />
                <Form.Control.Feedback type='invalid'>
                  {errors?.name_db1?.message}
                </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mt-3' controlId='instance_db1'>
                <Form.Label>Instance DB1</Form.Label>
                <Form.Control {...register('instance_db1')} isInvalid={errors.instance_db1} />
                <Form.Control.Feedback type='invalid'>
                  {errors?.instance_db1?.message}
                </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mt-3' controlId='port_db1'>
                <Form.Label>Port DB1</Form.Label>
                <Form.Control {...register('port_db1')} isInvalid={errors.port_db1} />
                <Form.Control.Feedback type='invalid'>
                  {errors?.port_db1?.message}
                </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mt-3' controlId='username_db1'>
                <Form.Label>Username DB1</Form.Label>
                <Form.Control {...register('username_db1')} isInvalid={errors.username_db1} />
                <Form.Control.Feedback type='invalid'>
                  {errors?.username_db1?.message}
                </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mt-3' controlId='password_db1'>
                <Form.Label>Password DB1</Form.Label>
                <Form.Control {...register('password_db1')} isInvalid={errors.password_db1} />
                <Form.Control.Feedback type='invalid'>
                  {errors?.password_db1?.message}
                </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mt-3' controlId='status_db1'>
                <Form.Label>Status DB1</Form.Label>
                <Form.Control {...register('status_db1')} isInvalid={errors.status_db1} />
                <Form.Control.Feedback type='invalid'>
                  {errors?.status_db1?.message}
                </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mt-3' controlId='ip_db2'>
                <Form.Label>IP DB2</Form.Label>
                <Form.Control {...register('ip_db2')} isInvalid={errors.ip_db2} />
                <Form.Control.Feedback type='invalid'>
                  {errors?.ip_db2?.message}
                </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mt-3' controlId='name_db2'>
                <Form.Label>Nama DB2</Form.Label>
                <Form.Control {...register('name_db2')} isInvalid={errors.name_db2} />
                <Form.Control.Feedback type='invalid'>
                  {errors?.name_db2?.message}
                </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mt-3' controlId='instance_db2'>
                <Form.Label>Instance DB2</Form.Label>
                <Form.Control {...register('instance_db2')} isInvalid={errors.instance_db2} />
                <Form.Control.Feedback type='invalid'>
                  {errors?.instance_db2?.message}
                </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mt-3' controlId='port_db2'>
                <Form.Label>Port DB2</Form.Label>
                <Form.Control {...register('port_db2')} isInvalid={errors.port_db2} />
                <Form.Control.Feedback type='invalid'>
                  {errors?.port_db2?.message}
                </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mt-3' controlId='username_db2'>
                <Form.Label>Username DB2</Form.Label>
                <Form.Control {...register('username_db2')} isInvalid={errors.username_db2} />
                <Form.Control.Feedback type='invalid'>
                  {errors?.username_db2?.message}
                </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mt-3' controlId='password_db2'>
                <Form.Label>Password DB2</Form.Label>
                <Form.Control {...register('password_db2')} isInvalid={errors.password_db2} />
                <Form.Control.Feedback type='invalid'>
                  {errors?.password_db2?.message}
                </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='mt-3' controlId='status_db2'>
                <Form.Label>Status DB2</Form.Label>
                <Form.Control {...register('status_db2')} isInvalid={errors.status_db2} />
                <Form.Control.Feedback type='invalid'>
                  {errors?.status_db2?.message}
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
