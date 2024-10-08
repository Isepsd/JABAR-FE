import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Form,
  Tabs,
  Tab,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import axios from "axios";
import RequiredInfo from "@app/components/Info/RequiredInfo";
import AsetRequiredInfo from "@app/components/Info/AsetRequiredInfo";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import TopBarLoader from "@app/components/Loader/TopBarLoader";
import { addNotification } from "@app/store/notification/notification.action";
import { notificationTemplate } from "@app/helper/notificationTemplate";
import { Button, ButtonCancel } from "@app/components";
// import { generatingData } from "@app/store/reducers/app";
import CardWidget from "@app/components/Card/CardWidget";
import { head } from "lodash";

import {
  getByIdPath,
  postByPath,
  putByPath,
  getAllByPath,
  // putAsetMutasiBatch,
  putAsetBatch,
  putAsetExtAtrBatch,
} from "@app/services/main.service";
import { SEBAGAI_ASET } from "@app/configs/select-options/aset.select";
import SelectAsyncDynamic from "@app/modules/SelectForm/SelectAsyncDynamic";
import { API_PATH } from "@app/services/_path.service";
import { JENIS_LOKASI } from "@app/configs/jenis-lokasi.config";
import { AsetField } from "@app/interface/master-data/eam-aset.interface";

function AsetFormPage() {
  const dispatch = useDispatch();
  const source = axios.CancelToken.source();
  const { id } = useParams();
  const { currentUser } = useSelector((state: any) => state.auth);
  const navigate = useNavigate();
  const path = API_PATH().master.eam.eam_ref_aset;
  const pathAdditionalFields = API_PATH().master.eam.eam_ref_aset_ext_atr;
  const label = "Aset ";
  const [loadingForm, setLoadingForm] = useState<boolean>(false);
  const sebagaiOptions: any = SEBAGAI_ASET();
  const pathTransAsetMutasi = API_PATH().eam.eam_trans_aset_mutasi;
  const pathAset = API_PATH().master.eam.eam_ref_aset;
  const [key, setKey] = useState("lokasi");
  const [additionalOptions, setAdditionalOptions] = useState<any>([]);

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    id_ref_aset_kategori: Yup.string().required("Kategori Aset Wajib diisi"),
    id_ref_aset_group: Yup.string().required("Group Aset Wajib diisi"),
    deskripsi: Yup.string().required("Deskripsi Aset wajib diisi"),
    no_aset_int: Yup.number().required("No Aset harus number"),
    jenis_aset: Yup.string().nullable(),
    no_seri: Yup.string().nullable(),
    id_ref_aset_parent: Yup.string().nullable(),
    id_ref_aset_manufaktur: Yup.string().nullable(),
    model: Yup.string().nullable(),
    tipe: Yup.string().nullable(),
    tahun: Yup.string().nullable(),
    lat: Yup.number().nullable(),
    lon: Yup.number().nullable(),
    id_ref_lokasi_trafo: Yup.string().nullable(),
    id_ref_lokasi_penyulang: Yup.string().nullable(),
    id_ref_aset_kondisi: Yup.string().required("Kondisi Aset Wajib diisi"),
    id_ref_aset_status: Yup.string().required("Status Aset Wajib diisi"),
    id_ref_lokasi_station: Yup.string().required(
      "Lokasi/Station Aset Wajib diisi"
    ),
  });

  const [formModel] = useState<any>({
    jenis_aset: "parent",
    lat: 0,
    lon: 0,
    tahun: 0,
  });
  const { register, handleSubmit, setValue, clearErrors, control, formState } =
    useForm({
      resolver: yupResolver(validationSchema),
      defaultValues: formModel,
    });
  const { errors }: any = formState || {};
  const watchSebagai = useWatch({ control, name: "jenis_aset" });
  const watchStation = useWatch({ control, name: "id_ref_lokasi_station" });
  const watchTrafoGI = useWatch({ control, name: "id_ref_lokasi_trafo" });
  const watchGroup = useWatch({ control, name: "id_ref_aset_group" });
  const watchAsetKategori = useWatch({ control, name: "id_ref_aset_kategori" });

  const onSubmitForm = (data: any) => {
    (data.tgl_operasi = data.tgl_operasi == "" ? null : data.tgl_operasi),
      (data.id_pusat = currentUser?.lokasi_unit?.id_pusat),
      (data.id_regional = currentUser?.lokasi_unit?.id_regional),
      (data.id_pemilik = currentUser?.lokasi_unit?.id_pemilik),
      (data.id_pengelola = currentUser?.lokasi_unit?.id_pengelola),
      (data.id_sub_pengelola = currentUser?.lokasi_unit?.id_sub_pengelola),
      upsertData(data);
  };

  useEffect(() => {
    // if (id)
    // getNoAsetInt();

    if (!id) {
      console.log(id);
      getNoAsetInt();
      handleClearForm();
    } else {
      getDataById();
    }
    return () => {
      source.cancel("Request Canceled");
    };
  }, []);

  useEffect(() => {
    if (watchAsetKategori) getAdditionalField();
  }, [watchAsetKategori]);

  // useEffect(() => {
  //   setValue("id_ref_lokasi_trafo", null);
  //   dispatch(generatingData(null));
  // }, [watchStation]);

  // useEffect(() => {
  //   setValue("id_ref_lokasi_penyulang", null);
  //   dispatch(generatingData(null));
  // }, [watchTrafoGI]);

  const getAdditionalField = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      let path = `master/eam/aset-kategori-ext-atr`;

      const params = {
        page: "-1",
        limit: "-1",
        sort_by: "urutan",
        sort_type: "asc",
        id_ref_aset_kategori: watchAsetKategori,
      };

      const req: any = await getAllByPath(path, params, source.token);
      const { results } = req;
      let data = results;
      setAdditionalOptions(data);
      if (data?.length > 0) getAdditionalFieldValue(data);
    } catch (err: any) {}
  };

  const getAdditionalFieldValue = async (listFields = []) => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      let path = `master/eam/aset-ext-atr`;

      const params = {
        page: "-1",
        limit: "-1",
        sort_by: "urutan",
        sort_type: "asc",
        id_ref_aset: id,
      };

      const req: any = await getAllByPath(path, params, source.token);
      const { results } = req;
      let data = results;

      if (data?.length > 0) {
        const newOptions: any = listFields?.map((x: any) => {
          const existField: any = head(
            data.filter(
              (y: any) =>
                x.id_ref_aset_kategori_ext_atr == y.id_ref_aset_kategori_ext_atr
            )
          );

          return { ...x, ...existField };
        });

        setAdditionalOptions(newOptions);
      }
    } catch (err: any) {}
  };

  /** GET EDIT DATA */
  const getDataById = async () => {
    try {
      const req: any = await getByIdPath(path, id, source.token);

      initDataForm(req?.results);
    } catch {}
  };

  const initDataForm = (data: any) => {
    if (data) {
      Object.keys(data).map((field: any) => {
        setValue(field, data[field]);
      });
      if (id) {
        setValue("lokasi_f", data?.ref_lokasi_station?.nama_lokasi);
        setValue("trafo_f", data?.ref_lokasi_trafo?.nama_lokasi);
        setValue("penyulang_f", data?.ref_lokasi_penyulang?.nama_lokasi);

        setValue("lantai_f", data?.ref_aset_lantai?.nama);
        setValue("ruangan_f", data?.ref_aset_ruangan?.nama);
        setValue("rak_f", data?.ref_aset_lantai?.nama);
      }
    }
  };

  /** PUT / UPDATE DATA REQUEST */
  const upsertData = async (params: any) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setLoadingForm(true);
    try {
      let req: any;
      if (id) {
        params.id_user_update = currentUser.id_user;
        req = await putByPath(path, params, id, source.token);
      } else {
        getNoAsetInt();
        params.id_user_entri = currentUser.id_user;
        req = await postByPath(path, params, source.token);
      }
      const { results } = req;
      if (results?.id_ref_aset) {
        const paramTransAsetMutasi: any = {
          id_ref_aset: results?.id_ref_aset,
          id_ref_aset_jenis_mutasi: "13e671d3-72c0-4939-a032-ffa71b7c743e", //REGISTASI AWAL
          id_ref_aset_mutasi_status: "b385f4e4-15a5-4d02-a9af-8f6ca8487574", //POSTING
          id_ref_aset_status: params?.id_ref_aset_status || null,
          id_lokasi: params?.id_ref_lokasi_station || null,
          id_bay: params?.id_ref_lokasi_penyulang || null,
          id_lokasi_trafo: params?.id_ref_lokasi_trafo || null,
        };

        insertAsetMutasi(paramTransAsetMutasi, results);

        const paramsAdditional: any = additionalOptions
          .filter((f: any) => f?.nilai)
          .map((x: any) => ({
            id_ref_aset_kategori_ext_atr: x.id_ref_aset_kategori_ext_atr,
            id_ref_aset: results?.id_ref_aset,
            status: 1,
            nilai: x.nilai,
            id_ref_aset_ext_atr: x?.id_ref_aset_ext_atr || "",
            id_user_entri: currentUser.id_user,
            id_user_update: currentUser.id_user,
            id_pusat: currentUser?.lokasi_unit?.id_pusat,
            id_regional: currentUser?.lokasi_unit?.id_regional,
            id_pemilik: currentUser?.lokasi_unit?.id_pemilik,
            id_pengelola: currentUser?.lokasi_unit?.id_pengelola,
            id_sub_pengelola: currentUser?.lokasi_unit?.id_sub_pengelola,
          }));
        if (paramsAdditional?.length > 0) {
          upserAdditionalField(paramsAdditional);
        } else {
          const paramsAdditionals: any = additionalOptions.map((x: any) => ({
            id_ref_aset_kategori_ext_atr: x.id_ref_aset_kategori_ext_atr,
            id_ref_aset: results?.id_ref_aset,
            status: 1,
            nilai: x.nilai,
            id_ref_aset_ext_atr: x?.id_ref_aset_ext_atr || "",
            id_user_entri: currentUser.id_user,
            id_user_update: currentUser.id_user,
            id_pusat: currentUser?.lokasi_unit?.id_pusat,
            id_regional: currentUser?.lokasi_unit?.id_regional,
            id_pemilik: currentUser?.lokasi_unit?.id_pemilik,
            id_pengelola: currentUser?.lokasi_unit?.id_pengelola,
            id_sub_pengelola: currentUser?.lokasi_unit?.id_sub_pengelola,
          }));
          upserAdditionalField(paramsAdditionals);
        }

        setLoadingForm(false);
        dispatchNotification(
          `Success ${id ? "update" : "add"} ${label}`,
          "success"
        );
        handleClearForm();
        navigate(-1);
        // if (paramsAdditional?.length == 0) navigate(-1);
      } else {
        setLoadingForm(false);
        dispatchNotification(
          `Failed ${id ? "update" : "add"} ${label} `,
          "danger"
        );
      }
    } catch (err: any) {
      setLoadingForm(false);
      dispatchNotification(
        `Failed ${id ? "update" : "add"} ${label} `,
        "danger"
      );
    }
  };

  const onChangeAdditionalField = (e: any, index: any) => {
    let newArr = [...additionalOptions]; // copying the old datas array
    newArr[index]["nilai"] = e.target.value; // replace e.target.value with whatever you want to change it to

    setAdditionalOptions(newArr);
  };

  /** INSERT INITIAL ASET MUTASI */
  const insertAsetMutasi = async (params: any, paramx: any) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setLoadingForm(true);
    try {
      if (!id) {
        let req: any;
        req = await postByPath(pathTransAsetMutasi, params, source.token);
        const { results } = req;
        const paramAset: any = {
          id_trans_aset_mutasi: results?.id_trans_aset_mutasi,
        };
        paramAset.no_aset_int = paramx?.no_aset_int;
        paramAset.deskripsi = paramx?.deskripsi;
        paramAset.lat = paramx?.lat;
        paramAset.lon = paramx?.lon;

        /** UPDATE TRANS MUTASI ID KE EAM_REF_ASET */
        // if (!id) {
        await putAsetBatch(
          `${pathAset}/${results?.id_ref_aset}`,
          paramAset,
          source.token
        );
        // } else {
        //   await postByPath(pathAset, params, source.token);
        // }
      }

      setLoadingForm(false);
      // dispatchNotification(
      //   `Success ${id ? "update" : "add"} Aset Mutasi`,
      //   "success"
      // );
      handleClearForm();
    } catch (err: any) {
      setLoadingForm(false);
      dispatchNotification(
        `Failed ${id ? "update" : "add"} Aset Mutasi`,
        "danger"
      );
    }
  };

  /** INSERT Additional Field */
  const upserAdditionalField = async (params: any) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setLoadingForm(true);
    try {
      id
        ? await putAsetExtAtrBatch(
            `${pathAdditionalFields}/update-batch`,
            params,
            source.token
          )
        : await postByPath(pathAdditionalFields, params, source.token);
      setLoadingForm(false);
      // dispatchNotification(
      //   `Success ${id ? "update" : "add"} Additional Fields`,
      //   "success"
      // );
      handleClearForm();
    } catch (err: any) {
      setLoadingForm(false);
      dispatchNotification(
        `Failed ${id ? "update" : "add"} Additional Fields`,
        "danger"
      );
    }
  };

  /** NOTIFICATION HANDLER */
  const dispatchNotification = (msg: string = "", type: string = "") => {
    const notification = notificationTemplate(msg, type);
    dispatch(addNotification({ ...notification, message: msg, type: type }));
  };

  const handleClearForm = () => {
    AsetField.map((f: any) => {
      clearErrors(f);
      if (!id) {
        if (f.lat || f.lon) {
          setValue(f, 0);
        } else if (f.jenis_aset) {
          setValue(f, "parent");
        } else {
          setValue(f, "");
        }
      }
    });
  };

  const getNoAsetInt = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      let path = `master/eam/aset`;
      const params = {
        limit: "1",
        page: "1",
        sort_by: "-no_aset_int",
      };

      const req: any = await getAllByPath(path, params, source.token);
      const { results } = req;
      let data = results;

      const no = data?.length == 0 ? 1 : parseInt(data[0].no_aset_int) + 1;
      setValue("no_aset_int", no);
      setValue("tahun", 0);
      setValue("lat", 0);
      setValue("lon", 0);
    } catch (err: any) {}
  };

  return (
    <>
      <TopBarLoader isLoading={loadingForm} />

      <Row className="animate__animated animate__fadeIn">
        <div className="col-md-12">
          <div className="ms-md-1">
            <div className="align-items-center d-flex">
              <h5 className="mb-0">
                <i className="fa-solid fa-circle-info"></i>{" "}
                {id ? "Ubah" : "Tambah"} {label}
              </h5>
            </div>
            <hr />
            <div className="row">
              <div className="col-12">
                <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
                  <Row>
                    <Col>
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
                        <Form.Label>
                          Kategori Aset <RequiredInfo />
                        </Form.Label>
                        <SelectAsyncDynamic
                          fieldName="id_ref_aset_kategori"
                          pathServiceName="master.eam.eam_ref_aset_kategori"
                          labelField="nama"
                          valueField="id_ref_aset_kategori"
                          placeholder="Pilih Kategori Aset"
                          watchParent={watchGroup}
                          isDisabled={!watchGroup}
                          errors={errors}
                          control={control}
                          queryParams={{
                            sort_by: "nama",
                            id_ref_aset_group: watchGroup,
                          }}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Pengelola</Form.Label>
                        <SelectAsyncDynamic
                          fieldName="id_ref_bagian"
                          pathServiceName="master.eam.eam_ref_bagian"
                          labelField="nama"
                          valueField="id_ref_bagian"
                          placeholder="Pilih Pengelola"
                          isClearable={true}
                          errors={errors}
                          control={control}
                          queryParams={{
                            sort_by: "nama",
                          }}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>
                          No Aset <RequiredInfo />
                        </Form.Label>
                        <Form.Control
                          type="number"
                          readOnly={true}
                          {...register("no_aset_int")}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors?.no_aset_int?.message}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>No Maximo</Form.Label>
                        <Form.Control
                          type="number"
                          {...register("no_aset_ext")}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Sebagai</Form.Label>
                        <Form.Select {...register("jenis_aset")}>
                          {sebagaiOptions.map((status: any, index: number) => (
                            <option key={index} value={status.value}>
                              {status.label}
                            </option>
                          ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {errors?.jenis_aset?.message}
                        </Form.Control.Feedback>
                      </Form.Group>
                      {watchSebagai == "child" && (
                        <Form.Group className="mb-3">
                          <Form.Label>Induk Aset</Form.Label>
                          <SelectAsyncDynamic
                            pathServiceName="master.eam.eam_ref_aset"
                            fieldName="id_ref_aset_parent"
                            labelField="deskripsi"
                            valueField="id_ref_aset"
                            placeholder="Pilih Induk Aset"
                            errors={errors}
                            control={control}
                            queryParams={{
                              sort_by: "nama",
                            }}
                          />
                        </Form.Group>
                      )}
                    </Col>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>
                          Deskripsi Aset <RequiredInfo />
                        </Form.Label>
                        <Form.Control {...register("deskripsi")} />
                        <Form.Control.Feedback type="invalid">
                          {errors?.deskripsi?.message}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>No Seri</Form.Label>
                        <Form.Control {...register("no_seri")} />
                        <Form.Control.Feedback type="invalid">
                          {errors?.no_seri?.message}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="id_ref_aset_manufaktur"
                      >
                        <Form.Label>Manufaktur</Form.Label>
                        <SelectAsyncDynamic
                          fieldName="id_ref_aset_manufaktur"
                          pathServiceName="master.eam.eam_ref_aset_manufaktur"
                          labelField="nama"
                          valueField="id_ref_aset_manufaktur"
                          placeholder="Pilih Manufaktur"
                          errors={errors}
                          control={control}
                          queryParams={{
                            sort_by: "nama",
                          }}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Model</Form.Label>
                        <Form.Control {...register("model")} />
                        <Form.Control.Feedback type="invalid">
                          {errors?.model?.message}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Tipe</Form.Label>
                        <Form.Control {...register("tipe")} />
                        <Form.Control.Feedback type="invalid">
                          {errors?.tipe?.message}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Tahun Aset</Form.Label>
                        <Form.Control
                          maxLength={4}
                          type="number"
                          {...register("tahun")}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors?.tahun?.message}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>Lat</Form.Label>
                        <Form.Control type="number" {...register("lat")} />
                        <Form.Control.Feedback type="invalid">
                          {errors?.lat?.message}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Lon</Form.Label>
                        <Form.Control type="number" {...register("lon")} />
                        <Form.Control.Feedback type="invalid">
                          {errors?.lon?.message}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="id_ref_aset_status"
                      >
                        <Form.Label>
                          Status Aset <RequiredInfo />
                        </Form.Label>
                        <SelectAsyncDynamic
                          fieldName="id_ref_aset_status"
                          pathServiceName="master.eam.eam_ref_aset_status"
                          labelField="nama"
                          valueField="id_ref_aset_status"
                          placeholder="Pilih Status"
                          errors={errors}
                          control={control}
                          queryParams={{
                            sort_by: "nama",
                          }}
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Tanggal Operasi</Form.Label>
                        <Form.Control
                          type="date"
                          {...register("tgl_operasi")}
                        />

                        <Form.Control.Feedback type="invalid">
                          {errors?.tgl_operasi?.message}
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="id_ref_kondisi_aset"
                      >
                        <Form.Label>
                          Kondisi Aset <RequiredInfo />
                        </Form.Label>
                        <SelectAsyncDynamic
                          fieldName="id_ref_aset_kondisi"
                          pathServiceName="master.eam.eam_ref_aset_kondisi"
                          labelField="nama"
                          valueField="id_ref_aset_kondisi"
                          placeholder="Pilih Kondisi"
                          errors={errors}
                          control={control}
                          queryParams={{
                            sort_by: "nama",
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <hr />
                  <div className="align-items-left">
                    {/* <h5 className="mb-0">Lokasi Aset</h5> */}
                    <Tabs
                      variant="pills"
                      activeKey={key}
                      onSelect={(k: any) => setKey(k)}
                      className="ms-auto"
                    >
                      <Tab eventKey="lokasi" title="Lokasi Aset"></Tab>
                      <Tab
                        eventKey="lainnya"
                        title="Atribut Lainnya"
                        disabled={additionalOptions?.length == 0}
                      ></Tab>
                    </Tabs>
                  </div>
                  <hr />
                  {key == "lokasi" && (
                    <Row>
                      <div className="align-items-center d-flex mb-10">
                        <CardWidget title="Informasi" className="col-12 mb-10">
                          <p className="mb-0">
                            Lokasi Aset hanya dapat dilakukan saat input data di
                            awal, untuk merubah lokasi aset dapat dilakukan
                            dengan proses Mutasi Aset agar riwayat perpindahan
                            aset tercatat!
                          </p>
                        </CardWidget>
                      </div>

                      <hr />
                      <Col className="col-6">
                        {id && (
                          <div>
                            <Form.Group className="mb-3">
                              <Form.Label>
                                Lokasi/Station <RequiredInfo />
                              </Form.Label>
                              <Form.Control
                                readOnly={true}
                                {...register("lokasi_f")}
                              />
                            </Form.Group>
                            <Form.Group className="mb-3">
                              <Form.Label>Trafo</Form.Label>
                              <Form.Control
                                readOnly={true}
                                {...register("trafo_f")}
                              />
                            </Form.Group>
                            <Form.Group className="mb-3">
                              <Form.Label>Penyulang</Form.Label>
                              <Form.Control
                                readOnly={true}
                                {...register("penyulang_f")}
                              />
                            </Form.Group>
                          </div>
                        )}
                        {!id && (
                          <div>
                            <Form.Group className="mb-3">
                              <Form.Label>
                                Lokasi/Station{" "}
                                <AsetRequiredInfo
                                  message={
                                    "UID, UP2D, UP3, ULP, Gardu Induk,Gardu Hubung"
                                  }
                                  icon={"fa-solid fa-circle-info"}
                                />{" "}
                                <RequiredInfo />
                              </Form.Label>
                              <SelectAsyncDynamic
                                fieldName="id_ref_lokasi_station"
                                pathServiceName="master.jaringan.ref_lokasi"
                                labelField="nama_lokasi"
                                valueField="id_ref_lokasi"
                                placeholder="Pilih Station"
                                isClearable={true}
                                // isDisabled={id ? true : !watchStation}
                                errors={errors}
                                control={control}
                                queryParams={{
                                  sort_by: "nama_lokasi",
                                  limit: "50",
                                  load: "Lokasi/Station",
                                  id_ref_jenis_lokasi_in: `${
                                    JENIS_LOKASI().uid
                                  },${JENIS_LOKASI().uiw},${
                                    JENIS_LOKASI().up2d
                                  },${JENIS_LOKASI().up3},${
                                    JENIS_LOKASI().ulp
                                  },${JENIS_LOKASI().gardu_induk},${
                                    JENIS_LOKASI().gardu_hubung
                                  }`,
                                  status_listrik: 1,
                                }}
                              />
                            </Form.Group>

                            <Form.Group className="mb-3">
                              <Form.Label>Trafo</Form.Label>
                              <SelectAsyncDynamic
                                fieldName="id_ref_lokasi_trafo"
                                pathServiceName="master.jaringan.ref_lokasi"
                                labelField="nama_lokasi"
                                valueField="id_ref_lokasi"
                                placeholder="Pilih Trafo"
                                isClearable={true}
                                watchParent={watchStation}
                                isDisabled={!watchStation}
                                errors={errors}
                                control={control}
                                queryParams={{
                                  sort_by: "nama_lokasi",
                                  load: "Trafo",
                                  limit: "20",
                                  id_ref_jenis_lokasi: `${
                                    JENIS_LOKASI().trafo_gi
                                  }`,
                                  id_parent_lokasi: watchStation,
                                  status_listrik: 1,
                                  jenis_layanan: "NON KTT",
                                }}
                              />
                            </Form.Group>
                            <Form.Group className="mb-3">
                              <Form.Label>Penyulang</Form.Label>
                              <SelectAsyncDynamic
                                fieldName="id_ref_lokasi_penyulang"
                                pathServiceName="master.jaringan.ref_lokasi"
                                labelField="nama_lokasi"
                                valueField="id_ref_lokasi"
                                placeholder="Pilih Penyulang"
                                watchParent={watchTrafoGI}
                                isDisabled={!watchTrafoGI}
                                isClearable={true}
                                errors={errors}
                                control={control}
                                queryParams={{
                                  sort_by: "nama_lokasi",
                                  load: "Penyulang",
                                  limit: "20",
                                  id_ref_jenis_lokasi: `${
                                    JENIS_LOKASI().penyulang
                                  }`,
                                  id_parent_lokasi: watchTrafoGI,
                                  status_listrik: 1,
                                }}
                              />
                            </Form.Group>
                          </div>
                        )}
                      </Col>
                      <Col className="col-6">
                        {id && (
                          <div>
                            <Form.Group className="mb-3">
                              <Form.Label>Lantai</Form.Label>
                              <Form.Control
                                readOnly={true}
                                {...register("lantai_f")}
                              />
                            </Form.Group>
                            <Form.Group className="mb-3">
                              <Form.Label>Ruangan</Form.Label>
                              <Form.Control
                                readOnly={true}
                                {...register("ruangan_f")}
                              />
                            </Form.Group>
                            <Form.Group className="mb-3">
                              <Form.Label>Rak</Form.Label>
                              <Form.Control
                                readOnly={true}
                                {...register("rak_f")}
                              />
                            </Form.Group>
                          </div>
                        )}
                        {!id && (
                          <div>
                            <Form.Group className="mb-3">
                              <Form.Label>Lantai</Form.Label>
                              <SelectAsyncDynamic
                                fieldName="id_ref_aset_lantai"
                                pathServiceName="master.eam.eam_ref_aset_lantai"
                                labelField="nama"
                                valueField="id_ref_aset_lantai"
                                placeholder="Pilih Lantai"
                                isClearable={true}
                                errors={errors}
                                control={control}
                                queryParams={{
                                  sort_by: "nama",
                                }}
                              />
                            </Form.Group>
                            <Form.Group className="mb-3">
                              <Form.Label>Ruangan</Form.Label>
                              <SelectAsyncDynamic
                                fieldName="id_ref_aset_ruangan"
                                pathServiceName="master.eam.eam_ref_aset_ruangan"
                                labelField="nama"
                                valueField="id_ref_aset_ruangan"
                                placeholder="Pilih Ruangan"
                                isClearable={true}
                                errors={errors}
                                control={control}
                                queryParams={{
                                  sort_by: "nama",
                                }}
                              />
                            </Form.Group>
                            <Form.Group className="mb-3">
                              <Form.Label>Rak</Form.Label>
                              <SelectAsyncDynamic
                                fieldName="id_ref_aset_rak"
                                pathServiceName="master.eam.eam_ref_aset_rak"
                                labelField="nama"
                                valueField="id_ref_aset_rak"
                                placeholder="Pilih Rak"
                                isClearable={true}
                                errors={errors}
                                control={control}
                                queryParams={{
                                  sort_by: "nama",
                                }}
                              />
                            </Form.Group>
                          </div>
                        )}
                      </Col>
                    </Row>
                  )}

                  {key == "lainnya" && (
                    <Row>
                      {additionalOptions?.map(
                        (additional: any, index: number) => (
                          <Col key={index} md={4}>
                            <Form.Group className="mb-3">
                              <Form.Label>{additional.nama}</Form.Label>
                              <InputGroup>
                                <FormControl
                                  value={additional?.nilai}
                                  onChange={(e) =>
                                    onChangeAdditionalField(e, index)
                                  }
                                  placeholder={additional.nama}
                                />
                                <FormControl
                                  type={"hidden"}
                                  value={additional?.urutan}
                                  placeholder={additional.urutan}
                                />
                                <InputGroup.Text>
                                  {additional.satuan}
                                </InputGroup.Text>
                              </InputGroup>
                            </Form.Group>
                          </Col>
                        )
                      )}
                    </Row>
                  )}

                  <Form.Group className="mt-4">
                    <Button
                      type="submit"
                      variant="primary"
                      isLoading={loadingForm}
                    >
                      Simpan
                    </Button>
                    <ButtonCancel />
                  </Form.Group>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </Row>
    </>
  );
}

export default AsetFormPage;
