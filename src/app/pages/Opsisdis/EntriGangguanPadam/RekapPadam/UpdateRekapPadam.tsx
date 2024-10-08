import React, {  useEffect, useState } from 'react';
import { Card, Col, Row, Form,Table } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { postByPath } from'@app/services/main.service';// Pastikan path ini sesuai dengan lokasi `postByPath`
// import { Dispatch } from 'redux'; // Sesuaikan dengan cara Anda mengimpor Dispatch
import SelectFormStaticTable from "@app/modules/SelectForm/SelectFormStaticTable";
import FormData from '@app/modules/Form/FormData';
import Button from '@app/components/Button/Button';
import SelectAsyncDynamicTable from "@app/modules/SelectForm/SelectAsyncDynamicTable";

import CustomDialogDelete from './CustomDialogDelete'; 
import CardWidget from '@app/components/Card/CardWidget';

import {  FAULT_INDIKATOR,OPTION_FAI_MTRZ,STATUS_PERFORM ,OPTION_URAIAN,OPTION_PERALATAN} from "@app/configs/select-options/rekap_padam.select";
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
import {
  EditRekapPadamField,
  IUpdateRekapPadam,
} from '@app/interface/rekap-padam/edit-form-rekap-padam.interface';
import axios from 'axios';

import { useDispatch } from 'react-redux';
import { API_PATH } from '@app/services/_path.service';
// import InfoRekapPadamForm from './InfoRekapPadamForm';
import PemeriksaanLanjutanForm from './PemeriksaanLanjutanForm';
import { useNavigate } from 'react-router-dom';
import InputDate from '@app/components/Date/InputDate';
import { notificationTemplate } from '@app/helper/notificationTemplate';
import { addNotification } from '@app/store/notification/notification.action';
function UpdateRekapPadam() {
  const dispatch = useDispatch();
  const dispatchNotification = (msg: string = '', type: string = '') => {
    const notification = notificationTemplate(msg, type);
    dispatch(addNotification({ ...notification, message: msg, type: type }));
  };
  const [loading, setLoading] = useState<boolean>(false);
  const [dialogMessageDelete, setDialogMessageDelete] = useState('');
  const [isDialogOpenDelete, setIsDialogOpenDelete] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null); // Menyimpan indeks baris yang akan dihapus
  const [deleteType, setDeleteType] = useState<string | null>(null); // Menyimpan tipe penghapusan (untuk Row atau RowManuver)
  
  const [dataParams, setDataParams] = useState<any>();
  const navigate = useNavigate();


  

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
 
    tanggal_gangguan: Yup.string().nullable(),
    time: Yup.string().nullable(),
    id_ref_ep_cuaca: Yup.string().nullable(),
    penyulang_id: Yup.string().nullable(),
    up3_id: Yup.string().nullable(),
    trafo_id: Yup.string().nullable(),
    kode_j: Yup.string().nullable(),
    status: Yup.string().nullable(),
    kat_gangguan: Yup.string().nullable(),
    penyebab_gangguan_id: Yup.string().nullable(),
    jenis_gangguan: Yup.string().nullable(),
    titik_gangguan: Yup.string().nullable(),
    zone: Yup.string().nullable(),
    nama_proteksi: Yup.string().nullable(),
    proteksi_gangguan: Yup.string().nullable(),
    kendala_apkt: Yup.string().nullable(),
    // fault_indikator: Yup.string().nullable(),
    gardukecil_id: Yup.string().nullable(),
    arah_gardu: Yup.string().nullable(),
    status_gangguan: Yup.string().nullable(),
    perform_gangguan: Yup.string().nullable(),
    tanggal: Yup.string().nullable(),
    uraian: Yup.string().nullable(),
    peralatan: Yup.string().nullable(),
    nama_created: Yup.string().nullable(),
    arah_lokasi: Yup.string().nullable(),
    gardu_padam: Yup.string().nullable(),
    arus: Yup.string().nullable(),
    
  });

  const [formModel] = useState<any>({
    status_data: 0,
  });

  const {watch, getValues ,handleSubmit, setValue, setError, control, formState ,register} = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  useEffect(() => {
    const currentValues = getValues('kendala_apkt') || [];
    console.log(currentValues);
  }, [getValues]);
  
  const { errors }: any = formState || {};
  // const [activeSection, setActiveSection] = useState<'fault'>('fault');
  // const [activeSectionManuver, setActiveSectionManuver] = useState<'manuver'>('manuver');

  const [rows, setRows] = useState<any[]>([]);
  const [rowsDetailManuver, setRowsDetailManuver] = useState<any[]>([]);

  const addRow = () => {
    setRows([...rows, {}]); // Add two empty rows
  };

 // Handle perubahan data pada row
 const handleRowChange = (index: number, fieldName: string, value: any) => {
  // Update rows state
  const updatedRows = rows.map((row, i) =>
    i === index ? { ...row, [fieldName]: value } : row
  );
  setRows(updatedRows);

  // Update form state dengan react-hook-form
  setValue(`${fieldName}${index}`, value);
};


  const addRowManuver = () => {
    setRowsDetailManuver([...rowsDetailManuver, {}]); // Add two empty rows
  };

  const handleRowManuverChange = (index: number, fieldName: string, value: any) => {
    const updatedRows = rowsDetailManuver.map((row, i) =>
      i === index ? { ...row, [fieldName]: value } : row
    );
    setRowsDetailManuver(updatedRows);

    // Update form state dengan react-hook-form
  setValue(`${fieldName}${index}`, value);
  };

