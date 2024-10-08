import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Row, Col, Form } from 'react-bootstrap';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import ButtonCancel from '@app/components/Button/ButtonCancel';
import FormData from '@app/modules/Form/FormData';

import { IJaringanPenyulang, JaringanPenyulangField } from '@app/interface/jaringan-penyulang.interface';
import RequiredInfo from '@app/components/Info/RequiredInfo';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
import { API_PATH } from '@app/services/_path.service';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
import Button from '@app/components/Button/Button';
import SelectFormStatic from '@app/modules/SelectForm/SelectFormStatic';
import { JENIS_KANTOR } from '@app/configs/select-options/jenis-kantor.select';

export default function JarKantorFormPage() {
  const { id } = useParams();

  const { currentUser } = useSelector((state: any) => state.auth);


  const [loading, setLoading] = useState<boolean>(false);
  const [dataSelected, setDataSelected] = useState<any>();
  const [dataParams, setDataParams] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    nama_lokasi: Yup.string().typeError('Nama Wajib diisi').required('Nama Wajib diisi'),
    alamat: Yup.string().nullable(),
    id_ref_jenis_lokasi: Yup.string().typeError("Jenis wajib diisi").required('Jenis Wajib diisi'),
    status_listrik: Yup.string().nullable().transform((_, v) => (v == '1' ? '1' : '0')),
    lat: Yup.number().typeError("Latitude harus number").required('Latitude Wajib diisi').default(0),
    lon: Yup.number().typeError("Longitude harus number").required('Longitude Wajib diisi').default(0),
    id_uid: Yup.string().nullable(),
    id_unit_induk: Yup.string().typeError("Unit Induk Wajib diisi").required('uid Wajib diisi'),
    id_parent_lokasi: Yup.string().nullable(),
    id_up3_1: Yup.string().typeError("UP3 Wajib diisi").required('up3 Wajib diisi'),
  });

  const [formModel] = useState<any>({ status_listrik: '1', lat: 0, lon: 0 });
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
  /** SUBSCRIBE FORM CHANGES */
  const watchUnitInduk = useWatch({ control, name: 'id_unit_induk' });
  // const watchUnitUP3 = useWatch({ control, name: 'id_uid' });
  // const watchUnitUP2D = useWatch({ control, name: 'id_uid' });
  // const watchProvince = useWatch({ control, name: 'id_ref_province' });
  const watchStatus = useWatch({ control, name: 'status_listrik' });
  const watchJenisKantor = useWatch({ control, name: 'id_ref_jenis_lokasi' });

  const onSubmitForm = (data: IJaringanPenyulang) => {
    let id_parent: any;
    if (data?.id_uid) {
      id_parent = data?.id_uid
    }
    if (data?.id_up3_1) {
      id_parent = data?.id_up3_1
    }
    if (data?.id_ulp_1) {
      id_parent = data?.id_ulp_1
    }

    data.id_parent_lokasi = id_parent; //data?.id_trafo_gi;
    data.tree_jaringan = 0;
    if (id) {
      data.id_user_updated = currentUser.id_user
    } else {
      data.id_user_created = currentUser.id_user
    }
    setDataParams(data);
  };

  useEffect(() => {
    if (watchJenisKantor && dataSelected?.id_ref_jenis_lokasi != watchJenisKantor) {
      setValue('id_unit_induk', null)
      setValue('id_up3_1', null)
      setValue('id_ulp_1', null)
      setValue('panjang_jaringan', null)
    }
  }, [watchJenisKantor])

  return (
    <>
      <FormData
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        fields={JaringanPenyulangField}
        path={API_PATH().master.jaringan.ref_lokasi}
        customLabel='state'
        onLoading={setLoading}
        onGetDataResult={setDataSelected}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row className='mb-3'>
            {/* LEFT COLUMN  */}
            <Col md="7">
              <Form.Group className='mt-3' controlId='id_ref_jenis_lokasi'>
                <Form.Label>Jenis Kantor</Form.Label>
                <SelectFormStatic
                  control={control}
                  errors={errors}
                  fieldName={'id_ref_jenis_lokasi'}
                  options={JENIS_KANTOR}
                ></SelectFormStatic>
              </Form.Group>
              {
                (watchJenisKantor == JENIS_LOKASI().up2d || watchJenisKantor == JENIS_LOKASI().up3 || watchJenisKantor == JENIS_LOKASI().ulp) &&
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
                    queryParams={{ id_ref_jenis_lokasi: JENIS_LOKASI().uid }}
                    setValue={setValue}
                    options={dataParams?.uid}
                  ></SelectAsyncDynamic>
                </Form.Group>
              }
              {
                (watchJenisKantor == JENIS_LOKASI().ulp) &&
                <Form.Group className='mt-3'>
                  <Form.Label>
                    UP3 <RequiredInfo />
                  </Form.Label>
                  <SelectAsyncDynamic
                    fieldName="id_up3_1"
                    fieldNameParent="id_unit_induk"
                    control={control}
                    errors={errors}
                    labelField={'nama_lokasi'}
                    valueField={'id_ref_lokasi'}
                    pathServiceName={'master.jaringan.ref_lokasi'}
                    queryParams={{ id_ref_jenis_lokasi: JENIS_LOKASI().up3 }}
                    setValue={setValue}
                    watchParent={watchUnitInduk}
                    isDisabled={!watchUnitInduk}
                    options={dataParams?.up3_1}
                  ></SelectAsyncDynamic>
                </Form.Group>
              }
              {
                (watchJenisKantor == JENIS_LOKASI().regional) &&
                <Form.Group className='mt-3'>
                  <Form.Label>
                    PUSAT <RequiredInfo />
                  </Form.Label>
                  <SelectAsyncDynamic
                    fieldName="id_pusat"
                    control={control}
                    errors={errors}
                    labelField={'nama_lokasi'}
                    valueField={'id_ref_lokasi'}
                    pathServiceName={'master.jaringan.ref_lokasi'}
                    queryParams={{ id_ref_jenis_lokasi: JENIS_LOKASI().pusat }}
                    setValue={setValue}
                    options={dataParams?.pusat}
                  ></SelectAsyncDynamic>
                </Form.Group>
              }

              <Form.Group className='mt-3' controlId='nama_lokasi'>
                <Form.Label>
                  Nama Kantor<RequiredInfo />
                </Form.Label>
                <Form.Control
                  {...register('nama_lokasi')}
                  isInvalid={errors.nama_lokasi}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.nama_lokasi?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className='mt-3' controlId='alamat'>
                <Form.Label>
                  Alamat
                </Form.Label>
                <Form.Control
                  as='textarea'
                  {...register('alamat')}
                  isInvalid={errors.alamat}
                  style={{ height: '8rem' }}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.alamat?.message}
                </Form.Control.Feedback>
              </Form.Group>
              {watchJenisKantor !== JENIS_LOKASI().up2b && watchJenisKantor !== JENIS_LOKASI().up3b &&
                <>
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
                      options={dataParams?.ref_province}
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
                      options={dataParams?.ref_regency}
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
                      options={dataParams?.ref_district}
                    ></SelectAsyncDynamic>
                  </Form.Group> */}
                </>
              }
              <Form.Group className='mt-3' controlId='lat'>
                <Form.Label>
                  Latitude <RequiredInfo />
                </Form.Label>
                <Form.Control
                  {...register('lat')}
                  isInvalid={errors.lat}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.lat?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='mt-3' controlId='lon'>
                <Form.Label>
                  Longitude <RequiredInfo />
                </Form.Label>
                <Form.Control
                  {...register('lon')}
                  isInvalid={errors.lon}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.lon?.message}
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
