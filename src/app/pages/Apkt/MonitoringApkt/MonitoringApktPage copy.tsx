import React, { useState, useEffect, useRef, } from 'react'
import { useDispatch } from 'react-redux';
import { Tabs, Tab, Row, Col, Card, } from 'react-bootstrap'
// import { head } from 'lodash'
import ModalConfirm from '@app/components/Modals/ModalConfirm';
/** COMPONENT */
// import TableDataListAction from '@app/modules/Table/TableDataListAction';
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';
// import TableApktJarDetail from '@app/modules/APKT/TableApktJarDetail';
import PengirimanGarduRekap from '@app/modules/APKT/PengirimanGarduRekap';

/** CONFIG */
import { MONITORING_APKT_JQ } from '@app/configs/react-table/apkt.columns.config'
import { notificationTemplate } from '@app/helper/notificationTemplate';
import { addNotification } from '@app/store/notification/notification.action';
/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
// import { useSearchParams } from 'react-router-dom';
import { timeFormat } from '@app/helper/time.helper';
// import TableMonitoringTree from '@app/modules/APKT/TableMonitoringTree';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Filter from './Filter';
import TableIntegrasiMon from '@app/modules/APKT/TableIntegrasiMon';
// import moment from 'moment';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
// import ModalData from '@app/components/Modals/ModalData';
// import FormUpdateNOAPKT from './GangguanDanPemeliharaan/FormUpdateNOAPKTJQ';
// import FormUpdateJenisLaporan from './FormUpdateJenisLaporan';
import moment from 'moment';
import KinEstimatorStateDetail1 from './monitoringApktDetailJQ';
import qs from "query-string";
import {
  putByPath,
} from '@app/services/main.service';

interface IExportConfig {
  path?: string;
  onCloseModal?: any;
  optionCurrentUser?: any;
  filterParams?: any;

}

const tabOptions = [
  { label: 'Daftar  Monitoring APKT', value: '1', pathService: API_PATH().apkt.trans_jar, column: MONITORING_APKT_JQ(), primaryKey: 'id_apkt_trans_jar' },
]


