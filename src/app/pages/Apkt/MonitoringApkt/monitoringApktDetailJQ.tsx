import React, { useState, useEffect } from "react";
import JqxTabs from "jqwidgets-scripts/jqwidgets-react-tsx/jqxtabs";
import TableDataJqxGridNew from "@app/modules/Table/TableDataJqxGridNew";
import { Button } from "@app/components";
import { API_PATH } from "@app/services/_path.service";
// import { postByPath } from '@app/services/main.service';
import { putAsetExtAtrBatch } from "@app/services/main.service";
// import ModalConfirm from '@app/components/Modals/ModalConfirm';
import ModalNotif from "@app/components/Modals/ModalNotif";
import ModalForm from "@app/components/Modals/ModalFormNyala";
import UploadPadam from "@app/pages/Apkt/GangguanDanPemeliharaan/UploadPadamJQ";
import FormTglPadam from "./FormTglPadamJQ";
import FormTglNyala from "./FormTglNyalaJQ";
import axios from "axios";
// import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
import { get } from "lodash";
import {
  MONITORING_APKT_DETAIL_PADAM_JQ,
  MONITORING_APKT_DETAIL_NYALA_JQ,
  PENGIRIMAN_STATUS_LOG_GARDU_JQ,
} from "@app/configs/react-table/apkt.columns.config";
import { notificationTemplate } from "@app/helper/notificationTemplate";
import { addNotification } from "@app/store/notification/notification.action";
import moment from "moment";

import { useDispatch, useSelector } from "react-redux";
// export default function KinEstimatorStateDetail1({ isUpdateNyala = true,roleActions,filterParams,path, event = "padam" }: ITreeJaringan) {

