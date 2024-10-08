import React, { useState, useEffect } from "react";
import { Row, Col, Card, Tab, Tabs } from "react-bootstrap";
import Button from "@app/components/Button/Button";
import { get } from "lodash";

/** COMPONENT */
import TableDataListAction from "@app/modules/Table/TableDataListAction";
import TableData from "@app/modules/Table/TableData";
import ModalData from "@app/components/Modals/ModalForm";
import MonitoringStatusGarduForm from "@app/modules/APKT/MonitoringStatusGarduForm";

/** CONFIG */
import {
  MONITORING_GARDU,
  MONITORING_GARDU_DETAIL,
  MONITORING_GARDU_SCADA,
} from "@app/configs/react-table/apkt.columns.config";

/** SERVICE */
import { API_PATH } from "@app/services/_path.service";
// import { useSearchParams } from 'react-router-dom';
// import { timeFormat } from '@app/helper/time.helper';
import { useSelector } from "react-redux";
import Filter from "./Filter";
import { ROLE_ACCESS, ROLE_ACTION } from "@app/helper/auth.helper";
import { head } from "lodash";
import qs from "query-string";

const tabOptions = [
  {
    label: "Histori Status Padam/Nyala Gardu",
    value: "1",
    pathService: API_PATH().apkt.monitoring_gardu_status_detail,
    column: MONITORING_GARDU_DETAIL(),
    primaryKey: "id_scd_statusgardu",
  },
  {
    label: "Histori Log SCADA",
    value: "2",
    pathService: API_PATH().apkt.his_11_digitalt,
    column: MONITORING_GARDU_SCADA(),
    primaryKey: "point_number",
  },
];

type Props = {
  optionCurrentUser?: any;
};

