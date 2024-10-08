import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import moment from 'moment';

import FiltersForm from '@app/modules/Filters/FilterForm';
import FilterActionButton from '@app/modules/Filters/FilterActionButton';
import SelectAsyncDynamic from '@app/modules/SelectForm/SelectAsyncDynamic';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
import RequiredInfo from '@app/components/Info/RequiredInfo';

// import { useDispatch } from "react-redux";
import qs from "query-string";
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
const selectUID = {
  fieldName: 'id_ref_lokasi_uid',
  pathServiceName: 'master.jaringan.ref_lokasi',
  labelField: 'nama_lokasi',
  valueField: 'id_ref_lokasi',
  placeholder: 'Pilih...',
}

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

  isTrafo?: boolean;
  isGH?: boolean;
  isKP?: boolean;
  isTrafoKTT?: boolean;
  isTrafoNonKTT?: boolean;
  isGarduInduk?: boolean;
  isArea?: boolean;
  isSubSistem?: boolean;
  isPenyulang?: boolean;
  isJenisLayanan?: boolean;
  isUID?: boolean;
  isUP2B?: boolean;
  isUnitPembangkit?: boolean
  isPembangkit?: boolean


  optionCurrentUser?: any;
  optionJenisLayanan?: any;
  optionJenisLayananTrafo?: any;
  onFilterChange?: any;
  
};

