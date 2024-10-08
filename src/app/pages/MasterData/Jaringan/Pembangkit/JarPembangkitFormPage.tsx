import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import ButtonCancel from '@app/components/Button/ButtonCancel';
import FormData from '@app/modules/Form/FormData';

import { IJaringanPembangkit, JarianganPembangkitField } from '@app/interface/jaringan-pembangkit.interface';
import RequiredInfo from '@app/components/Info/RequiredInfo';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
import { API_PATH } from '@app/services/_path.service';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamicOLD';
import FormMappingScada from '@app/modules/MasterData/FormMappingScada';
// import { OPTIONS_JENIS_UNIT } from '@app/configs/select-options/jaringan.select';
// import SelectFormStatic from '@app/modules/SelectForm/SelectFormStatic';

export default function JarPembangkitForm() {
  const { id } = useParams();

  // const jenisUnit = OPTIONS_JENIS_UNIT;

  const { currentUser } = useSelector((state: any) => state.auth);

  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();
  const [dataSelected, setSelectedData] = useState<any>()



  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    id_unit_induk: Yup.string().nullable(),
    nama_lokasi: Yup.string().typeError('Nama Wajib diisi').required('Nama Wajib diisi'),
    alamat: Yup.string().nullable(),
    // jenis_unit: Yup.string().nullable(),
    id_parent_lokasi: Yup.string().typeError("Belum pilih unit pembangkit").required('Belum pilih unit pembangkit'),
    id_ref_jenis_pembangkit: Yup.string().typeError("Belum pilih jenis pembangkit").required('Belum pilih jenis pembangkit'),
    status_listrik: Yup.string().nullable().transform((_, v) => (v == '1' ? '1' : '0')),
    lat: Yup.number().typeError("Latitude harus number").required('Latitude Wajib diisi'),
    lon: Yup.number().typeError("Longitude harus number").required('Longitude Wajib diisi'),
    no_urut: Yup.number().typeError("No Urut Cell harus number").required('Urut Cell Wajib diisi'),
    sinkron_data: Yup.string().required('Sinkron data harus diisi'),
    path1: Yup.string().nullable(),
    path2: Yup.string().nullable(),
    path3: Yup.string().nullable(),
    id_i: Yup.string().nullable(),
    id_v: Yup.string().nullable(),
    id_p: Yup.string().nullable(),
    id_amr: Yup.string().nullable(),
    url_webservice: Yup.string().nullable(),
    id_portal_ext: Yup.string().nullable(),
  });

  const [formModel] = useState<any>({ status_listrik: '1', lat: 0, lon: 0, id_ref_province: process.env.ADM_PROVINCE });

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
  /** WATCH FORM CHANGE */
  const watchStatus = useWatch({ control, name: 'status_listrik' });
  // const watchProvince = useWatch({ control, name: 'id_ref_province' });
  // const watchKabKota = useWatch({ control, name: 'id_ref_regency' });

  const onSubmitForm = (data: IJaringanPembangkit) => {
    data.id_unit_pembangkit = data?.id_parent_lokasi
    data.id_ref_jenis_lokasi = JENIS_LOKASI().pembangkit;
    data.tree_jaringan = 1;
    // console.log("data", data);

    if (id) {
      data.id_user_updated = currentUser.id_user
    } else {
      data.id_user_created = currentUser.id_user
    }
    setDataParams(data);
  };

  const handleGetDataResult = (e: any) => {
    setSelectedData(e)
  }

  // console.log("erors", errors);


  return (
    <>
      <FormData
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        fields={JarianganPembangkitField}
        path={API_PATH().master.jaringan.ref_lokasi}
        customLabel='state'
        onLoading={setLoading}
        onGetDataResult={handleGetDataResult}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row className='mb-3'>
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
              <Form.Group className='mt-3'>
                <Form.Label>Unit Pembangkit <RequiredInfo /></Form.Label>
                <SelectAsyncDynamic
                  fieldName="id_parent_lokasi"
                  control={control}
                  errors={errors}
                  options={dataSelected?.parent_lokasi}
                  labelField={'nama_lokasi'}
                  valueField={'id_ref_lokasi'}
                  pathServiceName={'master.jaringan.ref_lokasi'}
                  queryParams={{ sort_by: 'nama_lokasi', id_ref_jenis_lokasi: JENIS_LOKASI().unit_pembangkit }}
                ></SelectAsyncDynamic>
              </Form.Group>
              <Form.Group className='mt-3'>
                <Form.Label>Jenis Pembangkit</Form.Label>
                <SelectAsyncDynamic
                  fieldName='id_ref_jenis_pembangkit'
                  pathServiceName='master.jaringan.jenis_pembangkit'
                  labelField='nama'
                  valueField='id_ref_jenis_pembangkit'
                  errors={errors}
                  control={control}
                />
              </Form.Group>
              <Form.Group className='mt-3' controlId='nama_lokasi'>
                <Form.Label>Nama Pembangkit<RequiredInfo /></Form.Label>
                <Form.Control
                  {...register('nama_lokasi')}
                  isInvalid={errors.nama_lokasi}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.nama_lokasi?.message}
                </Form.Control.Feedback>
              </Form.Group>
              {/* <Form.Group className='mt-3' controlId='jenis_unit'>
                <Form.Label>Jenis Unit (UID / UIP) </Form.Label>
                <SelectFormStatic
                  control={control}
                  errors={errors}
                  fieldName={'jenis_unit'}
                  options={jenisUnit}
                ></SelectFormStatic>
              </Form.Group> */}
              {/* <Form.Group className='mt-3' controlId='alamat'>
                <Form.Label>Alamat </Form.Label>
                <Form.Control
                  as="textarea" rows={4}
                  {...register('alamat')}
                  isInvalid={errors.alamat}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.alamat?.message}
                </Form.Control.Feedback>
              </Form.Group> */}

              <Form.Group className='mt-3' controlId='no_urut'>
                <Form.Label>No Urut <RequiredInfo /></Form.Label>
                <Form.Control
                  type="number"
                  {...register('no_urut')}
                  isInvalid={errors.no_urut}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.no_urut?.message}
                </Form.Control.Feedback>
              </Form.Group>

              {/* <Form.Group className='mt-3'>
                <Form.Label>Provinsi </Form.Label>
                <SelectAsyncDynamic
                  fieldName="id_ref_province"
                  control={control}
                  errors={errors}
                  labelField={'name'}
                  valueField={'id_ref_province'}
                  pathServiceName={'master.adm_wilayah.provinsi'}
                  queryParams={{ sort_by: 'name' }}
                  setValue={setValue}
                  options={dataSelected?.ref_province}
                ></SelectAsyncDynamic>
              </Form.Group>

              <Form.Group className='mt-3'>
                <Form.Label>Kab/Kota </Form.Label>
                <SelectAsyncDynamic
                  fieldName="id_ref_regency"
                  fieldNameParent="id_ref_province"
                  control={control}
                  errors={errors}
                  labelField={'name'}
                  valueField={'id_ref_regency'}
                  pathServiceName={'master.adm_wilayah.kota_kab'}
                  watchParent={watchProvince}
                  isDisabled={!watchProvince}
                  queryParams={{ sort_by: 'name' }}
                  setValue={setValue}
                  options={dataSelected?.ref_regency}
                ></SelectAsyncDynamic>
              </Form.Group>

              <Form.Group className='mt-3'>
                <Form.Label>Kecamatan </Form.Label>
                <SelectAsyncDynamic
                  fieldName="id_ref_district"
                  fieldNameParent="id_ref_regency"
                  control={control}
                  errors={errors}
                  labelField={'name'}
                  valueField={'id_ref_district'}
                  pathServiceName={'master.adm_wilayah.kecamatan'}
                  watchParent={watchKabKota}
                  isDisabled={!watchKabKota}
                  queryParams={{ sort_by: 'name' }}
                  setValue={setValue}
                  options={dataSelected?.ref_district}
                ></SelectAsyncDynamic>
              </Form.Group> */}

              {/* <Row>
                <Form.Group as={Col} className='mt-3' controlId='lat'>
                  <Form.Label>Latitude <RequiredInfo /></Form.Label>
                  <Form.Control
                    {...register('lat')}
                    type="number"
                    isInvalid={errors.lat}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors?.lat?.message}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} className='mt-3' controlId='lon'>
                  <Form.Label>Longitude <RequiredInfo /></Form.Label>
                  <Form.Control
                    {...register('lon')}
                    type="number"
                    isInvalid={errors.lon}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors?.lon?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row> */}
              <Form.Group>
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
            <Col md="5">
              <FormMappingScada
                control={control}
                errors={errors}
                register={register}
                dataSelected={dataSelected}
              />
            </Col>
          </Row>
          <Form.Group className='mt-4'>
            <Button type='submit' variant='primary' disabled={loading}>Simpan</Button>
            <ButtonCancel />
          </Form.Group>
        </Form>
      </FormData>
    </>
  );
}
