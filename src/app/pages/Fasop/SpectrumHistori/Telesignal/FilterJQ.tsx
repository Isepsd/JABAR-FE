import React, { useState } from "react";
import { Col, Form, Row, InputGroup, FormControl } from "react-bootstrap";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import moment from "moment";
import FiltersForm from "@app/modules/Filters/FilterForm";
import FilterActionButton from "@app/modules/Filters/FilterActionButton";
import SelectAsyncDynamic from "@app/modules/SelectForm/SelectAsyncDynamic";
// import SelectFormStatic from "@app/modules/SelectForm/SelectFormStatic";

export default function Filter({onFilterChange}:any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    datum_after: Yup.string().nullable(),
    datum_before: Yup.string().nullable(),
    after: Yup.string().nullable(),
    before: Yup.string().nullable(),
    path1: Yup.string().nullable(),
    path2: Yup.string().nullable(),
    path3: Yup.string().nullable(),
    path4: Yup.string().nullable(),
  });
  // const currentDate = moment();
  // const startOfDay = currentDate
  //   .clone()
  //   .startOf("day")
  //   .set({ hour: 0, minute: 0, second: 0 });
  // const endOfDay = currentDate
  //   .clone()
  //   .endOf("day")
  //   .set({ hour: 23, minute: 59, second: 59 });

  const [formModel] = useState<any>({
    after: moment().subtract(1, "day").format("YYYY-MM-DD"),
    before: moment().format("YYYY-MM-DD"),
    path1: "",
    path2: "",
    path3: "",
    path4: "",
  });

  const { handleSubmit, register, setValue, setError, control, formState } =
    useForm({
      resolver: yupResolver(validationSchema),
      defaultValues: formModel,
    });
  const { errors }: any = formState || {};
  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: any) => {
    // setDataParams(data);
    const awal = data.after;
    const akhir = data.before;

    data.datum_after = awal + " 00:00:00";
    data.datum_before = akhir + " 23:59:59";

    // setLoading(true);
    setDataParams(() => {
      return { ...data };
    });
    onFilterChange(data)
  };

  return (
    <>
      <FiltersForm
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        onLoading={setLoading}
        fields={{
          datum_after: moment().subtract(1, "day").format("YYYY-MM-DD") + " 00:00:00",
          datum_before: moment().format("YYYY-MM-DD") + " 23:59:59",
          after: moment().subtract(1, "day").format("YYYY-MM-DD"),
          before: moment().format("YYYY-MM-DD"),
          path1: "",
          path2: "",
          path3: "",
          path4: "",
        }}

      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row>
            <Col md={3} className="">
              <Form.Group>
                <Form.Label>Range Tanggal</Form.Label>
                <InputGroup>
                  <FormControl
                    {...register("after")}
                    type="date"
                    defaultValue={moment(formModel.after).format(
                      "YYYY-MM-DD"
                    )}
                  // min={moment(watchDatum2Before)
                  //   .subtract(1, 'month')
                  //   .format('YYYY-MM-DD')}
                  // max={watchDatum2Before}
                  />
                  <InputGroup.Text>
                    <i className="fa-solid fa-arrow-right"></i>
                  </InputGroup.Text>
                  <FormControl
                    {...register("before")}
                    type="date"
                    defaultValue={moment(formModel.after).format(
                      "YYYY-MM-DD"
                    )}
                  // min={watchDatum1After}
                  // max={moment().format('YYYY-MM-DD')}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
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
                    page: 1,
                    limit: 10,
                    path: "path1text",
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={3} className="">
              <Form.Group className="mb-2">
                <Form.Label>Tegangan (B2)</Form.Label>
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
                    page: 1,
                    limit: 10,
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
                    page: 1,
                    limit: 10,
                    path: "path3text",
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={3} className="">
              <Form.Group className="mb-2">
                <Form.Label>Element</Form.Label>
                <SelectAsyncDynamic
                  fieldName="path4"
                  pathServiceName="fasop.laporan_scada.pathtext"
                  labelField="path_text"
                  valueField="path_text"
                  placeholder="Pilih..."
                  isClearable={true}
                  errors={errors}
                  control={control}
                  queryParams={{
                    page: 1,
                    limit: 10,
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
