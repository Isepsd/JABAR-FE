import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Card, Tabs, Tab } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import TableDataJqxGridNewButton from '@app/modules/Table/TableDataJqxGridNewButton';
import PengirimanGarduRekap from "@app/modules/APKT/PengirimanGarduRekapPemeliharaan";
import { head } from 'lodash'

/** CONFIG */
import { GANGGUAN_DAN_PEMELIHARAAN_JQ } from "@app/configs/react-table/apkt.columns.config";
import { MONITORING_APKT, MONITORING_APKT_DETAIL_PADAM, MONITORING_APKT_DETAIL_NYALA, PENGIRIMAN_STATUS_LOG_GARDU } from '@app/configs/react-table/apkt.columns.config'

/** SERVICE */
import { API_PATH } from "@app/services/_path.service";
import { timeFormat } from "@app/helper/time.helper";
import { useSelector } from "react-redux";
import Filter from "./Filter_JQ";
import moment from 'moment';
import { ROLE_ACCESS, ROLE_ACTION } from "@app/helper/auth.helper";
import ModalFormWO from "@app/components/Modals/ModalFormWO";
import FormUpdateNOAPKT from "./FormUpdateNOAPKTJQ";
import FormUpdateJenisLaporan from "./FormUpdateJenisLaporanJQ";
import FormUpdateStatus from "./FormUpdateStatus";
// import KinEstimatorStateDetail1 from "./monitoringApktDetailJQ";
import qs from "query-string";
import TableApktJarDetail from '@app/modules/APKT/TableApktJarDetail';
import TableMonitoringTree from '@app/modules/APKT/TableMonitoringTree';

const tabOptions = [
  { label: 'Daftar  Monitoring APKT', value: '1', pathService: API_PATH().apkt.trans_jar, column: MONITORING_APKT(), primaryKey: 'id_apkt_trans_jar' },
]
const tabOptions2 = [
  // { label: 'Daftar Kirim Gardu Padam ke APKT', value: '1', pathService: API_PATH().apkt.trans_jar_detail, column: MONITORING_APKT_DETAIL_PADAM(), primaryKey: 'id_apkt_trans_jar_det', filter: { status_data: 0 }, type: 'kirim-gardu-padam', path: "apkt.trans_jar_detail_padam" },
  // { label: 'Daftar Kirim Gardu Nyala ke APKT', value: '2', pathService: API_PATH().apkt.trans_jar_detail, column: MONITORING_APKT_DETAIL_NYALA(), primaryKey: 'id_apkt_trans_jar_det', filter: { status_data: 1 }, type: 'kirim-gardu-nyala', path: "apkt.trans_jar_detail_nyala" },
  { label: 'Daftar Kirim Gardu Padam ke APKT', value: '1', pathService: API_PATH().apkt.trans_jar_detail, column: MONITORING_APKT_DETAIL_PADAM(), primaryKey: 'id_apkt_trans_jar_det', filter: { status_data: 0 }, type: 'kirim-gardu-padam', path: "apkt.trans_jar_detail" },
  { label: 'Daftar Kirim Gardu Nyala ke APKT', value: '2', pathService: API_PATH().apkt.trans_jar_detail, column: MONITORING_APKT_DETAIL_NYALA(), primaryKey: 'id_apkt_trans_jar_det', filter: { status_data: 1 }, type: 'kirim-gardu-nyala', path: "apkt.trans_jar_detail" },
  { label: 'Log Kirim ke APKT', value: '3', pathService: API_PATH().apkt.trans_log, column: PENGIRIMAN_STATUS_LOG_GARDU(), primaryKey: 'id_apkt_trans_log' },
]

interface IExportConfig {
  path?: string;
  onCloseModal?: any;
  optionCurrentUser?: any;
  filterParams?: any;
}

