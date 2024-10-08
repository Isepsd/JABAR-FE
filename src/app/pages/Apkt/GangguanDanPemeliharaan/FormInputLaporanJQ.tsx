import React, { useState, useEffect, useMemo, useCallback } from 'react';
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
import { get } from 'lodash';
import FormDataModal from '@app/modules/Form/FormData_currentUser_postpath';
import SelectFormStatic from '@app/modules/SelectForm/SelectFormStatic';
import { InputLaporan, InputLaporanField } from './input_laporan.interface';
import moment from 'moment';
import { useNavigate  } from 'react-router-dom';

//old
import { FORM_INPUT_LAPORAN_NEW_JQ } from '@app/configs/react-table/apkt.columns.config'

//new
import TreeGridComponent from '@app/components/JqxTreeGrid/JqxTreeGrid copy';
import Select from 'react-select';
import { ReactSelectStyle } from '@app/configs/react-select.config';

import { notificationTemplate } from '@app/helper/notificationTemplate';
import { addNotification } from '@app/store/notification/notification.action';
function FormInputLaporanJQ() {

  const { currentUser } = useSelector((state: any) => state.auth);
  const source = axios.CancelToken.source();
  const [loading, setLoading] = useState<boolean>(false);



  const [dataParams,
    setDataParams
  ] = useState<any>(
    );

    const history = useNavigate ();
  
  /** Dari Table Tree ///////////////////////////////*/
  //old
  const [idApktTransJar, setIdApktTransJar] = useState<string>();
  const dispatch = useDispatch();

  const dispatchNotification = (msg: string = '', type: string = '') => {
    const notification = notificationTemplate(msg, type);
    dispatch(addNotification({ ...notification, message: msg, type: type }));
  };

  useEffect(() => {
    console.log("Effect running");
  }, [setDataParams]); // Meskipun rowSelected ada di sini, logika di dalam useEffect tidak terpengaruh oleh perubahan rowSelected.


  //new
  const loadChildren = useCallback(async (): Promise<any[]> => {
    return [];
  }, []);
  const [dataCheck, setDataCheck] = useState<any>();
  const handleRowSelect = (item: any) => {
    console.log('ini masuk data selected', item.current);
  };
  const handleRowChecked = useCallback((row: any) => {
    setDataCheck(row);
    console.log(row);
  }, []);

  const sc = axios.CancelToken.source();
  const [filters, setFilters] = useState<any>(null);
  const [garduInduk, setGarduInduk] = useState<any>();
  const [garduIndukOptions, setGarduIndukOptions] = useState<any[]>([]);
  //Get data Gardu induk
  const getAllDataGarduInduk = useCallback(async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    try {
      const params = {
        page: '-1',
        limit: -1,
        id_ref_jenis_lokasi: '7b94de4b-5a60-4f83-b9b6-7ae60e508cc5',//jenis lokasi Gardu Induk
        sort_by: 'nama_lokasi',
      };

      const req: any = await getAllByPath(API_PATH().master.jaringan.ref_lokasi, params, sc.token);
      const { results } = req;

      let data: any = results.map((d: any) => {
        return { ...d, label: d.nama_lokasi, value: d.id_ref_lokasi };
      });
      setGarduIndukOptions(data);
    } catch (err: any) {
    }
  }, [sc.token]);

  useEffect(() => {
    getAllDataGarduInduk();
  }, []);


  const [penyulang, setPenyulang] = useState<any>();
  const [penyulangOptions, setPenyulangOptions] = useState<any[]>([]);
  // Function to get Penyulang data based on selected Gardu Induk
  const getPenyulangOptions = useCallback(async (garduIndukId: string) => {
    try {
      const params = {
        page: '-1',
        limit: -1,
        id_ref_jenis_lokasi: '88130fe7-eddf-4717-883d-784eefedde5d', // Replace with actual Penyulang ID
        id_gardu_induk: garduIndukId, // Pass the selected Gardu Induk ID
        sort_by: 'nama_lokasi',
      };
      const req: any = await getAllByPath(API_PATH().master.jaringan.ref_lokasi, params, sc.token);
      const { results } = req;
      const data = results.map((d: any) => ({
        ...d, label: d.nama_lokasi, value: d.id_ref_lokasi,
      }));
      setPenyulangOptions(data);
    } catch (err: any) {
      console.error('Error fetching Penyulang data:', err);
    }
  }, [sc.token]);

  // Handle Gardu Induk selection change
  const changeGarduIndukOptions = useCallback((selected: any) => {
    setGarduInduk(selected);
    if (selected) {
      getPenyulangOptions(selected.value); // Fetch Penyulang options based on Gardu Induk
    }
  }, [getPenyulangOptions]);

  // Handle Penyulang selection change
  const changePenyulangOptions = useCallback((selected: any) => {
    setPenyulang(selected);
    setFilters((prev: any) => ({
      ...prev,
      id_ref_lokasi: selected?.value,
    }));
  }, []);

  const memoizedTreeGridProps = useMemo(() => ({
    showToolbar: true,
    checkboxes: true,
    path: API_PATH().master.jaringan.tree_jaringan,
    loadChildren: loadChildren,
    showInsertButton: false,
    showRefreshButton: true,
    showClearButton: true,
    showexcelButton: true,
    showActionButtons: false,
    onRowSelect: handleRowSelect,
    filterParams: { sort_by: 'nama_lokasi', ...filters },
    dataFieldsColsConfig: FORM_INPUT_LAPORAN_NEW_JQ(),
    primaryKey: 'id_ref_lokasi',
    onRowCheck: handleRowChecked
  }), [filters]);
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

  const { register, handleSubmit, setValue, setError, control, formState } =
    useForm<any>({
      resolver: yupResolver(validationSchema),
      defaultValues: {
        tgl_laporan: moment().format('YYYY-MM-DD'), // Set current date using moment
        status_apkt_kirim_padam: 0, // Set default value here
      },
    });
  const { errors }: any = formState || {};

  useEffect(() => {
    // Set static values if needed
    setValue('tgl_laporan', moment().format('YYYY-MM-DD'));
    setValue('status_apkt_kirim_padam', 0);
  }, [setValue]);

  const watchtgl_laporan = useWatch({ control, name: 'tgl_laporan' });
  

  const OptionJenisLaporan = [
    { value: 'GANGGUAN', label: 'GANGGUAN' },
    { value: 'PEMELIHARAAN', label: 'PEMELIHARAAN' },
  ]

  const OptionKirimPadam = [
    { value: '1', label: 'Kirim' },
    { value: '0', label: 'Tidak Kirim' },
  ]
  /** WATCH / SUBSCRIBVE FORM CHANGES */


  useEffect(() => {
    if (watchtgl_laporan) {
      setValue('tgl_padam', watchtgl_laporan);
      console.log('tgl_padam', watchtgl_laporan);
    }
  }, [watchtgl_laporan, setValue]);


  useEffect(() => {
    console.log("penyulang value: ", penyulang);
    if (penyulang) {
      const fetchNamaLokasi = async () => {
        try {
          const params = {
            id_ref_lokasi: penyulang.value, // Access the value from the selected object
            page: 1,
            limit: 10,
          };
          console.log("Memulai fetchNamaLokasi...");
          const response1: any = await getAllByPath(API_PATH().master.jaringan.ref_lokasi, params, source.token);
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
            setValue('nama_laporan', namaLokasi);
            setValue('lokasi', namaLokasi);
            setValue('id_pusat', id_pusat);
            setValue('id_regional', id_regional);
            setValue('id_pemilik', id_pemilik);
            setValue('id_pengelola', id_pengelola);
            setValue('id_sub_pengelola', id_sub_pengelola);
            console.log("Nama Lokasi di-set: ", namaLokasi);
          }
        } catch (error) {
          console.log("Error fetching nama_lokasi:", error);
        }
      };
      fetchNamaLokasi();
    }
  }, [penyulang, setValue]); // Gunakan penyulang di sini


  const onSubmitFormToPath2 = async (data: InputLaporan) => {
    let message;

    try {

      let params = {
        ...data,
        status_apkt_kirim_padam: data.status_apkt_kirim_padam == 'true' ? 1 : 0,
      };
      const datas = params;
      console.log({ datas: datas });


      const response: any = await postByPath(get(API_PATH(), "apkt.trans_jar"),
        params,
        source.token,
      );

      if (response && response.status === 201) {
        console.log("Response Path 2 Success:", response);
        const results = response.results;
        setIdApktTransJar(results?.id_apkt_trans_jar);
        // console.log("ID Apkt Trans Jar:", results?.id_apkt_trans_jar);
      } else {
        console.log("Response tidak berhasil:", response);
      }
    }
    catch (err: any) {
      console.error("Error submitting Path 2:", err);
      setLoading(false);
      dispatchNotification(`Gagal ${message ? message : ''}`, 'danger');
    }
  };


  const onSubmitFormToPath1 = async () => {

    try {

      let dataRows = dataCheck.map((row: any) => ({
        gardu_mjd: row?.nama_lokasi,
        kode_lokasi: row?.kode_lokasi,
        id_parent_lokasi: row?.id_parent_lokasi,
        id_lokasi: row?.id_ref_lokasi,
        fungsi_lokasi: row?.fungsi_lokasi,
        id_apkt_trans_jar: idApktTransJar,  // Gunakan ID yang disimpan
        tgl_padam: '2024-09-04 00:00:00',
        status_apkt_kirim_padam: 0,
        status_apkt_kirim_nyala: 0,
      }));

      let params = {
        event: 'new',
        data: dataRows,  // Asumsikan server mengharapkan array data ini di dalam kunci 'data'
      };

      const datas = params;
      console.log({ datas: datas });
      const response: any =  await postByPath(get(API_PATH(), "apkt.trans_jar_detail"),
        params,
        source.token,
      );
      if (response && response.status === 201) {
        console.log("Data berhasil dikirim ke Path 1:", response);
        // Navigasi ke halaman utama
      history('/apkt/gangguan-dan-pemeliharaan');
      } else {
        console.error("Error submitting Path 1:", response);
      }
    } catch (err: any) {
      setLoading(false);
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
                  <p style={{ color: 'red' }}><i>*YYYY-MM-DD</i></p>
                </Form.Label>
                <Form.Control
                  isInvalid={errors?.tgl_laporan as boolean | undefined}
                  // type='datetime-local'
                  type='datetime'
                  // type='date'
                  formTarget='YYYY-MM-DD HH:mm:ss'
                  {...register('tgl_laporan')}
                // styles={ReactSelectStyle}
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
                <Select
                  placeholder='Pilih Gardu Induk'
                  styles={ReactSelectStyle}
                  value={garduInduk}
                  onChange={changeGarduIndukOptions}
                  options={garduIndukOptions}
                />
              </Form.Group>
              <Form.Group className='mt-3' controlId='id_feeder'>
                <Form.Label>
                  Penyulang <RequiredInfo />
                </Form.Label>
                <Select
                  placeholder='Pilih Penyulang'
                  styles={ReactSelectStyle}
                  value={penyulang}
                  onChange={changePenyulangOptions}
                  options={penyulangOptions}
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Kirim APKT</Form.Label>
                <SelectFormStatic
                  control={control}
                  errors={errors}
                  fieldName={'status_apkt_kirim_padam'}
                  options={OptionKirimPadam}
                ></SelectFormStatic>
                {/* </div> */}
              </Form.Group>
            </Row>

            {/* Dari Table Tree ///////////////////////////////*/}

            <div className='mt-4'>
              {penyulang &&

                <TreeGridComponent {...memoizedTreeGridProps} />
              }
            </div>

            {/* Dari Table Tree ///////////////////////////////*/}

            <Form.Group className='mt-4'>
              <ButtonCancel />
              <Button type="submit" variant='primary' isLoading={loading} onClick={handleSubmit(onSubmitForm)}>Simpan</Button>
            </Form.Group>
          </Form>

        </Col>
      </FormDataModal>
    </>
  );
}

export default FormInputLaporanJQ;

