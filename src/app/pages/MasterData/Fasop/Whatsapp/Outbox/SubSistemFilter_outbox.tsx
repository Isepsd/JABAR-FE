import React, { useState } from 'react';
import { Col, Form, FormControl, InputGroup, Row } from 'react-bootstrap';

import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import FiltersForm from '@app/modules/Filters/FilterForm';
import FilterActionButton from '@app/modules/Filters/FilterActionButton';
// import SelectFormStatic from '@app/modules/SelectForm/SelectFormStatic';
import SelectAsyncDynamic from "@app/modules/SelectForm/SelectAsyncDynamic";
import moment from 'moment';
// import qs from "query-string";


type Props = {
  optionCurrentUser?: any;
  onFilterChange: any;
};
// export default function Filter({ optionCurrentUser, onFilterChange }: Props) {
export default function Filter({ onFilterChange }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  // const queryParams = qs.parse(location.search);
  const [dataParams, setDataParams] = useState<any>({
    datum_afters: moment().subtract(1, 'day').format('YYYY-MM-DD'),
    datum_befores: moment().format('YYYY-MM-DD'),

    // id_pusat:
    //   optionCurrentUser?.level == "PUSAT"
    //     ? optionCurrentUser?.id_unit_lokasi
    //     : queryParams?.__pusat,
    // id_regional:
    //   optionCurrentUser?.level == "REGIONAL"
    //     ? optionCurrentUser?.id_unit_lokasi
    //     : queryParams?.__regional,
    // id_pemilik:
    //   optionCurrentUser?.level == "UNIT_INDUK"
    //     ? optionCurrentUser?.id_unit_lokasi
    //     : queryParams?.__pemilik,
    // id_pengelola:
    //   optionCurrentUser?.level == "UP2D" || optionCurrentUser?.level == "UP3"
    //     ? optionCurrentUser?.id_unit_lokasi
    //     : queryParams?.__pengelola,
    // id_sub_pengelola:
    //   optionCurrentUser?.level == "ULP"
    //     ? optionCurrentUser?.id_unit_lokasi
    //     : queryParams?.__subpengelola,

  });
  // const [optionsTimes, setOptionsTimes] = useState<any>([]);
  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    datum_afters: Yup.string().typeError('Data wajib diisi').nullable(),
    datum_befores: Yup.string().typeError('Data wajib diisi').nullable(),
  });

  const [formModel] = useState<any>({
    msg: null,
    status_laporan: null,
    datum_afters: moment().subtract(1, 'day').format('YYYY-MM-DD'),
    datum_befores: moment().format('YYYY-MM-DD'),

    // id_pusat:
    //   optionCurrentUser?.level == "PUSAT"
    //     ? optionCurrentUser?.id_unit_lokasi
    //     : queryParams?.__pusat,
    // id_regional:
    //   optionCurrentUser?.level == "REGIONAL"
    //     ? optionCurrentUser?.id_unit_lokasi
    //     : queryParams?.__regional,
    // id_pemilik:
    //   optionCurrentUser?.level == "UNIT_INDUK"
    //     ? optionCurrentUser?.id_unit_lokasi
    //     : queryParams?.__pemilik,
    // id_pengelola:
    //   optionCurrentUser?.level == "UP2D" || optionCurrentUser?.level == "UP3"
    //     ? optionCurrentUser?.id_unit_lokasi
    //     : queryParams?.__pengelola,
    // id_sub_pengelola:
    //   optionCurrentUser?.level == "ULP"
    //     ? optionCurrentUser?.id_unit_lokasi
    //     : queryParams?.__subpengelola,
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
      data.datum_before = `${data?.datum_befores} 23:59:59`;
      data.datum_after = `${data?.datum_afters} 00:00:00`;
      return { ...data }
    });
    onFilterChange(data)
  };

  // const watchDate2Before = useWatch({ control, name: 'date_before' });
  const watchDate2After = useWatch({ control, name: 'datum_afters' });

  return (
    <>
      <FiltersForm
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        onLoading={setLoading}
        fields={{
          datum_afters: moment().subtract(1, 'day').format('YYYY-MM-DD'),
          datum_befores: moment().format('YYYY-MM-DD'),
          msg: null,
        }}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row>
            <Col md={4} className='mb-3'>
              <Form.Group>
                <Form.Label>Range Tanggal</Form.Label>
                <InputGroup>
                  <FormControl
                    {...register('datum_afters')}
                    type='date'
                    max={moment().format('YYYY-MM-DD')}
                  />
                  <InputGroup.Text>
                    <i className='fa-solid fa-arrow-right'></i>
                  </InputGroup.Text>
                  <FormControl
                    {...register('datum_befores')}
                    type='date'
                    min={watchDate2After}
                    max={moment().format('YYYY-MM-DD')}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className='mb-3'>
                <Form.Label>Message</Form.Label>
                <FormControl
                  {...register('msg')}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
                <Form.Group className="mb-2">
                  <Form.Label>Kontak</Form.Label>
                  <SelectAsyncDynamic
                    fieldName="id_wa_kontak"
                    pathServiceName="master.fasop.whatsapp.kontak"
                    labelField="nama"
                    valueField="id_wa_kontak"
                    placeholder="All"
                    isClearable={true}
                    errors={errors}
                    control={control}
                    defaultValue={false}
                    // watchParent={watchRegional}
                    queryParams={{
                      page: -1,
                      limit: -1,
                      sort_by: "nama",
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.id_wa_kontak?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

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