export default function MonitoringApktPage({
  // path,
  optionCurrentUser,
  filterParams,
}: IExportConfig) {
  const [roleActions, setRoleActions] = useState<any>({});
  const { currentUser } = useSelector((state: any) => state.auth);
  const queryParams = qs.parse(location.search);
  
  const [tabActiveConfDetail, setTabActiveConfDetail] = useState<any>(tabOptions[0])
  const [tabActiveDetail, setTabActiveDetail] = useState<string>('1')
  const [tabActiveConf] = useState<any>(tabOptions[0])
  const handleSelectedRowsDetail = (v: any) => {
    // console.log(v);
    v;
  };
  useEffect(() => {
    const activeDetail: any = head(tabOptions2.filter((x: any) => x.value == tabActiveDetail))
    setTabActiveConfDetail(activeDetail)
  }, [tabActiveDetail])
  /** DATA RESP */
  const [trigger, setTrigger] = useState<any>();
  const dataSelected1 = useRef<any>();
  const [details, setDetails] = useState<any>();
  const [modal, setModal] = useState<any>({
    approved: false,
    size: 'md',
    title: `Update No APKT`,
  });

  /** MODAL JENIS LAPORAN*/
  const [modalJenisLaporan, setModalJenisLaporan] = useState<any>({
    approved: false,
    size: "md",
    title: `Update Jenis Laporan`,
  });

  /** MODAL Status*/
  const [modalStatus, setModalStatus] = useState<any>({
    approved: false,
    size: "md",
    title: `Update Status`,
  });

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        ...item,
        no_apkt: item?.no_apkt || item?.ref_apkt_trans_jar?.no_apkt,
        id_apkt_trans_jar: item?.id_apkt_trans_jar,
        tgl_laporan: timeFormat(item?.tgl_laporan),
        tgl_padam: timeFormat(item?.tgl_padam),
        tgl_mulai_apkt_kirim_padam: timeFormat(
          item?.tgl_mulai_apkt_kirim_padam
        ),
        tgl_selesai_apkt_kirim_padam: timeFormat(
          item?.tgl_selesai_apkt_kirim_padam
        ),
        tgl_mulai_apkt_kirim_nyala: timeFormat(
          item?.tgl_mulai_apkt_kirim_nyala
        ),
        tgl_selesai_apkt_kirim_nyala: timeFormat(
          item?.tgl_selesai_apkt_kirim_nyala
        ),
        tgl_nyala_awal: item?.tgl_nyala_awal,
        jenis_laporan: item?.jenis_laporan,
        status_data: (
          <span
            className={`w-100 badge badge-${item?.jlh_gardu_padam === 0 ? "success" : "danger"
              }`}
          >
            {item?.jlh_gardu_padam === 0 ? "Nyala" : "Padam"}
          </span>
        ),
        action: `<button class="action-btn" onclick="handleAction('${item?.id_apkt_trans_jar}')">Action</button>`,
      });
      // console.log('disini: ', dataTableValue)
    });

    return dataTableValue;
  };

  const [filterValues, setFilterValues] = useState<any>({
    day_after: moment().subtract(1, "day").format("YYYY-MM-DD"),
    day_before: moment().format("YYYY-MM-DD"),
    nama_laporan: null,
    status_laporan: null,
    status_2: null,
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

  const handleFilterChange = (newFilterValues: any) => {
    setFilterValues(newFilterValues);
  };

  const [detailClosed,setdetailClosed] = useState<any>();

  const handleRowSelected = (data: any) => {
    dataSelected1.current = data.current;
    setDetails(dataSelected1?.current?.id_apkt_trans_jar);
    setTrigger(dataSelected1?.current?.id_apkt_trans_jar);
    setdetailClosed(dataSelected1?.current.status_laporan);
  };

  useEffect(() => {
    const tabs = document.getElementById("tabs");
    if (tabs) {
      (window as any).jqwidgets.createInstance(tabs, "jqxTabs", {
        theme: "light",
        reorder: true,
      });
    }

    let roleAccess = ROLE_ACCESS("gangguan-dan-pemeliharaan");
    const roleAct = {
      view: ROLE_ACTION(roleAccess, "view"),
      create: ROLE_ACTION(roleAccess, 'create'),
      update: ROLE_ACTION(roleAccess, "update"),
      update_apkt: ROLE_ACTION(roleAccess, "update-apkt"),
      update_status: ROLE_ACTION(roleAccess, "update-status"),
      update_kirim_padam: ROLE_ACTION(roleAccess, "update-kirim-padam"),
      update_kirim_nyala: ROLE_ACTION(roleAccess, "update-kirim-nyala"),
      update_tanggal_nyala: ROLE_ACTION(roleAccess, "update-tanggal-nyala"),
    };
    setRoleActions(roleAct);
    // console.log('roleAct', roleAct);
  }, []);

  
  const navigate = useNavigate();
  const handleUpdateStatus = (item: any) => {
    //new
    if (item.current?.status_laporan === 'close') {
    alert('Data sudah close.');
    return; // Stop further execution if already posted
  }
    else{
    dataSelected1.current = item.current;
    setModalStatus((prevState: any) => ({
      ...prevState,
      show: true,
    }));

    // Add `id` parameter to URL
    const params = new URLSearchParams(location.search);
    params.set('id', item.current?.id_apkt_trans_jar || '');
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  
    }
  };

  const handleUpdateNoApkt = (item: any) => {
    // Show the modal for updating no_apkt without permission check
    dataSelected1.current = item.current;
    setModal((prevState: any) => ({
      ...prevState,
      show: true,
    }));

    // Add `id` parameter to URL
    const params = new URLSearchParams(location.search);
    params.set('id', item.current?.id_apkt_trans_jar || '');
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  const handleUpdateJenisLaporan = (item: any) => {
    // Show the modal for updating jenis laporan without permission check
    dataSelected1.current = item.current;
    setModalJenisLaporan((prevState: any) => ({
      ...prevState,
      show: true,
    }));

    // Add `id` parameter to URL
    const params = new URLSearchParams(location.search);
    params.set('id', item.current?.id_apkt_trans_jar || '');
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  const handleClose = () => {
    // Close all modals
    setModal((prevState: any) => ({
      ...prevState,
      show: false,
    }));
    setModalJenisLaporan((prevState: any) => ({
      ...prevState,
      show: false,
    }));
    setModalStatus((prevState: any) => ({
      ...prevState,
      show: false,
    }));

    // Remove the `id` parameter from the URL search parameters
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete('id');
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.replaceState({}, '', newUrl);
  };

  return (
    <>
      <Row className="mt-4">
        <Col md={12} className="mb-4">
          <Card className="card-widget">
            <Card.Header className="text-uppercase">REKAP</Card.Header>
            <Card.Body>
              <PengirimanGarduRekap trigger={trigger} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div className="px-2 mt-2">
        <Filter
          onFilterChange={handleFilterChange}
          optionCurrentUser={currentUser}
        />
      </div>
      {/* <TableDataJqxGridNew */}
      {roleActions.create && roleActions.update && roleActions.update_apkt && roleActions.update_status &&
      <TableDataJqxGridNewButton
        //AKSI
        addlaporan={roleActions.create}
        btnJenisLap={roleActions.update}
        btnNoApkt={roleActions.update_apkt}
        btnStatus={roleActions.update_status}
        onClickStatus={handleUpdateStatus}
        onClickNoApkt={handleUpdateNoApkt}
        onClickUpdate={handleUpdateJenisLaporan}

        //yang jqxgrid lama
        // updatebtnJenisLap={roleActions.update}
        // updatebtnNoApkt={roleActions.update_apkt}
        // updatebtnStatus={roleActions.update_status}
        // onClickUpdateJenisLap={handleUpdateJenisLaporan}
        // onClickUpdateNoApkt={handleUpdateNoApkt}
        // onClickUpdateStatus={handleUpdateStatus}
        //TABLE DATA
        path={API_PATH().apkt.trans_jar}
        filterParams={{
          sort_by: "day_after,day_before",

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
            optionCurrentUser?.level == "UP2D" ||
              optionCurrentUser?.level == "UP3"
              ? optionCurrentUser?.id_unit_lokasi
              : queryParams?.__pengelola,
          id_sub_pengelola:
            optionCurrentUser?.level == "ULP"
              ? optionCurrentUser?.id_unit_lokasi
              : queryParams?.__subpengelola,

          ...filterValues,
        }}
        dataFieldsColsConfig={GANGGUAN_DAN_PEMELIHARAAN_JQ()}
        primaryKey={"id_apkt_trans_jar"}
        respDataApi={handleRespDataApi}
        filterable={true}

        onRowSelected={handleRowSelected}
        exportbtn={true}
      />
    }
      <hr className="my-4" />

      {/* <Row>
        <Col md={12} className="mb-4">
          <Card className="card-widget">
            <Card.Header> Detail Monitoring</Card.Header>
            <KinEstimatorStateDetail1
              // event="padam"
              path={path}
              isUpdateNyala={true}
              roleActions={roleActions}
              filterParams={{
                id_apkt_trans_jar: details ? details : null,
                current: { jenis_laporan: dataSelected1?.current?.jenis_laporan, status_laporan: dataSelected1?.current?.status_laporan },
                }}
            />
          </Card>
        </Col>
      </Row> */}
      {dataSelected1 && Object.keys(dataSelected1).length > 0 &&
        <>
          <Tabs defaultActiveKey="1" activeKey={tabActiveDetail} onSelect={(k: any) => setTabActiveDetail(k)} className="mt-6 mb-3 tab-sm">
            {
              tabOptions2.map((tab: any) => (
                <Tab key={tab.value} eventKey={tab.value} title={tab.label} />
              ))
            }
          </Tabs>
          {
            tabActiveConfDetail?.value == '3' && (
              <TableApktJarDetail pathService={tabActiveConfDetail.pathService} columnsConfig={PENGIRIMAN_STATUS_LOG_GARDU()} primaryKey={tabActiveConf.primaryKey} type={tabActiveConfDetail?.type}
                // filterParams={{
                //   id_apkt_trans_jar: rowSelected?.id ? rowSelected?.id : null,
                //   ...tabActiveConfDetail?.filter
                // }}
                dataParent={dataSelected1}
                parentTrigger={trigger}
              />
            )
          }

          {tabActiveConfDetail?.value == '1' &&
            <TableMonitoringTree
              roleActions={roleActions}
              rowSelect
              dataSelected={dataSelected1} onCheckedRows={handleSelectedRowsDetail}
              filterParams={{ status: 1,
                id_apkt_trans_jar: details ? details : null,
                page:1,limit:10
                // current: { jenis_laporan: dataSelected1?.current?.jenis_laporan, status_laporan: dataSelected1?.current?.status_laporan },
               }}
              path={tabActiveConfDetail?.path}
              event="padam"
              configColumns={MONITORING_APKT_DETAIL_PADAM()}
              trigger={trigger}
            />
          }
          {tabActiveConfDetail?.value == '2' &&
            <TableMonitoringTree rowSelect
              roleActions={roleActions}
              dataSelected={dataSelected1}
              filterParams={{ status: 0,
                id_apkt_trans_jar: details ? details : null,
                page:1,limit:10
                // current: { jenis_laporan: dataSelected1?.current?.jenis_laporan, status_laporan: dataSelected1?.current?.status_laporan },
               }}
              isUpdateNyala={false}
              onCheckedRows={handleSelectedRowsDetail}
              path={tabActiveConfDetail?.path}
              event="nyala"
              configColumns={MONITORING_APKT_DETAIL_NYALA()}
              trigger={trigger}
            />
          }
        </>

      }
        <ModalFormWO modalProps={{...modal, setShow: handleClose}}>
          <FormUpdateNOAPKT
            id_apkt_trans_jar={filterParams?.id_apkt_trans_jar}
          setModal={setModal}
          handleClose={handleClose}
          />
        </ModalFormWO>
        <ModalFormWO modalProps={{...modalJenisLaporan, setShow: handleClose}}>
          <FormUpdateJenisLaporan
            id_apkt_trans_jar={filterParams?.id_apkt_trans_jar}
            setModal={setModalJenisLaporan}
            handleClose={handleClose}
          />
        </ModalFormWO>
        <ModalFormWO modalProps={{...modalStatus, setShow: handleClose}}>
            <FormUpdateStatus
              id_apkt_trans_jar={filterParams?.id_apkt_trans_jar}
              setModal={setModalStatus}
              isAlreadyClosed={detailClosed}
              handleClose={handleClose}
            />
        </ModalFormWO>
    </>
  );
}
