import React, { useState } from "react";
// import { Button, Col, Form } from 'react-bootstrap';
import { Col, Form, InputGroup } from "react-bootstrap";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import {
  // IBobotPrioritas,
  BobotPrioritasField,
} from "@app/interface/master-data/eam-bobot-prioritas.interface";

import FormData from "@app/modules/Form/FormData";
import ButtonCancel from "@app/components/Button/ButtonCancel";
import { API_PATH } from "@app/services/_path.service";
import Button from "@app/components/Button/Button";

export default function BobotPrioritasFormPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();
  const { currentUser } = useSelector((state: any) => state.auth);

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    nama: Yup.string().required("Nama Wajib diisi"),
    nilai_awal: Yup.number()
      .typeError("Nilai harus number")
      .required("Nilai Awal Wajib diisi"),
    nilai_akhir: Yup.number()
      .typeError("Nilai harus number")
      .required("Nilai Akhir Wajib diisi"),
    deskripsi: Yup.string().nullable(),
    keterangan: Yup.string().nullable(),
  });

  const [formModel] = useState<any>();

  const { register, handleSubmit, setValue, setError, formState } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  const { errors }: any = formState || {};

  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: any) => {
    (data.id_pusat = currentUser?.lokasi_unit?.id_pusat),
      (data.id_regional = currentUser?.lokasi_unit?.id_regional),
      (data.id_pemilik = currentUser?.lokasi_unit?.id_pemilik),
      (data.id_pengelola = currentUser?.lokasi_unit?.id_pengelola),
      (data.id_sub_pengelola = currentUser?.lokasi_unit?.id_sub_pengelola),
      setDataParams(data);
  };

  return (
    <>
      <FormData
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        fields={BobotPrioritasField}
        path={API_PATH().master.eam.eam_ref_bobot_prioritas}
        onLoading={setLoading}
      >
        <Col md="3" xs="12">
          <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
            <Form.Group className="mb-3">
              <Form.Label>Nama Prioritas</Form.Label>
              <Form.Control {...register("nama")} isInvalid={errors.nama} />
              <Form.Control.Feedback type="invalid">
                {errors?.nama?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>deskripsi</Form.Label>
              <Form.Control
                {...register("deskripsi")}
                isInvalid={errors.deskripsi}
              />
              <Form.Control.Feedback type="invalid">
                {errors?.deskripsi?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Usia Aset</Form.Label>
              <InputGroup size="sm" className="mb-3">
                <Form.Control
                  {...register("nilai_awal")}
                  isInvalid={errors.nilai_awal}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.nilai_awal?.message}
                </Form.Control.Feedback>
                <InputGroup.Text id="inputGroup-sizing-sm">
                  tahun
                </InputGroup.Text>
                <InputGroup.Text id="inputGroup-sizing-sm">
                  sampai
                </InputGroup.Text>
                <Form.Control
                  {...register("nilai_akhir")}
                  isInvalid={errors.nilai_akhir}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.nilai_akhir?.message}
                </Form.Control.Feedback>
                <InputGroup.Text id="inputGroup-sizing-sm">
                  tahun
                </InputGroup.Text>
              </InputGroup>

              <Form.Control.Feedback type="invalid">
                {errors?.nilai_awal?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Keterangan</Form.Label>
              <Form.Control
                as="textarea"
                {...register("keterangan")}
                isInvalid={errors.keterangan}
              />
              <Form.Control.Feedback type="invalid">
                {errors?.keterangan?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mt-4">
              <Button type="submit" variant="primary" disabled={loading}>
                Simpan{" "}
              </Button>
              <ButtonCancel />
            </Form.Group>
          </Form>
        </Col>
      </FormData>
    </>
  );
}
