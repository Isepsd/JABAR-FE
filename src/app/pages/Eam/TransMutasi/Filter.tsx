import React, { useState, useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import FiltersForm from "@app/modules/Filters/FilterForm";
import SelectAsyncDynamic from "@app/modules/SelectForm/SelectAsyncDynamic";
import FilterActionButton from "@app/modules/Filters/FilterActionButton";

import { JENIS_LOKASI } from "@app/configs/jenis-lokasi.config";

import { generatingData } from "@app/store/reducers/app";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
interface IFilter {
  onFilterChange?: any;
}

export default function Filter({ onFilterChange }: IFilter) {
  const [loading, setLoading] = useState<boolean>(false);
  const { currentUser } = useSelector((state: any) => state.auth);
  const [dataParams, setDataParams] = useState<any>();
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    id_ref_aset_group: Yup.string().nullable(),
    id_ref_aset_kategori: Yup.string().nullable(),
    id_ref_lokasi_station: Yup.string().nullable(),
    id_ref_lokasi_trafo: Yup.string().nullable(),
    id_ref_lokasi_penyulang: Yup.string().nullable(),
  });

  const [formModel] = useState<any>();

  const { handleSubmit, setValue, setError, control, formState } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });

  const { errors }: any = formState || {};
  const watchGroup = useWatch({ control, name: "id_ref_aset_group" });
  const watchStation = useWatch({ control, name: "id_ref_lokasi_station" });
  const watchTrafo = useWatch({ control, name: "id_ref_lokasi_trafo" });

  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: any) => {
    setDataParams(() => {
      return {
        ...data,
      };
    });
    onFilterChange(data);
  };

  useEffect(() => {
    setValue("id_ref_aset_kategori", null);
    dispatch(generatingData(null));
  }, [watchGroup]);

  useEffect(() => {
    setValue("id_ref_lokasi_trafo", null);
    setValue("id_ref_lokasi_penyulang", null);
    dispatch(generatingData(null));
  }, [watchStation]);

  useEffect(() => {
    setValue("id_ref_lokasi_penyulang", null);
    dispatch(generatingData(null));
  }, [watchTrafo]);

  return (
    <>
      <FiltersForm
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        onLoading={setLoading}
        // fields={{}}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row>
            <Col md={2}>
              <Form.Group className="mb-2">
                <Form.Label>Group</Form.Label>
                <SelectAsyncDynamic
                  fieldName="id_ref_aset_group"
                  pathServiceName="master.eam.eam_ref_aset_group"
                  labelField="nama"
                  valueField="id_ref_aset_group"
                  placeholder="SEMUA"
                  isClearable={true}
                  errors={errors}
                  control={control}
                  queryParams={{
                    page: -1,
                    limit: -1,
                    sort_by: "nama",
                    id_pusat: currentUser?.lokasi_unit?.id_pusat,
                    id_regional: currentUser?.lokasi_unit?.id_regional,
                    id_pemilik: currentUser?.lokasi_unit?.id_pemilik,
                    id_pengelola: currentUser?.lokasi_unit?.id_pengelola,
                    id_sub_pengelola:
                      currentUser?.lokasi_unit?.id_sub_pengelola,
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.id_ref_aset_group?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={2}>
              <Form.Group className="mb-2">
                <Form.Label>Kategori</Form.Label>

                <SelectAsyncDynamic
                  fieldName="id_ref_aset_kategori"
                  pathServiceName="master.eam.eam_ref_aset_kategori"
                  labelField="nama"
                  valueField="id_ref_aset_kategori"
                  placeholder="SEMUA"
                  isClearable={true}
                  errors={errors}
                  control={control}
                  isDisabled={!watchGroup}
                  watchParent={watchGroup}
                  queryParams={{
                    page: -1,
                    limit: -1,
                    sort_by: "nama",
                    id_ref_aset_group: watchGroup,
                    id_pusat: currentUser?.lokasi_unit?.id_pusat,
                    id_regional: currentUser?.lokasi_unit?.id_regional,
                    id_pemilik: currentUser?.lokasi_unit?.id_pemilik,
                    id_pengelola: currentUser?.lokasi_unit?.id_pengelola,
                    id_sub_pengelola:
                      currentUser?.lokasi_unit?.id_sub_pengelola,
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors?.id_ref_aset_kategori?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={2}>
              <Form.Group className="mb-2">
                <Form.Label>Station</Form.Label>
                <SelectAsyncDynamic
                  fieldName="id_ref_lokasi_station"
                  pathServiceName="master.jaringan.ref_lokasi"
                  labelField="kode_lokasi"
                  valueField="id_ref_lokasi"
                  placeholder="SEMUA"
                  defaultValue="defaultValue"
                  isClearable={true}
                  errors={errors}
                  control={control}
                  queryParams={{
                    page: -1,
                    limit: -1,
                    sort_by: "kode_lokasi",
                    id_ref_jenis_lokasi: (JENIS_LOKASI() as any)["gardu_induk"],
                    // id_pusat: currentUser?.lokasi_unit?.id_pusat,
                    // id_regional: currentUser?.lokasi_unit?.id_regional,
                    // id_pemilik: currentUser?.lokasi_unit?.id_pemilik,
                    // id_pengelola: currentUser?.lokasi_unit?.id_pengelola,
                    // id_sub_pengelola:
                    //   currentUser?.lokasi_unit?.id_sub_pengelola,
                  }}
                />

                <Form.Control.Feedback type="invalid">
                  {errors?.id_ref_lokasi_station?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={2}>
              <Form.Group className="mb-2">
                <Form.Label>Trafo</Form.Label>
                <SelectAsyncDynamic
                  fieldName="id_ref_lokasi_trafo"
                  pathServiceName="master.jaringan.ref_lokasi"
                  labelField="nama_lokasi"
                  valueField="id_ref_lokasi"
                  placeholder="SEMUA"
                  defaultValue="defaultValue"
                  isClearable={true}
                  errors={errors}
                  control={control}
                  isDisabled={!watchStation}
                  watchParent={watchStation}
                  queryParams={{
                    page: -1,
                    limit: -1,
                    sort_by: "nama_lokasi",
                    id_parent_lokasi: watchStation,
                    id_ref_jenis_lokasi: (JENIS_LOKASI() as any)["trafo_gi"],
                    // id_pusat: currentUser?.lokasi_unit?.id_pusat,
                    // id_regional: currentUser?.lokasi_unit?.id_regional,
                    // id_pemilik: currentUser?.lokasi_unit?.id_pemilik,
                    // id_pengelola: currentUser?.lokasi_unit?.id_pengelola,
                    // id_sub_pengelola:
                    //   currentUser?.lokasi_unit?.id_sub_pengelola,
                  }}
                />

                <Form.Control.Feedback type="invalid">
                  {errors?.id_ref_lokasi_trafo?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={2}>
              <Form.Group className="mb-2">
                <Form.Label>Penyulang</Form.Label>
                <SelectAsyncDynamic
                  fieldName="id_ref_lokasi_penyulang"
                  pathServiceName="master.jaringan.ref_lokasi"
                  labelField="kode_lokasi"
                  valueField="id_ref_lokasi"
                  placeholder="SEMUA"
                  defaultValue="defaultValue"
                  isClearable={true}
                  errors={errors}
                  control={control}
                  //   isDisabled={!watchTrafo}
                  watchParent={watchTrafo || watchStation}
                  queryParams={{
                    page: -1,
                    limit: 30,
                    sort_by: "kode_lokasi",
                    id_parent_lokasi: watchTrafo,
                    id_gardu_induk: watchStation,
                    id_ref_jenis_lokasi: (JENIS_LOKASI() as any)["penyulang"],
                    // id_pusat: currentUser?.lokasi_unit?.id_pusat,
                    // id_regional: currentUser?.lokasi_unit?.id_regional,
                    // id_pemilik: currentUser?.lokasi_unit?.id_pemilik,
                    // id_pengelola: currentUser?.lokasi_unit?.id_pengelola,
                    // id_sub_pengelola:
                    //   currentUser?.lokasi_unit?.id_sub_pengelola,
                  }}
                />

                <Form.Control.Feedback type="invalid">
                  {errors?.id_ref_lokasi_penyulang?.message}
                </Form.Control.Feedback>
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
