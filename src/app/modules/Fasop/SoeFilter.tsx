import React, { useState } from "react";
import { Col, Form, FormControl, InputGroup, Row } from "react-bootstrap";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import FiltersForm from "@app/modules/Filters/FilterForm";
import FilterActionButton from "@app/modules/Filters/FilterActionButton";
import moment from "moment";
import SelectAsyncDynamic from "../SelectForm/SelectAsyncDynamic";

function SoeFilter({ onFilterChange }: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>({
    tanggal_akhir: moment().format("YYYY-MM-DD HH:mm:ss"),
    tanggal_mulai: moment().subtract(1, "hour").format("YYYY-MM-DD HH:mm:ss"),
  });

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    tanggal_akhir: Yup.string().nullable(),
    tanggal_mulai: Yup.string().nullable(),
    path1: Yup.string().nullable(),
    path2: Yup.string().nullable(),
    path3: Yup.string().nullable(),
    path4: Yup.string().nullable(),
    path5: Yup.string().nullable(),
    value: Yup.string().nullable(),
    message_text: Yup.string().nullable(),
  });

  const [formModel] = useState<any>({
    tanggal_akhir: moment().format("YYYY-MM-DD HH:mm:ss"),
    tanggal_mulai: moment().subtract(1, "hour").format("YYYY-MM-DD HH:mm:ss"),
    path1: "",
    path2: "",
    path3: "",
    path4: "",
    path5: "",
    message_text: "",
  });

  const { handleSubmit, register, setValue, setError, control, formState } =
    useForm({
      resolver: yupResolver(validationSchema),
      defaultValues: formModel,
    });
  const { errors }: any = formState || {};

  const watchPath1 = useWatch({ control, name: 'path1' });
  const watchPath2 = useWatch({ control, name: 'path2' });
  const watchPath3 = useWatch({ control, name: 'path3' });
  const watchPath4 = useWatch({ control, name: 'path4' });



  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: any) => {
    // setDataParams(data);
    setDataParams(() => {
      return { ...data };
    });
    onFilterChange(data);
  };

  const watchDateMulai = useWatch({ control, name: "tanggal_mulai" });
  const watchDateAkhir = useWatch({ control, name: "tanggal_akhir" });

  return (
    <>
      <FiltersForm
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        onLoading={setLoading}
        fields={{
          tanggal_akhir: moment().format("YYYY-MM-DD HH:mm:ss"),
          tanggal_mulai: moment()
            .subtract(1, "hour")
            .format("YYYY-MM-DD HH:mm:ss"),
          path1: "",
          path2: "",
          path3: "",
          path4: "",
          path5: "",
          message_text: "",
        }}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row>
            <Col md={4} className="mb-3">
              <Form.Group>
                <Form.Label>Range Tanggal</Form.Label>
                <InputGroup>
                  <FormControl
                    {...register("tanggal_mulai")}
                    type="datetime-local"
                    max={watchDateAkhir}
                  />
                  <InputGroup.Text>
                    <i className="fa-solid fa-arrow-right"></i>
                  </InputGroup.Text>
                  <FormControl
                    {...register("tanggal_akhir")}
                    type="datetime-local"
                    min={watchDateMulai}
                    max={moment().format("YYYY-MM-DD")}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            
            <Col md={2} className="mb-3">
              <Form.Group as={Col} className='mb-3'>
                    <Form.Label>
                     Message
                    </Form.Label>
                    <Form.Control
                      {...register('message_text')}
                      isInvalid={errors.message_text}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors?.message_text?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
            </Col>
            <Col md={2} className="">
              <Form.Group className='mb-2'>
                <Form.Label>Lokasi (B1)</Form.Label>
                <SelectAsyncDynamic
                  fieldName='path1'
                  pathServiceName='fasop.laporan_scada.path'
                  labelField='pathname'
                  valueField='pathname'
                  placeholder='Pilih...'
                  isClearable={true}
                  errors={errors}
                  control={control}
                  queryParams={{
                    page: 1,
                    limit: 10,
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
                  pathServiceName='fasop.laporan_scada.path'
                  labelField='pathname'
                  valueField='pathname'
                  placeholder='Pilih...'
                  isClearable={true}
                  errors={errors}
                  control={control}
                  watchParent={watchPath1}
                  queryParams={{
                    page: 1,
                    limit: 10,
                    path: 'path2',
                    ...(watchPath1 ? { path1: watchPath1 } : {}),
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={2} className="">
              <Form.Group className='mb-2'>
                <Form.Label>Bay (B3)</Form.Label>
                <SelectAsyncDynamic
                  fieldName='path3'
                  pathServiceName='fasop.laporan_scada.path'
                  labelField='pathname'
                  valueField='pathname'
                  placeholder='Pilih...'
                  isClearable={true}
                  errors={errors}
                  control={control}
                  watchParent={watchPath2}
                  queryParams={{
                    page: 1,
                    limit: 10,
                    path: 'path3',
                    ...(watchPath1 ? { path1: watchPath1 } : {}),
                    ...(watchPath2 ? { path2: watchPath2 } : {}),
                  }}
                />
              </Form.Group>

            </Col>
            <Col md={2} className="">
              <Form.Group className='mb-2'>
                <Form.Label>Element</Form.Label>
                <SelectAsyncDynamic
                  fieldName='path4'
                  pathServiceName='fasop.laporan_scada.path'
                  labelField='pathname'
                  valueField='pathname'
                  placeholder='Pilih...'
                  isClearable={true}
                  errors={errors}
                  control={control}
                  watchParent={watchPath3}
                  queryParams={{
                    page: 1,
                    limit: 10,
                    path: 'path4',
                    ...(watchPath1 ? { path1: watchPath1 } : {}),
                    ...(watchPath2 ? { path2: watchPath2 } : {}),
                    ...(watchPath3 ? { path3: watchPath3 } : {}),
                  }}
                />
              </Form.Group>

            </Col>
            <Col md={2} className="">
              <Form.Group className='mb-2'>
                <Form.Label>Info</Form.Label>
                <SelectAsyncDynamic
                  fieldName='path5'
                  pathServiceName='fasop.laporan_scada.path'
                  labelField='pathname'
                  valueField='pathname'
                  placeholder='Pilih...'
                  isClearable={true}
                  errors={errors}
                  control={control}
                  watchParent={watchPath4}
                  queryParams={{
                    page: 1,
                    limit: 10,
                    path: 'path5',
                    ...(watchPath1 ? { path1: watchPath1 } : {}),
                    ...(watchPath2 ? { path2: watchPath2 } : {}),
                    ...(watchPath3 ? { path3: watchPath3 } : {}),
                    ...(watchPath4 ? { path4: watchPath4 } : {}),
                  }}
                />
              </Form.Group>
            </Col>
    
          </Row>

          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <FilterActionButton
                  textSubmit="Filter"
                  loading={loading}
                  top=""
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </FiltersForm>
    </>
  );
}

export default SoeFilter;
