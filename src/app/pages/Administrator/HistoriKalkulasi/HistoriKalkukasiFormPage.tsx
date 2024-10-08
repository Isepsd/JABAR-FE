import React, { useState } from 'react';

import { Row, Col, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';


import ButtonCancel from '@app/components/Button/ButtonCancel';
import FormData from '@app/modules/Form/FormData';

import { IHisKalkulasi,AdminHisKalkulasiField } from '@app/interface/admin-his-rekona.interface';
import RequiredInfo from '@app/components/Info/RequiredInfo';

import { API_PATH } from '@app/services/_path.service';

// import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
import Button from '@app/components/Button/Button';
// import SelectFormStatic from '@app/modules/SelectForm/SelectFormStatic';


export default function JarGarduDistribusiForm() {

  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();


  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    nama_lokasi: Yup.string().required('Nama Wajib diisi'),
    kode_lokasi: Yup.string().nullable(),
    jumlah_pelanggan: Yup.string().nullable(),
    kva: Yup.string().nullable(),
    alamat: Yup.string().nullable(),
    path1: Yup.string().nullable(),
    path2: Yup.string().nullable(),
    path3: Yup.string().nullable(),

    parent: Yup.string().typeError('Belum pilih induk').required('Belum pilih induk'),
    // id_gardu_induk: Yup.number().typeError('Belum pilih gardu induk').required('Belum pilih gardu induk'),
    // id_trafo_gi: Yup.number().typeError('Belum pilih Trafo').required('Belum pilih Trafo'),
    // id_penyulang: Yup.number().typeError('Belum pilih penyulang').required('Belum pilih penyulang'),
    // id_zone: Yup.number().typeError('Belum pilih zone').required('Belum pilih zone'),
    // id_section: Yup.number().typeError('Belum pilih section').required('Belum pilih section'),
    // id_segment: Yup.number().typeError('Belum pilih segment').required('Belum pilih segmemt'),
    status_listrik: Yup.string().nullable().transform((_, v) => (v == '1' ? '1' : '0')),
    lat: Yup.number().typeError("Latitude harus number").required('Latitude Wajib diisi'),
    lon: Yup.number().typeError("Longitude harus number").required('Longitude Wajib diisi'),
    id_uid: Yup.number().nullable().transform((_, val) => val === Number(val) ? val : null),
    id_ulp_1: Yup.number().nullable().transform((_, val) => val === Number(val) ? val : null),
    id_up3_1: Yup.number().nullable().transform((_, val) => val === Number(val) ? val : null),
    fungsi_scada: Yup.string().nullable(),
    jenis_gardu: Yup.string().nullable(),
  });

  const [formModel] = useState<any>({ status_listrik: '1', lat: 0, lon: 0, id_ref_province: process.env.ADM_PROVINCE });
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    // control,
    formState,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  const { errors }: any = formState || {};
  /** SUBSCRIBE FORM CHANGES */
  // const watchGarduInduk = useWatch({ control, name: 'id_gardu_induk' });
  // const watchTrafoGI = useWatch({ control, name: 'id_trafo_gi' });

  // const watchZone = useWatch({ control, name: 'id_zone' });
  // const watchSection = useWatch({ control, name: 'id_section' });
  // const watchProvince = useWatch({ control, name: 'id_ref_province' });
  // const watchKabKota = useWatch({ control, name: 'id_ref_regency' });


  const onSubmitForm = (data: IHisKalkulasi) => {

    setDataParams(data);
  };


  return (
    <>
      <FormData
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        fields={AdminHisKalkulasiField}
        path={API_PATH().master.jaringan.ref_lokasi}
        customLabel='state'
        onLoading={setLoading}

      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row className='mb-3'>
            {/* LEFT COLUMN  */}
            <Col md="7">
              
              <Form.Group className='mt-3' controlId='nama_lokasi'>
                <Form.Label>Nama Kalkulasi <RequiredInfo /></Form.Label>
                <Form.Control
                  {...register('nama_lokasi')}
                  isInvalid={errors.nama_lokasi}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.nama_lokasi?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='mt-3' controlId='nama_lokasi'>
                <Form.Label>Jenis <RequiredInfo /></Form.Label>
                <Form.Control
                  {...register('nama_lokasi')}
                  isInvalid={errors.nama_lokasi}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.nama_lokasi?.message}
                </Form.Control.Feedback>
              </Form.Group>

             
              <Form.Group className='mt-3' controlId='status'>
                <Form.Label>Status</Form.Label>
                <div>
                  <Form.Check
                    {...register('status_listrik')}
                    inline
                    type='radio'
                    value='1'
                    label='Active'
                  />
                  <Form.Check
                    {...register('status_listrik')}
                    inline
                    type='radio'
                    value='0'
                    label='Inactive'
                  />
                </div>
                <Form.Control.Feedback type='invalid'>
                  {errors?.status?.message}
                </Form.Control.Feedback>
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
