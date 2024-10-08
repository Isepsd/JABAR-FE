import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamicOLD';
import ButtonCancel from '@app/components/Button/ButtonCancel';
import FormData from '@app/modules/Form/FormData';

import { IJaringanUnitPembangkit, JaringanUnitPembangkitField } from '@app/interface/jaringan-unit-pembangkit.interface';
import RequiredInfo from '@app/components/Info/RequiredInfo';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
import { API_PATH } from '@app/services/_path.service';

export default function JarUnitPembangkitForm() {
  const { id } = useParams();
  const { currentUser } = useSelector((state: any) => state.auth);

  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  const validationSchema = Yup.object().shape({
    nama_lokasi: Yup.string().typeError('Nama Wajib diisi').required('Nama Wajib diisi'),
    alamat: Yup.string().nullable(),
    id_unit_induk: Yup.string().nullable(),
    path1: Yup.string().nullable(),
    path2: Yup.string().nullable(),
    path3: Yup.string().nullable(),
    status_listrik: Yup.string().nullable().transform((_, v) => (v == '1' ? '1' : '0')),
    lat: Yup.number().typeError('Latitude harus number').required('Latitude Wajib diisi'),
    lon: Yup.number().typeError('Longitude harus number').required('Longitude Wajib diisi'),
  });
  const initialStatusListrik = id ? '1' : '0';
  const [formModel] = useState<any>({ status_listrik: initialStatusListrik, lat: 0, lon: 0, id_ref_province: process.env.ADM_PROVINCE });
  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    formState,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });

  const { errors }: any = formState || {};

  const watchStatus = useWatch({ control, name: 'status_listrik' });

  const onSubmitForm = (data: IJaringanUnitPembangkit) => {
    data.id_ref_jenis_lokasi = JENIS_LOKASI().unit_pembangkit;
    data.tree_jaringan = 1;
    if (id) {
      data.id_user_updated = currentUser.id_user;
    } else {
      data.id_user_created = currentUser.id_user;
    }
    setDataParams(data);
  };

  return (
    <>
      <FormData
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        fields={JaringanUnitPembangkitField}
        path={API_PATH().master.jaringan.ref_lokasi}
        customLabel="state"
        onLoading={setLoading}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row className="mb-3">
            <Col md="7">
              <Form.Group className='mt-3'>
                <Form.Label>
                  Unit Induk <RequiredInfo />
                </Form.Label>
                <SelectAsyncDynamic
                  fieldName="id_unit_induk"
                  control={control}
                  errors={errors}
                  labelField={'nama_lokasi'}
                  valueField={'id_ref_lokasi'}
                  pathServiceName={'master.jaringan.ref_lokasi'}
                  queryParams={{ id_ref_jenis_lokasi_in: `${JENIS_LOKASI().uiw},${JENIS_LOKASI().uid}` }}
                  setValue={setValue}
                  options={dataParams?.uid}
                ></SelectAsyncDynamic>
              </Form.Group>
              <Form.Group className="mt-3" controlId="nama">
                <Form.Label>
                  Nama Unit Pembangkit<RequiredInfo />
                </Form.Label>
                <Form.Control
                  {...register('nama_lokasi')}
                  isInvalid={errors.nama_lokasi}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.nama_lokasi?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mt-3" controlId="alamat">
                <Form.Label>
                  Alamat<RequiredInfo />
                </Form.Label>
                <Form.Control
                  {...register('alamat')}
                  isInvalid={errors.alamat}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.alamat?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mt-3" controlId="lat">
                <Form.Label>
                  Latitude <RequiredInfo />
                </Form.Label>
                <Form.Control
                  {...register('lat')}
                  isInvalid={errors.lat}
                  type="number"
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.lat?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mt-3" controlId="lon">
                <Form.Label>
                  Longitude <RequiredInfo />
                </Form.Label>
                <Form.Control
                  {...register('lon')}
                  type="number"
                  isInvalid={errors.lon}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.lon?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mt-3" controlId="path1">
                <Form.Label>Path1</Form.Label>
                <Form.Control {...register('path1')} isInvalid={errors.path1} />
                <Form.Control.Feedback type="invalid">
                  {errors?.path1?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mt-3" controlId="path2">
                <Form.Label>Path2</Form.Label>
                <Form.Control {...register('path2')} isInvalid={errors.path2} />
                <Form.Control.Feedback type="invalid">
                  {errors?.path2?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mt-3" controlId="path3">
                <Form.Label>Path3</Form.Label>
                <Form.Control {...register('path3')} isInvalid={errors.path3} />
                <Form.Control.Feedback type="invalid">
                  {errors?.path3?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mt-3" controlId="status_listrik">
                <Form.Label>Status Aktif</Form.Label>
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
          <Form.Group className="mt-4">
            <Button type="submit" variant="primary" disabled={loading}>Simpan</Button>
            <ButtonCancel />
          </Form.Group>
        </Form>
      </FormData>
    </>
  );
}
