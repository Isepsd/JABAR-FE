import React, { useEffect, useState } from 'react';
import { Col, Form, FormControl, InputGroup, Row } from 'react-bootstrap';
import { useForm, useWatch } from 'react-hook-form';
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

import { generatingData } from "@app/store/reducers/app";
import { useDispatch } from "react-redux";

// const selectProps = {
//   fieldName: 'id_ref_lokasi',
//   pathServiceName: 'master.jaringan.ref_lokasi',
//   labelField: 'nama_lokasi',
//   valueField: 'id_ref_lokasi',
//   placeholder: 'Pilih...',
// }



const selectUnitPembangkit = {
  fieldName: 'id_ref_lokasi_unit_pembangkit',
  pathServiceName: 'master.jaringan.ref_lokasi',
  labelField: 'nama_lokasi',
  valueField: 'id_ref_lokasi',
  placeholder: 'Pilih...',
}
const selectPembangkit = {
  fieldName: 'id_ref_lokasi_pembangkit',
  pathServiceName: 'master.jaringan.ref_lokasi',
  labelField: 'nama_lokasi',
  valueField: 'id_ref_lokasi',
  placeholder: 'Pilih...',
}
const selectGarduInduk = {
  fieldName: 'id_ref_lokasi_gi',
  pathServiceName: 'master.jaringan.ref_lokasi',
  labelField: 'nama_lokasi',
  valueField: 'id_ref_lokasi',
  placeholder: 'Pilih...',
}

const selectPenyulang = {
  fieldName: 'id_ref_lokasi_penyulang',
  pathServiceName: 'master.jaringan.ref_lokasi',
  labelField: 'nama_lokasi',
  valueField: 'id_ref_lokasi',
  placeholder: 'Pilih...',
}
const selectGarduHubung = {
  fieldName: 'id_ref_lokasi_gh',
  pathServiceName: 'master.jaringan.ref_lokasi',
  labelField: 'nama_lokasi',
  valueField: 'id_ref_lokasi',
  placeholder: 'Pilih...',
}
const selectKeypoint = {
  fieldName: 'id_ref_lokasi_keypoint',
  pathServiceName: 'master.jaringan.ref_lokasi',
  labelField: 'nama_lokasi',
  valueField: 'id_ref_lokasi',
  placeholder: 'Pilih...',
}

const selectTrafo = {
  fieldName: 'id_ref_lokasi_trafo_gi',
  pathServiceName: 'master.jaringan.ref_lokasi',
  labelField: 'nama_lokasi',
  valueField: 'id_ref_lokasi',
  placeholder: 'Pilih...',
}
// const selectUID = {
//   fieldName: 'id_ref_lokasi_uid',
//   pathServiceName: 'master.jaringan.ref_lokasi',
//   labelField: 'nama_lokasi',
//   valueField: 'id_ref_lokasi',
//   placeholder: 'Pilih...',
// }

// const selectRegional = {
//   fieldName: 'id_ref_lokasi_regional',
//   pathServiceName: 'master.jaringan.ref_lokasi',
//   labelField: 'nama_lokasi',
//   valueField: 'id_ref_lokasi',
//   placeholder: 'Pilih...',
// }

const selectUP2B = {
  fieldName: 'id_ref_lokasi_up2b',
  pathServiceName: 'master.jaringan.ref_lokasi',
  labelField: 'nama_lokasi',
  valueField: 'id_ref_lokasi',
  placeholder: 'Pilih...',
}
const selectUP3 = {
  fieldName: 'id_ref_lokasi_up3',
  pathServiceName: 'master.jaringan.ref_lokasi',
  labelField: 'nama_lokasi',
  valueField: 'id_ref_lokasi',
  placeholder: 'Pilih...',
}
const selectSubSistem = {
  fieldName: 'id_ref_lokasi_subsistem',
  pathServiceName: 'master.jaringan.ref_lokasi',
  labelField: 'nama_lokasi',
  valueField: 'id_ref_lokasi',
  placeholder: 'Pilih...',
}


type Props = {
  tabActive: string;
  isTrafo?: boolean;
  isGH?: boolean;
  isKP?: boolean;
  isTrafoKTT?: boolean;
  isTrafoNonKTT?: boolean;
  isGarduInduk?: boolean;
  isGarduIndukPenyulang?: boolean;
  isGarduIndukTrafoGH?: boolean;
  isGarduIndukTrafoGHZoneSectionPenyulang?: boolean;
  isArea?: boolean;
  isSubSistem?: boolean;
  isPenyulang?: boolean;
  isJenisLayanan?: boolean;
  isUID?: boolean;
  isUID2?: boolean;
  isRegional?: boolean;
  isUP2B?: boolean;
  isUnitPembangkit?: boolean
  isPembangkit?: boolean
  configFilter?: any
  optionCurrentUser?: any
  optionJenisLayanan?: any
  // setAdd?: any
};

