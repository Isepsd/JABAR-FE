import React, { useState, useEffect } from 'react';
// import { Form, Modal, Row, Col } from 'react-bootstrap';
import { Form, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import ButtonCancel from '@app/components/Button/ButtonCancel';
import { API_PATH } from '@app/services/_path.service';
import Button from '@app/components/Button/Button';
import RequiredInfo from '@app/components/Info/RequiredInfo';
import axios from 'axios';
import { postByPath, getAllByPath } from '@app/services/main.service';
// import { postByPath } from '@app/services/main.service';
import { get } from 'lodash';
// import moment from 'moment';
// import FormDataModal from '@app/modules/Form/FormDataModal';
// import FormDataModal from '@app/modules/Form/FormData_currentUser';
import FormDataModal from '@app/modules/Form/FormData_currentUser_postpath';
// import { get } from 'lodash';
// import moment from 'moment';
// import { UpdatePadamField, InputLaporanField } from './input_laporan.interface';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
import SelectFormStatic from '@app/modules/SelectForm/SelectFormStatic';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
import { InputLaporan, InputLaporanField } from './input_laporan.interface';
// import ReactTable from '@app/components/ReactTable';
// import TableMonitoringTree from '@app/modules/APKT/TableMonitoringTree';
// import TableData from '@app/modules/Table/TableData';
import TableDataJqxGrid from "@app/modules/Table/TableDataJqxGridNew";
import { FORM_INPUT_LAPORANJQ } from '@app/configs/react-table/apkt.columns.config'
import { notificationTemplate } from '@app/helper/notificationTemplate';
import { addNotification } from '@app/store/notification/notification.action';
// import store from '@store/index';
// import { notificationTemplate } from '@app/helper/notificationTemplate';
// import { addNotification } from '@app/store/notification/notification.action';
// function FormInputLaporanJQ({ dataSelected }: any) {
// function FormInputLaporanJQ({ isPenyulang = false }: any) {
function FormInputLaporanJQ() {

  const { currentUser } = useSelector((state: any) => state.auth);
  const source = axios.CancelToken.source();
  const [loading, setLoading] = useState<boolean>(false);



  const [dataParams,
    setDataParams
  ] = useState<any>(
      // {
      //   id_pusat:
      //     optionCurrentUser?.level == "PUSAT"
      //       ? optionCurrentUser?.id_unit_lokasi
      //       : null,
      //   id_regional:
      //     optionCurrentUser?.level == "REGIONAL"
      //       ? optionCurrentUser?.id_unit_lokasi
      //       : null,
      //   id_pemilik:
      //     optionCurrentUser?.level == "UNIT_INDUK"
      //       ? optionCurrentUser?.id_unit_lokasi
      //       : null,
      //   id_pengelola:
      //     optionCurrentUser?.level == "UP2D" || optionCurrentUser?.level == "UP3"
      //       ? optionCurrentUser?.id_unit_lokasi
      //       : null,
      //   id_uid:
      //     optionCurrentUser?.level == "UP2D" || optionCurrentUser?.level == "UP3"
      //       ? optionCurrentUser?.id_unit_lokasi
      //       : null,
      //   id_sub_pengelola:
      //     optionCurrentUser?.level == "ULP"
      //       ? optionCurrentUser?.id_unit_lokasi
      //       : null,
      // }
    );


  /** Dari Table Tree ///////////////////////////////*/


  const [dataSelected, setDataSelected] = useState<any>();
  // const [idApktTransJar, setIdApktTransJar] = useState(null);
  // const [idApktTransJar, setIdApktTransJar] = useState<string | null>(null);
  const [idApktTransJar, setIdApktTransJar] = useState<string>();
  const handleRowsSelected = (item: any) => {
    setDataSelected(item.current);
  };
  const dispatch = useDispatch();


  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      // if (item?.id_ref_lokasi === idPenyulang) {
      dataTableValue.push({
        ...item,
        no_apkt: item?.no_apkt || item?.ref_apkt_trans_jar?.no_apkt,
        nama_lokasi: item?.nama_lokasi,
        kode_lokasi: item?.kode_lokasi,
        id_parent_lokasi: item?.id_parent_lokasi,
        fungsi_lokasi: item?.fungsi_lokasi,
        id_ref_lokasi: item?.id_ref_lokasi,
      }

      );
      // } else {
      // }
    });
    // setDataRows(dataTableValue)
    return dataTableValue;
  }

  const dispatchNotification = (msg: string = '', type: string = '') => {
    const notification = notificationTemplate(msg, type);
    dispatch(addNotification({ ...notification, message: msg, type: type }));
  };

  useEffect(() => {
    // Logika di sini tidak menggunakan rowSelected
    console.log("Effect running");

    // Jika kamu ingin melakukan sesuatu yang tidak bergantung pada rowSelected
    // Tambahkan logika di sini
  }, [setDataParams]); // Meskipun rowSelected ada di sini, logika di dalam useEffect tidak terpengaruh oleh perubahan rowSelected.


  /** Dari Table Tree ///////////////////////////////*/


  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    nama_laporan: Yup.string().nullable(),
    tgl_laporan: Yup.string().required("Data Harus diisi"),
    jenis_laporan: Yup.string().nullable(),
    parent_aset: Yup.string().nullable(),
    feeder: Yup.string().nullable(),
    status_apkt_kirim_padam: Yup.string().nullable(),
    tgl_padam: Yup.string().nullable(),
  });

  const [formModel] = useState<any>({
  });
  const { register, handleSubmit, setValue, setError, control, formState } =
    useForm<any>({
      resolver: yupResolver(validationSchema),
      defaultValues: formModel,
    });
  const { errors }: any = formState || {};

  const watchUnitInduk = useWatch({ control, name: 'parent_aset' });
  const watchStatus = useWatch({ control, name: 'status_apkt_kirim_padam' });
  // const watchFeeder = useWatch({ control, name: 'feeder' });
  const watchtgl_laporan = useWatch({ control, name: 'tgl_laporan' });
  const watchPenyulang = useWatch({ control, name: 'id_feeder' }); // ganti 'nama_laporan' dengan nama field penyulang jika berbeda
  // const watchNamaPenyulangAsli = useWatch({ control, name: 'nama_laporan' });

  // useEffect(() => {
  //   if (watchPenyulang) {
  //     setValue('nama_laporan', watchPenyulang);
  //   }
  // }, [watchPenyulang, setValue]);

  const OptionJenisLaporan = [
    { value: 'GANGGUAN', label: 'GANGGUAN' },
    { value: 'PEMELIHARAAN', label: 'PEMELIHARAAN' },
  ]
  /** WATCH / SUBSCRIBVE FORM CHANGES */


  useEffect(() => {
    if (watchtgl_laporan) {
      setValue('tgl_padam', watchtgl_laporan);
    }
  }, [watchtgl_laporan, setValue]);

  // useEffect(() => {
  useEffect(() => {
    console.log("watchPenyulang value: ", watchPenyulang);
    if (watchPenyulang) {
      const fetchNamaLokasi = async () => {
        try {
          const params = {
            id_ref_lokasi: watchPenyulang,
            page: 1,
            limit: 10,
          };
          console.log("Memulai fetchNamaLokasi...");
          const response1:any = await getAllByPath(API_PATH().master.jaringan.ref_lokasi, params, source.token);
          console.log("Response dari API: ", response1);
          if (response1) {
            const result1 = response1.results;
            const namaLokasi = result1[0].nama_lokasi;
            const id_pusat = result1[0].id_pusat;
            const id_regional = result1[0].id_regional;
            const id_pemilik = result1[0].id_pemilik;
            const id_pengelola = result1[0].id_pengelola;
            const id_sub_pengelola = result1[0].id_sub_pengelola;
            console.log('ini untuk result1nya : ', result1);
            // if (namaLokasi) {
            setValue('nama_laporan', namaLokasi);
            setValue('lokasi', namaLokasi);
            setValue('id_pusat', id_pusat);
            setValue('id_regional', id_regional);
            setValue('id_pemilik', id_pemilik);
            setValue('id_pengelola', id_pengelola);
            setValue('id_sub_pengelola', id_sub_pengelola);
            console.log("Nama Lokasi di-set: ", namaLokasi); // Log di sini
            // }
          }
        } catch (error) {
          console.log("Error fetching nama_lokasi:", error);
        }
      };
      fetchNamaLokasi();
    }
  }, [watchPenyulang, setValue]);


  const onSubmitFormToPath2 = async (data: InputLaporan) => {
    let message;

    try {

      let params = {
        ...data,
        status_apkt_kirim_padam: data.status_apkt_kirim_padam == 'true' ? 1 : 0,
        // nama_lokasi: watchNamaPenyulangAsli, // Use the watched value
      };

      // const datas = { datas: params };
      const datas = params;
      console.log({ datas: datas });


      const response:any = await postByPath(get(API_PATH(), "apkt.trans_jar"),
        params,
        // params?.id_apkt_trans_jar_det,
        source.token,
      );

      if (response && response.status === 201) {
        // const message = response.message;
        const results = response.results;
        setIdApktTransJar(results?.id_apkt_trans_jar);
        console.log("ID Apkt Trans Jar:", results?.id_apkt_trans_jar);
      } else {
        console.log("Response tidak berhasil:", response);
      }
    }
    catch (err: any) {
      setLoading(false);
      dispatchNotification(`Gagal ${message ? message : ''}`, 'danger');
    }
  };


  const onSubmitFormToPath1 = async () => {

    try {

      const params = dataSelected.map((item: any) => ({
        // ...data,
        // status_apkt_kirim_padam: data.status_apkt_kirim_padam == 'true' ? 1 : 0,
        nama_lokasi: item?.nama_lokasi,
        kode_lokasi: item?.kode_lokasi,
        id_parent_lokasi: item?.id_parent_lokasi,
        fungsi_lokasi: item?.fungsi_lokasi,
        id_apkt_trans_jar: idApktTransJar,  // Gunakan ID yang disimpan
      }));

      // const datas = { datas: params };
      const datas = params;
      console.log({ datas: datas });
      await postByPath(get(API_PATH(), "apkt.trans_jar_detail"),
        params,
        // params?.id_apkt_trans_jar_det,
        source.token,
      );
      // dispatchNotification(`Sukses ${message ? message : ''}`, 'success');
      // getAllData();
    } catch (err: any) {
      setLoading(false);
      // dispatchNotification(`Gagal ${message ? message : ''}`, 'danger');
    }
    // }
  };
  useEffect(() => {
    if (idApktTransJar) {
      onSubmitFormToPath1();
      console.log('disini path 1 :', idApktTransJar);
    }
    else {
      console.log('disini path 1 : gagal');
    }
  }, [idApktTransJar]); // Memanggil onSubmitFormToPath2 saat idApktTransJar diperbarui

  const onSubmitForm = async (data: InputLaporan) => {
    // await onGetNama_laporan();
    await onSubmitFormToPath2(data);
    console.log("ID Apkt Trans Jar after onSubmitFormToPath2:", idApktTransJar);
  };








  useEffect(() => {
    return () => {
      source.cancel('Request Canceled');
    };
  }, []);

  return (
    <>
      <FormDataModal
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        fields={InputLaporanField}
        path={API_PATH().apkt.trans_jar_detail_batch}
        onLoading={setLoading}
        optionCurrentUser={currentUser}
        batch={true}
      >
        <Col md="7">
          <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
            {/* <Modal.Body> */}
            <Row>
              <Form.Group className='mb-3'>
                <Form.Label>
                  Tanggal Laporan
                  <RequiredInfo />
                </Form.Label>
                <Form.Control
                  isInvalid={errors?.tgl_laporan as boolean | undefined}
                  type='datetime-local'
                  formTarget='YYYY-MM-DD HH:mm:ss'
                  {...register('tgl_laporan')}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.tgl_laporan?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='mt-3' controlId='jenis_laporan'>
                <Form.Label>Jenis Laporan</Form.Label>
                <SelectFormStatic
                  control={control}
                  errors={errors}
                  fieldName={'jenis_laporan'}
                  options={OptionJenisLaporan}
                ></SelectFormStatic>
              </Form.Group>
              <Form.Group className='mb-3' controlId='parent_aset'>
                <Form.Label>GI</Form.Label>
                <SelectAsyncDynamic
                  fieldName='parent_aset'
                  labelField={'nama_lokasi'}
                  valueField={'id_ref_lokasi'}
                  pathServiceName={'master.jaringan.ref_lokasi'}
                  queryParams={{ id_ref_jenis_lokasi: JENIS_LOKASI().gardu_induk }}
                  setValue={setValue}
                  placeholder='Pilih...'
                  isClearable={true}
                  errors={errors}
                  control={control}
                // isSearchable={false}
                />
              </Form.Group>
              <Form.Group className='mt-3' controlId='id_feeder'>
                <Form.Label>
                  Penyulang <RequiredInfo />
                </Form.Label>
                <SelectAsyncDynamic
                  fieldName="id_feeder"
                  fieldNameParent="id_gardu_induk"
                  pathServiceName={'master.jaringan.ref_lokasi'}
                  labelField={'nama_lokasi'}
                  // valueField={'nama_lokasi'}
                  valueField={'id_ref_lokasi'}
                  control={control}
                  errors={errors}
                  queryParams={{
                    // id_ref_jenis_lokasi: watchUnitInduk ? JENIS_LOKASI().penyulang : JENIS_LOKASI().kosong 
                    id_ref_jenis_lokasi:
                      watchUnitInduk
                        ? (JENIS_LOKASI() as any)["penyulang"]
                        : (JENIS_LOKASI() as any)["kosong"],
                  }}
                  setValue={setValue}
                  watchParent={watchUnitInduk}
                  isDisabled={!watchUnitInduk}
                  isClearable={true}
                  required={true}
                // options={dataSelected?.feeder}
                ></SelectAsyncDynamic>
              </Form.Group>
              {/* {watchPenyulang && (
                <Form.Group className='mt-3' controlId='nama_laporan'>
                  <Form.Label>
                    Nama Penyulang Asli<RequiredInfo />
                  </Form.Label>
                  <SelectAsyncDynamic
                    fieldName="nama_laporan"
                    fieldNameParent="id_feeder"
                    pathServiceName={'master.jaringan.ref_lokasi'}
                    labelField={'nama_lokasi'}
                    // valueField={'nama_lokasi'}
                    valueField={'nama_lokasi'}
                    control={control}
                    errors={errors}
                    queryParams={{
                      // id_ref_jenis_lokasi: watchUnitInduk ? JENIS_LOKASI().penyulang : JENIS_LOKASI().kosong 
                      id_ref_jenis_lokasi:
                        watchUnitInduk
                          ? (JENIS_LOKASI() as any)["penyulang"]
                          : (JENIS_LOKASI() as any)["kosong"],
                      id_ref_lokasi: watchPenyulang ? watchPenyulang : null,
                    }}
                    setValue={setValue}
                    watchParent={watchUnitInduk}
                    isDisabled={!watchUnitInduk}
                    isClearable={true}
                    required={true}
                  // options={dataSelected?.feeder}
                  ></SelectAsyncDynamic>
                </Form.Group>
              )} */}
              <Form.Group className='mb-3'>
                <Form.Label>Kirim APKT</Form.Label>
                <div className='ms-3 py-2'>
                  <Form.Check
                    type='switch'
                    // type='checkbox'
                    id='status_apkt_kirim_padam'
                    {...register('status_apkt_kirim_padam')}
                    label={watchStatus === true ? 'Ya' : 'Tidak'}
                  // label={watchStatus ? 'Ya' : 'Tidak'}
                  />
                </div>
              </Form.Group>
            </Row>
            {/* </Modal.Body>
            <Modal.Footer> */}
            {/* <div className='d-flex gap-2'> */}

            {/* Dari Table Tree ///////////////////////////////*/}
            {watchPenyulang &&

              <TableDataJqxGrid
                path={API_PATH().master.jaringan.ref_lokasi}
                dataFieldsColsConfig={FORM_INPUT_LAPORANJQ()}
                primaryKey={"id_ref_lokasi"}
                selectionmode={"checkbox"}
                respDataApi={handleRespDataApi}
                // serachBar={true}
                onRowSelected={handleRowsSelected}
                reloadbtn={false}
                filterParams={{
                  // id_penyulang: idPenyulang
                  id_ref_jenis_lokasi: JENIS_LOKASI().gardu_distribusi,
                  id_penyulang: watchPenyulang ? watchPenyulang : "xxxxx-xx",
                }}
              />
            }
            {/* Dari Table Tree ///////////////////////////////*/}

            <Form.Group className='mt-4'>
              <ButtonCancel />
              <Button
                type='submit'
                variant='primary'
                disabled={loading}
              // isLoading={loading}
              >
                Simpan
              </Button>
            </Form.Group>
            {/* </div> */}
            {/* </Modal.Footer> */}
          </Form>

        </Col>
      </FormDataModal>
    </>
  );
}

export default FormInputLaporanJQ;

// export interface TreeJaringanForm {
//   rowSelect?: boolean;
//   rowSelectType?: string;
//   onCheckedRows?: any;
//   dataSelected?: any;
//   filterParams?: any;
//   path?: any;
//   configColumns?: any;
//   move?: boolean;
// }