export default function MonitoringApktPage({ path, onCloseModal, optionCurrentUser }: IExportConfig) {
  const [roleActions, setRoleActions] = useState<any>({});
  const queryParams = qs.parse(location.search);
  // const [filterParams, setFilterParams] = useState({}); // Add this line
  const source = axios.CancelToken.source();
  const { closeModal } = useSelector((state: any) => state.ui);
  const [action, setAction] = useState<string>();
  // let [searchParams, setSearchParams] = useSearchParams();
  // const apktTransJar = searchParams.get("id_apkt_trans_jar")
  // const [roleActions, setRoleActions] = useState<any>({});
  const [tabActive, setTabActive] = useState<string>('1')
  const [rowSelected, setRowSelected] = useState<any>();
  // const [tabActiveConf] = useState<any>(tabOptions[0])


  const dispatch = useDispatch();
  /** DATA RESP */
  const [trigger, setTrigger] = useState<any>();
  // const [dataSelected, setDataSelected] = useState<any>();
  // const [loading, setLoading] = useState<boolean>();
  // const [dataRows, setDataRows] = useState<any>([]);
  // const [columns, setColumns] = useState<any>(MONITORING_APKT_JQ());
  // const [dataColumns] = useState<any>([]);
  const dataSelected = useRef<any>();
  const [details, setDetails] = useState<any>();
  // const source = axios.CancelToken.source();
  // const [isUpdateNyala, setIsUpdateNyala] = useState(true);
  /** NOTIFICATION HANDLER */
  const dispatchNotification = (msg: string = '', type: string = '') => {
    const notification = notificationTemplate(msg, type);
    dispatch(addNotification({ ...notification, message: msg, type: type }));
  };
  /** ROW */
  // const [rowSelected] = useState<any>();
  /** MODAL */
  // const [modalNoAPKT, setModalNoapkt] = useState<any>({
  //   approved: false,
  //   size: 'md',
  //   title: `Update No APKT`,
  // });

  /** MODAL JENIS LAPORAN*/
  //  const [modalJenisLaporan, setModalJenisLaporan] = useState<any>({
  //   approved: false,
  //   size: 'md',
  //   title: `Update Jenis Laporan`,
  // });

  const [modalConfirm] = useState<any>({
    icon: 'fa-regular fa-circle-question',
    description: `Apakah laporan akan di close ?`,
    subDescriotion: `Data tidak dapat dikembalikan`,
    textApproved: 'Ok',
    classApproved: 'primary',
    textDecline: 'Cancel',
    action: 'update-status-gardu',
    show: true,
  });



  const UpdateStatusGardu = async (current: any) => {

    let params: any = {
      id_user_update: current?.id_user,

      status_laporan: 'close',
    };
    try {
      await putByPath(
        // `${path}`,
        'opsisdis/apkt/apkt-trans-jar',
        params,
        dataSelected.current.id_apkt_trans_jar,
        source.token,

      );

      let message = '';
      dispatchNotification(`Sukses ${message ? message : ''}`, 'success');

    } catch (err: any) {
      let message = '';

      dispatchNotification(`Gagal  ${message ? message : ''}`, 'danger');
    }
  };

  const callbackModalConfirm = (approved = null) => {
    if (approved) {
      setAction(undefined); // solusinya nambahin ini

      switch (modalConfirm?.action) {
        case 'update-status-gardu':
          UpdateStatusGardu(dataSelected.current); // Pass the current parameter here
          break;

      }
    } else if (approved == false) {
      setAction(undefined); // solusinya nambahin ini
      // console.log('modalConfirm?.action', modalConfirm?.action);


    }

    if (onCloseModal) {
      onCloseModal(undefined);
    }
  };

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        ...item,
        no_apkt: item?.no_apkt || item?.ref_apkt_trans_jar?.no_apkt,
        tgl_laporan: timeFormat(item?.tgl_laporan),
        tgl_padam: timeFormat(item?.tgl_padam),
        tgl_mulai_apkt_kirim_padam: timeFormat(item?.tgl_mulai_apkt_kirim_padam),
        tgl_apkt_kirim_padam: timeFormat(item?.tgl_apkt_kirim_padam),
        tgl_mulai: timeFormat(item?.tgl_mulai),
        tgl_selesai: timeFormat(item?.tgl_selesai),
        tgl_status_data: item?.tgl_status_data,
        status_data: (<span className={`w-100 badge badge-${item?.jlh_gardu_padam === 0 ? 'success' : 'danger'}`}>{item?.jlh_gardu_padam === 0 ? 'Nyala' : 'Padam'}</span>),

      });
    });

    return dataTableValue;
  }


  const [filterValues, setFilterValues] = useState<any>({
    day_after: moment().subtract(1, 'day').format('YYYY-MM-DD'),
    day_before: moment().format('YYYY-MM-DD'),
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


  // useEffect(() => {
  //   if (apktTransJar) {
  //     setRowSelected({ id: apktTransJar ? apktTransJar : '0' })
  //   }
  // }, [apktTransJar])

  /** HANDLE SELECTED ROWS */
  // const handleSelectedRows = (v: any) => {
  //   const selected = get(v, '0');
  //   // if (selected?.id) {
  //   //   searchParams.delete('id_apkt_trans_jar');
  //   //   searchParams.append('id_apkt_trans_jar', selected?.id);
  //   //   setSearchParams(searchParams);
  //   // }
  //   setRowSelected(() => {
  //     return { ...selected }
  //   });
  // };

  // const handleSelectedRowsDetail = (v: any) => {
  //   // console.log(v);
  //   v;
  // };



  /** GET DATA PAGINATION */

  // const getAllDataGarduInduk = async () => {
  //   await new Promise((resolve) => setTimeout(resolve, 300));

  //   try {
  //     const params = {
  //       page: '-1',
  //       limit: '-1',
  //       id_ref_jenis_lokasi: 4,
  //     };

  //     const req: any = await getAllByPath(pathLokasi, params, source.token);
  //     const { results } = req;

  //     let data: any = results.map((d: any) => {
  //       return { ...d, label: d.nama_lokasi, value: d.id_ref_lokasi };
  //     });

  //     setGarduInduk(data)
  //     setLoading(false);
  //   } catch (err: any) {
  //     setLoading(false);
  //   }
  // };

  /** COLUMN SHOW HIDE EVENT HANDLE */
  // useEffect(() => {
  //   let cols: any = columns?.filter(({ show }: any) => show === true);
  //   let roleAccess = ROLE_ACCESS("monitoring-apkt")
  //   const roleAct = {
  //     view: ROLE_ACTION(roleAccess, 'view'),
  //     update_apkt: ROLE_ACTION(roleAccess, 'update-apkt'),
  //     update_status: ROLE_ACTION(roleAccess, 'update-status'),
  //     update_kirim_padam: ROLE_ACTION(roleAccess, 'update-kirim-padam'),
  //     update_kirim_nyala: ROLE_ACTION(roleAccess, 'update-kirim-nyala'),
  //     update_tanggal_nyala: ROLE_ACTION(roleAccess, 'update-tanggal-nyala'),
  //   };
  //   setRoleActions(roleAct);
  //   if (!roleAct?.update_apkt && !roleAct?.update_status) {
  //     cols = cols?.filter((item: any) => {
  //       return item?.accessor != "action"
  //     })
  //   }
  //   setDataColumns(cols);
  // }, [columns]);




  /** HANDLE CLOSE MODAL */
  useEffect(() => {
    if (closeModal && action) {
      setAction(undefined)
    }
  }, [closeModal])

  // useEffect(() => {
  //   console.log("apktTransJar", apktTransJar);

  //   if (apktTransJar) {
  //     console.log("setRowSelected");

  //     setRowSelected(() => {
  //       return { id: apktTransJar }
  //     })
  //   }

  // }, [apktTransJar])

  const handleRowSelected = (data: any) => {
    dataSelected.current = data.current;
    setDetails(dataSelected?.current?.id_apkt_trans_jar);
    setTrigger(dataSelected?.current?.id_apkt_trans_jar);
  }
  useEffect(() => {
    // Logika di sini tidak menggunakan rowSelected
    console.log("Effect running");

    // Jika kamu ingin melakukan sesuatu yang tidak bergantung pada rowSelected
    // Tambahkan logika di sini
  }, [rowSelected]); // Meskipun rowSelected ada di sini, logika di dalam useEffect tidak terpengaruh oleh perubahan rowSelected.


  useEffect(() => {
    const tabs = document.getElementById('tabs');
    if (tabs) {
      (window as any).jqwidgets.createInstance(tabs, 'jqxTabs', { theme: "light", reorder: true });
    }

    const roleAccess = ROLE_ACCESS("monitoring-apkt");
    const roleAct = {
      view: ROLE_ACTION(roleAccess, 'view'),
      create: ROLE_ACTION(roleAccess, 'create'),
      update: ROLE_ACTION(roleAccess, 'update'),
      update_apkt: ROLE_ACTION(roleAccess, 'update-apkt'),
      update_status: ROLE_ACTION(roleAccess, 'update-status'),
      update_kirim_padam: ROLE_ACTION(roleAccess, 'update-kirim-padam'),
      update_kirim_nyala: ROLE_ACTION(roleAccess, 'update-kirim-nyala'),
      update_tanggal_nyala: ROLE_ACTION(roleAccess, 'update-tanggal-nyala'),
    };
    setRoleActions(roleAct);



    // Your existing code...
  }, []);

  const handleUpdateStatus = (item: any) => {
    // Always show the modal for updating status
    // dataSelected.current = item;
    setRowSelected(item);
    setAction('update-status-gardu');
  };

  // const handleUpdateNoApkt = (item: any) => {
  //   // Show the modal for updating no_apkt without permission check
  //   dataSelected.current = item;
  //   setAction('update-no_apkt');
  // };

  // const handleUpdateJenisLaporan = (item: any) => {
  //   // Show the modal for updating jenis laporan without permission check
  //   dataSelected.current = item;
  //   setAction('update-jenis-laporan');
  // };

  // useEffect(() => {
  //   setTrigger(moment().valueOf())
  //   const timer = setInterval(() => {
  //     setTrigger(moment().valueOf())
  //   }, 120000);

  //   return () => {
  //     source.cancel()
  //     clearInterval(timer)
  //   }
  // }, [])

  // console.log("dataSelected", dataSelected);

  return (
    <>
      <Row className='mt-4'>
        <Col md={7} className='mb-4'>
          <Card className='card-widget'>
            <Card.Header className='text-uppercase'> MONITORING STATUS PROGRAM INTEGRASI SCADA-APKT</Card.Header>
            <Card.Body>
              <TableIntegrasiMon trigger={trigger} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={5} className='mb-4'>
          <Card className='card-widget'>
            <Card.Header className='text-uppercase'>REKAP LAPORAN</Card.Header>
            <Card.Body>
              <PengirimanGarduRekap trigger={trigger} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Tabs defaultActiveKey="1" activeKey={tabActive} onSelect={(k: any) => setTabActive(k)} className="mb-3 tab-sm">
        {
          tabOptions.map((tab: any) => (
            <Tab key={tab.value} eventKey={tab.value} title={tab.label} />
          ))
        }
      </Tabs>
      <div className='px-2 mt-2'>
        <Filter onFilterChange={handleFilterChange} />
      </div>

      <TableDataJqxGridNew
        //AKSI 
        addlaporan={roleActions.create}
        updatebtnJenisLap={roleActions.update}
        // onClickUpdateJenisLap={handleUpdateJenisLaporan}

        updatebtnNoApkt={roleActions.update_apkt}
        // onClickUpdateNoApkt={handleUpdateNoApkt}

        updatebtnStatus={roleActions.update_status}
        onClickUpdateStatus={handleUpdateStatus}

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
          ...filterValues
        }}
        dataFieldsColsConfig={MONITORING_APKT_JQ()}
        primaryKey={'id_apkt_trans_jar'}
        respDataApi={handleRespDataApi}
        // filterable={true}

        onRowSelected={handleRowSelected}
        exportbtn={true}
      />




      <hr className='my-4' />


      {/* <Row>
        <Col md={12} className='mb-4'>
          <Card className='card-widget'>
            <Card.Header> Detail Monitoring APKT</Card.Header>
            <KinEstimatorStateDetail1 event="padam" path={path} isUpdateNyala={true} roleActions={roleActions} filterParams={{ id_apkt_trans_jar: details ? details : null, ...filterValues, }} />
          </Card>
        </Col>
      </Row> */}
      <Row>
        <Col md={12} className="mb-4">
          <Card className="card-widget">
            <Card.Header> Detail Monitoring</Card.Header>
            <KinEstimatorStateDetail1
              event="padam"
              path={path}
              isUpdateNyala={true}
              roleActions={roleActions}
              filterParams={{
                id_apkt_trans_jar: details ? details : null,
                current: { jenis_laporan: dataSelected?.current?.jenis_laporan, status_laporan: dataSelected?.current?.status_laporan }
                // ...filterValues,
              }}
            />
            {/* <KinEstimatorStateDetail1   event="padam"   path={path}  isUpdateNyala = {true} roleActions={roleActions} /> */}
          </Card>
        </Col>
      </Row>
      {/* {action === 'update-no_apkt' &&   (
      <ModalData modalProps={modalNoAPKT}  >
        <FormUpdateNOAPKT  dataSelected={rowSelected} setModal={setModalNoapkt} />
      </ModalData>
      )}
      {action === 'update-jenis-laporan' && (
      <ModalData modalProps={modalJenisLaporan}  >
        <FormUpdateJenisLaporan   dataSelected={rowSelected} setModal={setModalJenisLaporan} />
      </ModalData>
      )} */}
      {action === 'update-status-gardu' && (
        <ModalConfirm
          modalConfirmProps={modalConfirm}
          callbackModalConfirm={callbackModalConfirm}

        />
      )}


    </>
  )
}