function SubSistemFilter({
  tabActive = 'beban_perjam',
  isTrafo = false,
  isGH = false,
  isKP = false,
  isTrafoNonKTT = false,
  isTrafoKTT = false,
  isUnitPembangkit = false,
  isPembangkit = false,
  isGarduInduk = false,
  isGarduIndukPenyulang = false,
  isGarduIndukTrafoGH = false,
  isGarduIndukTrafoGHZoneSectionPenyulang = false,
  isArea = false,
  isSubSistem = false,
  isPenyulang = false,
  isUID = false,
  isUID2 = false,
  // isRegional = false,
  isUP2B = false,
  configFilter = {},
  optionCurrentUser,
  optionJenisLayanan,
  // setAdd,
}: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [dataParams, setDataParams] = useState<any>(
    {id_pusat:
      optionCurrentUser?.level == "PUSAT"
        ? optionCurrentUser?.id_unit_lokasi
        : null,
    id_regional:
      optionCurrentUser?.level == "REGIONAL"
        ? optionCurrentUser?.id_unit_lokasi
        : null,
    id_pemilik:
      optionCurrentUser?.level == "UNIT_INDUK"
        ? optionCurrentUser?.id_unit_lokasi
        : null,
    id_pengelola:
      optionCurrentUser?.level == "UP2D" || optionCurrentUser?.level == "UP3"
        ? optionCurrentUser?.id_unit_lokasi
        : null,
    id_uid:
    optionCurrentUser?.level == "UP2D" || optionCurrentUser?.level == "UP3"
      ? optionCurrentUser?.id_unit_lokasi
      : null,    
    id_sub_pengelola:
      optionCurrentUser?.level == "ULP"
        ? optionCurrentUser?.id_unit_lokasi
        : null,}
  );
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
    // datum_afters:moment().format('YYYY-MM-DD'),
    // datum_befores: moment().format('YYYY-MM-DD'),
    datum_afters: moment().format('YYYY-MM-DD'),
    datum_befores: moment().format('YYYY-MM-DD'),
    day_after: moment().subtract(29, 'day').format('YYYY-MM-DD'),
    day_before: moment().format('YYYY-MM-DD'),
    month_after: moment().startOf('year').format('YYYY-MM'),
    month_before: moment().format('YYYY-MM'),
    year_after: moment().subtract(4, 'year').format('YYYY'),
    year_before: moment().format('YYYY'),
    jenis_layanan: "NON KTT",
    id_pusat:
      optionCurrentUser?.level == "PUSAT"
        ? optionCurrentUser?.id_unit_lokasi
        : null,
    id_regional:
      optionCurrentUser?.level == "REGIONAL"
        ? optionCurrentUser?.id_unit_lokasi
        : null,
    id_pemilik:
      optionCurrentUser?.level == "UNIT_INDUK"
        ? optionCurrentUser?.id_unit_lokasi
        : null,
    id_pengelola:
      optionCurrentUser?.level == "UP2D" || optionCurrentUser?.level == "UP3"
        ? optionCurrentUser?.id_unit_lokasi
        : null,
    id_uid:
    optionCurrentUser?.level == "UP2D" || optionCurrentUser?.level == "UP3"
      ? optionCurrentUser?.id_unit_lokasi
      : null,    
    id_sub_pengelola:
      optionCurrentUser?.level == "ULP"
        ? optionCurrentUser?.id_unit_lokasi
        : null,
    // level: optionCurrentUser?.level,
    models
  });

  const validationSchema = Yup.object().shape({
    datum_afters: Yup.string().required("Data harus diisi"),
    datum_befores: Yup.string().required("Data harus diisi"),
    day_after: Yup.string().required("Data harus diisi"),
    day_before: Yup.string().required("Data harus diisi"),
    month_after: Yup.string().required("Data harus diisi"),
    month_before: Yup.string().required("Data harus diisi"),
    year_after: Yup.string().required("Data harus diisi"),
    year_before: Yup.string().required("Data harus diisi"),
    id_regional:
      optionCurrentUser?.level == "PUSAT"
        ? Yup.string()
            .typeError("Regional wajib diisi")
            .required("Regional wajib diisi")
        : Yup.string().nullable(),
    id_pemilik:
      optionCurrentUser?.level == "PUSAT" &&
      optionCurrentUser?.level == "REGIONAL"
        ? Yup.string()
            .typeError("Unit Induk wajib diisi")
            .required("Unit Induk wajib diisi")
        : Yup.string().nullable(),
    // id_uid:
    // optionCurrentUser?.level == "PUSAT" &&
    // optionCurrentUser?.level == "REGIONAL"
    //   ? Yup.string()
    //       .typeError("Unit Induk wajib diisi")
    //       .required("Unit Induk wajib diisi")
    //   : Yup.string().nullable(),    
    id_pengelola: Yup.string().nullable(),
    //   datum_after: Yup.string()
    //   .test(
    //     "",
    //     "Maximal data hanya 3 hari",
    //     function(value: any) {
    //       const start = value?.replace('T', ' ');
    //       const { datum_before } = this.parent;
    //       return isSameOrBeforeDiff(start, datum_before);
    //     }
    //   ),
    // datum_before: Yup.string().nullable(),
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
  const watchDatum1After = useWatch({ control, name: 'datum_afters' });
  const watchDatum2Before = useWatch({ control, name: 'datum_befores' });
  // const watchDate1After = useWatch({ control, name: 'date_after' });
  // const watchDate2Before = useWatch({ control, name: 'date_before' });
  const watchMonth1After = useWatch({ control, name: 'month_after' });
  const watchMonth2Before = useWatch({ control, name: 'month_before' });
  const watchGarduInduk = useWatch({ control, name: 'id_ref_lokasi_gi' });
  // const watchGarduInduk_GH = useWatch({ control, name: 'id_ref_lokasi_gi' });
  // const watchGarduInduk_KP = useWatch({ control, name: 'id_ref_lokasi_gi' });
  const watchUnitPembangkit = useWatch({ control, name: 'id_ref_lokasi_unit_pembangkit' });
  // const watchRegional = useWatch({ control, name: 'id_ref_lokasi_regional' });
  const watchRegional = useWatch({ control, name: "id_regional" });
  const watchPemilik = useWatch({ control, name: "id_pemilik" });
  const watchPengelola = useWatch({ control, name: "id_pengelola" });
  // const watchUID = useWatch({ control, name: "id_uid" });
  const watchInduk = useWatch({ control, name: "id_parent_lokasi" });
  
  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: any) => {
    let diff: any
    // if (data) {
    //   data.datum_before = moment(data?.datum_before).format('YYYY-MM-DD HH:mm')
    //   data.datum_after = moment(data?.datum_after).format('YYYY-MM-DD HH:mm')

    // }
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
        case "beban_harian":
          diff = timeDiff(
            moment(data?.day_before).format('YYYY-MM-DD'),
            moment(data?.day_after).format('YYYY-MM-DD'),
            "days"
          );
          // delete data.datum_befores
          // delete data.datum_afters
          // delete data.year_before
          // delete data.year_after

          // delete data.month_after
          // delete data.month_before
          // delete data.datum_after
          // delete data.datum_before
          if (diff > 29) {
            valid = false;
            setError('day_after',
              {
                type: "manual",
                message: "Range tanggal maksimal 30 hari",
              })
          }

          break;
        case "beban_bulanan":
        case "puncak_bulanan":
          diff = timeDiff(
            moment(data?.month_before).format('YYYY-MM-DD'),
            moment(data?.month_after).format('YYYY-MM-DD'),
            "months"
          );
          // delete data.datum_befores
          // delete data.datum_afters
          // delete data.year_before
          // delete data.year_after

          // delete data.datum_after
          // delete data.datum_before
          // delete data.day_after
          // delete data.day_before
          if (diff > 16) {
            valid = false;
            setError('month_after',
              {
                type: "manual",
                message: "Maksimal 16 bulan",
              })
          }

          break;
        case "beban_tahunan":
        case "puncak_tahunan":
          diff = timeDiff(
            moment(data?.year_before).format('YYYY-MM-DD'),
            moment(data?.year_after).format('YYYY-MM-DD'),
            "years"
          );
          // delete data.datum_befores
          // delete data.datum_afters
          // delete data.datum_before
          // delete data.datum_after

          // delete data.month_after
          // delete data.month_before
          // delete data.day_after
          // delete data.day_before
          if (!data?.year_after && data?.year_after != "") {
            setError('year_after',
              {
                type: "manual",
                message: "Range tahun harus diisi",
              })
          }
          if (!data?.year_before && data?.year_before != "") {
            setError('year_after',
              {
                type: "manual",
                message: "Range tahun harus diisi",
              })
            setError('year_before',
              {
                type: "manual",
                message: "Range tahun harus diisi",
              })
          }

          if (valid == true && diff > 4) {
            valid = false;
            setError('year_after',
              {
                type: "manual",
                message: "Range maksmimal 10 tahun",
              })
            setError('year_before',
              {
                type: "manual",
                message: "Range maksmimal 10 tahun",
              })
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
    setValue("id_pemilik", null);
    dispatch(generatingData(null));
    // setAdd(false);
  }, [watchRegional]);

  useEffect(() => {
    setValue("id_parent_lokasi", null);
    dispatch(generatingData(null));
    // setAdd(false);
  }, [watchPemilik]);

  useEffect(() => {
    setValue("id_parent_lokasi", null);
    dispatch(generatingData(null));
    // setAdd(false);
  }, [watchPengelola]);

  // useEffect(() => {
  //   setValue("id_uid", null);
  //   dispatch(generatingData(null));
  //   // setAdd(false);
  // }, [watchUID]);

  useEffect(() => {
    dispatch(generatingData(null));
    // setAdd(false);
  }, [watchInduk]);

  useEffect(() => {
    // if (activeFilters?.filters?.id_regional) {
    //   setValue("id_ref_lokasi_regional", activeFilters?.filters?.id_regional)
    // }
    if (activeFilters?.filters?.id_gardu_induk) {
      setValue("id_ref_lokasi_gi", activeFilters?.filters?.id_gardu_induk)
    }
    if (!activeFilters?.filters?.id_gardu_induk && activeFilters?.filters?.id_ref_lokasi_trafo_gi) {
      setValue("id_ref_lokasi_trafo_gi", activeFilters?.filters?.id_ref_lokasi_trafo_gi)
    }
    if (!activeFilters?.filters?.id_gardu_induk && activeFilters?.filters?.id_ref_lokasi_penyulang) {
      setValue("id_ref_lokasi_penyulang", activeFilters?.filters?.id_ref_lokasi_penyulang)
    }
    if (!activeFilters?.filters?.id_gardu_induk && activeFilters?.filters?.id_ref_lokasi_gh) {
      setValue("id_ref_lokasi_gh", activeFilters?.filters?.id_ref_lokasi_gh)
    }

    if (!activeFilters?.filters?.id_gardu_induk && activeFilters?.filters?.id_ref_lokasi_keypoint) {
      setValue("id_ref_lokasi_keypoint", activeFilters?.filters?.id_ref_lokasi_keypoint)
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
          day_after: moment().subtract(29, 'day').format('YYYY-MM-DD'),
          day_before: moment().format('YYYY-MM-DD'),
          month_after: moment().startOf('year').format('YYYY-MM'),
          month_before: moment().format('YYYY-MM'),
          year_after: moment().subtract(4, 'year').format('YYYY'),
          year_before: moment().format('YYYY'),
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
              (tabActive == 'beban_harian') && (
                <>
                  <Col md={6} className='mb-3'>
                    <Form.Group>
                      <Form.Label>Range Tanggal</Form.Label>
                      <InputGroup>
                        <FormControl
                          {...register('day_after')}
                          type='date'
                        />
                        <InputGroup.Text>
                          <i className='fa-solid fa-arrow-right'></i>
                        </InputGroup.Text>
                        <FormControl
                          {...register('day_before')}
                          type='date'
                          max={moment().format('YYYY-MM-DD')}
                        />
                      </InputGroup>
                    </Form.Group>
                    {errors.day_after && (
                      <div className='invalid-feedback d-block'>
                        {errors?.day_after?.message}
                      </div>
                    )}
                  </Col>
                </>
              )
            }
            {
              tabActive == 'puncak_bulanan' && (
                <>
                  <Col md={6} className='mb-3'>
                    <Form.Group>
                      <Form.Label>Range Bulan</Form.Label>
                      <InputGroup>
                        <FormControl
                          {...register('month_after')}
                          type='month'
                          formTarget='yyyy-mm-dd'
                          placeholder='Pilih Tanggal'
                          max={watchMonth2Before}
                        />
                        <InputGroup.Text>
                          <i className='fa-solid fa-arrow-right'></i>
                        </InputGroup.Text>

                        <FormControl
                          {...register('month_before')}
                          type='month'
                          formTarget='yyyy-mm-dd'
                          placeholder='Pilih Tanggal'
                          min={moment(watchMonth1After)
                            .format('YYYY-MM')}
                          max={moment().format('YYYY-MM')}
                        />
                      </InputGroup>
                    </Form.Group>
                    {errors.month_after && (
                      <div className='invalid-feedback d-block'>
                        {errors?.month_after?.message}
                      </div>
                    )}
                  </Col>
                </>
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

                        <InputGroup.Text>
                          <i className='fa-solid fa-arrow-right'></i>
                        </InputGroup.Text>
                        <FormControl
                          {...register('year_before')}
                          type='year'
                        />
                      </InputGroup>
                    </Form.Group>
                  </Col>

                </>
              )
            }
            {
              tabActive == 'faktor_harian' && (
                <Col md={6} className='mb-3'>
                  <Form.Group>
                    <Form.Label>Range Tanggal</Form.Label>
                    <InputGroup>
                      <FormControl
                        {...register('datum_after')}
                        type='date'
                        min={moment(watchDatum2Before)
                          .subtract(1, 'month')
                          .format('YYYY-MM-DD HH:mm')}
                        max={watchDatum2Before}
                      />
                      <InputGroup.Text>
                        <i className='fa-solid fa-arrow-right'></i>
                      </InputGroup.Text>
                      <FormControl
                        {...register('datum_before')}
                        type='date'
                        min={watchDatum1After}
                        max={moment().format('YYYY-MM-DD HH:mm')}
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
              )
            }
            {
              tabActive == 'faktor_bulanan' && (
                <Col md={6} className='mb-3'>
                  <Form.Group>
                    <Form.Label>Range Tanggal</Form.Label>
                    <InputGroup>
                      <FormControl
                        {...register('datum_after')}
                        type='month'
                        min={moment(watchDatum2Before)
                          .subtract(1, 'month')
                          .format('YYYY-MM-DD HH:mm')}
                        max={watchDatum2Before}
                      />
                      <InputGroup.Text>
                        <i className='fa-solid fa-arrow-right'></i>
                      </InputGroup.Text>
                      <FormControl
                        {...register('datum_before')}
                        type='month'
                        min={watchDatum1After}
                        max={moment().format('YYYY-MM-DD HH:mm')}
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
              )
            }
            {/* {isRegional &&
              <Col md={3}>
                <Form.Group className='mb-3'>
                  <Form.Label>Regional</Form.Label>
                  <SelectAsyncDynamic
                    {...selectRegional}
                    isClearable={true}
                    errors={errors}
                    control={control}
                    queryParams={{ id_ref_jenis_lokasi: `${JENIS_LOKASI().regional}`, sort_by: "nama_lokasi" }}
                  />
                </Form.Group>
              </Col>
            } */}
          {optionCurrentUser?.level == "PUSAT" && (
              <Col md={3}>
                <Form.Group className="mb-2">
                  <Form.Label>Regional</Form.Label>
                  <SelectAsyncDynamic
                    fieldName="id_regional"
                    pathServiceName="master.jaringan.ref_lokasi"
                    labelField="nama_lokasi"
                    valueField="id_ref_lokasi"
                    placeholder="Pilih..."
                    isClearable={false}
                    errors={errors}
                    control={control}
                    // defaultValue={false}
                    // watchParent={watchRegional}
                    queryParams={{
                      page: -1,
                      limit: -1,
                      sort_by: "nama_lokasi",
                      id_ref_jenis_lokasi: (JENIS_LOKASI() as any)["regional"],
                      // level: optionCurrentUser?.level,
                      id_pusat:
                        optionCurrentUser?.level == "PUSAT"
                          ? optionCurrentUser?.id_unit_lokasi
                          : null,
                      id_regional:
                        optionCurrentUser?.level == "REGIONAL"
                          ? optionCurrentUser?.id_unit_lokasi
                          : null,
                      id_pemilik:
                        optionCurrentUser?.level == "UNIT_INDUK"
                          ? optionCurrentUser?.id_unit_lokasi
                          : null,
                      id_pengelola:
                        optionCurrentUser?.level == "UP2D" ||
                        optionCurrentUser?.level == "UP3"
                          ? optionCurrentUser?.id_unit_lokasi
                          : null,
                      id_sub_pengelola:
                        optionCurrentUser?.level == "ULP"
                          ? optionCurrentUser?.id_unit_lokasi
                          : null,
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.id_regional?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            )}       
            {/* {isUID  &&
              <Col md={3}>
                <Form.Group className='mb-3'>
                  <Form.Label>Unit Induk <RequiredInfo /></Form.Label>
                  <SelectAsyncDynamic
                    required={true}
                    {...selectUID}
                    isClearable={true}
                    fieldNameParent="id_regional"
                    errors={errors}
                    control={control}
                    queryParams={{
                      id_ref_jenis_lokasi: JENIS_LOKASI().uiw,
                      sort_by: "nama_lokasi",
                      // ...(watchRegional ? { id_parent_lokasi: watchRegional } : { id_ref_lokasi: '0' })
                    }}
                    watchParent={watchRegional}

                  />
                </Form.Group>
              </Col>
            } */}
            {(optionCurrentUser?.level == "PUSAT" ||
              optionCurrentUser?.level == "REGIONAL") && isUID && (
              <Col md={3}>
                <Form.Group className="mb-2">
                  <Form.Label>Unit Induk</Form.Label>

                  <SelectAsyncDynamic
                    fieldName="id_pemilik"
                    // fieldName="id_ref_lokasi_uid"
                    pathServiceName="master.jaringan.ref_lokasi"
                    labelField="nama_lokasi"
                    valueField="id_ref_lokasi"
                    placeholder="Pilih..."
                    isClearable={true}
                    errors={errors}
                    control={control}
                    // defaultValue={false}
                    watchParent={
                      optionCurrentUser?.level == "PUSAT"
                        ? watchRegional
                        : false
                    }
                    queryParams={{
                      page: -1,
                      limit: -1,
                      sort_by: "nama_lokasi",
                      id_ref_jenis_lokasi: watchRegional
                        ? (JENIS_LOKASI() as any)["uid"]
                        : (JENIS_LOKASI() as any)["kosong"],
                      // level: optionCurrentUser?.level,
                      id_pusat:
                        optionCurrentUser?.level == "PUSAT"
                          ? optionCurrentUser?.id_unit_lokasi
                          : null,
                      id_regional: watchRegional,
                      id_pemilik:
                        optionCurrentUser?.level == "UNIT_INDUK"
                          ? optionCurrentUser?.id_unit_lokasi
                          : null,
                      id_pengelola:
                        optionCurrentUser?.level == "UP2D" ||
                        optionCurrentUser?.level == "UP3"
                          ? optionCurrentUser?.id_unit_lokasi
                          : null,
                      id_sub_pengelola:
                        optionCurrentUser?.level == "ULP"
                          ? optionCurrentUser?.id_unit_lokasi
                          : null,
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.id_pemilik?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            )}
            {(optionCurrentUser?.level == "PUSAT" ||
              optionCurrentUser?.level == "REGIONAL") && isUID2 && (
              <Col md={3}>
                <Form.Group className="mb-2">
                  <Form.Label>Unit Induk</Form.Label>

                  <SelectAsyncDynamic
                    fieldName="pemilik"
                    // fieldName="id_ref_lokasi_uid"
                    pathServiceName="master.jaringan.ref_lokasi"
                    labelField="nama_lokasi"
                    valueField="id_ref_lokasi"
                    placeholder="Pilih..."
                    isClearable={true}
                    errors={errors}
                    control={control}
                    // defaultValue={false}
                    watchParent={
                      optionCurrentUser?.level == "PUSAT"
                        ? watchRegional
                        : false
                    }
                    queryParams={{
                      page: -1,
                      limit: -1,
                      sort_by: "nama_lokasi",
                      id_ref_jenis_lokasi: watchRegional
                        ? (JENIS_LOKASI() as any)["uid"]
                        : (JENIS_LOKASI() as any)["kosong"],
                      // level: optionCurrentUser?.level,
                      id_pusat:
                        optionCurrentUser?.level == "PUSAT"
                          ? optionCurrentUser?.id_unit_lokasi
                          : null,
                      id_regional: watchRegional,
                      id_pemilik:
                        optionCurrentUser?.level == "UNIT_INDUK"
                          ? optionCurrentUser?.id_unit_lokasi
                          : null,
                      id_pengelola:
                        optionCurrentUser?.level == "UP2D" ||
                        optionCurrentUser?.level == "UP3"
                          ? optionCurrentUser?.id_unit_lokasi
                          : null,
                      id_sub_pengelola:
                        optionCurrentUser?.level == "ULP"
                          ? optionCurrentUser?.id_unit_lokasi
                          : null,
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.id_pemilik?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            )}
            {(optionCurrentUser?.level == "PUSAT" ||
              optionCurrentUser?.level == "REGIONAL" ||
              optionCurrentUser?.level == "UNIT_INDUK" ||
              optionCurrentUser?.level == "UP2D" ||
              optionCurrentUser?.level == "UP3" ||
              optionCurrentUser?.level == "ULP") && isArea && (
              <Col md={3}>
                <Form.Group className='mb-3'>
                  <Form.Label>UP3</Form.Label>
                  <SelectAsyncDynamic
                    {...selectUP3}
                    isClearable={true}
                    errors={errors}
                    control={control}
                    watchParent={
                      optionCurrentUser?.level == "PUSAT" ||
                      optionCurrentUser?.level == "REGIONAL"
                        ? watchPemilik
                        : false
                    }
                    queryParams={{ 
                      // id_ref_jenis_lokasi: `${JENIS_LOKASI().up3}`, sort_by: "nama_lokasi" 
                      id_ref_jenis_lokasi:
                        watchPemilik || watchPengelola
                          ? (JENIS_LOKASI() as any)["up3"]
                          : (JENIS_LOKASI() as any)["kosong"],
                      
                      
                      page: -1,
                      limit: -1,
                      sort_by: "nama_lokasi",

                      //Apabila sudah ada id_pemilik dan id_pusat pada data UP3 bisa di buka commentnya
                      
                      // id_pusat:
                      //   optionCurrentUser?.level == "PUSAT"
                      //     ? optionCurrentUser?.id_unit_lokasi
                      //     : null,
                      // id_regional:
                      //   optionCurrentUser?.level == "REGIONAL"
                      //     ? optionCurrentUser?.id_unit_lokasi
                      //     : null,
                      // id_pemilik: watchPemilik,
                          
                      id_uid: watchPemilik,
                      id_pengelola:
                        optionCurrentUser?.level == "UP2D" ||
                        optionCurrentUser?.level == "UP3"
                          ? optionCurrentUser?.id_unit_lokasi
                          : null,
                      id_sub_pengelola:
                        optionCurrentUser?.level == "ULP"
                          ? optionCurrentUser?.id_unit_lokasi
                          : null,

                      jenis_layanan_in: optionJenisLayanan
                        ? optionJenisLayanan
                        : null,
                    }}
                  />
                </Form.Group>
              </Col>
            )}
            {(optionCurrentUser?.level == "PUSAT" ||
              optionCurrentUser?.level == "REGIONAL" ||
              optionCurrentUser?.level == "UNIT_INDUK" ||
              optionCurrentUser?.level == "UP2D" ||
              optionCurrentUser?.level == "UP3" ||
              optionCurrentUser?.level == "ULP") && isGarduInduk &&(
              <Col md={3}>
                <Form.Group className="mb-2">
                  <Form.Label>Gardu Induk</Form.Label>
                  <SelectAsyncDynamic
                    // fieldName="id_parent_lokasi"
                    // pathServiceName="master.jaringan.ref_lokasi"
                    // labelField="nama_lokasi"
                    // valueField="id_ref_lokasi"
                    // placeholder="Pilih..."
                    required={true}
                    {...selectGarduInduk}
                    isClearable={true}
                    errors={errors}
                    control={control}
                    watchParent={
                      optionCurrentUser?.level == "PUSAT" ||
                      optionCurrentUser?.level == "REGIONAL"
                        ? watchPemilik
                        : false
                    }
                    queryParams={{
                      id_ref_jenis_lokasi:
                        watchPemilik || watchPengelola
                          ? (JENIS_LOKASI() as any)["gardu_induk"]
                          : (JENIS_LOKASI() as any)["kosong"],
                      page: -1,
                      limit: -1,
                      sort_by: "nama_lokasi",
                      
                      // level: optionCurrentUser?.level,
                      id_pusat:
                        optionCurrentUser?.level == "PUSAT"
                          ? optionCurrentUser?.id_unit_lokasi
                          : null,
                      id_regional:
                        optionCurrentUser?.level == "REGIONAL"
                          ? optionCurrentUser?.id_unit_lokasi
                          : null,
                      id_pemilik: watchPemilik,
                      
                      id_pengelola:
                        optionCurrentUser?.level == "UP2D" ||
                        optionCurrentUser?.level == "UP3"
                          ? optionCurrentUser?.id_unit_lokasi
                          : null,
                      id_sub_pengelola:
                        optionCurrentUser?.level == "ULP"
                          ? optionCurrentUser?.id_unit_lokasi
                          : null,

                      jenis_layanan_in: optionJenisLayanan
                        ? optionJenisLayanan
                        : null,
                      ...paramsGI
                    }}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors?.id_parent_lokasi?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            )}
            {(optionCurrentUser?.level == "PUSAT" ||
              optionCurrentUser?.level == "REGIONAL" ||
              optionCurrentUser?.level == "UNIT_INDUK" ||
              optionCurrentUser?.level == "UP2D" ||
              optionCurrentUser?.level == "UP3" ||
              optionCurrentUser?.level == "ULP") && isGarduIndukPenyulang &&(
              <Col md={3}>
                <Form.Group className="mb-2">
                  <Form.Label>Gardu Induk/Penyulang</Form.Label>
                  <SelectAsyncDynamic
                    fieldName="id_ref_lokasi_gi"
                    pathServiceName="master.jaringan.ref_lokasi"
                    labelField="nama_lokasi"
                    valueField="id_ref_lokasi"
                    placeholder="Pilih & Search..."
                    required={true}
                    // {...selectGarduInduk}
                    isClearable={true}
                    errors={errors}
                    control={control}
                    watchParent={
                      optionCurrentUser?.level == "PUSAT" ||
                      optionCurrentUser?.level == "REGIONAL"
                        ? watchPemilik
                        : false
                    }
                    queryParams={{
                      // id_ref_jenis_lokasi_in:
                      //   watchPemilik || watchPengelola
                      //     // ? (JENIS_LOKASI() as any)["gardu_induk"]
                      //     ? [
                      //       (JENIS_LOKASI() as any)["gardu_induk"],
                      //       (JENIS_LOKASI() as any)["penyulang"]
                      //     ]
                      //     : (JENIS_LOKASI() as any)["kosong"],
                      id_ref_jenis_lokasi_in: watchPemilik || watchPengelola ? `${JENIS_LOKASI().gardu_induk},${JENIS_LOKASI().penyulang}` : (JENIS_LOKASI() as any)["kosong"],
                      // page: -1,
                      // limit: -1,
                      page: -1,
                      limit: 10,
                      sort_by: "nama_lokasi",
                      
                      // level: optionCurrentUser?.level,
                      id_pusat:
                        optionCurrentUser?.level == "PUSAT"
                          ? optionCurrentUser?.id_unit_lokasi
                          : null,
                      id_regional:
                        optionCurrentUser?.level == "REGIONAL"
                          ? optionCurrentUser?.id_unit_lokasi
                          : null,
                      id_pemilik: watchPemilik,
                      
                      id_pengelola:
                        optionCurrentUser?.level == "UP2D" ||
                        optionCurrentUser?.level == "UP3"
                          ? optionCurrentUser?.id_unit_lokasi
                          : null,
                      id_sub_pengelola:
                        optionCurrentUser?.level == "ULP"
                          ? optionCurrentUser?.id_unit_lokasi
                          : null,

                      jenis_layanan_in: optionJenisLayanan
                        ? optionJenisLayanan
                        : null,
                      ...paramsGI
                    }}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors?.id_parent_lokasi?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            )}
            {(optionCurrentUser?.level == "PUSAT" ||
              optionCurrentUser?.level == "REGIONAL" ||
              optionCurrentUser?.level == "UNIT_INDUK" ||
              optionCurrentUser?.level == "UP2D" ||
              optionCurrentUser?.level == "UP3" ||
              optionCurrentUser?.level == "ULP") && isGarduIndukTrafoGH &&(
              <Col md={3}>
                <Form.Group className="mb-2">
                  <Form.Label>GI/Trafo GI/GH</Form.Label>
                  <SelectAsyncDynamic
                    fieldName="id_ref_lokasi_gi"
                    pathServiceName="master.jaringan.ref_lokasi"
                    labelField="nama_lokasi"
                    valueField="id_ref_lokasi"
                    placeholder="Pilih & Search..."
                    required={true}
                    // {...selectGarduInduk}
                    isClearable={true}
                    errors={errors}
                    control={control}
                    watchParent={
                      optionCurrentUser?.level == "PUSAT" ||
                      optionCurrentUser?.level == "REGIONAL"
                        ? watchPemilik
                        : false
                    }
                    queryParams={{
                      // id_ref_jenis_lokasi_in:
                      //   watchPemilik || watchPengelola
                      //     // ? (JENIS_LOKASI() as any)["gardu_induk"]
                      //     ? [
                      //       (JENIS_LOKASI() as any)["gardu_induk"],
                      //       (JENIS_LOKASI() as any)["penyulang"]
                      //     ]
                      //     : (JENIS_LOKASI() as any)["kosong"],
                      id_ref_jenis_lokasi_in: watchPemilik || watchPengelola ? `${JENIS_LOKASI().gardu_induk},${JENIS_LOKASI().gardu_hubung},${JENIS_LOKASI().trafo_gi}` : (JENIS_LOKASI() as any)["kosong"],
                      // page: -1,
                      // limit: -1,
                      page: -1,
                      limit: 10,
                      sort_by: "nama_lokasi",
                      
                      // level: optionCurrentUser?.level,
                      id_pusat:
                        optionCurrentUser?.level == "PUSAT"
                          ? optionCurrentUser?.id_unit_lokasi
                          : null,
                      id_regional:
                        optionCurrentUser?.level == "REGIONAL"
                          ? optionCurrentUser?.id_unit_lokasi
                          : null,
                      id_pemilik: watchPemilik,
                      
                      id_pengelola:
                        optionCurrentUser?.level == "UP2D" ||
                        optionCurrentUser?.level == "UP3"
                          ? optionCurrentUser?.id_unit_lokasi
                          : null,
                      id_sub_pengelola:
                        optionCurrentUser?.level == "ULP"
                          ? optionCurrentUser?.id_unit_lokasi
                          : null,

                      jenis_layanan_in: optionJenisLayanan
                        ? optionJenisLayanan
                        : null,
                      ...paramsGI
                    }}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors?.id_parent_lokasi?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            )}
            {(optionCurrentUser?.level == "PUSAT" ||
              optionCurrentUser?.level == "REGIONAL" ||
              optionCurrentUser?.level == "UNIT_INDUK" ||
              optionCurrentUser?.level == "UP2D" ||
              optionCurrentUser?.level == "UP3" ||
              optionCurrentUser?.level == "ULP") && isGarduIndukTrafoGHZoneSectionPenyulang &&(
              <Col md={3}>
                <Form.Group className="mb-2">
                  <Form.Label>GI/Trafo GI/GH/Zone/Section/Penyulang</Form.Label>
                  <SelectAsyncDynamic
                    fieldName="id_ref_lokasi_gi"
                    pathServiceName="master.jaringan.ref_lokasi"
                    labelField="nama_lokasi"
                    valueField="id_ref_lokasi"
                    placeholder="Pilih & Search..."
                    required={true}
                    // {...selectGarduInduk}
                    isClearable={true}
                    errors={errors}
                    control={control}
                    watchParent={
                      optionCurrentUser?.level == "PUSAT" ||
                      optionCurrentUser?.level == "REGIONAL"
                        ? watchPemilik
                        : false
                    }
                    queryParams={{
                      // id_ref_jenis_lokasi_in:
                      //   watchPemilik || watchPengelola
                      //     // ? (JENIS_LOKASI() as any)["gardu_induk"]
                      //     ? [
                      //       (JENIS_LOKASI() as any)["gardu_induk"],
                      //       (JENIS_LOKASI() as any)["penyulang"]
                      //     ]
                      //     : (JENIS_LOKASI() as any)["kosong"],
                      id_ref_jenis_lokasi_in: watchPemilik || watchPengelola ? `${JENIS_LOKASI().gardu_induk},${JENIS_LOKASI().trafo_gi},${JENIS_LOKASI().zone},${JENIS_LOKASI().section},${JENIS_LOKASI().penyulang},${JENIS_LOKASI().gardu_hubung}` : (JENIS_LOKASI() as any)["kosong"],
                      // page: -1,
                      // limit: -1,
                      page: -1,
                      limit: 10,
                      sort_by: "nama_lokasi",
                      
                      // level: optionCurrentUser?.level,
                      id_pusat:
                        optionCurrentUser?.level == "PUSAT"
                          ? optionCurrentUser?.id_unit_lokasi
                          : null,
                      id_regional:
                        optionCurrentUser?.level == "REGIONAL"
                          ? optionCurrentUser?.id_unit_lokasi
                          : null,
                      id_pemilik: watchPemilik,
                      
                      id_pengelola:
                        optionCurrentUser?.level == "UP2D" ||
                        optionCurrentUser?.level == "UP3"
                          ? optionCurrentUser?.id_unit_lokasi
                          : null,
                      id_sub_pengelola:
                        optionCurrentUser?.level == "ULP"
                          ? optionCurrentUser?.id_unit_lokasi
                          : null,

                      jenis_layanan_in: optionJenisLayanan
                        ? optionJenisLayanan
                        : null,
                      ...paramsGI
                    }}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors?.id_parent_lokasi?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            )}
            {isUnitPembangkit &&
              <Col md={3}>
                <Form.Group className='mb-3'>
                  <Form.Label>Unit Pembangkit <RequiredInfo /></Form.Label>
                  <SelectAsyncDynamic
                    required={true}
                    {...selectUnitPembangkit}
                    isClearable={true}
                    errors={errors}
                    control={control}
                    queryParams={{
                      // id_ref_jenis_lokasi: JENIS_LOKASI().unit_pembangkit,
                      id_ref_jenis_lokasi: JENIS_LOKASI().unit_pembangkit,
                      page: -1,
                      limit: -1,
                      sort_by: "nama_lokasi"
                    }}
                  />
                </Form.Group>
              </Col>
            }
            {isPembangkit &&
              <Col md={3}>
                <Form.Group className='mb-3'>
                  <Form.Label>Pembangkit </Form.Label>
                  <SelectAsyncDynamic
                    required={false}
                    {...selectPembangkit}
                    isClearable={true}
                    errors={errors}
                    control={control}
                    fieldNameParent="id_unit_pembangkit"
                    queryParams={{
                      // id_ref_jenis_lokasi: JENIS_LOKASI().pembangkit,
                      id_ref_jenis_lokasi: watchUnitPembangkit 
                      ? (JENIS_LOKASI() as any)["pembangkit"]
                      : (JENIS_LOKASI() as any)["kosong"],
                      page: -1,
                      limit: -1,
                      sort_by: "nama_lokasi"
                    }}
                    watchParent={watchUnitPembangkit}
                  />
                </Form.Group>
              </Col>
            }
            {/* {isGarduInduk &&
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
            } */}
            
            {isTrafo &&
              <Col md={3}>
                <Form.Group className='mb-3'>
                  <Form.Label>Trafo <RequiredInfo /></Form.Label>
                  <SelectAsyncDynamic
                    required={true}
                    {...selectTrafo}
                    isClearable={true}
                    errors={errors}
                    control={control}
                    queryParams={{
                      // id_ref_jenis_lokasi: JENIS_LOKASI().trafo_gi,
                      id_ref_jenis_lokasi: watchGarduInduk
                      ? (JENIS_LOKASI() as any)["trafo_gi"]
                      : (JENIS_LOKASI() as any)["kosong"],
                      sort_by: "nama_lokasi"
                    }}
                    watchParent={watchGarduInduk}

                  />
                </Form.Group>
              </Col>
            }
             {isGH &&
              <Col md={3}>
             <Form.Group className='mb-3'>
                  <Form.Label>Gardu Hubung <RequiredInfo /></Form.Label>
                  <SelectAsyncDynamic
                    required={true}
                    {...selectGarduHubung}
                    isClearable={true}
                    fieldNameParent="id_gardu_induk"
                    errors={errors}
                    control={control}
                    queryParams={{
                      // id_ref_jenis_lokasi: JENIS_LOKASI().keypoint,
                      // id_ref_jenis_lokasi: JENIS_LOKASI().gardu_hubung,
                      id_ref_jenis_lokasi: watchGarduInduk
                      ? (JENIS_LOKASI() as any)["gardu_hubung"]
                      : (JENIS_LOKASI() as any)["kosong"],
                      sort_by: "nama_lokasi",
                      fungsi_lokasi:"GH"
                    }}
                    watchParent={watchGarduInduk}

                  />
                </Form.Group>
              </Col>
          }
            {isKP &&
              <Col md={3}>
             <Form.Group className='mb-3'>
                  <Form.Label>KeyPoint<RequiredInfo /></Form.Label>
                  <SelectAsyncDynamic
                    required={true}
                    {...selectKeypoint}
                    isClearable={true}
                    fieldNameParent="id_gardu_induk"
                    errors={errors}
                    control={control}
                    queryParams={{
                      // id_ref_jenis_lokasi: JENIS_LOKASI().keypoint,
                      id_ref_jenis_lokasi: watchGarduInduk
                      ? (JENIS_LOKASI() as any)["keypoint"]
                      : (JENIS_LOKASI() as any)["kosong"],
                      sort_by: "nama_lokasi",
                      // fungsi_lokasi:"GH"
                      // id_ref_jenis_lokasi:"508d16bc1a9f4fd1a81349a612baaa75",
                    }}
                    watchParent={watchGarduInduk}

                  />
                </Form.Group>
              </Col>
          }
            {isTrafoKTT &&
              <Col md={3}>
                <Form.Group className='mb-3'>
                  <Form.Label>Trafo <RequiredInfo /></Form.Label>
                  <SelectAsyncDynamic
                    required={true}
                    {...selectTrafo}
                    isClearable={true}
                    fieldNameParent="id_gardu_induk"
                    errors={errors}
                    control={control}
                    queryParams={{
                      // id_ref_jenis_lokasi: JENIS_LOKASI().trafo_gi,
                      id_ref_jenis_lokasi: watchGarduInduk
                      ? (JENIS_LOKASI() as any)["trafo_gi"]
                      : (JENIS_LOKASI() as any)["kosong"],
                      jenis_layanan: "KTT",
                      sort_by: "nama_lokasi"
                    }}
                    watchParent={watchGarduInduk}

                  />
                </Form.Group>
              </Col>
            }

            {isTrafoNonKTT &&
              <Col md={3}>
                <Form.Group className='mb-3'>
                  <Form.Label>Trafo <RequiredInfo /></Form.Label>
                  <SelectAsyncDynamic
                    required={true}
                    {...selectTrafo}
                    isClearable={true}
                    fieldNameParent="id_gardu_induk"
                    errors={errors}
                    control={control}
                    queryParams={{
                      // id_ref_jenis_lokasi: JENIS_LOKASI().trafo_gi,
                      id_ref_jenis_lokasi: watchGarduInduk
                      ? (JENIS_LOKASI() as any)["trafo_gi"]
                      : (JENIS_LOKASI() as any)["kosong"],
                      jenis_layanan: "NON KTT",
                      sort_by: "nama_lokasi"
                    }}
                    watchParent={watchGarduInduk}

                  />
                </Form.Group>
              </Col>
            }
            {isPenyulang &&
              <Col md={3}>
                <Form.Group className='mb-3'>
                  <Form.Label>Penyulang</Form.Label>
                  <SelectAsyncDynamic
                    {...selectPenyulang}
                    isClearable={true}
                    errors={errors}
                    control={control}
                    fieldNameParent="id_gardu_induk"
                    queryParams={{ 
                      // id_ref_jenis_lokasi: JENIS_LOKASI().penyulang, 
                      id_ref_jenis_lokasi: watchGarduInduk
                      ? (JENIS_LOKASI() as any)["penyulang"]
                      : (JENIS_LOKASI() as any)["kosong"],
                      sort_by: "nama_lokasi" }}
                    watchParent={watchGarduInduk}
                  />
                </Form.Group>
              </Col>
            }
            {isUP2B &&
              <Col md={3}>
                <Form.Group className='mb-3'>
                  <Form.Label>UP2B</Form.Label>
                  <SelectAsyncDynamic
                    {...selectUP2B}
                    isClearable={true}
                    errors={errors}
                    control={control}
                    queryParams={{ 
                      id_ref_jenis_lokasi: `${JENIS_LOKASI().up2b}`, 
                      sort_by: "nama_lokasi" }}
                  />
                </Form.Group>
              </Col>
            }

            {/* DIBUKA SETELAH ada ID_PEMILIK dan ID_REGIONAL*/}
            
            {/* {(optionCurrentUser?.level == "PUSAT" ||
              optionCurrentUser?.level == "REGIONAL") && isUP2B && (
              <Col md={3}>
                <Form.Group className="mb-2">
                  <Form.Label>UP2B</Form.Label>

                  <SelectAsyncDynamic
                    {...selectUP2B}
                    isClearable={true}
                    errors={errors}
                    control={control}
                    // defaultValue={false}
                    watchParent={
                      optionCurrentUser?.level == "PUSAT"
                        ? watchRegional
                        : false
                    }
                    queryParams={{
                      page: -1,
                      limit: -1,
                      sort_by: "nama_lokasi",
                      id_ref_jenis_lokasi: watchRegional
                        ? (JENIS_LOKASI() as any)["up2b"]
                        : (JENIS_LOKASI() as any)["kosong"],
                      // level: optionCurrentUser?.level,
                      id_pusat:
                        optionCurrentUser?.level == "PUSAT"
                          ? optionCurrentUser?.id_unit_lokasi
                          : null,
                      id_regional: watchRegional,
                      id_pemilik:
                        optionCurrentUser?.level == "UNIT_INDUK"
                          ? optionCurrentUser?.id_unit_lokasi
                          : null,
                      id_pengelola:
                        optionCurrentUser?.level == "UP2D" ||
                        optionCurrentUser?.level == "UP3"
                          ? optionCurrentUser?.id_unit_lokasi
                          : null,
                      id_sub_pengelola:
                        optionCurrentUser?.level == "ULP"
                          ? optionCurrentUser?.id_unit_lokasi
                          : null,
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.id_pemilik?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            )} */}
            {(optionCurrentUser?.level == "PUSAT" ||
              optionCurrentUser?.level == "REGIONAL" ||
              optionCurrentUser?.level == "UNIT_INDUK" ||
              optionCurrentUser?.level == "UP2D" ||
              optionCurrentUser?.level == "UP3" ||
              optionCurrentUser?.level == "ULP") && isSubSistem && (
              <Col md={3}>
                <Form.Group className='mb-3'>
                  <Form.Label>Sub Sistem</Form.Label>
                  <SelectAsyncDynamic
                    {...selectSubSistem}
                    isClearable={true}
                    errors={errors}
                    control={control}

                    //DIBUKA Setelah sudah ada id_pemilik di data SUBSISTEM

                    // watchParent={
                    //   optionCurrentUser?.level == "PUSAT" ||
                    //   optionCurrentUser?.level == "REGIONAL"
                    //     ? watchPemilik
                    //     : false
                    // }
                    queryParams={{ 
                      id_ref_jenis_lokasi: `${JENIS_LOKASI().subsistem}`, 
                      sort_by: "nama_lokasi" 

                      //DIBUKA Setelah sudah ada id_pemilik di data SUBSISTEM

                      // id_ref_jenis_lokasi:
                      //   watchPemilik || watchPengelola
                      //     ? (JENIS_LOKASI() as any)["subsistem"]
                      //     : (JENIS_LOKASI() as any)["kosong"],
                      // page: -1,
                      // limit: -1,
                      // sort_by: "nama_lokasi",
                      
                      // id_pusat:
                      //   optionCurrentUser?.level == "PUSAT"
                      //     ? optionCurrentUser?.id_unit_lokasi
                      //     : null,
                      // id_regional:
                      //   optionCurrentUser?.level == "REGIONAL"
                      //     ? optionCurrentUser?.id_unit_lokasi
                      //     : null,
                      // id_pemilik: watchPemilik,
                      
                      // id_pengelola:
                      //   optionCurrentUser?.level == "UP2D" ||
                      //   optionCurrentUser?.level == "UP3"
                      //     ? optionCurrentUser?.id_unit_lokasi
                      //     : null,
                      // id_sub_pengelola:
                      //   optionCurrentUser?.level == "ULP"
                      //     ? optionCurrentUser?.id_unit_lokasi
                      //     : null,

                      // jenis_layanan_in: optionJenisLayanan
                      //   ? optionJenisLayanan
                      //   : null,
                      }}
                  />
                </Form.Group>
              </Col>
            )}

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