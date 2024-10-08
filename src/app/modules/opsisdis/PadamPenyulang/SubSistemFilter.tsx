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
// import RequiredInfo from '@app/components/Info/RequiredInfo';
import { useSelector } from 'react-redux';
import { timeDiff } from '@app/helper/time.helper';
import { useDispatch } from "react-redux";
import { generatingData } from "@app/store/reducers/app";


const selectGarduInduk = {
  fieldName: 'id_ref_lokasi_gi',
  pathServiceName: 'master.jaringan.ref_lokasi',
  labelField: 'nama_lokasi',
  valueField: 'id_ref_lokasi',
  placeholder: 'Pilih...',
}

const selectUP2D = {
  fieldName: 'id_pengelola',
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
  isUID?: boolean;
  isRegional?: boolean;
  isUP2D?: boolean;

  configFilter?: any
  optionCurrentUser?: any
  optionJenisLayanan?: any

};

function SubSistemFilter({
  tabActive = 'beban_perjam',
  isTrafoNonKTT = false,
  isTrafoKTT = false,
  isGarduInduk = false,
  isUID = false,
  isUP2D = false,
  isRegional = false,
  configFilter = {},
  optionCurrentUser,
  optionJenisLayanan,
}: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [dataParams, setDataParams] = useState<any>(
    {
      datum_afters: moment().format('YYYY-MM-DD'),
      datum_befores: moment().format('YYYY-MM-DD'),
      year_after: moment().subtract(4, 'year').format('YYYY'),
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
    }
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
    datum_afters: moment().format('YYYY-MM-DD'),
    datum_befores: moment().format('YYYY-MM-DD'),
    year_after: moment().subtract(4, 'year').format('YYYY'),
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
    models
  });

  const validationSchema = Yup.object().shape({
    datum_afters: Yup.string().required("Data harus diisi"),
    datum_befores: Yup.string().required("Data harus diisi"),
    year_after: Yup.string().required("Data harus diisi"),
    // id_regional:
    //   optionCurrentUser?.level == "PUSAT"
    //     ? Yup.string()
    //         .typeError("Regional wajib diisi")
    //         .required("Regional wajib diisi")
    //     : Yup.string().nullable(),
    // id_pemilik:
    //   optionCurrentUser?.level == "PUSAT" &&
    //   optionCurrentUser?.level == "REGIONAL"
    //     ? Yup.string()
    //         .typeError("Unit Induk wajib diisi")
    //         .required("Unit Induk wajib diisi")
    //     : Yup.string().nullable(),
    // id_pengelola: Yup.string().nullable(),
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
  const watchRegional = useWatch({ control, name: "id_regional" });
  const watchPemilik = useWatch({ control, name: "id_pemilik" });
  const watchPengelola = useWatch({ control, name: "id_pengelola" });
  // const watchUID = useWatch({ control, name: "id_uid" });
  const watchInduk = useWatch({ control, name: "id_parent_lokasi" });

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

            {optionCurrentUser?.level == "PUSAT" && isRegional && (
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
              optionCurrentUser?.level == "REGIONAL" ||
              optionCurrentUser?.level == "UNIT_INDUK" ||
              optionCurrentUser?.level == "UP2D") && isUP2D && (
                <Col md={3}>
                  <Form.Group className='mb-3'>
                    <Form.Label>UP2D</Form.Label>
                    <SelectAsyncDynamic
                      {...selectUP2D}
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
                            ? (JENIS_LOKASI() as any)["up2d"]
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
                        id_unit_induk: watchPemilik,
                        // id_uid: watchPemilik,
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

            {(optionCurrentUser?.level == "PUSAT" ||
              optionCurrentUser?.level == "REGIONAL" ||
              optionCurrentUser?.level == "UNIT_INDUK" ||
              optionCurrentUser?.level == "UP2D" ||
              optionCurrentUser?.level == "UP3" ||
              optionCurrentUser?.level == "ULP") && isGarduInduk && (
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