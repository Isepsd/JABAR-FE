import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import FiltersForm from "@app/modules/Filters/FilterForm";
import FilterActionButton from "@app/modules/Filters/FilterActionButton";
import SelectAsyncDynamic from "@app/modules/SelectForm/SelectAsyncDynamic";
import qs from "query-string";

type Props = {
  optionCurrentUser?: any;
};
export default function Filter({ optionCurrentUser }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const queryParams = qs.parse(location.search);
  const [dataParams, setDataParams] = useState<any>({
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

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    path1: Yup.string().nullable(),
    path2: Yup.string().nullable(),
  });

  const [formModel] = useState<any>({
    path1: "",
    path2: "",
    path3: "",
    path4: "",
    // status_2: "",

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

  const { handleSubmit, setValue, setError, formState, control } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  const { errors }: any = formState || {};
  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: any) => {
    // setDataParams(data);
    setDataParams(() => {
      return { ...data };
    });
  };

  return (
    <>
      <FiltersForm
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        onLoading={setLoading}
        fields={{
          path1: "",
          path2: "",
          path3: "",
          path4: "",
          // status_2: "",
        }}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row>
            <Col md={3} className="">
              <Form.Group className="mb-2">
                <Form.Label>Lokasi (B1)</Form.Label>
                <SelectAsyncDynamic
                  fieldName="path1"
                  pathServiceName="fasop.laporan_scada.pathtext"
                  labelField="path_text"
                  valueField="path_text"
                  placeholder="Pilih..."
                  isClearable={true}
                  errors={errors}
                  control={control}
                  queryParams={{
                    page: -1,
                    limit: -1,
                    path: "path1text",
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={3} className="">
              <Form.Group className="mb-2">
                <Form.Label>Nama Gardu (B2)</Form.Label>
                <SelectAsyncDynamic
                  fieldName="path2"
                  pathServiceName="fasop.laporan_scada.pathtext"
                  labelField="path_text"
                  valueField="path_text"
                  placeholder="Pilih..."
                  isClearable={true}
                  errors={errors}
                  control={control}
                  queryParams={{
                    page: -1,
                    limit: -1,
                    path: "path2text",
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={3} className="">
              <Form.Group className="mb-2">
                <Form.Label>Bay (B3)</Form.Label>
                <SelectAsyncDynamic
                  fieldName="path3"
                  pathServiceName="fasop.laporan_scada.pathtext"
                  labelField="path_text"
                  valueField="path_text"
                  placeholder="Pilih..."
                  isClearable={true}
                  errors={errors}
                  control={control}
                  queryParams={{
                    page: -1,
                    limit: -1,
                    path: "path3text",
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={3} className="">
              <Form.Group className="mb-2">
                <Form.Label>Element</Form.Label>
                <SelectAsyncDynamic
                  fieldName="path3"
                  pathServiceName="fasop.laporan_scada.pathtext"
                  labelField="path_text"
                  valueField="path_text"
                  placeholder="Pilih..."
                  isClearable={true}
                  errors={errors}
                  control={control}
                  queryParams={{
                    page: -1,
                    limit: -1,
                    path: "path4text",
                  }}
                />
              </Form.Group>
            </Col>
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
