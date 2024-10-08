import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom';
import { Row, Col, Form, Modal } from 'react-bootstrap';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
// import axios from 'axios';
// import InputDateNew from '@app/components/Date/InputDateNew';
import ButtonCancel from '@app/components/Button/ButtonCancel';
import FormData from '@app/modules/Form/FormData';
import InputForm from '@app/components/Input/FormInputNoLabel';
import { IFasopRC, IFasopRCField } from '@app/interface/fasop-histori-rc.interface';
// import RequiredInfo from '@app/components/Info/RequiredInfo';
// import InputUploadNew from '@app/components/Upload/InputUploadNew';
// import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
import { API_PATH } from '@app/services/_path.service';
// import { getAllByPath } from '@app/services/main.service';
// import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
// import SelectAsyncDynamicCheckBox from '@app/modules/SelectForm/SelectAsyncDynamicCheckBox';
import Button from '@app/components/Button/Button';
import SelectFormStatic from '@app/modules/SelectForm/SelectFormStatic';
import moment from 'moment';

export default function ShRemoteControlPageForm({ handleClose }: any) {
  // const source = axios.CancelToken.source();

  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();
  // const [dataSelected, setDataSelected] = useState<any>();

  const option_Kesimpulan_Rekon = [
    { label: "BERHASIL", value: 'BERHASIL' },
    { label: "GAGAL", value: 'GAGAL' },
    { label: "NO RESPONSE", value: 'NO RESPONSE' },

  ]

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    // nama_lokasi: Yup.string().required('Nama Wajib diisi'),
    rekon: Yup.string().nullable().transform((_, v) => (v == '1' ? '1' : '0')),
    kesimpulan_rekon: Yup.string().nullable(),
    keterangan: Yup.string().nullable(),
    

  });

  const [formModel] = useState<any>({ rekon: '1', id_ref_province: process.env.ADM_PROVINCE });
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    control,
    formState,
    // watch
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  const { errors }: any = formState || {};
  /** SUBSCRIBE FORM CHANGES */
  // const watchGarduInduk = useWatch({ control, name: 'id_gardu_induk' });
  const watchKinerja = useWatch({ control, name: "rekon" });
  const onSubmitForm = (data: IFasopRC) => {
      data.datum_rekon= moment().format('YYYY-MM-DD HH:mm:ss');
    setDataParams(data);
    handleClose();
  };



  /** GET EDIT DATA */
  // const getDataPenyulangById = async () => {
  //   try {
  //     const req: any = await getByIdPath(API_PATH().master.jaringan.ref_lokasi, watchPenyulang, source.token);
  //     // console.log("req?.results", req?.results);

  //     setValue("id_uid", req?.results?.id_uid?.id_ref_lokasi)
  //     setValue("id_up3_1", req?.results?.id_up3_1?.id_ref_lokasi)
  //     setValue("id_ulp_1", req?.results?.id_ulp_1?.id_ref_lokasi)

  //     setValue("id_gardu_induk", dataSelected?.id_gardu_induk?.id_ref_lokasi)
  //     setValue("id_trafo_gi", dataSelected?.trafo_gi?.id_ref_lokasi)
  //     setValue("id_penyulang", watchPenyulang)
  //     // setValue("id_zone", dataSelected?.zone?.id_ref_lokasi)
  //     // setValue("id_section", dataSelected?.section?.id_ref_lokasi)
  //     // setValue("id_segment", dataSelected?.segment?.id_ref_lokasi)

  //   } catch { }
  // };

  // const options_parent = [
  //   { label: 'PENYULANG', value: 'PENYULANG' },
  //   { label: 'ZONE', value: 'ZONE' },
  //   { label: 'SECTION', value: 'SECTION' },
  //   { label: 'SEGMENT', value: 'SEGMENT' },
  // ]
  // useEffect(() => {
  //   fetchNoWO();
  // }, []);


  return (
    <>
      <FormData
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        fields={IFasopRCField}
        path={API_PATH().fasop.history.rc}
        customLabel={'hide'}
        isModal={true}
        onLoading={setLoading}
        // onGetDataResult={setDataSelected}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row className='mb-3'>
            {/* LEFT COLUMN  */}
            <Col md="12">
            <Form.Group>
                  <Form.Label>Rekon</Form.Label>
                  <div className="ms-3 py-2">
                    <Form.Check
                      type="switch"
                      id="rekon"
                      {...register("rekon")}
                      label={watchKinerja ? "Ya" : "Tidak"}
                    />
                  </div>
                </Form.Group>
              <Form.Group className='mt-3 d-flex align-items-center'>
                <Form.Label className='mb-0' style={{ minWidth: '120px' }}>kesimpulan Rekon</Form.Label>
                <div className='d-flex align-items-center flex-grow-1'>
                  <span className='mx-2'>:</span>
                  <div style={{ width: '98%' }}>
                  <SelectFormStatic
                  control={control}
                  errors={errors}
                  fieldName='kesimpulan_rekon'
                  options={option_Kesimpulan_Rekon}
                  placeholder="-"
                />

                  </div>
                </div>
              </Form.Group>
              <Form.Group className='mt-3 d-flex align-items-start'>
                <Form.Label className='mb-0' style={{ minWidth: '120px' }}>Keterangan</Form.Label>
                <div className='d-flex flex-grow-1'>
                  <span className='mx-2'>:</span>
                  <InputForm
                    control={control}
                    name={'keterangan'}
                    as="textarea"

                  />
                </div>
              </Form.Group>

            </Col>
            {/* !END LEFT COLUMN  */}

          </Row>


          <Modal.Footer>
            <ButtonCancel type='modal' onClick={handleClose} />
            <Button type='submit' variant='primary' isLoading={loading}>Simpan</Button>
          </Modal.Footer>

        </Form>
      </FormData>
    </>
  );
}
