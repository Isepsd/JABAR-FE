import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import axios from "axios";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import FiltersForm from "@app/modules/Filters/FilterForm";
import SelectAsyncDynamic from "@app/modules/SelectForm/SelectAsyncDynamic";
import FilterActionButton from "@app/modules/Filters/FilterActionButton";
import InputDate from "@app/components/Date/InputDate";
import moment from "moment";
import { timeFormSelect } from "@app/helper/time.helper";
import { JENIS_LOKASI } from "@app/configs/jenis-lokasi.config";
import { useSelector } from "react-redux";
import { generatingData } from "@app/store/reducers/app";
import { useDispatch } from "react-redux";
import InputCustomTime from "@app/components/Date/InputCustomTime";
// import SelectFormStatic from "@app/modules/SelectForm/SelectFormStatic";
import qs from "query-string";
interface IFilter {
  setAdd?: any;
  optionCurrentUser?: any;
  optionJenisLayanan?: any;
  optionJenisLayananTrafo?: any;
  onFilterChange?: any;
}

export default function Filter({
  setAdd,
  optionCurrentUser,
  optionJenisLayanan,
  optionJenisLayananTrafo,
  onFilterChange,
}: IFilter) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [optionsTimes, setOptionsTimes] = useState<any>([]);
  const { application } = useSelector((state: any) => state.ui);
  const source = axios.CancelToken.source();
  const queryParams = qs.parse(location.search);
  // const [optionsTimes, setOptionsTimes] = useState<any>([]);
  /** FORM  HANDLE */

  const validationSchema = Yup.object().shape({
    date: Yup.string()
      .typeError("Tanggal wajib diisi")
      .required("Tanggal wajib diisi"),
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
  });

  const [dataParams, setDataParams] = useState<any>({
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

  const [formModel] = useState<any>({
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

  const { handleSubmit, setValue, setError, control, register, formState } =
    useForm({
      resolver: yupResolver(validationSchema),
      defaultValues: formModel,
    });
  const { errors }: any = formState || {};
  const watchInduk = useWatch({ control, name: "id_parent_lokasi" });
  const watchLokasi = useWatch({ control, name: "id_trafo_gi" });
  const watchDate = useWatch({ control, name: "date" });
  const watchRegional = useWatch({ control, name: "id_regional" });
  const watchPemilik = useWatch({ control, name: "id_pemilik" });
  const watchPengelola = useWatch({ control, name: "id_pengelola" });

  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: any) => {
    if (data?.date) {
      data.date = moment(data?.date).format("YYYY-MM-DD");
    }
    setDataParams(() => {
      return {
        ...data,
      };
    });
    console.log("onSubmitForm");
    onFilterChange(data);
  };

  useEffect(() => {
    let interval = application?.def_generate_time == 30 ? 48 : 24;
    let time = application?.def_generate_time
      ? application?.def_generate_time
      : 60;
    let times = timeFormSelect(interval, time);
    setOptionsTimes(times);
    // console.log("onFilterChange");
    // onFilterChange(formModel);
    return () => {
      source.cancel();
      setOptionsTimes(null);
    };
  }, [
    queryParams?.date,
    queryParams?.time,
    queryParams?.__parent_lokasi,
    queryParams?.__pembangkit,
    queryParams?.__gardu_induk,
    queryParams?.__trafo_gi,
    queryParams?.__penyulang,
    queryParams?.__pusat,
    queryParams?.__regional,
    queryParams?.__pemilik,
    queryParams?.__pengelola,
    queryParams?.__subpengelola,
  ]);

  useEffect(() => {
    setValue("id_pemilik", null);
    dispatch(generatingData(null));
    setAdd(false);
  }, [watchRegional]);

  useEffect(() => {
    setValue("id_parent_lokasi", null);
    dispatch(generatingData(null));
    setAdd(false);
  }, [watchPemilik]);

  useEffect(() => {
    setValue("id_parent_lokasi", null);
    dispatch(generatingData(null));
    setAdd(false);
  }, [watchPengelola]);

  useEffect(() => {
    setValue("id_trafo_gi", null);
    dispatch(generatingData(null));
    setAdd(false);
  }, [watchInduk]);

  useEffect(() => {
    dispatch(generatingData(null));
    setAdd(false);
  }, [watchLokasi]);

  useEffect(() => {
    dispatch(generatingData(null));
    setAdd(false);
  }, [watchDate]);

  return (
    <>
      <FiltersForm
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        onLoading={setLoading}
        fields={{
          date: moment().format("YYYY-MM-DD"),
        }}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row>
            <Col md={2}>
              <Form.Group className="mb-2">
                <Form.Label>Tanggal</Form.Label>
                <InputDate errors={errors} register={register} />
                <Form.Control.Feedback type="invalid">
                  {errors?.date?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group>
                <InputCustomTime
                  control={control}
                  errors={errors}
                  label="Jam"
                  options={optionsTimes}
                />
              </Form.Group>
            </Col>
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
              optionCurrentUser?.level == "ULP") && (
              <Col md={3}>
                <Form.Group className="mb-2">
                  <Form.Label>Gardu Induk</Form.Label>
                  <SelectAsyncDynamic
                    fieldName="id_parent_lokasi"
                    pathServiceName="master.jaringan.ref_lokasi"
                    labelField="nama_lokasi"
                    valueField="id_ref_lokasi"
                    placeholder="SEMUA"
                    isClearable={true}
                    errors={errors}
                    control={control}
                    // watchParent={loadRegional ? watchPemilik : false}
                    watchParent={
                      optionCurrentUser?.level == "PUSAT" ||
                      optionCurrentUser?.level == "REGIONAL"
                        ? watchPemilik
                        : false
                    }
                    queryParams={{
                      page: -1,
                      limit: -1,
                      sort_by: "nama_lokasi",
                      load: "GI",
                      id_ref_jenis_lokasi:
                        watchPemilik || watchPengelola
                          ? (JENIS_LOKASI() as any)["gardu_induk"]
                          : (JENIS_LOKASI() as any)["kosong"],
                      jenis_layanan_in: optionJenisLayanan
                        ? optionJenisLayanan
                        : null,
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
              optionCurrentUser?.level == "ULP") && (
              <Col md={3}>
                <Form.Group className="mb-2">
                  <Form.Label>Trafo</Form.Label>
                  <SelectAsyncDynamic
                    fieldName="id_trafo_gi"
                    pathServiceName="master.jaringan.ref_lokasi"
                    labelField="nama_lokasi"
                    valueField="id_ref_lokasi"
                    placeholder="SEMUA"
                    isClearable={true}
                    errors={errors}
                    control={control}
                    // defaultValue={parentId}
                    watchParent={watchInduk}
                    queryParams={{
                      page: -1,
                      limit: -1,
                      sort_by: "nama_lokasi",
                      load: "TRAFOGI",
                      id_ref_jenis_lokasi: watchInduk
                        ? (JENIS_LOKASI() as any)["trafo_gi"]
                        : (JENIS_LOKASI() as any)["kosong"],
                      id_parent_lokasi: watchInduk,
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
                      jenis_layanan: optionJenisLayananTrafo,
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors?.id_trafo_gi?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            )}

            <Col md={2} className="mt-2">
              <FilterActionButton
                className="justify-content-start"
                loading={loading}
              />
            </Col>
            {/* <InputCustomTime
            control={control}
            errors={errors}
            label="Time"
            options={optionsTimes} /> */}
          </Row>
        </Form>
      </FiltersForm>
    </>
  );
}