// Fungsi delete untuk Row
const handleDeleteRow = (index: number) => {
  setDialogMessageDelete('Apakah anda yakin ingin menghapus data ini? Data yang dihapus tidak dapat dikembalikan!');
  setIsDialogOpenDelete(true);
  setDeleteIndex(index); // Simpan indeks baris untuk penghapusan setelah konfirmasi
  setDeleteType('row');  // Tandai tipe penghapusan sebagai 'row'
};

// Fungsi delete untuk RowManuver
const handleDeleteRowManuver = (index: number) => {
  setDialogMessageDelete('Apakah anda yakin ingin menghapus data manuver ini? Data yang dihapus tidak dapat dikembalikan!');
  setIsDialogOpenDelete(true);
  setDeleteIndex(index); // Simpan indeks baris manuver untuk penghapusan setelah konfirmasi
  setDeleteType('manuver'); // Tandai tipe penghapusan sebagai 'manuver'
};
  
// Fungsi yang dipanggil setelah konfirmasi penghapusan
const deleteData = () => {
  if (deleteType === 'row' && deleteIndex !== null) {
    setRows(rows.filter((_, i) => i !== deleteIndex)); // Hapus baris dari tabel Rows
  } else if (deleteType === 'manuver' && deleteIndex !== null) {
    setRowsDetailManuver(rowsDetailManuver.filter((_, i) => i !== deleteIndex)); // Hapus baris dari tabel RowManuver
  }
  setDeleteIndex(null); // Reset deleteIndex setelah penghapusan
  setDeleteType(null);  // Reset deleteType setelah penghapusan
  setIsDialogOpenDelete(false); // Tutup dialog konfirmasi
};

// Utility function to flatten nested objects
// const flattenObject = (obj: any) => {
//   const flattened: any = {};

//   for (const key in obj) {
//     if (typeof obj[key] === 'object' && obj[key] !== null) {
//       // If the value is an object, extract its value
//       flattened[key] = obj[key][key];
//     } else {
//       // Otherwise, keep the value as is
//       flattened[key] = obj[key];
//     }
//   }
//   return flattened;
// };

