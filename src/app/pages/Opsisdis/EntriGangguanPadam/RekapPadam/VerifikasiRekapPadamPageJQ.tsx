import React, { useRef, useState } from 'react';
import { Col, Form, Modal, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import InputDate from '@app/components/Date/InputDate';
import ButtonCancel from '@app/components/Button/ButtonCancel';
import FormData from '@app/modules/Form/FormData';
import { IFasopNoWO, IFasopNoWOField } from '@app/interface/jaringan-no-wo.interface';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
import { API_PATH } from '@app/services/_path.service';
// import moment from 'moment';
import Button from '@app/components/Button/Button';
import CardWidget from '@app/components/Card/CardWidget';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
import SelectFormStatic from '@app/modules/SelectForm/SelectFormStatic';
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';
import { GANGGUAN_DETAIL_ENTRI_MODAL_GRID, } from '@app/configs/react-table/opsisdis/rekap-padam/rekap-padam.column';
// import moment from 'moment';
export default function WoDraftingForm({ handleClose,isAlreadyGangguanID }: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();
  const dataSelected = useRef<any>();
  const STATUS_Kinerja = [
    { label: 'Kinerja', value: '1' },
    { label: 'Non Kinerja', value: '0' },
  ]
  const validationSchema = Yup.object().shape({
    posting_wo: Yup.string().nullable(),
    tgl_posting_wo: Yup.string().nullable(),
    id_trans_drafting_wo: Yup.string().nullable(),
  });

  const formModel: IFasopNoWO = {
    posting_wo: '',
    tgl_posting_wo: '',
    id_trans_drafting_wo: '',
  };

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

  const {
    handleSubmit,
    setValue,
    setError,
    control,
    formState,
    register,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  const { errors }: any = formState || {};
  
  const penyebab_gangguan_id = isAlreadyGangguanID || null;
  // console.log ('ada',gangguan_penyulang_id)

  const onSubmitForm = (data: IFasopNoWO) => {
    // if (isAlreadyPosted) {
    //   alert('Data yang sudah diposting tidak bisa diposting kembali.');
    //   return;
    // }

    // // Jika konfirmasi diperlukan, tampilkan pesan konfirmasi sebelum melanjutkan
    // if (isAlreadyPosted === 0) {
     
    //     data.id_trans_drafting_wo = id; // Pastikan id_trans_drafting_wo diatur dengan benar
    //     data.posting_wo = '1';
    //     data.tgl_posting_wo = moment().format('YYYY-MM-DD');

    //     setDataParams(data);
    //     handleClose();
    // }
    
    setDataParams(data);
    handleClose();
  };

  return (
    <>
      {/* {isAlreadyPosted === 1 && (
        <Alert variant="danger" className="text-center mb-4">
          <p>Data yang sudah diposting tidak bisa diposting kembali.</p>
        </Alert>
      )}

            {(isAlreadyPosted === 0 || isAlreadyPosted === 2) && ( */}
              <FormData
                setError={setError}
                setValue={setValue}
                dataParams={dataParams}
                fields={IFasopNoWOField}
                path={API_PATH().opsisdis.rekap_padam.trans_gangguan}
                customLabel="hide"
                isModal
                onLoading={setLoading}
              >
                <Form noValidate onSubmit={handleSubmit(onSubmitForm)} className="px-4 py-3">
                <Col md={12} sm>
        <CardWidget>
                  <Form.Group as={Row} className='mb-3'>
                    <Form.Label column md={4}>
                      Penyulang
                    </Form.Label>
                    <Col md={8}>
                      <SelectAsyncDynamic
                        fieldName="penyulang_id"
                        control={control}
                        errors={errors}
                        labelField={'nama_lokasi'}
                        valueField={'id_ref_lokasi'}
                        pathServiceName={'master.jaringan.ref_lokasi'}
                        queryParams={{
                           id_ref_jenis_lokasi: JENIS_LOKASI().penyulang,
                          //  id_gardu_induk: watchgarduinduk
                          }}
                        setValue={setValue}
                        // watchParent={watchgarduinduk}
                      />
                    </Col>
                  </Form.Group>
                 
          <hr />
          <Form.Group as={Row} className='mb-3'>
            <Form.Label column md={4}>
           Kinerja
            </Form.Label>
            <Col md={8}>
              <SelectFormStatic
                control={control}
                errors={errors}
                fieldName={`status`}
                options={STATUS_Kinerja}
              />
            </Col>
          </Form.Group>
       
          <Col md={6} sm>
          
          <Form.Group as={Row} className='mb-3'>
              <Form.Label column md={4}>
              Verifikasi Tanggal Masuk :
              </Form.Label>
              <Col md={4}>
              <InputDate
                errors={errors}
                register={register}
                type="date"
                fieldName="tanggal_gangguan"
                // step={1}
              />
              </Col>
            
              <Col md={4}>
              <InputDate
                errors={errors}
                register={register}
                type="time"
                fieldName="time"
                // step={1}
              />
              </Col>
            </Form.Group>
         
          </Col>
          </CardWidget>
          <br></br>
          <br></br>
<CardWidget>
        {penyebab_gangguan_id && (
          <TableDataJqxGridNew
                //AKSI 
             
                //TABLE DATA
               
                path={API_PATH().opsisdis.rekap_padam.detail}
                filterParams={{
                  gangguan_penyulang_id : penyebab_gangguan_id,
              
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
            </CardWidget>
          </Col>

                  <Modal.Footer className="d-flex justify-content-center">
                    <Button type="submit" variant="primary" isLoading={loading}>
                      Simpan
                    </Button>
                    <ButtonCancel type="modal" onClick={handleClose} variant="danger" />
                  </Modal.Footer>
                </Form>
              </FormData>
            {/* )} */}
    </>
  );
}
