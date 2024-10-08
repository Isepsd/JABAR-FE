import { API_PATH } from "@app/services/_path.service";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Col, Form, Modal, Row } from "react-bootstrap";
import { Button, ButtonCancel } from "@app/components";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useWatch } from "react-hook-form";
import FormData from "@app/modules/Form/FormDataWAGroup";
import * as Yup from "yup";

interface IAsetKategoriExtAtrForm {
  modalDecline?: any;
  paramid?: any;
  filterLayout?: any;
}

export const IBlacklistFeild = {
  id_ref_aset_kategori_ext_atr: null,
  nama: "",
  satuan: "",
  status: 1,
};

export default function AsetKategoriExtAtrForm({
  modalDecline,
  paramid,
}: IAsetKategoriExtAtrForm) {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();
  const { currentUser } = useSelector((state: any) => state.auth);

  const validationSchema = Yup.object().shape({
    nama: Yup.string().required("Nama Wajib diisi"),
    satuan: Yup.string().nullable(),
    urutan: Yup.number().required("Urutan harus number"),
    status: Yup.number()
      .nullable()
      .transform((_, v) => (v == 1 ? 1 : 0)),
  });

  const [formModel] = useState<any>({});
  const { register, handleSubmit, setValue, setError, control, formState } =
    useForm({
      resolver: yupResolver(validationSchema),
      defaultValues: formModel,
    });
  const { errors }: any = formState || {};
  const watchStatus = useWatch({ control, name: "status" });

  const onSubmitForm = (data: any) => {
    (data.id_ref_aset_kategori = paramid),
      (data.id_pusat = currentUser?.lokasi_unit?.id_pusat),
      (data.id_regional = currentUser?.lokasi_unit?.id_regional),
      (data.id_pemilik = currentUser?.lokasi_unit?.id_pemilik),
      (data.id_pengelola = currentUser?.lokasi_unit?.id_pengelola),
      (data.id_sub_pengelola = currentUser?.lokasi_unit?.id_sub_pengelola),
      setDataParams(data);
  };

  return (
    <>
      <Row className="animate__animated animate__fadeIn">
        <div className="col-md-12 p-4">
          <div className={`ms-md-0`}>
            <Row>
              <Col md={12}>
                <FormData
                  setError={setError}
                  setValue={setValue}
                  hideTitle={true}
                  dataParams={dataParams}
                  fields={IBlacklistFeild}
                  path={API_PATH().master.eam.eam_ref_aset_kategori_ext_atr}
                  onLoading={setLoading}
                >
                  <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
                    <Form.Group className="mb-3">
                      <Form.Label>Nama Atribut</Form.Label>
                      <Form.Control
                        {...register("nama")}
                        isInvalid={errors.nama}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors?.nama?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Satuan</Form.Label>
                      <Form.Control
                        {...register("satuan")}
                        isInvalid={errors.satuan}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors?.satuan?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Urutan</Form.Label>
                      <Form.Control
                        {...register("urutan")}
                        isInvalid={errors.urutan}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors?.urutan?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
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
                    <Modal.Footer>
                      <div className="d-flex gap-2">
                        <ButtonCancel
                          type="modal"
                          //   ids="id_detail"
                          onClick={modalDecline}
                        />
                        <Button
                          type="submit"
                          variant="primary"
                          isLoading={loading}
                        >
                          {" "}
                          Simpan{" "}
                        </Button>
                      </div>
                    </Modal.Footer>
                  </Form>
                </FormData>
              </Col>
            </Row>
          </div>
        </div>
      </Row>
    </>
  );
}
