import React, { useState } from 'react';
import { Col, Form, FormControl, InputGroup, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import FiltersForm from '@app/modules/Filters/FilterForm';
import FilterActionButton from '@app/modules/Filters/FilterActionButton';
import moment from 'moment';
import SelectAsyncDynamic from "@app/modules/SelectForm/SelectAsyncDynamic";
import SelectFormStatic from "@app/modules/SelectForm/SelectFormStatic";
// import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
// import { API_PATH } from '@app/services/_path.service';


export default function RCFilter({onFilterChange}:any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();
  const optionData = [
    // { label: 'Semua', value: '' },
    { label: "> 2 Jam", value: "2jam" },
    { label: "> 4 Jam", value: "4jam" },
    { label: "> 6 Jam", value: "6jam" },
  ];

  const optionDataJenis = [
    // { label: 'Semua', value: '' },
    { label: "FEEDER", value: "feeder" },
    { label: "GH", value: "gh" },
    { label: "KP", value: "kp" },
    { label: "MP", value: "mp" },
    { label: "TRAFO GI", value: "trafogi" }

  ];

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    datum_after: Yup.string().nullable(),
    datum_before: Yup.string().nullable(),
    id_unit: Yup.string().nullable(),
    path1: Yup.string().nullable(),
    path2: Yup.string().nullable(),
    path3: Yup.string().nullable(),
    path4: Yup.string().nullable(),
  });
  // const currentDate = moment();
  // const startOfDay = currentDate
  //   .clone()
  //   .startOf("day")
  //   .set({ hour: 0, minute: 0, second: 0 });
  // const endOfDay = currentDate
  //   .clone()
  //   .endOf("day")
  //   .set({ hour: 23, minute: 59, second: 59 });

  const [formModel] = useState<any>({
    datum_after: moment().subtract(1, "day").format("YYYY-MM-DD"),
    datum_before: moment().format("YYYY-MM-DD"),
    path1: "",
    path2: "",
    path3: "",
    path4: "",
    id_unit: null,
  });

  const { handleSubmit, register, setValue, setError, control, formState } =
    useForm({
      resolver: yupResolver(validationSchema),
      defaultValues: formModel,
    });
  const { errors }: any = formState || {};
  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: any) => {
    // setDataParams(data);
    

    // setLoading(true);
    setDataParams(() => {
      return { ...data };
    });
    onFilterChange(data)
  };
  

  return (
    <>
      <FiltersForm
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        onLoading={setLoading}
        fields={{
        //   datum_after: moment().subtract(1, "day").format("YYYY-MM-DD") + " 00:00:00",
        //   datum_before: moment().format("YYYY-MM-DD") + " 23:59:59",
          datum_after: moment().subtract(1, "day").format("YYYY-MM-DD"),
          datum_before: moment().format("YYYY-MM-DD"),
          path1: "",
          path2: "",
          path3: "",
          path4: "",
          id_unit: null,
        }}

      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row>
            <Col md={2} className="">
              <Form.Group>
                <Form.Label>Range Tanggal</Form.Label>
                <InputGroup>
                  <FormControl
                    {...register("datum_after")}
                    type="date"
                    defaultValue={moment(formModel.datum_after).format(
                      "YYYY-MM-DD"
                    )}
                  // min={moment(watchDatum2Before)
                  //   .subtract(1, 'month')
                  //   .format('YYYY-MM-DD')}
                  // max={watchDatum2Before}
                  />
                  <InputGroup.Text>
                    <i className="fa-solid fa-arrow-right"></i>
                  </InputGroup.Text>
                  <FormControl
                    {...register("datum_before")}
                    type="date"
                    defaultValue={moment(formModel.datum_after).format(
                      "YYYY-MM-DD"
                    )}
                  // min={watchDatum1After}
                  // max={moment().format('YYYY-MM-DD')}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col md={2} className="">
            <Form.Group className="mb-2">
            <Form.Label>JENIS</Form.Label>
              <SelectFormStatic
              control={control}
              errors={errors}
              fieldName={'optiondatajenis'}
              placeholder="--Pilih Jenis--"
              options={optionDataJenis}
            ></SelectFormStatic>
              </Form.Group>
            </Col>                
            <Col md={2} className="">
            <Form.Group className="mb-2">
            <Form.Label>Durasi</Form.Label>
              <SelectFormStatic
              control={control}
              errors={errors}
              fieldName={'optiondata'}
              placeholder="--Durasi--"
              options={optionData}
            ></SelectFormStatic>
              </Form.Group>
            </Col>        
            {/* <Col md={2} className=''>
            <Form.Group  className='mb-2'>
                <Form.Label>Unit</Form.Label>
                <SelectAsyncDynamic
                  fieldName='id_unit'
                  pathServiceName=''
                  path={API_PATH().master.jaringan.ref_lokasi}
                  labelField='nama_lokasi'
                  valueField='id_ref_lokasi'
                  placeholder='Pilih...'
                  isClearable={true}
                  errors={errors}
                  control={control}
                  isSearchable={false}
                  queryParams={{ id_ref_jenis_lokasi_in: `${JENIS_LOKASI().ultg}`, showrc: true }}
                />
              </Form.Group>
              </Col> */}
            <Col md={2} className="">
              <Form.Group className='mb-2'>
                <Form.Label>Lokasi (B1)</Form.Label>
                <SelectAsyncDynamic
                  fieldName='path1'
                  pathServiceName='fasop.laporan_scada.pathtext'
                  labelField='path_text'
                  valueField='path_text'
                  placeholder='Pilih...'
                  isClearable={true}
                  errors={errors}
                  control={control}
                  queryParams={{
                    page: -1,
                    limit: -1,
                    path: 'path1',
                  }}
                />
              </Form.Group>

            </Col>
            <Col md={2} className="">
              <Form.Group className='mb-2'>
                <Form.Label>Tegangan (B2)</Form.Label>
                <SelectAsyncDynamic
                  fieldName='path2'
                  pathServiceName='fasop.laporan_scada.pathtext'
                  labelField='path_text'
                  valueField='path_text'
                  placeholder='Pilih...'
                  isClearable={true}
                  errors={errors}
                  control={control}
                  queryParams={{
                    page: -1,
                    limit: -1,
                    path: 'path2',
                  }}
                />
              </Form.Group>

            </Col>
            <Col md={2} className="">
              <Form.Group className='mb-2'>
                <Form.Label>Bay (B3)</Form.Label>
                <SelectAsyncDynamic
                  fieldName='path3'
                  pathServiceName='fasop.laporan_scada.pathtext'
                  labelField='path_text'
                  valueField='path_text'
                  placeholder='Pilih...'
                  isClearable={true}
                  errors={errors}
                  control={control}
                  queryParams={{
                    page: -1,
                    limit: -1,
                    path: 'path3',
                  }}
                />
              </Form.Group>
            </Col>
              <Col md={2} className="">
              <Form.Group className='mb-2'>
                <Form.Label>Element</Form.Label>
                <SelectAsyncDynamic
                  fieldName='path4'
                  pathServiceName='fasop.laporan_scada.pathtext'
                  labelField='path_text'
                  valueField='path_text'
                  placeholder='Pilih...'
                  isClearable={true}
                  errors={errors}
                  control={control}
                  queryParams={{
                    page: -1,
                    limit: -1,
                    path: 'path4',
                  }}
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Label></Form.Label>
              <FilterActionButton
                textSubmit='Filter'
                loading={loading}
                top="mt-2"
              />
            </Col>
          </Row>

        </Form>
      </FiltersForm>
    </>
  );
}