// Function to remove indexed fields and ensure values are strings
const removeIndexedFields = (obj: any) => {
  const cleanedObj: any = {};

  // Iterate over all keys in the object
  for (const key in obj) {
    // Check if the key ends with a digit (indicating it's an indexed field)
    if (/\d+$/.test(key)) {
      // Get the base key by removing the trailing digits
      const baseKey = key.replace(/\d+$/, '');
      // Assign the value to the base key if it's an object with a single key
      if (typeof obj[key] === 'object' && !Array.isArray(obj[key]) && Object.keys(obj[key]).length === 1) {
        cleanedObj[baseKey] = Object.values(obj[key])[0];
      } else {
        cleanedObj[baseKey] = obj[key];
      }
    } else {
      // For non-indexed fields, just copy them as is
      if (typeof obj[key] === 'object' && !Array.isArray(obj[key]) && Object.keys(obj[key]).length === 1) {
        cleanedObj[key] = Object.values(obj[key])[0];
      } else {
        cleanedObj[key] = obj[key];
      }
    }
  }

  // Convert any arrays to a single string if needed
  for (const key in cleanedObj) {
    if (Array.isArray(cleanedObj[key])) {
      cleanedObj[key] = cleanedObj[key].join(', '); // Combine the array into a string
    }
  }

  return cleanedObj;
};



// Function to prepare rows data by removing indexed fields and merging their values
const prepareRowsData = (rows: any[]) => {
  return rows.map(row => {
    // Apply removeIndexedFields to each value in the row
    const cleanedRow: any = removeIndexedFields(row);
    return cleanedRow;
  });
};



