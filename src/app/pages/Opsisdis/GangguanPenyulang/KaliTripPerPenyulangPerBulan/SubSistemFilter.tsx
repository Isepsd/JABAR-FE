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
import { useSelector } from 'react-redux';
import { timeDiff } from '@app/helper/time.helper';
import { useDispatch } from "react-redux";
import { generatingData } from "@app/store/reducers/app";
import SelectFormStatic from '@app/modules/SelectForm/SelectFormStatic';


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

const months = [
  { value: 'Januari', label: 'Januari' },
  { value: 'Februari', label: 'Februari' },
  { value: 'Maret', label: 'Maret' },
  { value: 'April', label: 'April' },
  { value: 'Mei', label: 'Mei' },
  { value: 'Juni', label: 'Juni' },
  { value: 'Juli', label: 'Juli' },
  { value: 'Agustus', label: 'Agustus' },
  { value: 'September', label: 'September' },
  { value: 'Oktober', label: 'Oktober' },
  { value: 'November', label: 'November' },
  { value: 'Desember', label: 'Desember' },
];

function SubSistemFilter({
  tabActive = 'beban_bulanan',
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
      tahun: moment().format('YYYY'),
      // bulan: moment().format('YYYY-MM-DD'),
      bulan: moment().format('MMMM'), // Menggunakan format 'MMMM' untuk bulan teks
      // bulan: "Januari",
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
    tahun: moment().format('YYYY'),
    // bulan: moment().format('YYYY-MM-DD'),
    bulan: moment().format('MMMM'), // Menggunakan format 'MMMM' untuk bulan teks
    // bulan: "Januari",
    models
  });

  const validationSchema = Yup.object().shape({
    tahun: Yup.string().required("Data harus diisi"),
    bulan: Yup.string().required("Data harus diisi"),
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
  const watchInduk = useWatch({ control, name: "id_parent_lokasi" });

  // Mengatur bulan saat ini secara otomatis pada SelectFormStatic
  useEffect(() => {
    const currentMonth = moment().format('MMMM');
    setValue("bulan", currentMonth);
  }, [setValue]);

  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: any) => {
    let diff: any

    let valid = true;
    if (data) {

      switch (tabActive) {
        case "beban_bulanan":
          diff = timeDiff(
            // moment(data?.bulan).format('MMM'),
            moment(data?.tahun).format('YYYY'),
            "days"
          );
          // data.datum_before = `${data?.bulan} 23:59`
          data.datum_after = `${data?.tahun} 00:00`

          break;
        case "beban_tahunan":
        case "puncak_tahunan":
          diff = timeDiff(
            moment(data?.tahun).format('YYYY'),
            "years"
          );
          if (!data?.tahun && data?.tahun != "") {
            setError('tahun',
              {
                type: "manual",
                message: "Range tahun harus diisi",
              })
          }
          if (valid == true && diff > 4) {
            valid = false;
            setError('tahun',
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
        setDataParams(() => {
          return {
            ...data
          }
        });
      }
    }
    // if (data.bulan) {
    //   // Convert bulan teks to the required format, e.g., "01" for January
    //   const monthNumber = moment(data.bulan, 'MMMM').format('MM');
    //   data.bulan = `${data.tahun}-${monthNumber}-01`;
    // }

    // if (valid) {
    //   setDataParams(() => ({ ...data }));
    // }


  };

  useEffect(() => {
    setValue("id_pemilik", null);
    dispatch(generatingData(null));
  }, [watchRegional]);

  useEffect(() => {
    setValue("id_parent_lokasi", null);
    dispatch(generatingData(null));
  }, [watchPemilik]);

  useEffect(() => {
    setValue("id_parent_lokasi", null);
    dispatch(generatingData(null));
  }, [watchPengelola]);
  useEffect(() => {
    dispatch(generatingData(null));
  }, [watchInduk]);

  useEffect(() => {
    if (activeFilters?.filters?.id_gardu_induk) {
      setValue("id_ref_lokasi_gi", activeFilters?.filters?.id_gardu_induk)
    }

  }, [activeFilters?.filters])

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
          tahun: moment().format('YYYY'),
          bulan: moment().format('MMM'),
          ...models,
        }}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row>
            {
              tabActive === 'beban_bulanan' && (
                <>
                  <Col md={2} className='mb-3'>
                    <Form.Group>
                      <Form.Label>Bulan</Form.Label>
                      <SelectFormStatic
                        control={control}
                        errors={errors}
                        fieldName="bulan"
                        placeholder="Pilih Bulan"
                        options={months}
                        isClearable={true}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={2} className='mb-3'>
                    <Form.Group>
                      <Form.Label>Tahun</Form.Label>
                      <InputGroup>
                        <FormControl
                          {...register('tahun')}
                          type='text'
                          placeholder="2024"
                        />
                      </InputGroup>
                      {errors.tahun && (
                        <div className='invalid-feedback d-block'>
                          {errors?.tahun?.message}
                        </div>
                      )}
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
                    queryParams={{
                      page: -1,
                      limit: -1,
                      sort_by: "nama_lokasi",
                      id_ref_jenis_lokasi: (JENIS_LOKASI() as any)["regional"],
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
                        id_ref_jenis_lokasi:
                          watchPemilik || watchPengelola
                            ? (JENIS_LOKASI() as any)["up2d"]
                            : (JENIS_LOKASI() as any)["kosong"],


                        page: -1,
                        limit: -1,
                        sort_by: "nama_lokasi",
                        id_unit_induk: watchPemilik,
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
              optionCurrentUser?.level == "ULP") && isGarduInduk && (
                <Col md={3}>
                  <Form.Group className="mb-2">
                    <Form.Label>Gardu Induk</Form.Label>
                    <SelectAsyncDynamic
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