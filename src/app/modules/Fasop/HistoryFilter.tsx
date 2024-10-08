import React, { useState } from "react";
import { Col, Form, FormControl, InputGroup, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { get } from "lodash";

import FiltersForm from "@app/modules/Filters/FilterForm";
import SelectAsyncDynamic from "@app/modules/SelectForm/SelectAsyncDynamic";
import FilterActionButton from "@app/modules/Filters/FilterActionButton";
import moment from "moment";

interface ISelectProps {
  fieldName: string;
  pathServiceName: string;
  labelField: string;
  valueField: string;
  placeholder: string;
}

type Props = {
  selectProps: ISelectProps;
  queryParams: any;
  fieldKeyword?: string;
  isJenisPoint?: boolean;
  onFilterChange?: any;
};

function HistoryFilter({
  selectProps = {
    fieldName: "id_pointtype",
    pathServiceName: "master.jaringan.ref_lokasi",
    labelField: "nama_lokasi",
    valueField: "id_ref_lokasi",
    placeholder: "Pilih...",
  },
  onFilterChange,
  queryParams = { page: -1 },
  isJenisPoint = true,
}: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    datum_after: Yup.string().nullable(),
    datum_before: Yup.string().nullable(),
    path1: Yup.string().nullable(),
    path2: Yup.string().nullable(),
    path3: Yup.string().nullable(),
    path4: Yup.string().nullable(),
  });

  const [formModel] = useState<any>({
    datum_after: moment().subtract(1, "day").format("YYYY-MM-DD"),
    datum_before: moment().format("YYYY-MM-DD"),
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

    setDataParams(() => {
      return { ...data };
    });
    onFilterChange(data);
  };

  return (
    <>
      <FiltersForm
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        onLoading={setLoading}
        fields={{
          datum_after:
            moment().subtract(1, "day").format("YYYY-MM-DD") + " 00:00:00",
          datum_before: moment().format("YYYY-MM-DD") + " 23:59:59",
          path1: "",
          path2: "",
          path3: "",
          path4: "",
        }}
        // overrideType={{ datum_1_before: 'date', datum_1_after: 'date' }}
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
                    defaultValue={moment(formModel.datum_after).format(
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
                    defaultValue={moment(formModel.datum_before).format(
                      "YYYY-MM-DD"
                    )}
                    // min={watchDatum1After}
                    // max={moment().format('YYYY-MM-DD')}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col md={2} className="">
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
                    path: "path1",
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={2} className="">
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
                    page: -1,
                    limit: -1,
                    path: "path2",
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={2} className="">
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
                    path: "path3",
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
                    path: "path4",
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          {isJenisPoint && (
            <Col md={5}>
              <Form.Group className="mb-2">
                <Form.Label>Jenis Point</Form.Label>
                <SelectAsyncDynamic
                  {...selectProps}
                  isClearable={true}
                  errors={errors}
                  control={control}
                  queryParams={queryParams}
                />
                <Form.Control.Feedback type="invalid">
                  {get(errors, `${selectProps?.fieldName}.message`)}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          )}
          {/* <Form.Group className='mb-3'>
            <Form.Label>{keywordName}</Form.Label>
            <Form.Control {...register(fieldKeyword)} placeholder='Nama' />
          </Form.Group> */}

          <FilterActionButton
            loading={loading}
            onClickReset={() => onSubmitForm(null)}
          ></FilterActionButton>
        </Form>
      </FiltersForm>
    </>
  );
}

export default HistoryFilter;