function MasterDataFilter({
 
  isTrafo = false,
  isGH = false,
  isKP = false,
  isTrafoNonKTT = false,
  isTrafoKTT = false,
  isUnitPembangkit = false,
  isPembangkit = false,
  isGarduInduk = false,
  isArea = false,
  isSubSistem = false,
  isPenyulang = false,
  isUID = false,
  isUP2B = false,

  
  optionCurrentUser,
  optionJenisLayanan,
  onFilterChange,
}: Props) {
  // const dispatch = useDispatch();
  const queryParams = qs.parse(location.search);
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>({
    id_ref_lokasi_up3 :Yup.string().nullable(),
    id_ref_lokasi_up2b :Yup.string().nullable(),
    date: moment().format("YYYY-MM-DD"),
    time: queryParams?.time ? queryParams?.time : null,
    id_lokasi: queryParams?.__trafo_gi ? queryParams?.__trafo_gi : null,
    id_parent_lokasi: queryParams?.__parent_lokasi
      ? queryParams?.__parent_lokasi
      : null,
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

  const [paramsGI, setParamsGI] = useState<any>();


  
 

  const [formModel] = useState<any>({
    id_ref_lokasi_up3 :null,
    id_ref_lokasi_up2b :null,

    date: queryParams?.date ? queryParams?.date : moment().format("YYYY-MM-DD"),
    time: queryParams?.time ? queryParams?.time : null,
    id_parent_lokasi: queryParams?.__parent_lokasi
      ? queryParams?.__parent_lokasi
      : null,
    id_lokasi: queryParams?.__trafo_gi ? queryParams?.__trafo_gi : null,
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

  const validationSchema = Yup.object().shape({
    id_ref_lokasi_up3 :Yup.string().nullable(),
    id_ref_lokasi_up2b :Yup.string().nullable(),
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
    id_parent_lokasi:
      optionCurrentUser?.level == "PUSAT" ||
      optionCurrentUser?.level == "REGIONAL" ||
      optionCurrentUser?.level == "UNIT_INDUK" ||
      optionCurrentUser?.level == "UP2D" ||
      optionCurrentUser?.level == "UP3" ||
      optionCurrentUser?.level == "ULP"
        ? Yup.string()
            .typeError("Gardu Induk wajib diisi")
            .required("Gardu Induk wajib diisi")
        : Yup.string().nullable(),
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
 
  });

  const {
    handleSubmit,
    // register,
    setValue,
    setError,
    control,
    formState,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  const { errors }: any = formState;
 
  const watchGarduInduk = useWatch({ control, name: 'id_ref_lokasi_gi' });
  const watchGarduInduk_GH = useWatch({ control, name: 'id_ref_lokasi_gi' });
  const watchGarduInduk_KP = useWatch({ control, name: 'id_ref_lokasi_gi' });
  const watchUnitPembangkit = useWatch({ control, name: 'id_ref_lokasi_unit_pembangkit' });

  const watchRegional = useWatch({ control, name: "id_regional" });
  const watchPemilik = useWatch({ control, name: "id_pemilik" });
  const watchPengelola = useWatch({ control, name: "id_pengelola" });
  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: any) => {
  
        // setDataParams(data);
        setDataParams(() => {
          return { ...data }
        });
        onFilterChange(data);
  };


  // console.log("perjm errorr", errors);
  // useEffect(() => {
  //   setValue("id_pemilik", null);
  //   dispatch(generatingData(null));
  //   setAdd(false);
  // }, [watchRegional]);

  // useEffect(() => {
  //   setValue("id_parent_lokasi", null);
  //   dispatch(generatingData(null));
  //   setAdd(false);
  // }, [watchPemilik]);

  // useEffect(() => {
  //   setValue("id_parent_lokasi", null);
  //   dispatch(generatingData(null));
  //   setAdd(false);
  // }, [watchPengelola]);

  
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
          id_ref_lokasi_up3 :null,
          id_ref_lokasi_up2b :null,
          id_unit_lokasi :null,

        }}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row>
          {optionCurrentUser?.level == "PUSAT" && (
              <Col md={3}>
                <Form.Group className="mb-2">
                  <Form.Label>Regional</Form.Label>
                  <SelectAsyncDynamic
                    fieldName="id_regional"
                    pathServiceName="master.jaringan.ref_lokasi"
                    labelField="nama_lokasi"
                    valueField="id_ref_lokasi"
                    placeholder="SEMUA"
                    isClearable={false}
                    errors={errors}
                    control={control}
                    // defaultValue={false}
                    // watchParent={watchRegional}
                    queryParams={{
                      page: -1,
                      limit: -1,
                      sort_by: "nama_lokasi",
                      load: "REGIONAL",
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
              optionCurrentUser?.level == "REGIONAL") && (
              <Col md={3}>
                <Form.Group className="mb-2">
                  <Form.Label>Unit Induk</Form.Label>

                  <SelectAsyncDynamic
                    fieldName="id_pemilik"
                    pathServiceName="master.jaringan.ref_lokasi"
                    labelField="nama_lokasi"
                    valueField="id_ref_lokasi"
                    placeholder="SEMUA"
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
                      load: "UNIT_INDUK",
                      id_ref_jenis_lokasi: watchRegional
                        ? (JENIS_LOKASI() as any)["uid"]
                        : (JENIS_LOKASI() as any)["kosong"],
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
                      id_ref_jenis_lokasi: JENIS_LOKASI().unit_pembangkit,
                      page: -1,
                      limit: -1,
                      sort_by: "nama_lokasi"
                    }}
                  />
                </Form.Group>
              </Col>
            }
            {isPembangkit && watchUnitPembangkit &&
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
                      id_ref_jenis_lokasi: JENIS_LOKASI().pembangkit,
                      page: -1,
                      limit: -1,
                      sort_by: "nama_lokasi"
                    }}
                    watchParent={watchUnitPembangkit}
                  />
                </Form.Group>
              </Col>
            }
           
            {isTrafo && watchGarduInduk &&
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
                      id_ref_jenis_lokasi: JENIS_LOKASI().trafo_gi,
                      sort_by: "nama_lokasi"
                    }}
                    watchParent={watchGarduInduk}

                  />
                </Form.Group>
              </Col>
            }
             {isGH && watchGarduInduk_GH &&
              <Col md={3}>
             <Form.Group className='mb-3'>
                  <Form.Label>Gardu Hubung <RequiredInfo /></Form.Label>
                  <SelectAsyncDynamic
                    required={true}
                    {...selectGarduHubung}
                    isClearable={true}
                    errors={errors}
                    control={control}
                    queryParams={{
                      // id_ref_jenis_lokasi: JENIS_LOKASI().keypoint,
                      id_ref_jenis_lokasi: JENIS_LOKASI().gardu_hubung,
                      sort_by: "nama_lokasi",
                      fungsi_lokasi:"GH"
                    }}
                    watchParent={watchGarduInduk}

                  />
                </Form.Group>
              </Col>
          }
            {isKP && watchGarduInduk_KP &&
              <Col md={3}>
             <Form.Group className='mb-3'>
                  <Form.Label>KeyPoint<RequiredInfo /></Form.Label>
                  <SelectAsyncDynamic
                    required={true}
                    {...selectKeypoint}
                    isClearable={true}
                    errors={errors}
                    control={control}
                    queryParams={{
                      id_ref_jenis_lokasi: JENIS_LOKASI().keypoint,
                      sort_by: "nama_lokasi",
                      // fungsi_lokasi:"GH"
                      // id_ref_jenis_lokasi:"508d16bc1a9f4fd1a81349a612baaa75",
                    }}
                    watchParent={watchGarduInduk}

                  />
                </Form.Group>
              </Col>
          }
            {isTrafoKTT && watchGarduInduk &&
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
                      id_ref_jenis_lokasi: JENIS_LOKASI().trafo_gi,
                      jenis_layanan: "KTT",
                      sort_by: "nama_lokasi"
                    }}
                    watchParent={watchGarduInduk}

                  />
                </Form.Group>
              </Col>
            }

            {isTrafoNonKTT && watchGarduInduk &&
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
                      id_ref_jenis_lokasi: JENIS_LOKASI().trafo_gi,
                      jenis_layanan: "NON KTT",
                      sort_by: "nama_lokasi"
                    }}
                    watchParent={watchGarduInduk}

                  />
                </Form.Group>
              </Col>
            }
            {isPenyulang && watchGarduInduk &&
              <Col md={3}>
                <Form.Group className='mb-3'>
                  <Form.Label>Penyulang</Form.Label>
                  <SelectAsyncDynamic
                    {...selectPenyulang}
                    isClearable={true}
                    errors={errors}
                    control={control}
                    fieldNameParent="id_gardu_induk"
                    queryParams={{ id_ref_jenis_lokasi: JENIS_LOKASI().penyulang, sort_by: "nama_lokasi" }}
                    watchParent={watchGarduInduk}
                  />
                </Form.Group>
              </Col>
            }

            {isUID &&
              <Col md={3}>
                <Form.Group className='mb-3'>
                  <Form.Label>Unit Induk</Form.Label>
                  <SelectAsyncDynamic
                    {...selectUID}
                    isClearable={true}
                    errors={errors}
                    control={control}
                    queryParams={{ id_ref_jenis_lokasi: `${JENIS_LOKASI().uiw}`, sort_by: "nama_lokasi" }}
                  />
                </Form.Group>
              </Col>
            }
              {(optionCurrentUser?.level == "PUSAT" ||
              optionCurrentUser?.level == "REGIONAL" ||
              optionCurrentUser?.level == "UNIT_INDUK" ||
              optionCurrentUser?.level == "UP2D" ||
              optionCurrentUser?.level == "UP3" ||
              optionCurrentUser?.level == "ULP") && isUP2B && ( 
           
              <Col md={3}>
                <Form.Group className='mb-3'>
                  <Form.Label>UP2B</Form.Label>
                  <SelectAsyncDynamic
                    {...selectUP2B}
                    isClearable={true}
                    errors={errors}
                    control={control}
                    queryParams={{ 

                        // id_ref_jenis_lokasi: `${JENIS_LOKASI().up3}`, sort_by: "nama_lokasi" 
                        id_ref_jenis_lokasi:
                        watchPemilik || watchPengelola
                          ? (JENIS_LOKASI() as any)["up2b"]
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
            {isSubSistem &&
              <Col md={3}>
                <Form.Group className='mb-3'>
                  <Form.Label>Sub Sistem</Form.Label>
                  <SelectAsyncDynamic
                    {...selectSubSistem}
                    isClearable={true}
                    errors={errors}
                    control={control}
                    queryParams={{ id_ref_jenis_lokasi: `${JENIS_LOKASI().subsistem}`, sort_by: "nama_lokasi" }}
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

export default MasterDataFilter