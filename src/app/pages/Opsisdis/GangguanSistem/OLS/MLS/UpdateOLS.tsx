import React, { useRef, useState } from 'react';
import { Card, Col, Row, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
// import {  STATUS_PADAM} from "@app/configs/select-options/rekap_padam.select";
// import { Dispatch } from 'redux'; // Sesuaikan dengan cara Anda mengimpor Dispatch
// import SelectFormStaticTable from "@app/modules/SelectForm/SelectFormStaticTable";
import FormData from '@app/modules/Form/FormData';
import Button from '@app/components/Button/Button';
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';
import { GANGGUAN_DETAIL_ENTRI_MODAL_GRID, } from '@app/configs/react-table/opsisdis/rekap-padam/rekap-padam.column';
import {
  EditRekapPadamField,
  IUpdateRekapPadam,
} from '@app/interface/rekap-padam/edit-form-rekap-padam-sistem.interface';

// import { FaChevronDown, FaChevronUp } from './helper/app.helpe'; // Mengimpor ikon dari react-icons
import 'bootstrap/dist/css/bootstrap.min.css'; // Jika belum menggunakan Bootstrap

import { API_PATH } from '@app/services/_path.service';
// import InfoRekapPadamForm from './InfoRekapPadamForm';
import OLSPemeriksaanLanjutanForm from './OLSPemeriksaanLanjutanForm';
import CardWidgetMiddleTittle from '@app/components/Card/CardWidgetMiddleTittle';
// import SelectFormStatic from '@app/modules/SelectForm/SelectFormStatic';
// import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';


function UpdateRekapPadam() {
 
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingKuota, setLoadingKuota] = useState<boolean>(false);

  const [dataParams, setDataParams] = useState<any>();
  const [dataParamsKuota, setDataParamsKuota] = useState<any>();
  const dataSelected = useRef<any>();

  // Set awal state ke false agar tabel default tertutup
  const [isTableVisible, setIsTableVisible] = useState(false);

  const toggleTableVisibility = () => {
    setIsTableVisible(!isTableVisible);
  };

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
 /** MAP DATA FROM API RESPONSE */
 const handleRespDataApi = (data: any) => {
  let dataTableValue: any = [];
  data?.forEach((item: any) => {

    dataTableValue.push({
      ...item,
      number: item.number,
      id: item.id,
      tanggal: item.tanggal,
      jam: item.jam,
      uraian: item.uraian,
      peralatan: item.peralatan,
      nama: item.nama,
      gardu_padam: item.gardu_padam,
      arus: item.arus,
       
     
    
    });
  });
  return dataTableValue;
};
const handleCheckedRows = (data: any) => {
  dataSelected.current= data;
  // setdetailPosting(dataSelected?.current.posting_wo);
}
  const [formModel] = useState<any>({
    status_data: 0,
  });

  const { handleSubmit, setValue, setError, control, formState ,register} = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  const { errors }: any = formState || {};



const onSubmitForm = async (data: IUpdateRekapPadam) => {
  setDataParams(data); // Update form data
};

const onSubmitFormKuota = async (data: IUpdateRekapPadam) => {
  setDataParamsKuota(data); // Update form data
};



  return (
    <>
      <Row>
        <Col md={12} className='mb-4 position-static'>
          <Card>
            <Card.Body>
            <Row>
            <Col md={6} sm> 
              {/* form input pemadaman */}
              <FormData
                setError={setError}
                setValue={setValue}
                dataParams={dataParams}
                link="/opsisdis/gangguan-sistem/ols-mls"
                fields={EditRekapPadamField}
                path={API_PATH().opsisdis.rekap_padam.trans_gangguan_sistem}
                onLoading={setLoading}
                customLabel={'hide'}
                hideTitle
               
              >
                <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>

                      <CardWidgetMiddleTittle  title='Form Input Pemadaman'>
                    
                      <OLSPemeriksaanLanjutanForm
                 
                        control={control}
                        register={register}
                        errors={errors}
                       
                      />
                      <hr className='mt-2' />
                  <div className='d-flex gap-2 mt-1'>
                    <Button type='submit' variant='primary' isLoading={loading}>
                      Simpan
                    </Button>
                    {/* <Button type='button' variant='primary' isLoading={loading} onClick={handleButtonClick}>
                      + Buat Jurnal Baru
                    </Button> */}
                 
                  </div>
                  </CardWidgetMiddleTittle>
                </Form>
             </FormData>
           </Col>

              
              {/* form input update kuota */}
          <Col md={6}>
            <FormData
                      setError={setError}
                      setValue={setValue}
                      dataParams={dataParamsKuota}
                      link="/opsisdis/gangguan-sistem/ols-mls"
                      fields={EditRekapPadamField}
                      path={API_PATH().opsisdis.rekap_padam.detail_sistem}
                      onLoading={setLoadingKuota}
                      customLabel={'hide'}
                      hideTitle
                    
                    >
             <Form noValidate onSubmit={handleSubmit(onSubmitFormKuota)}>
                <CardWidgetMiddleTittle title='Update Kuota' className="mb-4">
                  <hr />
                  <Form.Group as={Row} className='mb-3'>
                    <Form.Label column md={4}>
                        APB 1
                    </Form.Label>
                    <Col md={8}>
                    <Form.Control
                          placeholder='0'
                            {...register('rele_kerja')}
                            isInvalid={errors.rele_kerja}
                          />
                          <Form.Control.Feedback type='invalid'>
                            {errors?.rele_kerja?.message}
                          </Form.Control.Feedback>
                    </Col>
                  </Form.Group>
                  <hr />
                  <Form.Group as={Row} className='mb-3'>
                    <Form.Label column md={4}>
                      APB 2 
                    </Form.Label>
                    <Col md={8}>
                      <Form.Control
                            placeholder='0'
                              {...register('rele_kerja')}
                              isInvalid={errors.rele_kerja}
                            />
                            <Form.Control.Feedback type='invalid'>
                              {errors?.rele_kerja?.message}
                            </Form.Control.Feedback>
                    </Col>
                  </Form.Group>
                  <hr />
                  <div className='d-flex gap-2 mt-1'>
                            <Button type='submit' variant='primary' isLoading={loadingKuota}>
                              Update Kuota
                            </Button>
                            {/* <Button type='button' variant='primary' isLoading={loading} onClick={handleButtonClick}>
                              + Buat Jurnal Baru
                            </Button> */}
                        
                          </div>

              </CardWidgetMiddleTittle>
            
             
              <CardWidgetMiddleTittle >
              <button 
                onClick={toggleTableVisibility} 
                className="btn btn-primary d-flex align-items-center"
              >
                {isTableVisible ? (
                      <>
                        <i className="fa fa-chevron-up me-2"></i> Hide Detail Kuota Permintaan
                      </>
                    ) : (
                      <>
                        <i className="fa fa-chevron-down me-2"></i> Detail Kuota Permintaan
                      </>
                    )}
              </button>
              {isTableVisible && (
              <TableDataJqxGridNew
                //AKSI 
                
                //TABLE DATA
               
                path={API_PATH().opsisdis.rekap_padam.detail}
                filterParams={{
                  // gangguan_penyulang_id : penyebab_gangguan_id,
              
                }}
                dataFieldsColsConfig={GANGGUAN_DETAIL_ENTRI_MODAL_GRID()}
                primaryKey={'id'}
                respDataApi={handleRespDataApi}
                filterable={true}
                onRowSelected={handleCheckedRows}
                exportbtn={false}
                // minWidth={300}
                // maxWidth={600}
            />
          )}
              </CardWidgetMiddleTittle>
               

             </Form>
            </FormData>
          </Col>
        </Row>
     </Card.Body>
    </Card>
  </Col>
</Row>
 </>
  );
}

export default UpdateRekapPadam;
