import React, { useState } from "react";
// import { Button, Col, Form } from 'react-bootstrap';
import { Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import RequiredInfo from "@app/components/Info/RequiredInfo";
import {
  // IAsetKategori,
  AsetKategoriField,
} from "@app/interface/master-data/eam-aset-kategori.interface";
import SelectAsyncDynamic from "@app/modules/SelectForm/SelectAsyncDynamic";
import FormData from "@app/modules/Form/FormData";
import ButtonCancel from "@app/components/Button/ButtonCancel";
import { API_PATH } from "@app/services/_path.service";
import Button from "@app/components/Button/Button";

export default function AsetKategoriFormPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();
  const { currentUser } = useSelector((state: any) => state.auth);
  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    id_ref_aset_group: Yup.string().required("Group Aset Wajib diisi"),
    nama: Yup.string().required("Nama Wajib diisi"),
    status: Yup.number()
      .nullable()
      .transform((_, v) => (v == 1 ? 1 : 0)),
  });

  const [formModel] = useState<any>();

  const { register, handleSubmit, setValue, setError, control, formState } =
    useForm({
      resolver: yupResolver(validationSchema),
      defaultValues: formModel,
    });
  const { errors }: any = formState || {};
  const watchStatus = useWatch({ control, name: "status" });
  const watchil1 = useWatch({ control, name: "il_1" });
  const watchil2 = useWatch({ control, name: "il_2" });
  const watchil3 = useWatch({ control, name: "il_3" });

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
        fields={AsetKategoriField}
        path={API_PATH().master.eam.eam_ref_aset_kategori}
        onLoading={setLoading}
      >
        <Col md="6" xs="12">
          <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
            <Form.Group className="mb-3">
              <Form.Label>
                Group Aset <RequiredInfo />
              </Form.Label>
              <SelectAsyncDynamic
                fieldName="id_ref_aset_group"
                pathServiceName="master.eam.eam_ref_aset_group"
                labelField="nama"
                valueField="id_ref_aset_group"
                placeholder="Pilih Group Aset"
                errors={errors}
                control={control}
                queryParams={{
                  sort_by: "nama",
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nama Kategori</Form.Label>
              <Form.Control {...register("nama")} isInvalid={errors.nama} />
              <Form.Control.Feedback type="invalid">
                {errors?.nama?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label>Level Inspeksi :</Form.Label>
            </Form.Group>
            <Row md="3" xs="12">
              <Col md="3">
                <Form.Group className="mb-3">
                  <Form.Label>Inspeksi Level 1</Form.Label>
                  <div className="ms-3 py-2">
                    <Form.Check
                      type="switch"
                      id="aktif"
                      {...register("il_1")}
                      label={watchil1 ? "Ya" : "Tidak"}
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col md="3">
                <Form.Group className="mb-3">
                  <Form.Label>Inspeksi Level 2</Form.Label>
                  <div className="ms-3 py-2">
                    <Form.Check
                      type="switch"
                      id="aktif"
                      {...register("il_2")}
                      label={watchil2 ? "Ya" : "Tidak"}
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col md="3">
                <Form.Group className="mb-3">
                  <Form.Label>Inspeksi Level 3</Form.Label>
                  <div className="ms-3 py-2">
                    <Form.Check
                      type="switch"
                      id="aktif"
                      {...register("il_3")}
                      label={watchil3 ? "Ya" : "Tidak"}
                    />
                  </div>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Aktif</Form.Label>
              <div className="ms-3 py-2">
                <Form.Check
                  type="switch"
                  id="aktif"
                  {...register("status")}
                  label={watchStatus === false ? "Tidak" : "Ya"}
                />
              </div>
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
