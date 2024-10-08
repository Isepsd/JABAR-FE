import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import ButtonCancel from '@app/components/Button/ButtonCancel';
import FormData from '@app/modules/Form/FormData';

import { JaringanTrafoGIField } from '@app/interface/jaringan-trafo-gi.interface';
import RequiredInfo from '@app/components/Info/RequiredInfo';
// import SelectRefLokasi from '@app/modules/SelectForm/SelectRefLokasi';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
import { API_PATH } from '@app/services/_path.service';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
import SelectFormStatic from '@app/modules/SelectForm/SelectFormStatic';
import { JENIS_TRAFO, JENIS_LAYANAN, STATUS_TRAFO } from '@app/configs/select-options/jaringan.select';
import FormMappingScada from '@app/modules/MasterData/FormMappingScada';


export default function JarTrafoGIForm() {
  // const { id } = useParams();
  // // const queryParams = qs.parse(location.search);
  // const { currentUser } = useSelector((state: any) => state.auth);
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();
  const [dataSelected, setDataSelected] = useState<any>();
  const optionData = JENIS_TRAFO;
  const optionDataStatus = STATUS_TRAFO;
  const optionDataJenisLayanan = JENIS_LAYANAN;

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    nama_lokasi: Yup.string().nullable().required('Nama Wajib diisi'),
    // alamat: Yup.string().nullable(),
    id_gardu_induk: Yup.string().typeError('Belum pilih gardu induk').required('Belum pilih gardu induk'),
    coverage: Yup.string().nullable(),
    // kva: Yup.string().nullable(),
    phase: Yup.string().nullable(),
    status_listrik: Yup.string().nullable().transform((_, v) => (v == '1' ? '1' : '0')),
    rekon_beban: Yup.string().nullable().transform((_, v) => (v == '1' ? '1' : '0')),
    lat: Yup.number().typeError("Latitude harus number").required('Latitude Wajib diisi'),
    lon: Yup.number().typeError("Longitude harus number").required('Longitude Wajib diisi'),
    kapasitas: Yup.number().typeError("Kapasitas harus number").required('Kapasitas Wajib diisi'),
    sub_sistem: Yup.string().typeError("Sub sistem harus number").required('Sub sistem Wajib diisi'),
    nama: Yup.string().nullable(),
    id_pemilik: Yup.string().nullable(),
    pemilik: Yup.string().nullable(),
    status_trafo: Yup.string().nullable(),
    jenis_trafo: Yup.string().nullable().required('Belum pilih  jenis trafo'),
    sinkron_data: Yup.string().nullable().required('Sinkron data harus diisi'),
    jenis_layanan: Yup.string().nullable().required('Belum Pilih Jenis Layanan'),
    path1: Yup.string().nullable(),
    path2: Yup.string().nullable(),
    path3: Yup.string().nullable(),
    id_unit_induk: Yup.string().nullable(),
    id_i: Yup.string().nullable(),
    id_v: Yup.string().nullable(),
    id_p: Yup.string().nullable(),
    id_amr: Yup.string().nullable(),
    id_portal_ext: Yup.string().nullable(),
    url_webservice: Yup.string().nullable(),
    def_pengukuran_teg_primer: Yup.string().nullable(),
    def_pengukuran_teg_sekunder: Yup.string().nullable(),
    // no_urut: Yup.string().nullable(),
    def_nilai_cosq: Yup.string().nullable(),

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
  // const watchProvince = useWatch({ control, name: 'id_ref_province' });
  // const watchKabKota = useWatch({ control, name: 'id_ref_regency' });
  const watchStatus = useWatch({ control, name: 'status_listrik' });
  const watchRekon = useWatch({ control, name: 'rekon_beban' });

  const [owners, setOwners] = useState([{ id: 1 }])

  const handleAddOwner = () => {
    const newOwnerId = owners.length + 1; // ID baru untuk pemilik baru
    setOwners([...owners, { id: newOwnerId }]);
  };

  const handleRemoveOwner = (ownerId: any) => {
    // Dapatkan indeks pemilik berdasarkan id
    const indexToRemove = owners.findIndex((owner) => owner.id === ownerId);

    if (indexToRemove !== -1) {
      // Hapus pemilik dari array menggunakan splice atau filter
      const updatedOwners = [...owners];
      updatedOwners.splice(indexToRemove, 1); // Menggunakan splice untuk menghapus satu elemen dari array

      // Set state atau dispatch action untuk memperbarui daftar pemilik
      setOwners(updatedOwners); // Gantikan dengan cara Anda untuk memperbarui state pemilik
    }
  };

  const onSubmitForm = (data: any) => {
    // Mengisi data yang bersifat otomatis
    data.id_parent_lokasi = data?.id_gardu_induk;
    data.id_ref_jenis_lokasi = JENIS_LOKASI().trafo_gi;
    data.tree_jaringan = 1;

    // Menentukan id pengguna yang melakukan aksi (update atau create)
    // if (id) {
    //   data.id_user_updated = currentUser?.id_user;
    // } else {
    //   data.id_user_created = currentUser?.id_user;
    // }

    // Menghitung nilai fk_meter berdasarkan ratio_ct dan ratio_vt
    const ratio_ct = data?.ratio_ct ?? 0;
    const ratio_vt = data?.ratio_vt ?? 0;
    data.fk_meter = ratio_vt * ratio_ct;

    // Menyimpan data yang sudah diisi ke state atau data yang diperlukan
    setDataParams(data);
  };

  // console.log("errors", errors);


  return (
    <>
      <FormData
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        fields={JaringanTrafoGIField}
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
                  Trafo<RequiredInfo />
                </Form.Label>
                <Form.Control
                  {...register('nama_lokasi')}
                  isInvalid={errors.nama_lokasi}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.nama_lokasi?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='mt-3' controlId='id_gardu_induk'>
                <Form.Label>
                  Gardu Induk <RequiredInfo />
                </Form.Label>
                <SelectAsyncDynamic
                  fieldName="id_gardu_induk"
                  control={control}
                  errors={errors}
                  labelField={'nama_lokasi'}
                  valueField={'id_ref_lokasi'}
                  pathServiceName={'master.jaringan.ref_lokasi'}
                  queryParams={{ id_ref_jenis_lokasi: JENIS_LOKASI().gardu_induk }}
                  setValue={setValue}
                  options={dataSelected?.gardu_induk}
                ></SelectAsyncDynamic>
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
                  queryParams={{ id_ref_jenis_lokasi_in: `${JENIS_LOKASI().uiw},${JENIS_LOKASI().uid}` }}
                  setValue={setValue}
                  options={dataParams?.uid}
                ></SelectAsyncDynamic>
              </Form.Group>
              <div>
                {owners.map((pemilik, index) => (
                  <div key={index}>
                    <Form.Group className='mt-3 d-flex align-items-end' controlId={`pemilik`}>
                      <div style={{ flex: 1 }}>
                        <Form.Label>
                          Pengelola {index + 1}
                          {/* Jika Anda memiliki komponen RequiredInfo, tambahkan di sini */}
                        </Form.Label>
                        <Controller
                          control={control}
                          name={`pemilik`}
                          render={({ field }) => (
                            <SelectAsyncDynamic
                              {...field}
                              setValue={setValue}
                              control={control}
                              errors={errors}
                              fieldName={`pemilik`}
                              pathServiceName='master.jaringan.ref_lokasi'
                              labelField='nama_lokasi'
                              valueField='id_ref_lokasi'
                              placeholder='Pilih...'
                              isClearable={true}
                              queryParams={{
                                page: -1,
                                limit: -1,
                                status: 1,
                                id_ref_jenis_lokasi_in: `${JENIS_LOKASI().up2d},${JENIS_LOKASI().up2b},${JENIS_LOKASI().up3}`,
                              }}
                            />
                          )}
                        />
                      </div>
                      {index === owners.length - 1 && ( // Tampilkan tombol Tambah hanya pada pemilik terakhir
                        <Button className='ms-2' variant='primary' onClick={handleAddOwner}>
                          <i className='fa fa-plus' /> Tambah
                        </Button>
                      )}
                      {index !== owners.length - 1 && ( // Tampilkan tombol Hapus untuk semua pemilik kecuali yang terakhir
                        <Button
                          className='ms-2'
                          variant='danger'
                          onClick={() => handleRemoveOwner(pemilik.id)} // Ganti dengan fungsi yang sesuai untuk menghapus pemilik
                        >
                          <i className='fa fa-minus' /> Hapus
                        </Button>
                      )}
                    </Form.Group>
                  </div>
                ))}
              </div>
              <Form.Group className='mt-3' controlId='kapasitas'>
                <Form.Label>
                  Kapasitas (MVA) <RequiredInfo />
                </Form.Label>
                <Form.Control
                  {...register('kapasitas')}
                  type="number"
                  isInvalid={errors.kapasitas}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.kapasitas?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='mt-3' controlId='sub_sistem'>
                <Form.Label>
                  Subsistem<RequiredInfo />
                </Form.Label>
                <SelectAsyncDynamic
                  fieldName='sub_sistem'
                  pathServiceName='master.jaringan.ref_lokasi'
                  labelField='nama_lokasi'
                  valueField='id_ref_lokasi'
                  placeholder='Pilih...'
                  isClearable={true}
                  errors={errors}
                  control={control}
                  queryParams={{
                    page: -1,
                    limit: -1,
                    status: 1,
                    id_ref_jenis_lokasi: JENIS_LOKASI().subsistem
                  }}
                />
              </Form.Group>

              <Form.Group className='mt-3' controlId='status_trafo'>
                <Form.Label>
                  Status Trafo
                </Form.Label>
                <SelectFormStatic
                  control={control}
                  errors={errors}
                  fieldName="status_trafo"
                  placeholder='Pilih Status Trafo'
                  options={optionDataStatus}
                  defaultValue={dataSelected?.status_trafo}

                ></SelectFormStatic>

              </Form.Group>

              <Form.Group className='mt-3'>
                <Form.Label>
                  Jenis Trafo <RequiredInfo />
                </Form.Label>
                <SelectFormStatic
                  control={control}
                  errors={errors}
                  fieldName="jenis_trafo"
                  placeholder='Pilih Trafo'
                  options={optionData}
                  defaultValue={dataSelected?.jenis_trafo}

                ></SelectFormStatic>
              </Form.Group>
              <Form.Group className='mt-3' controlId='def_pengukuran_teg_primer'>
                <Form.Label>
                  Default Pengukuran Tegangan Primer
                </Form.Label>
                <Form.Control
                  {...register('def_pengukuran_teg_primer')}
                  isInvalid={errors.def_pengukuran_teg_primer}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.def_pengukuran_teg_primer?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='mt-3' controlId='def_pengukuran_teg_sekunder'>
                <Form.Label>
                  Default Pengukuran Tegangan Sekunder
                </Form.Label>
                <Form.Control
                  {...register('def_pengukuran_teg_sekunder')}
                  isInvalid={errors.def_pengukuran_teg_sekunder}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.def_pengukuran_teg_sekunder?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='mt-3' controlId='def_nilai_cosq'>
                <Form.Label>
                  Default Nilai COS PHI
                </Form.Label>
                <Form.Control
                  {...register('def_nilai_cosq')}
                  isInvalid={errors.def_nilai_cosq}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.def_nilai_cosq?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='mt-3'>
                <Form.Label>
                  Jenis Layanan <RequiredInfo />
                </Form.Label>
                <SelectFormStatic
                  control={control}
                  errors={errors}
                  fieldName="jenis_layanan"
                  placeholder='Pilih Jenis Layanan'
                  options={optionDataJenisLayanan}
                  defaultValue={dataSelected?.jenis_layanan}

                ></SelectFormStatic>
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

              {/* <Form.Group className='mt-3' controlId='lat'>
                <Form.Label>
                  Latitude <RequiredInfo />
                </Form.Label>
                <Form.Control
                  {...register('lat')}
                  isInvalid={errors.lat}
                  type="number"
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
                  type="number"
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.lon?.message}
                </Form.Control.Feedback>
              </Form.Group> */}
              {/* <Form.Group className='mt-3' controlId='kva'>
                <Form.Label>kVA</Form.Label>
                <Form.Control
                  {...register('kva')}
                  isInvalid={errors.kva}
                  type="number"
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.kva?.message}
                </Form.Control.Feedback>
              </Form.Group> */}
              {/* <Form.Group className='mt-3' controlId='phase'>
                <Form.Label>Phase</Form.Label>
                <Form.Control
                  {...register('phase')}
                  isInvalid={errors.phase}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.phase?.message}
                </Form.Control.Feedback>
              </Form.Group> */}
              {/* <Form.Group className='mt-3' controlId='no_urut'>
                <Form.Label>No Urut</Form.Label>
                <Form.Control
                  type="number"
                  {...register('no_urut')}
                  isInvalid={errors.no_urut}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.no_urut?.message}
                </Form.Control.Feedback>
              </Form.Group> */}
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

              <Form.Group>
                <Form.Label>Rekon Beban</Form.Label>
                <div className="ms-3 py-2">
                  <Form.Check
                    type="switch"
                    id="rekon_beban"
                    {...register("rekon_beban")}
                    label={watchRekon ? "Active" : "Inactive"}
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
