import React, { useState } from 'react';
import { Card, Col, Row, Form ,Modal} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
// import {  STATUS_PADAM} from "@app/configs/select-options/rekap_padam.select";
// import { Dispatch } from 'redux'; // Sesuaikan dengan cara Anda mengimpor Dispatch
// import SelectFormStaticTable from "@app/modules/SelectForm/SelectFormStaticTable";
import FormData from '@app/modules/Form/FormData';
import Button from '@app/components/Button/Button';

import {
  EditRekapPadamField,
  IUpdateRekapPadam,
} from '@app/interface/rekap-padam/edit-form-rekap-padam-sistem.interface';

// import { FaChevronDown, FaChevronUp } from './helper/app.helpe'; // Mengimpor ikon dari react-icons
import 'bootstrap/dist/css/bootstrap.min.css'; // Jika belum menggunakan Bootstrap

import { API_PATH } from '@app/services/_path.service';
// import InfoRekapPadamForm from './InfoRekapPadamForm';
import OLSPemeriksaanLanjutanForm from './OLSPemeriksaanLanjutanForm';
// import CardWidgetMiddleTittle from '@app/components/Card/CardWidgetMiddleTittle';
import ButtonCancel from '@app/components/Button/ButtonCancel';
// import SelectFormStatic from '@app/modules/SelectForm/SelectFormStatic';
// import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';


function UpdateRekapPadam({ handleClose }: any) {
 
  const [loading, setLoading] = useState<boolean>(false);

  const [dataParams, setDataParams] = useState<any>();



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



const onSubmitForm = async (data: IUpdateRekapPadam) => {
  setDataParams(data); // Update form data
  handleClose();
};




  return (
    <>
      <Row>
        <Col md={12} className='mb-4 position-static'>
          <Card>
            <Card.Body>
            <Row>
          
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
                isModal={true}
                hideTitle
               
              >
                <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>

                <Modal.Body>
                      <OLSPemeriksaanLanjutanForm
                 
                        control={control}
                        register={register}
                        errors={errors}
                       
                      />
                      <hr className='mt-2' />
                      </Modal.Body>
                      <Modal.Footer>
                  <div className='d-flex gap-2 mt-1'>
                  <ButtonCancel type='modal' onClick={handleClose} />
                    <Button type='submit' variant='primary' isLoading={loading}>
                      Simpan
                    </Button>
                    
                    {/* <Button type='button' variant='primary' isLoading={loading} onClick={handleButtonClick}>
                      + Buat Jurnal Baru
                    </Button> */}
                 
                  </div>
                  </Modal.Footer>

                 
                </Form>
             </FormData>
          
        </Row>
     </Card.Body>
    </Card>
  </Col>
</Row>
 </>
  );
}

export default UpdateRekapPadam;
