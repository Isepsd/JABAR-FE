import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Row, Form, Col } from 'react-bootstrap';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import ButtonCancel from '@app/components/Button/ButtonCancel';
import FormData from '@app/modules/Form/FormData';

import RequiredInfo from '@app/components/Info/RequiredInfo';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
import { API_PATH } from '@app/services/_path.service';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
import Button from '@app/components/Button/Button';
import SelectFormStatic from '@app/modules/SelectForm/SelectFormStatic';
import FormMappingScada from '@app/modules/MasterData/FormMappingScada';
import { FUNGSI_SCADA_GH, JENIS_GARDU_GH } from '@app/configs/select-options/jaringan.select';
import { IJaringanGarduHubung, JarianganGarduHubungField } from '@app/interface/jaringan-gardu-hubung.interface';

export default function JarGarduHubungFormPage() {
  const { id } = useParams();

  const { currentUser } = useSelector((state: any) => state.auth);

  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();
  const [dataSelected, setDataSelected] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    nama_lokasi: Yup.string().required('Nama Wajib diisi'),
    kode_lokasi: Yup.string().nullable(),
    alamat: Yup.string().nullable(),
    // id_unit_pembangkit: Yup.number().typeError('Belum pilih unit pembangkit').required('Belum pilih unit pembangkit'),
    // id_pembangkit: Yup.number().typeError('Belum pilih pembangkit').required('Belum pilih pembangkit'),
    // id_gardu_induk: Yup.number().typeError('Belum pilih gardu induk').required('Belum pilih gardu induk'),
    // id_trafo_gi: Yup.number().typeError('Belum pilih Trafo').required('Belum pilih Trafo'),
    // id_penyulang: Yup.number().typeError('Belum pilih penyulang').required('Belum pilih penyulang'),
    // id_zone: Yup.number().typeError('Belum pilih zone').required('Belum pilih zone'),
    // id_section: Yup.number().typeError("Belum pilih section").required('Belum pilih section'),
    // id_segment: Yup.number().typeError("Belum pilih segment").required('Belum pilih segment'),
    // id_gardu_distribusi: Yup.number().typeError("Belum pilih gardu distribusi").required('Belum pilih gardu distribusi'),
    // id_trafo_gd: Yup.number().typeError("Belum pilih trafo GD").required('Belum pilih trafo GD'),
    pemilik: Yup.string().nullable(),
    id_gardu_induk: Yup.string().nullable(),
    id_gardu_hubung: Yup.string().nullable(),
    id_penyulang: Yup.string().nullable(),
    status_listrik: Yup.string().nullable().transform((_, v) => (v == '1' ? '1' : '0')),
    rekon_beban: Yup.string().nullable().transform((_, v) => (v == '1' ? '1' : '0')),
    lat: Yup.number().typeError("Latitude harus number").required('Latitude Wajib diisi'),
    lon: Yup.number().typeError("Longitude harus number").required('Longitude Wajib diisi'),
    fungsi_scada: Yup.string().nullable(),
    jenis_gardu: Yup.string().nullable(),
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
  const watchRekon = useWatch({ control, name: 'rekon_beban' });
  const watchStatus = useWatch({ control, name: 'status_listrik' });
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
  const onSubmitForm = (data: IJaringanGarduHubung) => {
    data.id_parent_lokasi = data?.id_gardu_induk ? data?.id_gardu_induk : data?.id_penyulang;
    // data.id_ref_jenis_lokasi = JENIS_LOKASI().gardu_hubung;
    data.id_ref_jenis_lokasi = JENIS_LOKASI().keypoint;
    data.fungsi_lokasi = 'GH';
    data.tree_jaringan = 1;
    if (id) {
      data.id_user_updated = currentUser.id_user
    } else {
      data.id_user_created = currentUser.id_user
    }
    setDataParams(data);
  };

  return (
    <>
      <FormData
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        fields={JarianganGarduHubungField}
        path={API_PATH().master.jaringan.ref_lokasi}
        customLabel='state'
        onLoading={setLoading}
        onGetDataResult={setDataSelected}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row className='mb-3'>
            <Col md="7">
              <Form.Group className='mt-3' controlId='kode_lokasi'>
                <Form.Label>
                  Kode Gardu Hubung <RequiredInfo />
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
                <Form.Label>Nama Gardu Hubung<RequiredInfo /></Form.Label>
                <Form.Control
                  {...register('nama_lokasi')}
                  isInvalid={errors.nama_lokasi}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.nama_lokasi?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='mt-3' controlId='alamat'>
                <Form.Label>Alamat </Form.Label>
                <Form.Control
                  as="textarea"
                  {...register('alamat')}
                  isInvalid={errors.alamat}
                  style={{ height: '7.8rem' }}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.alamat?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <div>
                {owners.map((pemilik, index) => (
                  <div key={index}>
                    <Form.Group className='mt-3 d-flex align-items-end' controlId={`nama${pemilik.id}`}>
                      <div style={{ flex: 1 }}>
                        <Form.Label>
                          Pengelola {index + 1}
                          {/* Jika Anda memiliki komponen RequiredInfo, tambahkan di sini */}
                        </Form.Label>
                        <Controller
                          control={control}
                          name={`nama${pemilik.id}`}
                          render={({ field }) => (
                            <SelectAsyncDynamic
                              {...field}
                              setValue={setValue}
                              control={control}
                              errors={errors}
                              fieldName={`nama${pemilik.id}`}
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
              <Form.Group className='mt-3'>
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
              {/* <Form.Group className='mt-3'>
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
              </Form.Group> */}
              <Form.Group className='mt-3' controlId='jenis_gardu'>
                <Form.Label>Jenis Gardu</Form.Label>
                <SelectFormStatic
                  control={control}
                  errors={errors}
                  fieldName="jenis_gardu"
                  options={JENIS_GARDU_GH}
                  placeholder="Pilih ..."
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.jenis_gardu?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='mt-3'>
                <Form.Label>
                  Fungsi Scada <RequiredInfo />
                </Form.Label>
                <SelectFormStatic
                  control={control}
                  errors={errors}
                  fieldName="fungsi_scada"
                  placeholder='Pilih Fungsi Scada'
                  options={FUNGSI_SCADA_GH}
                  defaultValue={dataSelected?.fungsi_scada}

                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.fungsi_scada?.message}
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

              <Form.Group className='mt-3' controlId='lat'>
                <Form.Label>Latitude <RequiredInfo /></Form.Label>
                <Form.Control type='number'
                  {...register('lat')}
                  isInvalid={errors.lat}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.lat?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='mt-3' controlId='lon'>
                <Form.Label>Longitude <RequiredInfo /></Form.Label>
                <Form.Control type='number'
                  {...register('lon')}
                  isInvalid={errors.lon}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.lon?.message}
                </Form.Control.Feedback>
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
            <Button type='submit' variant='primary' isLoading={loading}>Simpan</Button>
            <ButtonCancel />
          </Form.Group>
        </Form>
      </FormData>
    </>
  );
}