export default function MonitoringGarduPage({ optionCurrentUser }: Props) {
  const { closeModal } = useSelector((state: any) => state.ui);

  const { currentUser } = useSelector((state: any) => state.auth);
  // let [searchParams, setSearchParams] = useSearchParams();
  // const apktTransJar = searchParams.get("id_apkt_trans_jar")

  /** MODAL */
  const [modal, setModal] = useState<any>({
    approved: false,
    size: "md",
    title: `Status Gardu`,
    show: false,
  });
  const queryParams = qs.parse(location.search);

  /** DATA RESP */
  const [dataSelected, setDataSelected] = useState<any>();
  const [action, setAction] = useState<string>();
  const [dataRows, setDataRows] = useState<any>([]);
  const [detailRows, setDetailRows] = useState<any>([]);
  const [columns, setColumns] = useState<any>(MONITORING_GARDU());
  const [dataColumns, setDataColumns] = useState<any>([]);
  const [trigger, setTrigger] = useState<any>(null);
  const [roleActions, setRoleActions] = useState<any>({});

  const [tabActive, setTabActive] = useState<string>(tabOptions[0]["value"]);
  const [tabActiveConf, setTabActiveConf] = useState<any>(tabOptions[0]);
  // const { currentUser } = useSelector((state: any) => state.auth);

  /** ROW */

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        ...item,
        // status_gardu: item?.status_2 == "up" ? 1 : 0,
        // no_apkt: item?.no_apkt || item?.ref_apkt_trans_jar?.no_apkt,
        // tgl_laporan: item?.tgl_laporan,
        // tgl_padam: item?.tgl_padam,
        // tgl_mulai_apkt_kirim_padam: item?.tgl_mulai_apkt_kirim_padam,
        // tgl_apkt_kirim_padam: item?.tgl_apkt_kirim_padam,
        // tgl_mulai: item?.tgl_mulai,
        // tgl_selesai: item?.tgl_selesai,
        // tgl_status: item?.tgl_status,
        // status_data: (
        //   <span
        //     className={`w-100 badge badge-${
        //       item?.status_2 == "up" ? "success" : "danger"
        //     }`}
        //   >
        //     {item?.status_2 == "up" ? "Nyala" : "Padam"}
        //   </span>
        // ),

        status_gardu: item?.status_2 == "up" ? 1 : 0,
        no_apkt: item?.no_apkt || item?.ref_apkt_trans_jar?.no_apkt,
        datum_created: item?.datum_created,
        tgl_padam: item?.tgl_padam,
        tgl_mulai_apkt_kirim_padam: item?.tgl_mulai_apkt_kirim_padam,
        tgl_apkt_kirim_padam: item?.tgl_apkt_kirim_padam,
        tgl_mulai: item?.tgl_mulai,
        tgl_selesai: item?.tgl_selesai,
        datetime_status_2: item?.datetime_status_2,
        status: (
          <span
            className={`w-100 badge badge-${
              item?.status_2 == "up" ? "success" : "danger"
            }`}
          >
            {item?.status_2 == "up" ? "Nyala" : "Padam"}
          </span>
        ),
        action: (
          <>
            {roleActions?.update ? (
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleEdit(item)}
              >
                Edit
              </Button>
            ) : (
              ""
            )}
            {roleActions?.update_status ? (
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleUpdateStatus(item)}
              >
                Update
              </Button>
            ) : (
              ""
            )}
          </>
        ),
        // action: (
        //   <Dropdown className='hide-toogle hide-focus'>
        //     <Dropdown.Toggle className='bg-transparent border-0 no-outline py-0 text-body' id={`gardu-status-act-${index}`}>
        //       <i className='fa-solid fa-ellipsis font-weight-bold'></i>
        //     </Dropdown.Toggle>
        //     <Dropdown.Menu>
        //       {roleActions?.update &&
        //         <Dropdown.Item onClick={() => handleEdit(item)}>
        //           Edit
        //         </Dropdown.Item>
        //       }

        //       {roleActions?.update_status &&
        //         <Dropdown.Item onClick={() => handleUpdateStatus(item)}>
        //           Update Status Listrik
        //         </Dropdown.Item>
        //       }

        //     </Dropdown.Menu>
        //   </Dropdown>
        // ),
      });
    });

    setDataRows(dataTableValue);
  };

  /** MAP DATA FROM API RESPONSE */
  const handleRespDetailApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        ...item,
        datetime_awal: item?.datetime_status_1,
        datetime_akhir: item?.datetime_status_2,
        durasi: item?.durasi,
        status_akhir: (
          <span
            className={`w-100 badge badge-${
              item?.status_akhir == "Nyala" ? "success" : "danger"
            }`}
          >
            {item?.status_akhir}
          </span>
        ),
        status_awal: (
          <span
            className={`w-100 badge badge-${
              item?.status_awal == "Nyala" ? "success" : "danger"
            }`}
          >
            {item?.status_awal}
          </span>
        ),
      });
    });

    setDetailRows(dataTableValue);
  };

  /** EDIT HANDLING */
  const handleEdit = (item: any) => {
    setDataSelected(item);
    // setAction('edit.modal');
    setModal({ ...modal, show: true });
  };

  const handleUpdateStatus = (item: any) => {
    setDataSelected(item);
    setAction("update-status-listrik");
  };

  // useEffect(() => {
  //   if (apktTransJar) {
  //     setRowSelected({ id: apktTransJar ? apktTransJar : '0' })
  //   }
  // }, [apktTransJar])

  /** HANDLE SELECTED ROWS */
  const handleSelectedRows = (v: any) => {
    const selected = get(v, "0");
    setTrigger(selected?.point_number);
  };

  /** COLUMN SHOW HIDE EVENT HANDLE */
  useEffect(() => {
    let cols: any = columns?.filter(({ show }: any) => show === true);
    let roleAccess = ROLE_ACCESS("monitoring-gardu");
    const roleAct = {
      view: ROLE_ACTION(roleAccess, "view"),
      update: ROLE_ACTION(roleAccess, "update"),
      update_status: ROLE_ACTION(roleAccess, "update-status"),
    };
    setRoleActions(roleAct);
    if (!roleAct?.update && !roleAct?.update_status) {
      cols = cols?.filter((item: any) => {
        return item?.accessor != "action";
      });
    }
    setDataColumns(cols);
  }, [columns]);

  /** HANDLE CLOSE MODAL */
  useEffect(() => {
    if (closeModal && action) {
      setAction(undefined);
    }
  }, [closeModal]);

  useEffect(() => {
    const active: any = head(
      tabOptions.filter((x: any) => x.value == tabActive)
    );
    setTabActiveConf(active);
  }, [tabActive]);

  return (
    <>
      <Row className="">
        <Col md={12} className="mb-4 position-static">
          <Card className="card-widget position-static">
            <Card.Header className="text-uppercase">
              MONITORING STATUS GARDU
            </Card.Header>
            <Card.Body>
              <Filter optionCurrentUser={currentUser} onFilterChange={undefined} />
              <TableDataListAction
                add={false}
                columns={columns}
                setColumns={setColumns}
                spaceTop={0}
              ></TableDataListAction>

              <TableData
                columnsConfig={dataColumns}
                respDataApi={handleRespDataApi}
                rowData={dataRows}
                path={API_PATH().apkt.monitoring_gardu_status}
                primaryKey={"id_scd_statusgardu"}
                selected={dataSelected}
                action={action}
                rowSelect={true}
                rowSelectType={"radio"}
                onCheckedRows={handleSelectedRows}
                onCloseModal={setAction}
                filterParams={{
                  // id_pusat: "a01b7809-0e38-45bf-849f-244e72bd4e13",

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
                }}
              />
            </Card.Body>
          </Card>
        </Col>

        {trigger && (
          <>
            {/* <DetailMonitoringGardu pointName={rowSelected?.point_number} /> */}
            <Col md={12} className="mb-4 position-static">
              <Card className="card-widget position-static">
                <Tabs
                  defaultActiveKey="1"
                  activeKey={tabActive}
                  onSelect={(k: any) => setTabActive(k)}
                  className="mb-3 tab-sm"
                >
                  {tabOptions.map((tab: any) => (
                    <Tab
                      key={tab.value}
                      eventKey={tab.value}
                      title={tab.label}
                    />
                  ))}
                </Tabs>
                {/* <Card.Header className='text-uppercase'>HISTORI STATUS PADAM/NYALA GARDU</Card.Header> */}
                <Card.Body>
                  <TableData
                    columnsConfig={tabActiveConf.column}
                    respDataApi={handleRespDetailApi}
                    path={tabActiveConf.pathService}
                    primaryKey={tabActiveConf.primaryKey}
                    rowData={detailRows}
                    pagingPresistance={false}
                    trigger={trigger}
                    filterParams={{ point_number: trigger }}
                  />
                </Card.Body>
              </Card>
            </Col>
          </>
        )}
      </Row>

      <ModalData modalProps={modal}>
        <MonitoringStatusGarduForm dataSelected={dataSelected} />
      </ModalData>
    </>
  );
}
