import React, { useState } from 'react';
import { Card, Col, Row, Form,Table, InputGroup } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import InputForm from '@app/components/Input/FormInputNoLabel';
import { postByPath } from'@app/services/main.service';// Pastikan path ini sesuai dengan lokasi `postByPath`
// import { Dispatch } from 'redux'; // Sesuaikan dengan cara Anda mengimpor Dispatch
// import SelectFormStaticTable from "@app/modules/SelectForm/SelectFormStaticTable";
import FormData from '@app/modules/Form/FormData';
import Button from '@app/components/Button/Button';
import SelectAsyncDynamicTable from "@app/modules/SelectForm/SelectAsyncDynamicTable";
import { get } from 'lodash';
import CardWidget from '@app/components/Card/CardWidget';

// import {  FAULT_INDIKATOR } from "@app/configs/select-options/rekap_padam.select";
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
import {
  EditRekapPadamField,
  IUpdateRekapPadam,
} from '@app/interface/rekap-padam/edit-form-rekap-padam-sistem.interface';
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
    fault_indikator: Yup.string().nullable(),
    gardukecil_id: Yup.string().nullable(),
    arah_gardu: Yup.string().nullable(),
    status_gangguan: Yup.string().nullable(),
    perform_gangguan: Yup.string().nullable(),
    tanggal: Yup.string().nullable(),
 
    peralatan: Yup.string().nullable(),
    nama_created: Yup.string().nullable(),
    arah_lokasi: Yup.string().nullable(),
    gardu_padam: Yup.string().nullable(),
    arus: Yup.string().nullable(),
    eksekusi_gangguan: Yup.string().nullable(),
    dispatcher: Yup.string().nullable(),
    uraian: Yup.string().nullable(),
    tmp: Yup.string().nullable(),
    
  });

  const [formModel] = useState<any>({
    status_data: 0,
  });

  const { handleSubmit, setValue, setError, control, formState ,register} = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  const { errors }: any = formState || {};
  // const [activeSection, setActiveSection] = useState<'fault'>('fault');
  // const [activeSectionManuver, setActiveSectionManuver] = useState<'manuver'>('manuver');

  const [rows, setRows] = useState<any[]>([]);


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

 

  const handleDeleteRow = (index: number) => {
    setRows(rows.filter((_, i) => i !== index));
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

  // Ambil nilai input form
  const inputFormData = {
    arus_a: data.arus_a,
    mw: data.mw,
    mwh: data.mwh,
    ens: data.ens,
  };

  // Prepare rows data by cleaning indexed fields
  const cleanedRows = prepareRowsData(rows);

  // Path untuk API trans_gangguan
  const apiPathTransGangguan = API_PATH().opsisdis.rekap_padam.trans_gangguan_sistem;

  // Create cancel token
  const source = axios.CancelToken.source();

  try {
    // Mengirim data dengan struktur yang telah dibersihkan
    const resTransGangguan: any = await postByPath(apiPathTransGangguan, data, source.token);

    if (resTransGangguan?.status === 404 || resTransGangguan?.status === 400) {
      dispatchNotification(`Gagal mendapatkan gangguan_sistem_id: ${resTransGangguan?.message || 'Unknown Error'}`, 'danger');
      return;
    }

    const gangguan_sistem_id = resTransGangguan?.gangguan_sistem_id;

    if (!gangguan_sistem_id) {
      dispatchNotification('gangguan_sistem_id tidak ditemukan', 'danger');
      return;
    }

    // Add gangguan_sistem_id and form data to each row data
    const updatedRowsData = cleanedRows.map(row => ({
      ...row,
      gangguan_sistem_id,
      ...inputFormData, // Add the form data here
    }));

    // API path for 'fault'
    const apiPathFault = API_PATH().opsisdis.rekap_padam.detail_sistem;

    // Send requests to API for each row
    const reqFaults = await Promise.all(updatedRowsData.map(row => postByPath(apiPathFault, row, source.token)));

    // Handle response for 'fault'
    reqFaults.forEach((res: any) => {
      if (res?.status === 404 || res?.status === 400) {
        dispatchNotification(`Gagal Submit Fault data: ${res?.message || 'Unknown Error'}`, 'danger');
      } else {
        console.log('Fault Success:', res.results);
      }
    });

    // Clear rows after successful submission
    setRows([]);

    // Redirect to the desired page
    navigate('/opsisdis/gangguan-sistem/gangguan-sub-sistem');

  } catch (err: any) {
    let message: string = err?.response ? `, ${err?.response?.data?.message}` : err?.message;
    dispatchNotification(`Gagal Submit data ${message || 'Unknown Error'}`, 'danger');
  }

  setDataParams(data); // Update form data
};

 
  const handleButtonClick = () => {
    // setLoading(true);
    // Buka halaman baru di tab atau jendela baru
    window.open('/opsisdis/gangguan-sistem/gangguan-sub-sistem/rekap/add', '_blank');
  };
 


  return (
    <>
      <Row>
        <Col md={12} className='mb-4 position-static'>
          <Card>
            <Card.Body>
              <FormData
                setError={setError}
                setValue={setValue}
                dataParams={dataParams}
                link="/opsisdis/gangguan-sistem/gangguan-sub-sistem"
                fields={EditRekapPadamField}
                path={API_PATH().opsisdis.rekap_padam.trans_gangguan_sistem}
                onLoading={setLoading}
                customLabel={'hide'}
                hideTitle
               
              >
                <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
                      <PemeriksaanLanjutanForm
                 
                        control={control}
                        register={register}
                        errors={errors}
                       
                      />
                   <Card.Header className='text-uppercase mt-2 mb-2 d-flex justify-content-between align-items-center'>
      <div className='text-center flex-grow-1'>Detail Manuver Gangguan Sistem</div>
      <Button variant="primary" onClick={addRow}>+ Tambah Detail</Button>
    </Card.Header>

    <CardWidget classNameBody='mb-2'>
      <Table bordered className="mt-3">
        <thead>
          <tr>
            <th>Dispatcher</th>
            <th>Area</th>
            <th>Gardu Induk</th>
            <th>Trafo</th>
            <th>Penyulang</th>
            <th>Jam Keluar</th>
            <th>Jam Masuk</th>
            <th className="narrow-column">Arus</th>
            <th className="narrow-column">Eksekusi</th>
            <th className="narrow-column">Uraian</th>
            <th className="narrow-column">TMP</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
            <td className="narrow-column">
              <Form.Control
                {...register(`dispatcher${index}`, {
                  onChange: (e) => handleRowChange(index, 'dispatcher', e.target.value),
                })} 
                isInvalid={errors[`dispatcher${index}`]}
              />
              <Form.Control.Feedback type="invalid">
                {errors[`dispatcher${index}`]?.message}
              </Form.Control.Feedback>
            </td>

              <td>
                <SelectAsyncDynamicTable
          
                fieldName= {`up3_id${index}`}
                // fieldNameParent="id_uid"
                pathServiceName={'master.jaringan.ref_lokasi'}
                labelField={'nama_lokasi'}
                valueField={'id_ref_lokasi'}
                placeholder= 'Pilih...'
                isClearable={true}
                errors={errors}
                control={control}
                queryParams={{ id_ref_jenis_lokasi: JENIS_LOKASI().up3 }}
                onChange={(value: any) => handleRowChange(index, 'up3_id', value)}

                />
              </td>
             
              <td>
              <SelectAsyncDynamicTable
                  fieldName= {`id_gardu_induk${index}`}
                  control={control}
                  errors={errors}
                  labelField={'nama_lokasi'}
                  valueField={'id_ref_lokasi'}
                  pathServiceName={'master.jaringan.ref_lokasi'}
                  // watchParent={watchPenyulang}
                  queryParams={{
                    id_ref_jenis_lokasi: JENIS_LOKASI().gardu_induk,
                    // id_penyulang: watchPenyulang // Ini mengambil nilai penyulang yang dipilih
                  }}
                  onChange={(value: any) => handleRowChange(index, 'id_gardu_induk', value)}

          />
              </td>
              <td>
              <SelectAsyncDynamicTable
          
          fieldName={`trafo_id${index}`}
          pathServiceName="master.jaringan.ref_lokasi"
          labelField="nama_lokasi"
          valueField="id_ref_lokasi"
          placeholder="Pilih Trafo"
          isClearable={true}
          errors={errors}
          control={control}
          queryParams={{
            sort_by: "nama_lokasi",
            id_ref_jenis_lokasi: `${JENIS_LOKASI().trafo_gi}`,
            status_listrik: 1,
            jenis_layanan: "NON KTT",
          }}
            onChange={(value: any) => handleRowChange(index, 'trafo_id', value)}
          />
              </td>
              <td>
              <SelectAsyncDynamicTable
                  
                  fieldName={`penyulang_id${index}`}
                  control={control}
                  errors={errors}
                  labelField={'nama_lokasi'}
                  valueField={'id_ref_lokasi'}
                  pathServiceName={'master.jaringan.ref_lokasi'}
                  queryParams={{ id_ref_jenis_lokasi: JENIS_LOKASI().penyulang }}
                 onChange={(value: any) => handleRowChange(index, 'penyulang_id', value)}
          />
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
      <td className="narrow-column">
  <Form.Control
    {...register(`arus${index}`, {
      onChange: (e) => handleRowChange(index, 'arus', e.target.value),
    })} 
    isInvalid={errors[`arus${index}`]}
  />
  <Form.Control.Feedback type="invalid">
    {errors[`arus${index}`]?.message}
  </Form.Control.Feedback>
</td>
      <td className="narrow-column">
  <Form.Control
    {...register(`eksekusi_gangguan${index}`, {
      onChange: (e) => handleRowChange(index, 'eksekusi_gangguan', e.target.value),
    })} 
    isInvalid={errors[`eksekusi_gangguan${index}`]}
  />
  <Form.Control.Feedback type="invalid">
    {errors[`eksekusi_gangguan${index}`]?.message}
  </Form.Control.Feedback>
</td>
      <td className="narrow-column">
  <Form.Control
    {...register(`uraian${index}`, {
      onChange: (e) => handleRowChange(index, 'uraian', e.target.value),
    })} 
    isInvalid={errors[`uraian${index}`]}
  />
  <Form.Control.Feedback type="invalid">
    {errors[`uraian${index}`]?.message}
  </Form.Control.Feedback>
</td>
      <td className="narrow-column">
  <Form.Control
    {...register(`tmp${index}`, {
      onChange: (e) => handleRowChange(index, 'tmp', e.target.value),
    })} 
    isInvalid={errors[`tmp${index}`]}
  />
  <Form.Control.Feedback type="invalid">
    {errors[`tmp${index}`]?.message}
  </Form.Control.Feedback>
</td>

              
             
             
              {/* <td className="narrow-column">
                <Form.Control
                  {...register(`arah_gardu`)}
                  isInvalid={errors[`arah_gardu`]}
                />
                <Form.Control.Feedback type="invalid">
                  {errors[`arah_gardu`]?.message}
                </Form.Control.Feedback>
              </td>
              <td className="narrow-column">
                <Form.Control
                  {...register(`arah_gardu`)}
                  isInvalid={errors[`arah_gardu`]}
                />
                <Form.Control.Feedback type="invalid">
                  {errors[`arah_gardu`]?.message}
                </Form.Control.Feedback>
              </td>
              <td className="narrow-column">
                <Form.Control
                  {...register(`arah_gardu`)}
                  isInvalid={errors[`arah_gardu`]}
                />
                <Form.Control.Feedback type="invalid">
                  {errors[`arah_gardu`]?.message}
                </Form.Control.Feedback>
              </td> */}
              <td>
                <Button variant="danger" onClick={() => handleDeleteRow(index)}>Hapus</Button>
              </td>
            </tr>
          ))}
        </tbody>
        
      </Table>
          <Row className='mb-2'>
                      
                      <Col md={9}>
                        <Row>
                          <Col md={2} className='mb-3'>
                            <InputGroup>
                            
                              <InputForm control={control}  placeholder='Beban A' name={'beban_a'} />
                              <InputGroup.Text>A</InputGroup.Text>
                            </InputGroup>
                            {get(errors, "beban_a") && (
                              <div className='invalid-feedback d-block'>
                                {get(errors, "beban_a")?.message}
                              </div>
                            )}
                          </Col>
                          <Col md={2} className='mb-3'>
                            <InputGroup>
                            
                              <InputForm control={control}  placeholder='Beban MW' name={'beban_mw'} />
                              <InputGroup.Text>MW</InputGroup.Text>
                            </InputGroup>
                            {get(errors, "beban_mw") && (
                              <div className='invalid-feedback d-block'>
                                {get(errors, "beban_mw")?.message}
                              </div>
                            )}
                          </Col>
                          <Col md={2} className='mb-3'>
                            <InputGroup>
                            
                              <InputForm control={control}  placeholder='Beban MWH' name={'beban_mwh'} />
                              <InputGroup.Text>MWH</InputGroup.Text>
                            </InputGroup>
                            {get(errors, "beban_mwh") && (
                              <div className='invalid-feedback d-block'>
                                {get(errors, "beban_mwh")?.message}
                              </div>
                            )}
                          </Col>
                          <Col md={2} className='mb-3'>
                            <InputGroup>
                            
                              <InputForm control={control}  placeholder='RP ENS' name={'ens'} />
                              <InputGroup.Text>M</InputGroup.Text>
                            </InputGroup>
                            {get(errors, "ens") && (
                              <div className='invalid-feedback d-block'>
                                {get(errors, "ens")?.message}
                              </div>
                            )}
                          </Col>
                          
                        </Row>
                      </Col>
                    </Row>  
    </CardWidget>

   
  
                  <hr className='mt-2' />
                  <div className='d-flex gap-2 mt-1'>
                    <Button type='submit' variant='primary'  isLoading={loading} >
                      Simpan
                    </Button>
                    {/* <Button type='button' variant='primary' isLoading={loading} onClick={handleButtonClick}>
                      + Buat Jurnal Baru
                    </Button> */}
                     <a className='btn btn-primary' type='button' onClick={handleButtonClick}>
                      + Buat Jurnal Baru
                    </a>
                  
                    <a className='btn btn-danger' type='button'
                      onClick={() => { navigate('/opsisdis/gangguan-sistem/gangguan-sub-sistem') }}>
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