export default function KinEstimatorStateDetail1({
  roleActions,
  filterParams,
  event = "padam",
  path,
  isUpdateNyala = true,
}: ITreeJaringan) {
  // //  const dataSelected = useRef<any>();
  const jenis_laporan = filterParams?.current?.jenis_laporan;
  const status_laporan = filterParams?.current?.status_laporan;
  // const [action, setAction] = useState<string>();
  const source = axios.CancelToken.source();
  const { currentUser } = useSelector((state: any) => state.auth);
  const [dataSelected, setDataSelected] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>();
  // const jenis_laporan = dataSelected?.current?.jenis_laporan;
  // const status_laporan = dataSelected?.current?.status_laporan;
  // const [dataRowsSelect, setDataRowsSelect] = useState<any>([])

  const [modal, setModal] = useState<any>({
    approved: false,
    size: "md",
    title: `Update Tanggal Nyala`,
  });

  const [modalPadam, setModalPadam] = useState<any>({
    approved: false,
    size: "md",
    title: `Kirim Padam ke APKT`,
  });

  const [modalNyala, setModalNyala] = useState<any>({
    approved: false,
    size: "md",
    title: `Kirim Nyala ke APKT`,
  });

  // const [modalConfirm, setModalConfirm] = useState<any>({
  //   show: false,
  //   approved: false,
  //   size: 'sm',
  //   icon: 'fa-regular fa-circle-question',
  //   description: `Kirim Padam Ke APKT`,
  //   subDescriotion: ``,
  //   textApproved: 'Kirim',
  //   classApproved: 'success',
  //   textDecline: 'Cancel',
  //   scrollable: false,
  // });

  // const [modalConfirmNyala, setModalConfirmNyala] = useState<any>({
  //   show: false,
  //   approved: false,
  //   size: 'sm',
  //   icon: 'fa-regular fa-circle-question',
  //   description: `Kirim Nyala Ke APKT`,
  //   subDescriotion: ``,
  //   textApproved: 'Kirim',
  //   classApproved: 'success',
  //   textDecline: 'Cancel',
  //   scrollable: false,
  // });

  const [modalNotif, setmodalNotif] = useState<any>({
    show: false,
    approved: false,
    size: "sm",
    icon: "fa-solid fa-triangle-exclamation",
    description: `Tidak bisa kirim ke APKT !`,
    subDescriotion: `Jenis laporan PEMELIHARAAN atau status laporan sudah close tidak bisa dikirim ke APKT !`,
    textButton: "Mengerti",
    scrollable: false,
  });
  const dispatch = useDispatch();
  const dispatchNotification = (msg: string = "", type: string = "") => {
    const notification = notificationTemplate(msg, type);
    dispatch(addNotification({ ...notification, message: msg, type: type }));
  };

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi1 = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        number: item?.number,
        nama_lokasi: item?.nama_lokasi,
        id: item?.id_ref_lokasi,
        id_ref_jenis_lokasi: item?.nama_jenis_lokasi,
        kode_lokasi: item?.kode_lokasi,
        no_tiang: item?.no_tiang,
        alamat: item?.alamat,
        jenis_laporan: jenis_laporan,
        status_laporan: status_laporan,
        status_listrik: item?.tgl_nyala,
        coverage: item?.coverage,
        gardu_mjd: item.gardu_mjd,
        tgl_padam: item?.tgl_padam,
        status_apkt_kirim_padam: item?.status_apkt_kirim_padam,
        status_apkt_kirim_nyala: item.status_apkt_kirim_nyala,
        id_apkt_trans_jar_det: item.id_apkt_trans_jar_det,
        id_apkt_trans_jar: item.id_apkt_trans_jar,
      });
    });
    //console.log(dataTableValue);
    return dataTableValue;
  };

  const handleRespDataApi2 = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      let status_apkt = "Belum Kirim";
      let color = "secondary";
      switch (item?.status_apkt_kirim) {
        case 1:
          status_apkt = "Sedang Kirim";
          color = "success";
          break;
        case 2:
          status_apkt = "Gagal Kirim";
          color = "danger";
          break;
      }
      dataTableValue.push({
        number: item?.number,

        segment: get(item, "segment.nama_lokasi"),
        section: get(item, "section.nama_lokasi"),
        zone: get(item, "zone.nama_lokasi"),
        up3_1: get(item, "up3_1.nama_lokasi"),
        no_apkt: item?.no_apkt || item?.ref_apkt_trans_jar?.no_apkt,
        tgl_laporan: item?.tgl_laporan,
        tgl_mulai: item?.tgl_mulai,
        tgl_selesai: item?.tgl_selesai,
        tgl_padam: item?.tgl_padam,
        tgl_kirim_apkt: item?.tgl_apkt_kirim,
        tgl_mulai_apkt_kirim_padam: item?.tgl_mulai_apkt_kirim_padam,
        tgl_apkt_kirim_padam: item?.tgl_apkt_kirim_padam,
        status_data: (
          <span
            className={`w-100 badge badge-${
              item?.status_data ? "success" : "danger"
            }`}
          >
            {item?.status_data ? "Nyala" : "Padam"}
          </span>
        ),
        webservice: item?.webservice,
        server_apkt: item?.server_apkt,
        input_apkt: item?.input_apkt,
        output_apkt: item?.output_apkt,
        status_kirim_apkt: (
          <span className={`w-100 badge badge-${color}`}>{status_apkt}</span>
        ),
        gardu: get(item, "gardu"),
        jenis_laporan: jenis_laporan,
        status_laporan: status_laporan,
      });
    });
    return dataTableValue;
  };

  const handleRespDataApi3 = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        number: item?.number,
        nama_lokasi: item?.nama_lokasi,
        id: item?.id_ref_lokasi,
        id_ref_jenis_lokasi: item?.nama_jenis_lokasi,
        kode_lokasi: item?.kode_lokasi,
        no_tiang: item?.no_tiang,
        alamat: item?.alamat,
        // jenis_laporan: jenis_laporan,
        jenis_laporan: jenis_laporan,
        status_laporan: status_laporan,
        status_listrik: item?.tgl_nyala,
        coverage: item?.coverage,
        gardu_mjd: item.gardu_mjd,
        tgl_padam: item?.tgl_padam,
        status_apkt_kirim_padam: item?.status_apkt_kirim_padam,
        status_apkt_kirim_nyala: item.status_apkt_kirim_nyala,
        id_apkt_trans_jar_det: item.id_apkt_trans_jar_det,
        id_apkt_trans_jar: item.id_apkt_trans_jar,
      });
    });
    return dataTableValue;
  };

  // const getAllData = async () => {
  //   setLoading(true);

  //   await new Promise((resolve) => setTimeout(resolve, 300));

  //   try {
  //     const params = {
  //       // page: "-1",
  //       // limit: "-1",
  //       // page: pagination.currentPage + 1,
  //       // limit: pagination.perPage,
  //       id_apkt_trans_jar: dataSelected?.id,
  //       // ...filters,
  //       sort_by: "+tgl_laporan",//date desc
  //       ...filterParams
  //     };

  //     delete params.order;

  //     const req: any = await getAllByPath(get(API_PATH(), path),
  //       params,
  //       source.token
  //     );

  //     const { results }: any = req;

  //     const dataLength = results ? results.length : 0;

  //     if (dataLength > 0) {
  //       const dataResults: any = results;
  //       let data = remappedTreeJaringanData(dataResults);
  //       // console.log("data", data);

  //       setData(data ? data : []);
  //     } else {
  //       setData([]);
  //       setPagination((prevState) => ({
  //         ...prevState,
  //         pageCount: 1,
  //         totalData: 0,
  //       }));
  //     }

  //     setLoading(false);
  //   } catch (err: any) {
  //     setLoading(false);
  //   }
  // };

  const handleRowSelected = (item: any) => {
    setDataSelected(item.current);
    // onRowSelected(data)
    // selectionmode.current = data;
  };

  // const kirimPadamAPKT = async () => {
  //   let message;

  //   try {

  //     let params: any = {
  //       id_user_entri: currentUser.id_user,
  //       event: event
  //     };
  //     let ids: any = []
  //     dataSelected?.map((item: any) => {

  //       params.id_apkt_trans_jar = item?.id_apkt_trans_jar
  //       item?.children?.map((items: any) => {
  //         ids.push(items?.id_apkt_trans_jar_det)

  //       })
  //       ids.push(item?.id_apkt_trans_jar_det)
  //     })
  //     params.ids = ids;
  //     await postByPath(get(API_PATH(), "apkt.trans_jar_detail"),
  //       params,
  //       source.token
  //     );
  //     dispatchNotification(`Sukses ${message ? message : ''}`, 'success');

  //   } catch (err: any) {

  //     dispatchNotification(`Gagal ${message ? message : ''}`, 'danger');
  //   }
  // };

  const kirimPadamAPKT = async () => {
    let message;

    try {
      // // Pastikan dataSelected adalah array
      // if (!Array.isArray(dataSelected)) {
      //   console.error('dataSelected is not an array:', dataSelected);
      //   return;
      // }

      const params = dataSelected.map((item: any) => ({
        id_apkt_trans_jar_det: item?.id_apkt_trans_jar_det,
        id_apkt_trans_jar: item?.id_apkt_trans_jar,
        // id_user_update: currentUser.id_user,
        id_user_update_padam: currentUser.id_user,
        status_apkt_kirim_padam: 1,
        tgl_apkt_kirim_padam: moment().format("YYYY-MM-DD HH:mm:ss"),
        tgl_user_update_padam: moment().format("YYYY-MM-DD HH:mm:ss"),
        tgl_padam: moment().format("YYYY-MM-DD HH:mm:ss"),
        mode_kirim_apkt: "MANUAL",
      }));

      // const datas = { datas: params };
      const datas = params;
      console.log({ datas: datas });
      await putAsetExtAtrBatch(
        get(API_PATH(), "apkt.trans_jar_detail_batch"),
        datas,
        // params.id_apkt_trans_jar_det,
        source.token
      );
      dispatchNotification(`Sukses ${message ? message : ""}`, "success");
      // getAllData();
    } catch (err: any) {
      setLoading(false);
      dispatchNotification(`Gagal ${message ? message : ""}`, "danger");
    }
  };

  // const kirimNyalaAPKT = async () => {
  //   let message;

  //   try {

  //     const params = dataSelected.map((item: any) => ({
  //       id_apkt_trans_jar_det: item?.id_apkt_trans_jar_det,
  //       id_apkt_trans_jar: item?.id_apkt_trans_jar,
  //       // id_user_update: currentUser.id_user,
  //       id_user_update_nyala: currentUser.id_user,
  //       status_apkt_kirim_nyala: 1,
  //       tgl_apkt_kirim_nyala: moment().format('YYYY-MM-DD HH:mm:ss'),
  //       tgl_user_update_nyala: moment().format('YYYY-MM-DD HH:mm:ss'),
  //       tgl_nyala: moment().format('YYYY-MM-DD HH:mm:ss'),
  //       mode_kirim_apkt: 'MANUAL',
  //     }));

  //     // const datas = { datas: params };
  //     const datas = params;
  //     console.log({ datas: datas });
  //     await putAsetExtAtrBatch(get(API_PATH(), "apkt.trans_jar_detail_batch"),
  //       params,
  //       // params?.id_apkt_trans_jar_det,
  //       source.token,
  //     );
  //     dispatchNotification(`Sukses ${message ? message : ''}`, 'success');
  //     // getAllData();
  //   } catch (err: any) {
  //     setLoading(false);
  //     dispatchNotification(`Gagal ${message ? message : ''}`, 'danger');
  //   }
  // };

  const onShowModal = () => {
    setModal((prev: any) => ({ ...prev, show: true }));
    // setAction('update-tanggal-nyala');
  };
  const onShowModalPadam = () => {
    setModalPadam((prev: any) => ({ ...prev, show: true }));
    // setAction('update-tanggal-nyala');
  };

  const onShowModalNyala = () => {
    setModalNyala((prev: any) => ({ ...prev, show: true }));
    // setAction('update-tanggal-nyala');
  };
  // const onShowModalConfirm = () => {
  //   let desc = event == "nyala" ? `Kirim Nyala Ke APKT` : "Kirim Padam Ke APKT"
  //   // console.log("event", event);
  //   // console.log("desc", desc);
  //   desc;

  //   setModalConfirm((prev: any) => ({
  //     ...prev, show: true
  //   }))
  // }
  // const onShowModalConfirmNyala = () => {
  //   setModalConfirmNyala((prev: any) => ({
  //     ...prev, show: true
  //   }))
  // }

  const onShowModalNotif = () => {
    setmodalNotif((prev: any) => ({
      ...prev,
      show: true,
    }));
  };
  const callbackModalConfirm = (approved = false) =>
    approved && kirimPadamAPKT();
  // const callbackModalConfirmNyala = (approved = false) => approved && kirimNyalaAPKT();
  // console.log("roleActions", roleActions);

  //   let roleAccess = ROLE_ACCESS("monitoring-apkt");
  //   roleActions = {
  //      view: ROLE_ACTION(roleAccess, 'view'),
  //  update: ROLE_ACTION(roleAccess, 'update'),
  //  update_apkt: ROLE_ACTION(roleAccess, 'update-apkt'),
  //  update_status: ROLE_ACTION(roleAccess, 'update-status'),
  //  update_kirim_padam: ROLE_ACTION(roleAccess, 'update-kirim-padam'),
  //  update_kirim_nyala: ROLE_ACTION(roleAccess, 'update-kirim-nyala'),
  //  update_tanggal_nyala: ROLE_ACTION(roleAccess, 'update-tanggal-nyala'),
  //  update_tanggal_nyalaa: ROLE_ACTION(roleAccess, 'update-tanggal-nyalaa'),
  //  };

  useEffect(() => {
    // Logika di sini tidak menggunakan rowSelected
    console.log("Effect running");

    // Jika kamu ingin melakukan sesuatu yang tidak bergantung pada rowSelected
    // Tambahkan logika di sini
  }, [loading]); // Meskipun rowSelected ada di sini, logika di dalam useEffect tidak terpengaruh oleh perubahan rowSelected.

  return (
    <>
      {filterParams?.id_apkt_trans_jar && (
        <JqxTabs
          width={"100%"}
          position={"top"}
          animationType={"none"}
          selectionTracker={true}
          theme={"light"}
          // isLoading={loading}
        >
          <ul style={{ marginLeft: 10 }} key="1">
            <li>
              <i className="fa-solid fa-server"></i> Daftar Kirim Gardu Padam ke
              APKT
            </li>
            <li>
              <i className="fa-solid fa-business-time"></i> Daftar Kirim Gardu
              Nyala ke APKT
            </li>
            <li>
              <i className="fa-solid fa-business-time"></i> Log Kirim ke APKT
            </li>
          </ul>
          <div key="2">
            <div className="d-flex">
              {isUpdateNyala && roleActions?.update_tanggal_nyala && (
                <Button
                  disabled={dataSelected.length == 0}
                  className="me-2"
                  onClick={onShowModal}
                >
                  Update Tanggal Nyala
                </Button>
              )}
              {/* {event == "nyala" && roleActions?.update_kirim_nyala &&
                <Button disabled={dataSelected.length == 0} onClick={jenis_laporan == 'GANGGUAN' && status_laporan == 'open' ? onShowModalConfirmNyala : onShowModalNotif} >Kirim Nyala ke APKT</Button>
              } */}
              {event == "padam" && roleActions?.update_kirim_padam && (
                // <Button disabled={dataSelected.length == 0} onClick={jenis_laporan == 'GANGGUAN' || jenis_laporan == 'PEMELIHARAAN' && status_laporan == 'open' ? onShowModalConfirm : onShowModalNotif} >Kirim ke APKT</Button>
                // <Button disabled={dataSelected.length == 0} onClick={onShowModalConfirm} >Kirim ke APKT</Button>
                // <Button disabled={dataSelected.length == 0} onClick={jenis_laporan == 'GANGGUAN' && status_laporan == 'open' ? onShowModalConfirm : onShowModalNotif} >Kirim Padam ke APKT</Button>
                <Button
                  disabled={dataSelected.length == 0}
                  className="me-2"
                  onClick={
                    jenis_laporan == "GANGGUAN" && status_laporan == "open"
                      ? onShowModalPadam
                      : onShowModalNotif
                  }
                >
                  Kirim Padam ke APKT
                </Button>
              )}
            </div>
            <TableDataJqxGridNew
              showtoolbar={true}
              path={API_PATH().apkt.trans_jar_detail}
              filterParams={filterParams}
              dataFieldsColsConfig={MONITORING_APKT_DETAIL_PADAM_JQ()}
              primaryKey={"id_apkt_trans_jar_det"}
              respDataApi={handleRespDataApi1}
              filterable={true}
              selectionmode={"checkbox"}
              onRowSelected={handleRowSelected}
              exportbtn={false}
            />
          </div>
          <div key="3">
            <div className="d-flex">
              {/* {event == "nyala" && roleActions?.update_kirim_nyala &&
                // <Button disabled={dataSelected.length == 0} onClick={jenis_laporan == 'GANGGUAN' || jenis_laporan == 'PEMELIHARAAN' && status_laporan == 'open' ? onShowModalConfirmNyala : onShowModalNotif} >Kirim Nyala ke APKT</Button>
                <Button disabled={dataSelected.length == 0} className='me-2' onClick={jenis_laporan == 'GANGGUAN' && status_laporan == 'open' ? onShowModalNyala : onShowModalNotif} >Kirim Nyala ke APKT</Button>
              } */}
              {isUpdateNyala && roleActions?.update_kirim_nyala && (
                // <Button disabled={dataSelected.length == 0} onClick={jenis_laporan == 'GANGGUAN' || jenis_laporan == 'PEMELIHARAAN' && status_laporan == 'open' ? onShowModalConfirmNyala : onShowModalNotif} >Kirim Nyala ke APKT</Button>
                <Button
                  disabled={dataSelected.length == 0}
                  className="me-2"
                  onClick={
                    jenis_laporan == "GANGGUAN" && status_laporan == "open"
                      ? onShowModalNyala
                      : onShowModalNotif
                  }
                >
                  Kirim Nyala ke APKT
                </Button>
              )}
              {/* {event == "padam" && roleActions?.update_kirim_nyala &&
                <Button disabled={dataSelected.length == 0} onClick={jenis_laporan == 'GANGGUAN' || jenis_laporan == 'PEMELIHARAAN' && status_laporan == 'open' ? onShowModalConfirmNyala : onShowModalNotif} >Kirim Nyala ke APKT</Button>
              } */}
            </div>
            <TableDataJqxGridNew
              showtoolbar={true}
              path={API_PATH().apkt.trans_jar_detail}
              filterParams={filterParams}
              dataFieldsColsConfig={MONITORING_APKT_DETAIL_NYALA_JQ()}
              primaryKey={"id_apkt_trans_jar_det"}
              respDataApi={handleRespDataApi3}
              filterable={true}
              selectionmode={"checkbox"}
              onRowSelected={handleRowSelected}
              exportbtn={false}
            />
          </div>
          <div key="4">
            <div className="d-flex"></div>
            <TableDataJqxGridNew
              showtoolbar={true}
              path={API_PATH().apkt.trans_log}
              filterParams={filterParams}
              dataFieldsColsConfig={PENGIRIMAN_STATUS_LOG_GARDU_JQ()}
              primaryKey={"id"}
              respDataApi={handleRespDataApi2}
              filterable={true}
              selectionmode={"checkbox"}
              onRowSelected={handleRowSelected}
              exportbtn={false}
            />
          </div>
        </JqxTabs>
      )}
      {/* <ModalConfirm
        modalConfirmProps={modalConfirmNyala}
        callbackModalConfirm={callbackModalConfirmNyala}
      /> */}
      {/* <ModalConfirm
        modalConfirmProps={modalConfirm}
        callbackModalConfirm={callbackModalConfirm}
      /> */}
      {roleActions?.update_kirim_nyala && (
        <ModalForm modalProps={modalNyala}>
          <FormTglNyala dataSelected={dataSelected} path={path} />
        </ModalForm>
      )}
      {roleActions?.update_kirim_padam && (
        <ModalForm modalProps={modalPadam}>
          <FormTglPadam dataSelected={dataSelected} path={path} />
        </ModalForm>
      )}
      {/* {action === 'update-tanggal-nyala' && roleActions?.update_tanggal_nyala && ( */}
      {roleActions?.update_tanggal_nyala && (
        <ModalForm modalProps={modal}>
          <UploadPadam dataSelected={dataSelected} path={path} />
        </ModalForm>
      )}

      <ModalNotif
        ModalNotifProps={modalNotif}
        callbackModalNotif={callbackModalConfirm}
      />
    </>
  );
}

export interface ITreeJaringan {
  move?: boolean;
  rowSelect?: boolean;
  isUpdateNyala?: boolean;
  rowSelectType?: string;
  onRowSelected?: any;
  dataSelected?: any;
  filterParams?: any;
  path?: any;
  event?: any;
  configColumns?: any;
  trigger?: any;
  roleActions?: any;
}
