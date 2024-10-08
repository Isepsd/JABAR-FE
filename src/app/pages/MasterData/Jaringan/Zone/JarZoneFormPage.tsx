import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Row, Col, Form } from 'react-bootstrap';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import ButtonCancel from '@app/components/Button/ButtonCancel';
import FormData from '@app/modules/Form/FormData';

import { IJaringanZone, JaringanZoneField } from '@app/interface/jaringan-zone.interface';
import RequiredInfo from '@app/components/Info/RequiredInfo';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
import { OPTIONS_JENIS_JARINGAN } from '@app/configs/select-options.config';

import { API_PATH } from '@app/services/_path.service';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamicOLD';
import Button from '@app/components/Button/Button';
import SelectFormStatic from '@app/modules/SelectForm/SelectFormStatic';
import FormMappingScada from '@app/modules/MasterData/FormMappingScada';
import { OPTIONS_FUNGSI_PERALATAN, OPTIONS_JENIS_PENYULANG } from '@app/configs/select-options/jaringan.select';

export default function JarZoneForm() {
  const { id } = useParams();

  const { currentUser } = useSelector((state: any) => state.auth);

  // const statusJaringanOptions = OPTIONS_STATUS_JARINGAN();
  const jenisJaringanOptions = OPTIONS_JENIS_JARINGAN();
  const jenisPenyulang = OPTIONS_JENIS_PENYULANG;
  const fungsiLokasi = OPTIONS_FUNGSI_PERALATAN;

  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();
  const [dataSelected, setDataSelected] = useState<any>();

  const optionZona = [
    { label: 'ZONA 1', value: 'ZONA 1' },
    { label: 'ZONA 2', value: 'ZONA 2' },
    { label: 'ZONA 3', value: 'ZONA 3' },
    { label: 'ZONA 4', value: 'ZONA 4' },
  ]
  const statusJaringanOptions = [
    { label: 'RECLOSER', value: 'RECLOSER' },
    { label: 'OG', value: 'OG' },
  ]

  /** FORM  HANDLE */
  const validationSchema: any = Yup.object().shape({
    nama_lokasi: Yup.string().nullable(),
    alamat: Yup.string().nullable(),
    // id_gardu_induk: Yup.number().typeError('Belum pilih gardu induk').required('Belum pilih gardu induk'),
    // id_trafo_gi: Yup.number().typeError('Belum pilih Trafo').required('Belum pilih Trafo'),
    id_penyulang: Yup.string().nullable(),
    id_uid: Yup.string().nullable(),
    id_unit_induk: Yup.string().nullable(),
    id_up3_1: Yup.string().nullable(),
    id_ulp_1: Yup.string().nullable(),
    jenis_jaringan: Yup.string().nullable(),
    jenis_penyulang: Yup.string().nullable(),
    jenis_peralatan: Yup.string().nullable(),
    fungsi_lokasi: Yup.string().nullable(),
    status_penyulang: Yup.string().nullable(),
    status_listrik: Yup.string().nullable().transform((_, v) => (v == '1' ? '1' : '0')),
    rekon_beban: Yup.string().nullable().transform((_, v) => (v == '1' ? '1' : '0')),
    // lat: Yup.number().typeError("Latitude harus number").required('Latitude Wajib diisi'),
    // lon: Yup.number().typeError("Longitude harus number").required('Longitude Wajib diisi'),
    id_pemilik: Yup.string().nullable(),
    i_max: Yup.string().nullable(),
    zona: Yup.string().nullable(),
    // dcc: Yup.string().nullable().required('DCC Wajib diisi'),
    // id_i: Yup.string().required('ID Arus harus diisi'),
    // id_v: Yup.string().required('ID Tegangan harus diisi'),
    // id_p: Yup.string().required('ID Daya harus diisi'),
    // id_amr: Yup.string().required('ID AMR harus diisi'),
    // id_portal_ext: Yup.string().required('ID Portal EXT harus diisi'),
    // ratio_ct: Yup.number().typeError('Data ini harus bilangan bulat').required('Data ini harus diisi'),
    // ratio_vt: Yup.number().typeError('Data ini harus bilangan bulat').required('Data ini harus diisi'),
    // faktor_kali: Yup.string().nullable().required('Faktor Kali harus diisi'),

    sinkron_data: Yup.string().nullable(),
    id_i: Yup.string().nullable(),
    kode_lokasi: Yup.string(),
    id_v: Yup.string().nullable(),
    id_p: Yup.string().nullable(),
    id_amr: Yup.string().nullable(),
    id_portal_ext: Yup.string().nullable(),
    panjang_jaringan: Yup.string().nullable(),
    jumlah_pelanggan: Yup.string().nullable(),
    // no_urut: Yup.string().typeError("Data harus angka").required('No Urut Cell harus diisi'),
    url_webservice: Yup.string().nullable(),
  });

  const [formModel] = useState<any>({ status_listrik: '1', lat: 0, lon: 0, id_ref_province: process.env.ADM_PROVINCE, rekon_beban: "0" });
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
  const watchZona = useWatch({ control, name: 'zona' });

  const determineZonaValue = (selectedZona: string) => {
    const zona = optionZona.find(option => option.value === selectedZona);
    return zona ? zona.label : null;
  };


  /** SUBSCRIBE FORM CHANGES */
  // const watchGarduInduk = useWatch({ control, name: 'id_gardu_induk' });
  const watchUnitInduk = useWatch({ control, name: 'id_unit_induk' });
  const watchUP3_1 = useWatch({ control, name: 'id_up3_1' });
  const watchStatus = useWatch({ control, name: 'status_listrik' });
  const watchRekon = useWatch({ control, name: 'rekon_beban' });
  // const watchProvince = useWatch({ control, name: 'id_ref_province' });
  // const watchKabKota = useWatch({ control, name: 'id_ref_regency' });

  const onSubmitForm = (data: IJaringanZone) => {
    // data.id_parent_lokasi = data?.id_gardu_hubung ? data?.id_gardu_hubung : data?.id_penyulang ;
    data.id_parent_lokasi = data?.id_penyulang;
    // data.id_ref_jenis_lokasi = JENIS_LOKASI().zone;
    data.id_ref_jenis_lokasi = JENIS_LOKASI().keypoint;
    data.fungsi_lokasi = 'ZONE';
    data.zona = determineZonaValue(watchZona);
    // let OPTION_ZONA ;
    // if(OPTION_ZONA === "zona1"){
    //     data.zona = {watchZona}
    // }
    data.tree_jaringan = 1;
    if (id) {
      data.id_user_updated = currentUser.id_user
    } else {
      data.id_user_created = currentUser.id_user
    }

    setDataParams(data);

  };


  // console.log("errors", errors);


  return (
    <>
      <FormData
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        fields={JaringanZoneField}
        path={API_PATH().master.jaringan.ref_lokasi}
        customLabel='state'
        onLoading={setLoading}
        onGetDataResult={setDataSelected}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row className='mb-3'>
            {/* LEFT COLUMN  */}
            <Col md="7">
              <Form.Group className='mt-3' controlId='kode_lokasi'>
                <Form.Label>
                  Kode Recloser/OG <RequiredInfo />
                </Form.Label>
                <Form.Control
                  {...register('kode_lokasi')}
                  isInvalid={errors.kode_lokasi}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.kode_lokasi?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='mt-3' controlId='nama_lokasi'>
                <Form.Label>
                  Nama Recloser/OG <RequiredInfo />
                </Form.Label>
                <Form.Control
                  {...register('nama_lokasi')}
                  isInvalid={errors.nama_lokasi}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.nama_lokasi?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='mt-3' controlId='zona'>
                <Form.Label>Zona</Form.Label>
                <SelectFormStatic
                  control={control}
                  errors={errors}
                  fieldName={'zona'}
                  options={optionZona}
                ></SelectFormStatic>
              </Form.Group>
              <Form.Group className='mt-3' controlId='alamat'>
                <Form.Label>
                  Coverage
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
              <Form.Group className='mt-3' controlId='panjang_jaringan'>
                <Form.Label>
                  Panjang Jaringan (KMS)
                </Form.Label>
                <Form.Control
                  type="number"
                  {...register('panjang_jaringan')}
                  isInvalid={errors.panjang_jaringan}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.panjang_jaringan?.message}
                </Form.Control.Feedback>
              </Form.Group>
              {/* <Form.Group className='mt-3'>
                <Form.Label>
                  Gardu Hubung <RequiredInfo />
                </Form.Label>
                <SelectAsyncDynamic
                  fieldName="id_gardu_hubung"
                  fieldNameParent="id_gardu_nduk"
                  control={control}
                  errors={errors}
                  labelField={'nama_lokasi'}
                  valueField={'id_ref_lokasi'}
                  pathServiceName={'master.jaringan.ref_lokasi'}
                  queryParams={{ id_ref_jenis_lokasi: JENIS_LOKASI().gardu_hubung }}
                  setValue={setValue}
                  options={dataSelected?.gardu_hubung}
                ></SelectAsyncDynamic>
              </Form.Group> */}
              <Form.Group className='mt-3'>
                <Form.Label>
                  Penyulang <RequiredInfo />
                </Form.Label>
                <SelectAsyncDynamic
                  fieldName="id_penyulang"
                  control={control}
                  errors={errors}
                  labelField={'nama_lokasi'}
                  valueField={'id_ref_lokasi'}
                  pathServiceName={'master.jaringan.ref_lokasi'}
                  queryParams={{ id_ref_jenis_lokasi: JENIS_LOKASI().penyulang }}
                  setValue={setValue}
                  options={dataSelected?.penyulang}
                ></SelectAsyncDynamic>
              </Form.Group>
              <Form.Group className='mt-3' controlId='jenis_jaringan'>
                <Form.Label>Jenis Jaringan</Form.Label>
                <SelectFormStatic
                  control={control}
                  errors={errors}
                  fieldName={'jenis_jaringan'}
                  options={jenisJaringanOptions}
                ></SelectFormStatic>
              </Form.Group>
              <Form.Group className='mt-3' controlId='status_penyulang'>
                <Form.Label>Jenis Pemutus</Form.Label>
                <SelectFormStatic
                  control={control}
                  errors={errors}
                  fieldName={'status_penyulang'}
                  options={statusJaringanOptions}
                ></SelectFormStatic>
              </Form.Group>
              <Form.Group className='mt-3' controlId='jenis_penyulang'>
                <Form.Label>Jenis Penyulang</Form.Label>
                <SelectFormStatic
                  control={control}
                  errors={errors}
                  fieldName={'jenis_penyulang'}
                  options={jenisPenyulang}
                ></SelectFormStatic>
              </Form.Group>
              <Form.Group className='mt-3' controlId='jenis_peralatan'>
                <Form.Label>Jenis Peralatan</Form.Label>
                <SelectFormStatic
                  control={control}
                  errors={errors}
                  fieldName={'jenis_peralatan'}
                  options={fungsiLokasi}
                ></SelectFormStatic>
              </Form.Group>

              <Form.Group className='mt-3' controlId='pemilik'>
                <Form.Label>
                  Pemilik{/* Jika Anda memiliki komponen RequiredInfo, tambahkan di sini */}
                </Form.Label>
                <SelectAsyncDynamic
                  fieldName='pemilik'
                  pathServiceName='master.jaringan.ref_lokasi'
                  labelField='nama_lokasi'
                  valueField='id_ref_lokasi'
                  placeholder='Pilih...'
                  isClearable={true}
                  errors={errors}
                  control={control}
                  queryParams={{
                    page: 1,
                    limit: 10,
                    status: 1,
                    id_ref_jenis_lokasi_in: `${JENIS_LOKASI().up2d},${JENIS_LOKASI().up2b},${JENIS_LOKASI().up3}`,
                  }}
                />
              </Form.Group>
              <Form.Group className='mt-3' controlId='i_max'>
                <Form.Label>
                  Arus Max (A)<RequiredInfo />
                </Form.Label>
                <Form.Control
                  {...register('i_max')}
                  isInvalid={errors.i_max}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.i_max?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='mt-3' controlId='jumlah_pelanggan'>
                <Form.Label>
                  Total Pelanggan<RequiredInfo />
                </Form.Label>
                <Form.Control
                  {...register('jumlah_pelanggan')}
                  isInvalid={errors.jumlah_pelanggan}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.jumlah_pelanggan?.message}
                </Form.Control.Feedback>
              </Form.Group>
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
                  options={dataSelected?.uid}
                ></SelectAsyncDynamic>
              </Form.Group>
              <Form.Group className='mt-3'>
                <Form.Label>
                  UP3/UP2D <RequiredInfo />
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
                  options={dataSelected?.up3}
                ></SelectAsyncDynamic>
              </Form.Group>
              <Form.Group className='mt-3'>
                <Form.Label>
                  ULP
                </Form.Label>
                <SelectAsyncDynamic
                  fieldName="id_ulp_1"
                  fieldNameParent="id_up3_1"
                  control={control}
                  errors={errors}
                  labelField={'nama_lokasi'}
                  valueField={'id_ref_lokasi'}
                  pathServiceName={'master.jaringan.ref_lokasi'}
                  queryParams={{ id_ref_jenis_lokasi: JENIS_LOKASI().ulp }}
                  setValue={setValue}
                  watchParent={watchUP3_1}
                  isDisabled={!watchUP3_1}
                  options={dataSelected?.ulp}
                ></SelectAsyncDynamic>
              </Form.Group>
              <Form.Group className='mt-3' controlId='rekon_beban'>
                <Form.Label>Rekon Beban</Form.Label>
                <div className="ms-3 py-2">
                  <Form.Check
                    type="switch"
                    id="rekon_beban"
                    {...register("rekon_beban")}
                    label={watchRekon ? "Iya" : "Tidak"}
                  />
                </div>
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