const onSubmitForm = async (data: IUpdateRekapPadam) => {


  // Prepare rows data by cleaning indexed fields
  const cleanedRows = prepareRowsData(rows);
  const cleanedRowsManuver = prepareRowsData(rowsDetailManuver);

  // Path untuk API trans_gangguan
  const apiPathTransGangguan = API_PATH().opsisdis.rekap_padam.trans_gangguan;

  // Create cancel token
  const source = axios.CancelToken.source();

  try {
    // Mengirim data dengan struktur yang telah dibersihkan
    const resTransGangguan: any = await postByPath(apiPathTransGangguan, data, source.token);

    if (resTransGangguan?.status === 404 || resTransGangguan?.status === 400) {
      dispatchNotification(`Gagal mendapatkan gangguan_penyulang_id: ${resTransGangguan?.message || 'Unknown Error'}`, 'danger');
      return;
    }

    const gangguan_penyulang_id = resTransGangguan?.gangguan_penyulang_id;

    if (!gangguan_penyulang_id) {
      dispatchNotification('gangguan_penyulang_id tidak ditemukan', 'danger');
      return;
    }

    // Add gangguan_penyulang_id to each row data
    const updatedRowsData = cleanedRows.map(row => ({
      ...row,
      gangguan_penyulang_id,
    }));

    const updatedRowsManuverData = cleanedRowsManuver.map(row => ({
      ...row,
      gangguan_penyulang_id,
    }));

    // API paths for 'fault' and 'manuver'
    const apiPathFault = API_PATH().opsisdis.rekap_padam.fi;
    const apiPathManuver = API_PATH().opsisdis.rekap_padam.detail;

    // Send requests to both APIs for each row
    const [reqFaults, reqManuver]: any = await Promise.all([
      Promise.all(updatedRowsData.map(row => postByPath(apiPathFault, row, source.token))),
      Promise.all(updatedRowsManuverData.map(row => postByPath(apiPathManuver, row, source.token))),
    ]);

    // Handle response for 'fault'
    reqFaults.forEach((res: any) => {
      if (res?.status === 404 || res?.status === 400) {
        dispatchNotification(`Gagal Submit Fault data: ${res?.message || 'Unknown Error'}`, 'danger');
      } else {
        console.log('Fault Success:', res.results);
      }
    });

    // Handle response for 'manuver'
    reqManuver.forEach((res: any) => {
      if (res?.status === 404 || res?.status === 400) {
        dispatchNotification(`Gagal Submit Manuver data: ${res?.message || 'Unknown Error'}`, 'danger');
      } else {
        console.log('Manuver Success:', res.results);
      }
    });

    // Clear rows after successful submission
    setRows([]);
    setRowsDetailManuver([]);

    // Redirect to the desired page
    navigate('/opsisdis/entri_gangguan_padam');

  } catch (err: any) {
    let message: string = err?.response ? `, ${err?.response?.data?.message}` : err?.message;
    dispatchNotification(`Gagal Submit data ${message || 'Unknown Error'}`, 'danger');
    // setLoading(false);
  }

  setDataParams(data); // Update form data
};




  const handleButtonClick = () => {
    // setLoading(true);
    // Buka halaman baru di tab atau jendela baru
    window.open('/opsisdis/entri_gangguan_padam/rekap/addjurnal', '_blank');
  };
 


  return (
    <>
      <Row>
     
          <CustomDialogDelete
            isOpen={isDialogOpenDelete}
            onClose={() => setIsDialogOpenDelete(false)}
            message={dialogMessageDelete}
            onDelete={deleteData} // Memanggil fungsi deleteData setelah konfirmasi
          />
        <Col md={12} className='mb-4 position-static'>
          <Card>
            <Card.Body>
              <FormData
                setError={setError}
                setValue={setValue}
                dataParams={dataParams}
                link="/opsisdis/entri_gangguan_padam"
                fields={EditRekapPadamField}
                path={API_PATH().opsisdis.rekap_padam.trans_gangguan}
                onLoading={setLoading}
                customLabel={'hide'}
                hideTitle
               
              >
                <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
                      <PemeriksaanLanjutanForm
                    //  getValues={getValues}
                        control={control}
                        register={register}
                        errors={errors}
                        setValue={setValue}
                        watch={watch}
                       
                      />
                      
                   <Card.Header className='text-uppercase mt-2 mb-2 d-flex justify-content-between align-items-center'>
      <div className='text-center flex-grow-1'>Fault Indikator</div>
      <Button variant="primary" onClick={addRow}>+ Tambah Detail</Button>
    </Card.Header>

    <CardWidget classNameBody='mb-2'>
      <Table bordered className="mt-3">
        <thead>
          <tr>
            <th>Fault Indikator</th>
            <th>Lokasi Gardu</th>
            <th className="narrow-column">Arah</th>
            <th>Status</th>
            <th>Perform</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
  {rows.map((row, index) => (
    <tr key={index}>
      <td>
        <SelectFormStaticTable
          control={control}
          errors={errors}
          fieldName={`fault_indikator${index}`}
          options={FAULT_INDIKATOR}
          onChange={(value) => handleRowChange(index, 'fault_indikator', value)}
        />
      </td>
      <td>
        <SelectAsyncDynamicTable
          fieldName={`gardukecil_id${index}`}
          pathServiceName="master.jaringan.ref_lokasi"
          labelField="nama_lokasi"
          valueField="id_ref_lokasi"
          placeholder="Pilih..."
          isClearable={true}
          errors={errors}
          control={control}
          queryParams={{
            id_ref_jenis_lokasi: JENIS_LOKASI().gardu_distribusi,
            sort_by: "nama_lokasi",
          }}
          onChange={(value) => handleRowChange(index, 'gardukecil_id', value)}
        />
      </td>

      <td className="narrow-column">
              <Form.Control
                {...register(`arah_gardu${index}`, {
                  onChange: (e) => handleRowChange(index, 'arah_gardu', e.target.value),
                })} 
                isInvalid={errors[`arah_gardu${index}`]}
              />
              <Form.Control.Feedback type="invalid">
                {errors[`arah_gardu${index}`]?.message}
              </Form.Control.Feedback>
            </td>
      <td>
        <SelectFormStaticTable
          control={control}
          errors={errors}
          fieldName={`status_gangguan${index}`}
          options={OPTION_FAI_MTRZ}
          onChange={(value) => handleRowChange(index, 'status_gangguan', value)}
        />
      </td>
      <td>
        <SelectFormStaticTable
          control={control}
          errors={errors}
          fieldName={`perform_gangguan${index}`}
          options={STATUS_PERFORM}
          onChange={(value) => handleRowChange(index, 'perform_gangguan', value)}
        />
      </td>
      <td>
        <Button variant="danger" onClick={() => handleDeleteRow(index)}>X</Button>
      </td>
    </tr>
  ))}
</tbody>

      </Table>
    </CardWidget>

    <Card.Header className='text-uppercase mt-2 mb-2 d-flex justify-content-between align-items-center'>
      <div className='text-center flex-grow-1'>Detail Manuver Gangguan Penyulang</div>
      <Button variant="primary" onClick={addRowManuver}>+ Tambah Detail Manuver</Button>
    </Card.Header>

    <CardWidget classNameBody='mb-2'>
    <div className="table-wrapper">
    <Table bordered className="mt-3 wide-table" >

  <thead>
    <tr>
    <th rowSpan={2} className="wide-column auto-width-column">Dispatcher</th>
        <th rowSpan={2} className="auto-width-column">Tanggal</th>
        <th rowSpan={2} className="auto-width-column">Jam</th>
        <th rowSpan={2} className="wide-column auto-width-select">Uraian</th>
        <th rowSpan={2} className="wide-column auto-width-select">Peralatan</th>
        <th rowSpan={2} className="wide-column auto-width-column">Nama</th>
        <th rowSpan={2} className="wide-column auto-width-column">Arah</th>
        <th rowSpan={2} className="wide-column auto-width-column">Gardu Padam</th>
        <th rowSpan={2} className="wide-column auto-width-column">Arus (A)</th>
        <th colSpan={9} className="text-center auto-width-column">Rele Kerja</th> {/* Kolom grup untuk Rele Kerja */}
        <th rowSpan={2} className="wide-column auto-width-select">Remote</th>
        <th rowSpan={2} className="wide-column auto-width-select">Penyebab Gagal RC</th>
        <th rowSpan={2} className="wide-column auto-width-column">Manuver</th>
        <th colSpan={4} className="text-center auto-width-column">Arus Gangguan A</th>
        <th rowSpan={2} className="wide-column auto-width-column">Keterangan</th>
        <th rowSpan={2} className="wide-column auto-width-column">Indikasi Gangguan</th>
        <th rowSpan={2} className="narrow-column auto-width-column">Aksi</th> {/* Kolom aksi */}

    </tr>
    <tr>
      {/* Columns for Rele Kerja */}
      <th className="wide-column auto-width-check">OC</th>
      <th className="wide-column auto-width-check">GF</th>
      <th className="wide-column auto-width-check">R</th>
      <th className="wide-column auto-width-check">S</th>
      <th className="wide-column auto-width-check">T</th>
      <th className="wide-column auto-width-check">M</th>
      <th className="wide-column auto-width-check">BC</th>
      <th className="wide-column auto-width-check">UFR</th>
      <th className="wide-column auto-width-check">TD</th>

      {/* Columns for Arus Gangguan A */}
      <th className="wide-column auto-width-arus">R</th>
      <th className="wide-column auto-width-arus">S</th>
      <th className="wide-column auto-width-arus">T</th>
      <th className="wide-column auto-width-arus">N</th>
    </tr>

  </thead>
  <tbody>
  {rowsDetailManuver.map((row, index) => (
    <tr key={index}>
      {/* Dispatcher Field */}
  
      <td className="wide-column">
              <Form.Control
                {...register(`dispatcher_id${index}`, {
                  onChange: (e) => handleRowManuverChange(index, 'dispatcher_id', e.target.value),
                })} 
                isInvalid={errors[`dispatcher_id${index}`]}
              />
              <Form.Control.Feedback type="invalid">
                {errors[`dispatcher_id${index}`]?.message}
              </Form.Control.Feedback>
            </td>
      {/* Tanggal Field */}
      <td>
        <InputDate
          errors={errors}
          register={register}
          type="date"
          fieldName={`tanggal${index}`}
        />
      </td>

      {/* Jam Field */}
      <td>
        <InputDate
          errors={errors}
          register={register}
          type="time"
          fieldName={`jam${index}`}
        />
      </td>

      {/* Uraian Field */}
      <td>
        <SelectFormStaticTable
          control={control}
          errors={errors}
          fieldName={`uraian${index}`}
          options={OPTION_URAIAN}
          onChange={(value: any) => handleRowManuverChange(index, 'uraian', value)}
        />
      </td>

      {/* Peralatan Field */}
      <td>
        <SelectFormStaticTable
          control={control}
          errors={errors}
          fieldName={`peralatan${index}`}
          options={OPTION_PERALATAN}
          onChange={(value: any) => handleRowManuverChange(index, 'peralatan', value)}
        />
      </td>

      {/* Nama Created Field */}

      <td className="wide-column">
              <Form.Control
                {...register(`nama_created${index}`, {
                  onChange: (e) => handleRowManuverChange(index, 'nama_created', e.target.value),
                })} 
                isInvalid={errors[`nama_created${index}`]}
              />
              <Form.Control.Feedback type="invalid">
                {errors[`nama_created${index}`]?.message}
              </Form.Control.Feedback>
            </td>
      {/* Arah Lokasi Field */}

      <td className="wide-column">
              <Form.Control
                {...register(`arah_lokasi${index}`, {
                  onChange: (e) => handleRowManuverChange(index, 'arah_lokasi', e.target.value),
                })} 
                isInvalid={errors[`arah_lokasi${index}`]}
              />
              <Form.Control.Feedback type="invalid">
                {errors[`arah_lokasi${index}`]?.message}
              </Form.Control.Feedback>
            </td>
      {/* Gardu Padam Field */}
 
      <td className="wide-column">
              <Form.Control
                {...register(`gardu_padam${index}`, {
                  onChange: (e) => handleRowManuverChange(index, 'gardu_padam', e.target.value),
                })} 
                isInvalid={errors[`gardu_padam${index}`]}
              />
              <Form.Control.Feedback type="invalid">
                {errors[`gardu_padam${index}`]?.message}
              </Form.Control.Feedback>
            </td>
      {/* Arus Field */}
   
      <td className="wide-column">
              <Form.Control
                {...register(`arus${index}`, {
                  onChange: (e) => handleRowManuverChange(index, 'arus', e.target.value),
                })} 
                isInvalid={errors[`arus${index}`]}
              />
              <Form.Control.Feedback type="invalid">
                {errors[`arus${index}`]?.message}
              </Form.Control.Feedback>
            </td>
      {/* Rele Kerja Fields */}
      
        <td  className="narrow-column text-center">
          <div className="d-flex justify-content-center">
            {/* <Form.Check type="radio" name={`rele_kerja$${index}`} /> */}
            <Form.Check
            
                {...register(`rele_kerja_oc${index}`, {
                  onChange: (e) => handleRowManuverChange(index, 'rele_kerja_oc', e.target.value),
                })} 
                {...register('rele_kerja_oc')}
                inline
                type='radio'
                value='1'
             
                // style={{ marginRight: '10rem' }} // Atur margin right pada Form.Check pertama
              />
          </div>
        </td>
        <td  className="narrow-column text-center">
          <div className="d-flex justify-content-center">

            <Form.Check
            
                {...register(`rele_kerja_gf${index}`, {
                  onChange: (e) => handleRowManuverChange(index, 'rele_kerja_gf', e.target.value),
                })} 
                {...register('rele_kerja_gf')}
                inline
                type='radio'
                value='2'
             
                // style={{ marginRight: '10rem' }} // Atur margin right pada Form.Check pertama
              />
          </div>
        </td>
        <td  className="narrow-column text-center">
          <div className="d-flex justify-content-center">
         
            <Form.Check
            
                {...register(`rele_kerja_r${index}`, {
                  onChange: (e) => handleRowManuverChange(index, 'rele_kerja_r', e.target.value),
                })} 
                {...register('rele_kerja_r')}
                inline
                type='radio'
                value='3'
            
                // style={{ marginRight: '10rem' }} // Atur margin right pada Form.Check pertama
              />
          </div>
        </td>
        <td  className="narrow-column text-center">
          <div className="d-flex justify-content-center">
          
            <Form.Check
            
                {...register(`rele_kerja_s${index}`, {
                  onChange: (e) => handleRowManuverChange(index, 'rele_kerja_s', e.target.value),
                })} 
                {...register('rele_kerja_s')}
                inline
                type='radio'
                value='4'
          
                // style={{ marginRight: '10rem' }} // Atur margin right pada Form.Check pertama
              />
          </div>
        </td>
        <td  className="narrow-column text-center">
          <div className="d-flex justify-content-center">
          
            <Form.Check
            
                {...register(`rele_kerja_t${index}`, {
                  onChange: (e) => handleRowManuverChange(index, 'rele_kerja_t', e.target.value),
                })} 
                {...register('rele_kerja_t')}
                inline
                type='radio'
                value='5'
           
                // style={{ marginRight: '10rem' }} // Atur margin right pada Form.Check pertama
              />
          </div>
        </td>
        <td  className="narrow-column text-center">
          <div className="d-flex justify-content-center">
          
            <Form.Check
            
                {...register(`rele_kerja_m${index}`, {
                  onChange: (e) => handleRowManuverChange(index, 'rele_kerja_m', e.target.value),
                })} 
                {...register('rele_kerja_m')}
                inline
                type='radio'
                value='6'
            
                // style={{ marginRight: '10rem' }} // Atur margin right pada Form.Check pertama
              />
          </div>
        </td>
        <td  className="narrow-column text-center">
          <div className="d-flex justify-content-center">
          
            <Form.Check
            
                {...register(`rele_kerja_bc${index}`, {
                  onChange: (e) => handleRowManuverChange(index, 'rele_kerja_bc', e.target.value),
                })} 
                {...register('rele_kerja_bc')}
                inline
                type='radio'
                value='7'
                
                // style={{ marginRight: '10rem' }} // Atur margin right pada Form.Check pertama
              />
          </div>
        </td>
        <td  className="narrow-column text-center">
          <div className="d-flex justify-content-center">
          
            <Form.Check
            
                {...register(`rele_kerja_ufr${index}`, {
                  onChange: (e) => handleRowManuverChange(index, 'rele_kerja_ufr', e.target.value),
                })} 
                {...register('rele_kerja_ufr')}
                inline
                type='radio'
                value='8'
               
                // style={{ marginRight: '10rem' }} // Atur margin right pada Form.Check pertama
              />
          </div>
        </td>
        <td  className="narrow-column text-center">
          <div className="d-flex justify-content-center">
          
            <Form.Check
            
                {...register(`rele_kerja_td${index}`, {
                  onChange: (e) => handleRowManuverChange(index, 'rele_kerja_td', e.target.value),
                })} 
                {...register('rele_kerja_td')}
                inline
            
                type='radio'
                value='9'
                // isInvalid={errors[`rele_kerja_td${index}`]}
                // style={{ marginRight: '10rem' }} // Atur margin right pada Form.Check pertama
              />
          </div>
        </td>
   
      {/* Remote Gangguan Field */}
      <td>
        <SelectFormStaticTable
          control={control}
          errors={errors}
          fieldName={`remote_gangguan${index}`}
          options={OPTION_URAIAN}
          onChange={(value: any) => handleRowManuverChange(index, 'remote_gangguan', value)}
        />
      </td>

      {/* Gagal RC Field */}
      <td>
        <SelectFormStaticTable
          control={control}
          errors={errors}
          fieldName={`gagal_rc${index}`}
          options={OPTION_URAIAN}
          onChange={(value: any) => handleRowManuverChange(index, 'gagal_rc', value)}
        />
      </td>

      {/* Titik Manuver Field */}
    
      <td className="wide-column">
              <Form.Control
                {...register(`titik_manuver${index}`, {
                  onChange: (e) => handleRowManuverChange(index, 'titik_manuver', e.target.value),
                })} 
                isInvalid={errors[`titik_manuver${index}`]}
              />
              <Form.Control.Feedback type="invalid">
                {errors[`titik_manuver${index}`]?.message}
              </Form.Control.Feedback>
            </td>
      {/* Arus Phases Fields */}
      <td className="narrow-column">
              <Form.Control
                {...register(`arus_r${index}`, {
                  onChange: (e) => handleRowManuverChange(index, 'arus_r', e.target.value),
                })} 
                isInvalid={errors[`arus_r${index}`]}
              />
              <Form.Control.Feedback type="invalid">
                {errors[`arus_r${index}`]?.message}
              </Form.Control.Feedback>
            </td>
      <td className="narrow-column">
              <Form.Control
                {...register(`arus_s${index}`, {
                  onChange: (e) => handleRowManuverChange(index, 'arus_s', e.target.value),
                })} 
                isInvalid={errors[`arus_s${index}`]}
              />
              <Form.Control.Feedback type="invalid">
                {errors[`arus_s${index}`]?.message}
              </Form.Control.Feedback>
            </td>
      <td className="narrow-column">
              <Form.Control
                {...register(`arus_t${index}`, {
                  onChange: (e) => handleRowManuverChange(index, 'arus_t', e.target.value),
                })} 
                isInvalid={errors[`arus_t${index}`]}
              />
              <Form.Control.Feedback type="invalid">
                {errors[`arus_t${index}`]?.message}
              </Form.Control.Feedback>
            </td>
      <td className="narrow-column">
              <Form.Control
                {...register(`arus_n${index}`, {
                  onChange: (e) => handleRowManuverChange(index, 'arus_n', e.target.value),
                })} 
                isInvalid={errors[`arus_n${index}`]}
              />
              <Form.Control.Feedback type="invalid">
                {errors[`arus_n${index}`]?.message}
              </Form.Control.Feedback>
            </td>

      {/* Keterangan Field */}
   
      <td className="wide-column">
              <Form.Control
                {...register(`keterangan${index}`, {
                  onChange: (e) => handleRowManuverChange(index, 'keterangan', e.target.value),
                })} 
                isInvalid={errors[`keterangan${index}`]}
              />
              <Form.Control.Feedback type="invalid">
                {errors[`keterangan${index}`]?.message}
              </Form.Control.Feedback>
            </td>
      {/* Indikasi Gangguan Field */}
      <td>
        <SelectFormStaticTable
          control={control}
          errors={errors}
          fieldName={`indikasi_gangguan${index}`}
          options={OPTION_URAIAN}
          onChange={(value: any) => handleRowManuverChange(index, 'indikasi_gangguan', value)}
        />
      </td>

      {/* Hapus Button */}
      <td>
        <Button variant="danger" onClick={() => handleDeleteRowManuver(index)}>
          X
        </Button>
      </td>
    </tr>
  ))}
</tbody>


      </Table>
      </div>
    </CardWidget>
                  <hr className='mt-2' />
                  <div className='d-flex gap-2 mt-1'>
                    <Button type='submit' variant='primary'  isLoading={loading}>
                      Simpan
                    </Button>
                    {/* <Button type='button' variant='primary' isLoading={loading} onClick={handleButtonClick}>
                      + Buat Jurnal Baru
                    </Button> */}
                     <a className='btn btn-primary' type='button' onClick={handleButtonClick}>
                      + Buat Jurnal Baru
                    </a>
                  
                    <a className='btn btn-danger' type='button'
                      onClick={() => { navigate('/opsisdis/entri_gangguan_padam') }}>
                      Back
                    </a>
                  </div>
                </Form>
              </FormData>
            </Card.Body>
          </Card>
        </Col>
      </Row>


    </>
  );
}

export default UpdateRekapPadam;
