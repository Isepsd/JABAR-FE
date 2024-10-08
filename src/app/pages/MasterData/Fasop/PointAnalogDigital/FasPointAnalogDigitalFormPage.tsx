import React, {   useState } from "react";
import { Button, Col, Form, Row,Modal } from "react-bootstrap";

import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import SelectFormStatic from "@app/modules/SelectForm/SelectFormStatic";
import FormData from "@app/modules/Form/FormData";
import ButtonCancel from "@app/components/Button/ButtonCancel";
import { API_PATH } from "@app/services/_path.service";
import SelectAsyncDynamic from "@app/modules/SelectForm/SelectAsyncDynamic";

import {
  FasopCPointField,
  IFasopCPoint,
} from "@app/interface/fasop-c-point.interface";
// import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
import FormInputControl from "@app/components/Input/FormInputControl";
// import { get } from "lodash";
import TopBarLoader from "@app/components/Loader/TopBarLoader";
// import axios from "axios";
// import { postByPath } from "@app/services/main.service";
// import FormatPesan from './FormatPesan';

// const TIPE = {
//   D: "DIGITAL",
//   A: "ANALOG",
// };


export default function FasPointAnalogDigitalFormPage({
  changesubmit,
  originalDataRef,
  handleClose,
  // refreshData,
}:any) {
  const [dataParams, setDataParams] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  // const [tipePoint, setTipePoint] = useState<any>();
  const optionData = [
    // { label: 'Semua', value: '' },
    { label: "0", value: "0" },
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
    { label: "6", value: "6" },
  
  ];
  /** FORM  HANDLE
   */
  const validationSchema: any = Yup.object().shape({
    id_bay_lokasi: Yup.string().nullable(),
    id_ref_lokasi: Yup.string().nullable(),
    zona: Yup.string().nullable(),
    status: Yup.number()
      .nullable()
      .transform((_, v) => (v == 1 ? 1 : 0)),
  });
  const [formModel] = useState<any>({});

  const { register, handleSubmit, setValue, setError, control, formState } =
    useForm<IFasopCPoint>({
      resolver: yupResolver(validationSchema),
      defaultValues: formModel,
    });
  const { errors }: any = formState || {};
  const watchKinerja = useWatch({ control, name: "kinerja" });
  // const watchTipePointKelompok = useWatch({ control, name: "point_type" });




  const onSubmitForm = async (data: IFasopCPoint) => {
    // console.log('Form Data on Submit: ', data);
    setDataParams(data);
    originalDataRef.current = []; // This should work if originalDataRef is a valid ref

    handleClose();
    
    // Setelah selesai submit, panggil changesubmit dengan filter baru
    const newFilterValues = { /* tambahkan filter baru yang ingin digunakan */ };
    changesubmit(newFilterValues); // Panggil changesubmit
  };

  


  return (
    <>
      <TopBarLoader isLoading={loading} />
      <FormData
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        fields={FasopCPointField}
        path={API_PATH().master.fasop.c_point}
        onLoading={setLoading}
        isModal={true}
        customLabel={'hide'}
      
      >
        <Col md="10" xs="12">
          <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          
            <Row>
              <Col sm>
                <Form.Group className="mb-3">
                  <Form.Label>Jenis Point</Form.Label>
                 
                    <SelectAsyncDynamic
                      fieldName="id_pointtype"
                      pathServiceName="master.fasop.point_type"
                      labelField="name"
                      valueField="id_pointtype"
                      placeholder="Pilih..."
                      errors={errors}
                      control={control}
                      queryParams={{
                        // jenispoint: tipePoint,
                        page: 1,
                        limit: 100,
                        path: "name",
                      }}
                    />
                 
                </Form.Group>
              </Col>
              <Col sm>
                <Form.Group className="mb-3">
                  <Form.Label>Station</Form.Label>
                  <SelectAsyncDynamic
                    fieldName="id_ref_lokasi"
                    pathServiceName="master.jaringan.ref_lokasi"
                    labelField="nama_lokasi"
                    valueField="id_ref_lokasi"
                    placeholder="Pilih..."
                    isClearable={true}
                    errors={errors}
                    control={control}
                    queryParams={{
                      // jenispoint: tipePoint,
                      page: 1,
                      limit: 100,
                      path: "nama_lokasi",
                    }}
         
                  />
                </Form.Group>
              </Col>
              <Col sm>
                <Form.Group className="mb-3">
                  <Form.Label>Bay</Form.Label>
                  <SelectAsyncDynamic
                    fieldName="id_bay_lokasi"
                    pathServiceName="master.jaringan.ref_lokasi"
                    labelField="nama_lokasi"
                    valueField="id_ref_lokasi"
                    placeholder="Pilih..."
                    isClearable={true}
                    errors={errors}
                    control={control}
                    queryParams={{
                      page: 1,
                      limit: 100,
                      path: "nama_lokasi",
                    }}
                    //   queryParams={{
                    //     id_ref_jenis_lokasi_in: `
                    //  ${JENIS_LOKASI().gardu_induk},
                    //  ${JENIS_LOKASI().trafo_gi},
                    //  ${JENIS_LOKASI().penyulang},
                    //  ${JENIS_LOKASI().zone},
                    //  ${JENIS_LOKASI().section},
                    //  ${JENIS_LOKASI().segment},
                    //  ${JENIS_LOKASI().gardu_distribusi},
                    //  ${JENIS_LOKASI().gardu_hubung},
                    //  ${JENIS_LOKASI().trafo_gd}`,
                    //     // page: 1,
                    //     // limit: 10
                    //   }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm>
                <FormInputControl
                  required={true}
                  labelName="Point Number"
                  type="text"
                  register={register("point_number")}
                  isInvalid={errors?.point_number as boolean | undefined}
                  message={errors?.point_number?.message}
                  placeholder="-"
                  readOnly
                />
              </Col>
              <Col sm>
                <FormInputControl
                  required={true}
                  labelName="Point Name"
                  type="text"
                  register={register("point_name")}
                  isInvalid={errors?.point_name as boolean | undefined}
                  message={errors?.point_name?.message}
                  placeholder="-"
                  readOnly
                />
              </Col>
            </Row>
            <Row>
              <Col sm>
                <FormInputControl
                  required={true}
                  labelName="Point Text"
                  type="text"
                  register={register("point_text")}
                  isInvalid={errors?.point_text as boolean | undefined}
                  message={errors?.point_text?.message}
                  placeholder="-"
                  readOnly
                />
              </Col>
              <Col sm>
                <FormInputControl
                  required={true}
                  labelName="Kelompok"
                  type="text"
                  register={register("point_type")}
                  isInvalid={errors?.point_type as boolean | undefined}
                  message={errors?.point_type?.message}
                  placeholder="-"
                  readOnly
                />
              </Col>
            </Row>
            <Row>
              <Col sm>
                <FormInputControl
                  required={false}
                  labelName="Keterangan"
                  type="text"
                  register={register("keterangan_point")}
                  isInvalid={errors?.keterangan_point as boolean | undefined}
                  message={errors?.keterangan_point?.message}
                  placeholder="Masukan Keterangan Point"
                />
              </Col>
              <Col md={3} className="">
            <Form.Group className="mb-2">
            <Form.Label>Zona</Form.Label>
              <SelectFormStatic
              control={control}
              errors={errors}
              fieldName={'zona'}
              placeholder="--Pilih Zona--"
              options={optionData}
            ></SelectFormStatic>
              </Form.Group>
            </Col>
              <Col sm>
                <Form.Group>
                  <Form.Label>Hitung Kinerja</Form.Label>
                  <div className="ms-3 py-2">
                    <Form.Check
                      type="switch"
                      id="kinerja"
                      {...register("kinerja")}
                      label={watchKinerja ? "Ya" : "Tidak"}
                    />
                  </div>
                </Form.Group>
              </Col>
            </Row>
         
          
            <Modal.Footer>
            <div className='d-flex gap-2'>
            <ButtonCancel type='modal' onClick={handleClose} />
              <Button type='submit' variant='primary'>
                Simpan
              </Button>
            </div>
          </Modal.Footer>
          </Form>
        </Col>
      </FormData>
    </>
  );
}
