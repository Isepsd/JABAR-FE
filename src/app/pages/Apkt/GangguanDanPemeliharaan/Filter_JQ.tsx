import React, { useState } from 'react';
import { Col, Form, FormControl, InputGroup, Row } from 'react-bootstrap';

import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import FiltersForm from '@app/modules/Filters/FilterForm';
import FilterActionButton from '@app/modules/Filters/FilterActionButton';
import SelectFormStatic from '@app/modules/SelectForm/SelectFormStatic';
import moment from 'moment';
import qs from "query-string";

const OPTION_LAPORAN = [
  {
    label: "Open",
    value: "open"
  },
  {
    label: "Close",
    value: "close"
  }
]

type Props = {
  optionCurrentUser?: any;
  onFilterChange: any;
};
export default function Filter({ optionCurrentUser, onFilterChange }: Props) {

  const [loading, setLoading] = useState<boolean>(false);
  const queryParams = qs.parse(location.search);
  const [dataParams, setDataParams] = useState<any>({
    day_after: moment().subtract(1, 'day').format('YYYY-MM-DD'),
    day_before: moment().format('YYYY-MM-DD'),

    id_pusat:
      optionCurrentUser?.level == "PUSAT"
        ? optionCurrentUser?.id_unit_lokasi
        : queryParams?.__pusat,
    id_regional:
      optionCurrentUser?.level == "REGIONAL"
        ? optionCurrentUser?.id_unit_lokasi
        : queryParams?.__regional,
    id_pemilik:
      optionCurrentUser?.level == "UNIT_INDUK"
        ? optionCurrentUser?.id_unit_lokasi
        : queryParams?.__pemilik,
    id_pengelola:
      optionCurrentUser?.level == "UP2D" || optionCurrentUser?.level == "UP3"
        ? optionCurrentUser?.id_unit_lokasi
        : queryParams?.__pengelola,
    id_sub_pengelola:
      optionCurrentUser?.level == "ULP"
        ? optionCurrentUser?.id_unit_lokasi
        : queryParams?.__subpengelola,

  });
  // const [optionsTimes, setOptionsTimes] = useState<any>([]);
  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    day_after: Yup.string().typeError('Data wajib diisi').nullable(),
    day_before: Yup.string().typeError('Data wajib diisi').nullable(),
  });

  const [formModel] = useState<any>({
    nama_laporan: null,
    status_laporan: null,
    day_after: moment().subtract(1, 'day').format('YYYY-MM-DD'),
    day_before: moment().format('YYYY-MM-DD'),

    id_pusat:
      optionCurrentUser?.level == "PUSAT"
        ? optionCurrentUser?.id_unit_lokasi
        : queryParams?.__pusat,
    id_regional:
      optionCurrentUser?.level == "REGIONAL"
        ? optionCurrentUser?.id_unit_lokasi
        : queryParams?.__regional,
    id_pemilik:
      optionCurrentUser?.level == "UNIT_INDUK"
        ? optionCurrentUser?.id_unit_lokasi
        : queryParams?.__pemilik,
    id_pengelola:
      optionCurrentUser?.level == "UP2D" || optionCurrentUser?.level == "UP3"
        ? optionCurrentUser?.id_unit_lokasi
        : queryParams?.__pengelola,
    id_sub_pengelola:
      optionCurrentUser?.level == "ULP"
        ? optionCurrentUser?.id_unit_lokasi
        : queryParams?.__subpengelola,
  });

  const {
    handleSubmit,
    setValue,
    setError,
    control,
    formState,
    register
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  const { errors }: any = formState || {};

  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: any) => {
    setDataParams(() => {
      return { ...data }
    });
    onFilterChange(data)
  };

  // const watchDate2Before = useWatch({ control, name: 'date_before' });
  const watchDate2After = useWatch({ control, name: 'day_after' });

  return (
    <>
      <FiltersForm
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        onLoading={setLoading}
        fields={{
          day_after: moment().subtract(1, 'day').format('YYYY-MM-DD'),
          day_before: moment().format('YYYY-MM-DD'),
          nama_laporan: null,
          status_laporan: null,
          status_2: null
        }}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row>
            <Col md={4} className='mb-3'>
              <Form.Group>
                <Form.Label>Range Tanggal</Form.Label>
                <InputGroup>
                  <FormControl
                    {...register('day_after')}
                    type='date'
                    max={moment().format('YYYY-MM-DD')}
                  />
                  <InputGroup.Text>
                    <i className='fa-solid fa-arrow-right'></i>
                  </InputGroup.Text>
                  <FormControl
                    {...register('day_before')}
                    type='date'
                    min={watchDate2After}
                    max={moment().format('YYYY-MM-DD')}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className='mb-3'>
                <Form.Label>Nama Laporan</Form.Label>
                <FormControl
                  {...register('nama_laporan')}
                />
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group className='mb-3'>
                <Form.Label>Status Laporan</Form.Label>
                <SelectFormStatic
                  control={control}
                  errors={errors}
                  fieldName="status_laporan"
                  placeholder="All"
                  options={OPTION_LAPORAN}
                  isClearable={true}
                />
              </Form.Group>
            </Col>
            {/* <Col md={2}>
              <Form.Group className='mb-3'>
                <Form.Label>Status Listrik</Form.Label>
                <SelectFormStatic
                  control={control}
                  errors={errors}
                  fieldName="status_2"
                  placeholder="All"
                  options={[{ label: "Nyala", value: "up" }, { label: "Padam", value: "down" }]}
                  isClearable={true}
                />
              </Form.Group>
            </Col> */}

          </Row>
          <Row>
            <Col md={3} className="">
              <FilterActionButton top="" className="justify-content-start" loading={loading} />
            </Col>
          </Row>
        </Form>
      </FiltersForm>
    </>
  );
}
