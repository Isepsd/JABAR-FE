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
// import { head } from "lodash";
import {
  // getByIdPath,
  postByPath,
  putByPath,
  getAllByPath,
  // putAsetMutasiBatch,
  // putAsetBatch,
  // putAsetExtAtrBatch,
} from "@app/services/main.service";

import SelectAsyncDynamic from "@app/modules/SelectForm/SelectAsyncDynamic";
import { API_PATH } from "@app/services/_path.service";
import { JENIS_LOKASI } from "@app/configs/jenis-lokasi.config";
import { AsetField } from "@app/interface/master-data/eam-aset.interface";
import moment from "moment";
import DaftarAsetPage from "./DaftarAsetPage";

function TransMutasiFormPage() {
  const dispatch = useDispatch();

  const source = axios.CancelToken.source();
  const { id } = useParams();
  const { currentUser } = useSelector((state: any) => state.auth);
  const navigate = useNavigate();
  // const path = API_PATH().master.eam.eam_ref_aset;
  const pathWo = API_PATH().eam.eam_trans_wo;
  // const pathAdditionalFields = API_PATH().master.eam.eam_ref_aset_ext_atr;
  const label = "Aset ";
  const [loadingForm, setLoadingForm] = useState<boolean>(false);

  const pathTransWo = API_PATH().eam.eam_trans_wo;
  // const pathTransAsetMutasi = API_PATH().eam.eam_trans_aset_mutasi;
  // const pathAset = API_PATH().master.eam.eam_ref_aset;
  const [key, setKey] = useState("lokasi");
  const [additionalOptions, setAdditionalOptions] = useState<any>([]);
  // const [addTab, setAddTab] = useState<any>([]);
  // const [addTab, setAddTab] = useState<any>([]);
  const [addTab] = useState<any>([]);
  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    id_ref_aset_kategori: Yup.string().required("Kategori Aset Wajib diisi"),
    id_ref_aset_group: Yup.string().required("Group Aset Wajib diisi"),
    deskripsi: Yup.string().required("Nama Aset wajib diisi"),
    no_aset_int: Yup.number().nullable(),
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
    tgl_mulai: moment().format("YYYY-MM-DD"),
  });
  const { register, handleSubmit, setValue, clearErrors, control, formState } =
    useForm({
      resolver: yupResolver(validationSchema),
      defaultValues: formModel,
    });
  const { errors }: any = formState || {};
  const watchStation = useWatch({ control, name: "id_ref_lokasi_station" });
  const watchTrafoGI = useWatch({ control, name: "id_ref_lokasi_trafo" });

  const onSubmitForm = (data: any) => {
    (data.id_pusat = currentUser?.lokasi_unit?.id_pusat),
      (data.id_regional = currentUser?.lokasi_unit?.id_regional),
      (data.id_pemilik = currentUser?.lokasi_unit?.id_pemilik),
      (data.id_pengelola = currentUser?.lokasi_unit?.id_pengelola),
      (data.id_sub_pengelola = currentUser?.lokasi_unit?.id_sub_pengelola),
      upsertData(data);
  };

  useEffect(() => {
    getNoAsetInt();
    handleClearForm();

    return () => {
      source.cancel("Request Canceled");
    };
  }, []);

  /** PUT / UPDATE DATA REQUEST */
  const upsertData = async (params: any) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    setLoadingForm(true);
    try {
      let req: any;
      // let paramsx: any;
      // paramsx = {
      //   nomor_wo: params.nomor_wo,
      //   jenis_wo: "MUTASI",
      //   tgl_mulai: params.tgl_mulai,
      //   id_lokasi: params.tgl_mulai,
      // id_bay: params.tgl_mulai,
      //   id_lokasi_trafo: params.tgl_mulai,
      //   id_ref_aset_ruangan: params.tgl_mulai,
      //   id_ref_aset_lantai: params.tgl_mulai,

      //   id_ref_aset_rak: params.tgl_mulai,
      //   nomor_wo_angka: params.tgl_mulai,
      //   nomor_wo_bln: params.tgl_mulai,
      //   nomor_wo_thn: params.tgl_mulai,
      //   nomor_wo_jenis: params.tgl_mulai,

      //   id_user_entri: currentUser.id_user,

      // };
      if (id) {
        req = await putByPath(pathWo, params, id, source.token);
      } else {
        getNoAsetInt();

        req = await postByPath(pathWo, params, source.token);
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
        req = await postByPath(pathTransWo, params, source.token);
        const { results } = req;
        const paramAset: any = {
          id_trans_aset_mutasi: results?.id_trans_aset_mutasi,
        };
        paramAset.no_aset_int = paramx?.no_aset_int;
        paramAset.deskripsi = paramx?.deskripsi;
        paramAset.lat = paramx?.lat;
        paramAset.lon = paramx?.lon;
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
    // format "nomor wo/bln/thn/HARMAMPANG"
    try {
      let path = `eam/trans-wo`;
      const params = {
        limit: "1",
        page: "1",
        sort_by: "-tgl_entri",
        nomor_wo_jenis: "MUTASI",
      };

      const req: any = await getAllByPath(path, params, source.token);
      const { results } = req;
      let data = results;
      console.log("getNoAsetInt");
      console.log(data);
      const bln = moment().format("MM");
      const thn = moment().format("YYYY");
      const nomor_wo_jenis = "/MUTASI";
      if (data.length > 0) {
        // const nomor_wo_angka = data?.nomor_wo_angka;
        // const nomor_wo_bln = data?.nomor_wo_bln;
        // const nomor_wo_thn = data?.nomor_wo_thn;
        // const nomor_wo_jenis data?.nomor_wo_jenis;

        const no =
          "0000" +
          data?.nomor_wo_angka +
          "/" +
          bln +
          "/" +
          thn +
          nomor_wo_jenis;
        setValue("nomor_wo", no);
      } else {
        const no = "00001" + "/" + bln + "/" + thn + nomor_wo_jenis;
        setValue("nomor_wo", no);
      }
    } catch (err: any) {}
  };

  // const addButtonClicked = (e: any): void => {
  //   console.log(e);

  //   const newTabItem = [
  //     {
  //       id: 1,
  //       name: "DynamicTabItem",
  //     },
  //   ];
  //   setAddTab(newTabItem);
  //   // tabObj.current.addTab(newTabItem as any, 1);
  // };

  // const removeButtonClicked = (e: any): void => {
  //   // tabObj.current.removeTab(1);
  // };

  return (
    <>
      <TopBarLoader isLoading={loadingForm} />

      <Row className="animate__animated animate__fadeIn">
        <div className="col-md-12">
          <div className="ms-md-1">
            <div className="align-items-center d-flex">
              <h5 className="mb-0">
                <i className="fa-solid fa-circle-info"></i> {"Mutasi "} {label}
              </h5>
            </div>
            <hr />
            <div className="row">
              <div className="col-12">
                <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
                  <Row>
                    {/* <div className="align-items-center d-flex mb-10"> */}
                    <CardWidget title="Work Order" className="col-12 mb-10">
                      <Row>
                        <Col>
                          <Form.Group className="mb-3">
                            <Form.Label>
                              Tanggal <RequiredInfo />
                            </Form.Label>
                            <Form.Control
                              type="date"
                              {...register("tgl_mulai")}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors?.tgl_mulai?.message}
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>
                              No WO <RequiredInfo />
                            </Form.Label>
                            <Form.Control
                              // type="number"
                              {...register("nomor_wo")}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors?.nomor_wo?.message}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        <Col>
                          <Form.Group className="mb-3">
                            <Form.Label>Deskripsi</Form.Label>
                            <Form.Control
                              // type="number"
                              {...register("deskripsi")}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors?.deskripsi?.message}
                            </Form.Control.Feedback>
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>
                              Nama Petugas <RequiredInfo />
                            </Form.Label>
                            <Form.Control {...register("nama_petugas")} />
                            <Form.Control.Feedback type="invalid">
                              {errors?.nama_petugas?.message}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                    </CardWidget>
                    {/* </div> */}
                  </Row>
                  <Row>
                    <CardWidget
                      title="Pilih Daftar Aset yang akan dimutasi"
                      className="col-12 mb-10"
                    >
                      <div className="align-items-left">
                        {/* <h5 className="mb-0">Lokasi Aset</h5> */}
                        <DaftarAsetPage />
                        <Form.Group className="mt-4">
                          {/* <Button
                            type="button"
                            variant="danger"
                            isLoading={loadingForm}
                            onClick={addButtonClicked}
                          >
                            Tambah Daftar Aset
                          </Button> */}
                          {/* <button
                            id="remove"
                            className="e-btn"
                            // onClick={removeButtonClicked}
                          >
                            Click to remove
                          </button> */}
                        </Form.Group>
                        <Tabs
                          variant="pills"
                          activeKey={key}
                          onSelect={(k: any) => setKey(k)}
                          className="ms-auto"
                        >
                          {addTab?.map((tab: any, index: number) => (
                            <Tab
                              title="Detail Aset"
                              eventKey={tab.id}
                              key={index}
                            ></Tab>
                          ))}

                          {/* <Tab eventKey="lokasi" title="Detail Aset"></Tab>
                          <Tab
                            eventKey="lainnya"
                            title="Atribut Lainnya"
                            disabled={additionalOptions?.length == 0}
                          ></Tab> */}
                        </Tabs>
                      </div>
                      <hr />
                      {key == "lokasi" && (
                        <Row>
                          <Col>
                            <Form.Group className="mb-3">
                              <Form.Label>Group Aset</Form.Label>
                              <Form.Control
                                disabled={true}
                                {...register("group_aset_f")}
                              />
                            </Form.Group>

                            <Form.Group className="mb-3">
                              <Form.Label>Kategori Aset</Form.Label>
                              <Form.Control
                                disabled={true}
                                {...register("kategori_aset_f")}
                              />
                            </Form.Group>

                            <Form.Group className="mb-3">
                              <Form.Label>Pengelola</Form.Label>
                              <Form.Control
                                disabled={true}
                                {...register("pengelola_f")}
                              />
                            </Form.Group>

                            <Form.Group className="mb-3">
                              <Form.Label>No Aset</Form.Label>
                              <Form.Control
                                disabled={true}
                                {...register("no_aset_f")}
                              />
                            </Form.Group>

                            <Form.Group className="mb-3">
                              <Form.Label>No Maximo</Form.Label>
                              <Form.Control
                                disabled={true}
                                {...register("no_maximo_f")}
                              />
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group className="mb-3">
                              <Form.Label>Nama Aset</Form.Label>
                              <Form.Control
                                disabled={true}
                                {...register("deskripsi_f")}
                              />
                            </Form.Group>
                            <Form.Group className="mb-3">
                              <Form.Label>No Seri</Form.Label>
                              <Form.Control
                                disabled={true}
                                {...register("no_seri_f")}
                              />
                            </Form.Group>

                            <Form.Group className="mb-3">
                              <Form.Label>Manufaktur</Form.Label>
                              <Form.Control
                                disabled={true}
                                {...register("manufaktur_f")}
                              />
                            </Form.Group>

                            <Form.Group className="mb-3">
                              <Form.Label>Model</Form.Label>
                              <Form.Control
                                disabled={true}
                                {...register("model_f")}
                              />
                            </Form.Group>

                            <Form.Group className="mb-3">
                              <Form.Label>Tipe</Form.Label>
                              <Form.Control
                                disabled={true}
                                {...register("tipe_f")}
                              />
                            </Form.Group>

                            <Form.Group className="mb-3">
                              <Form.Label>Tahun</Form.Label>
                              <Form.Control
                                disabled={true}
                                {...register("tahun_f")}
                              />
                            </Form.Group>
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
                                      disabled={true}
                                      value={additional?.nilai}
                                      onChange={(e) =>
                                        onChangeAdditionalField(e, index)
                                      }
                                      // placeholder={additional.nama}
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
                    </CardWidget>
                  </Row>
                  <Row>
                    <CardWidget title="Lokasi Lama" className="col-6 mb-10">
                      <div>
                        <Form.Group className="mb-3">
                          <Form.Label>Lokasi/Station</Form.Label>
                          <Form.Control
                            disabled={true}
                            {...register("lokasi_f")}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Trafo</Form.Label>
                          <Form.Control
                            disabled={true}
                            {...register("trafo_f")}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Penyulang</Form.Label>
                          <Form.Control
                            disabled={true}
                            {...register("penyulang_f")}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Lantai</Form.Label>
                          <Form.Control
                            disabled={true}
                            {...register("lantai_f")}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Ruangan</Form.Label>
                          <Form.Control
                            disabled={true}
                            {...register("ruangan_f")}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Rak</Form.Label>
                          <Form.Control
                            disabled={true}
                            {...register("rak_f")}
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Status Aset</Form.Label>
                          <Form.Control
                            disabled={true}
                            {...register("status_aset_f")}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Kondisi Aset</Form.Label>
                          <Form.Control
                            disabled={true}
                            {...register("kondisi_aset_f")}
                          />
                        </Form.Group>
                      </div>
                    </CardWidget>

                    <CardWidget title="Lokasi Baru" className="col-6 mb-10">
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
                              id_ref_jenis_lokasi_in: `${JENIS_LOKASI().uid},${
                                JENIS_LOKASI().uiw
                              },${JENIS_LOKASI().up2d},${JENIS_LOKASI().up3},${
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
                              id_ref_jenis_lokasi: `${JENIS_LOKASI().trafo_gi}`,
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

                        <Form.Group className="mb-3">
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
                      </div>
                    </CardWidget>
                  </Row>

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

export default TransMutasiFormPage;
