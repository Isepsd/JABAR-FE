import React, { useEffect, useState } from 'react';
import { Col, Form, FormControl, InputGroup, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import moment from 'moment';

import FiltersForm from '@app/modules/Filters/FilterForm';
import FilterActionButton from '@app/modules/Filters/FilterActionButton';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
import RequiredInfo from '@app/components/Info/RequiredInfo';
import { useSelector } from 'react-redux';
import { timeDiff } from '@app/helper/time.helper';


const selectGarduInduk = {
  fieldName: 'id_ref_lokasi_gi',
  pathServiceName: 'master.jaringan.ref_lokasi',
  labelField: 'nama_lokasi',
  valueField: 'id_ref_lokasi',
  placeholder: 'Pilih...',
}



type Props = {
  tabActive: string;
  isTrafoKTT?: boolean;
  isTrafoNonKTT?: boolean;
  isGarduInduk?: boolean;
  configFilter?: any
};

function SubSistemFilter({
  tabActive = 'beban_perjam',
  isTrafoNonKTT = false,
  isTrafoKTT = false,
  isGarduInduk = false,
  configFilter = {}
}: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();
  const [paramsGI, setParamsGI] = useState<any>();

  const shapes: any = {};
  const models: any = {};

  const { activeFilters }: any = useSelector(
    (state: any) => state.ui
  );

  configFilter?.forEach(((parameter: any) => {
    shapes[parameter] = Yup.string().required('Data belum dipilih');
    models[parameter] = undefined
  }));

  const [formModel] = useState<any>({
    datum_afters: moment().format('YYYY-MM-DD'),
    datum_befores: moment().format('YYYY-MM-DD'),
    year_after: moment().subtract(4, 'year').format('YYYY'),
    models
  });

  const validationSchema = Yup.object().shape({
    datum_afters: Yup.string().required("Data harus diisi"),
    datum_befores: Yup.string().required("Data harus diisi"),
    year_after: Yup.string().required("Data harus diisi"),
    ...shapes
  });

  const {
    handleSubmit,
    register,
    setValue,
    setError,
    control,
    formState,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  const { errors }: any = formState;
  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: any) => {
    let diff: any
    
    let valid = true;
    if (data) {

      switch (tabActive) {
        case "beban_perjam":
          diff = timeDiff(
            moment(data?.datum_befores).format('YYYY-MM-DD'),
            moment(data?.datum_afters).format('YYYY-MM-DD'),
            "days"
          );
          // diff = timeDiff(
          //   moment(data?.datum_before).format('YYYY-MM-DD HH:mm'),
          //   moment(data?.datum_after).format('YYYY-MM-DD HH:mm'),
          //   "days"
          // );
          data.datum_before = `${data?.datum_befores} 23:59`
          data.datum_after = `${data?.datum_afters} 00:00`
          // delete data.datum_befores
          // delete data.datum_afters
          // delete data.year_before
          // delete data.year_after

          // delete data.month_after
          // delete data.month_before
          // delete data.day_after
          // delete data.day_before

          if (diff > 2) {
            valid = false;
            setError('datum_afters',
              {
                type: "manual",
                message: "Range tanggal maksimal 3 hari",
              })
          }

          break;
        case "beban_tahunan":
        case "puncak_tahunan":
          diff = timeDiff(
            // moment(data?.year_before).format('YYYY-MM-DD'),
            moment(data?.year_after).format('YYYY-MM-DD'),
            "years"
          );
          if (!data?.year_after && data?.year_after != "") {
            setError('year_after',
              {
                type: "manual",
                message: "Range tahun harus diisi",
              })
          }
          // if (!data?.year_before && data?.year_before != "") {
          //   setError('year_after',
          //     {
          //       type: "manual",
          //       message: "Range tahun harus diisi",
          //     })
          //   setError('year_before',
          //     {
          //       type: "manual",
          //       message: "Range tahun harus diisi",
          //     })
          // }
          if (valid == true && diff > 4) {
            valid = false;
            setError('year_after',
              {
                type: "manual",
                message: "Range maksmimal 10 tahun",
              })
            // setError('year_before',
            //   {
            //     type: "manual",
            //     message: "Range maksmimal 10 tahun",
            //   })
          }

          break;

        default:
          break;
      }
      if (valid) {
        // setDataParams(data);
        setDataParams(() => {
          return { ...data }
        });
      }
    }

  };

  useEffect(() => {
    if (activeFilters?.filters?.id_gardu_induk) {
      setValue("id_ref_lokasi_gi", activeFilters?.filters?.id_gardu_induk)
    }
    
  }, [activeFilters?.filters])

  // console.log("perjm errorr", errors);

  useEffect(() => {
    let paramsGI: any = {}
    if (isTrafoKTT) {
      paramsGI = {
        jenis_layanan_id: "KTT,CAMPURAN"
      }
    } else if (isTrafoNonKTT) {
      paramsGI = {
        jenis_layanan_id: "NON KTT,CAMPURAN"
      }
    }

    setParamsGI(paramsGI)
  }, [])

  return (
    <>
      <FiltersForm
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        onLoading={setLoading}
        fields={{
          datum_before: null,
          datum_after: null,
          datum_afters: moment().format('YYYY-MM-DD'),
          datum_befores: moment().format('YYYY-MM-DD'),
        year_after: moment().subtract(4, 'year').format('YYYY'),
          ...models,
        }}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row>
          {
              tabActive == 'beban_perjam' && (
                <Col md={6} className='mb-3'>
                  <Form.Group>
                    <Form.Label>Range Tanggal</Form.Label>
                    <InputGroup>
                      <FormControl
                        {...register('datum_afters')}
                        type='date'
                        // min={moment(watchDatum2Before)
                        //   .subtract(2, 'day')
                        //   .format('YYYY-MM-DD HH:mm')}
                        // max={watchDatum2Before}
                      />
                      <InputGroup.Text>
                        <i className='fa-solid fa-arrow-right'></i>
                      </InputGroup.Text>
                      <FormControl
                        {...register('datum_befores')}
                        type='date'
                        // min={moment(watchDatum1After)
                        //   .subtract(2, 'day')
                        //   .format('YYYY-MM-DD')}
                        // max={moment().format('YYYY-MM-DD')}
                      />
                    </InputGroup>
                  </Form.Group>
                  {errors.datum_afters && (
                    <div className='invalid-feedback d-block'>
                      {errors?.datum_afters?.message}
                    </div>
                  )}
                </Col>
              )
            }
            {
              tabActive == 'puncak_tahunan' && (
                <>
                  <Col md={4} className='mb-3'>
                    <Form.Group>
                      <Form.Label>Range Tahun</Form.Label>
                      <InputGroup>
                        <FormControl
                          {...register('year_after')}
                          type='year'
                        />

                        {/* <InputGroup.Text>
                          <i className='fa-solid fa-arrow-right'></i>
                        </InputGroup.Text>
                        <FormControl
                          {...register('year_before')}
                          type='year'
                        /> */}
                      </InputGroup>
                    </Form.Group>
                  </Col>

                </>
              )
            }
            
            {isGarduInduk &&
              <Col md={3}>
                <Form.Group className='mb-3'>
                  <Form.Label>Gardu Induk <RequiredInfo /></Form.Label>
                  <SelectAsyncDynamic
                    required={true}
                    {...selectGarduInduk}
                    isClearable={true}
                    errors={errors}
                    control={control}
                    queryParams={{
                      id_ref_jenis_lokasi: JENIS_LOKASI().gardu_induk,
                      page: -1,
                      limit: -1,
                      sort_by: "nama_lokasi",
                      ...paramsGI
                    }}
                  />
                </Form.Group>
              </Col>
            }
            
          </Row>
          <FilterActionButton
            loading={loading}
            onClickReset={() => onSubmitForm(null)}
            className="justify-content-start"
          />
        </Form>
      </FiltersForm>
    </>
  )
}

export default SubSistemFilter