import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import FiltersForm from "@app/modules/Filters/FilterForm";
import SelectAsyncDynamic from "@app/modules/SelectForm/SelectAsyncDynamic";
import FilterActionButton from "@app/modules/Filters/FilterActionButton";
import InputDate from "@app/components/Date/InputDate";
import moment from "moment";
import { JENIS_LOKASI } from "@app/configs/jenis-lokasi.config";

import { generatingData } from "@app/store/reducers/app";
import { useDispatch } from "react-redux";

interface IFilter {
  setAdd?: any;
  optionCurrentUser?: any;
  optionJenisLayanan?: any;
  onFilterChange?: any;
}

export default function Filter({
  // setAdd,
  optionCurrentUser,
  optionJenisLayanan,
  onFilterChange,
}: IFilter) {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>({
    date: moment().format("YYYY-MM-DD"),
    id_parent_lokasi: "ef2846dd-08e8-406d-8cb6-1fb2b5844016",
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
    id_sub_pengelola:
      optionCurrentUser?.level == "ULP"
        ? optionCurrentUser?.id_unit_lokasi
        : null,
  });
  const dispatch = useDispatch();
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
    id_pengelola: Yup.string().nullable(),
  });

  const [formModel] = useState<any>({
    date: moment().format("YYYY-MM-DD"),
    id_parent_lokasi: "ef2846dd-08e8-406d-8cb6-1fb2b5844016",
  });

  const { handleSubmit, setValue, setError, control, register, formState } =
    useForm({
      resolver: yupResolver(validationSchema),
      defaultValues: formModel,
    });

  const watchDate = useWatch({ control, name: "date" });
  const { errors }: any = formState || {};
  const watchRegional = useWatch({ control, name: "id_regional" });
  const watchPemilik = useWatch({ control, name: "id_pemilik" });
  const watchPengelola = useWatch({ control, name: "id_pengelola" });
  const watchInduk = useWatch({ control, name: "id_parent_lokasi" });
  // const [paramParentLokasi, setParamParentLokasi] = useState<boolean>(false)

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
    onFilterChange(data);
  };

  useEffect(() => {
    // setValue("id_pemilik", null);
    dispatch(generatingData(null));
    // setAdd(false);
  }, [watchRegional]);

  useEffect(() => {
    setValue("id_parent_lokasi", null);
    dispatch(generatingData(null));
    // setAdd(false);
  }, [watchPemilik, watchPengelola]);

  useEffect(() => {
    dispatch(generatingData(null));
    // setAdd(false);
  }, [watchInduk]);

  useEffect(() => {
    dispatch(generatingData(null));
    // setAdd(false);
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
          id_parent_lokasi: "ef2846dd-08e8-406d-8cb6-1fb2b5844016",
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
                      optionCurrentUser?.level == "PUSAT" ||
                      optionCurrentUser?.level == "REGIONAL"
                        ? watchRegional
                        : false
                    }
                    queryParams={{
                      page: -1,
                      limit: -1,
                      sort_by: "nama_lokasi",
                      load: "UNIT INDUK",
                      id_ref_jenis_lokasi:
                        optionCurrentUser?.level == "PUSAT" ||
                        optionCurrentUser?.level == "REGIONAL"
                          ? (JENIS_LOKASI() as any)["uid"]
                          : (JENIS_LOKASI() as any)["kosong"],
                      // level: optionCurrentUser?.level,
                      id_pusat:
                        optionCurrentUser?.level == "PUSAT"
                          ? optionCurrentUser?.id_unit_lokasi
                          : null,
                      id_regional:
                        optionCurrentUser?.level == "REGIONAL"
                          ? optionCurrentUser?.id_unit_lokasi
                          : watchRegional,
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
                  <Form.Label>Unit Pembangkit</Form.Label>
                  <SelectAsyncDynamic
                    fieldName="id_parent_lokasi"
                    pathServiceName="master.jaringan.ref_lokasi"
                    labelField="nama_lokasi"
                    valueField="id_ref_lokasi"
                    placeholder="SEMUA"
                    defaultValue="defaultValue"
                    isClearable={false}
                    errors={errors}
                    control={control}
                    watchParent={
                      optionCurrentUser?.level == "PUSAT" ||
                      optionCurrentUser?.level == "REGIONAL" ||
                      optionCurrentUser?.level == "UNIT_INDUK" ||
                      optionCurrentUser?.level == "UP2D" ||
                      optionCurrentUser?.level == "UP3" ||
                      optionCurrentUser?.level == "ULP"
                        ? watchPemilik
                        : false
                    }
                    queryParams={{
                      page: -1,
                      limit: -1,
                      sort_by: "nama_lokasi",
                      load: "UNIT PEMBANGKIT",
                      id_ref_jenis_lokasi:
                        optionCurrentUser?.level == "PUSAT" ||
                        optionCurrentUser?.level == "REGIONAL" ||
                        optionCurrentUser?.level == "UNIT_INDUK" ||
                        optionCurrentUser?.level == "UP2D" ||
                        optionCurrentUser?.level == "UP3" ||
                        optionCurrentUser?.level == "ULP"
                          ? (JENIS_LOKASI() as any)["unit_pembangkit"]
                          : (JENIS_LOKASI() as any)["kosong"],
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

                      // jenis_layanan_in: optionJenisLayanan
                      //   ? optionJenisLayanan
                      //   : null,
                      jenis_layanan: optionJenisLayanan
                        ? optionJenisLayanan
                        : null,
                    }}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors?.id_parent_lokasi?.message}
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
          </Row>
        </Form>
      </FiltersForm>
    </>
  );
}
