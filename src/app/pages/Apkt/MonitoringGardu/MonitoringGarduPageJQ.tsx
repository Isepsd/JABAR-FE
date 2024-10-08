import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Card, Tab, Tabs } from "react-bootstrap";
/** COMPONENT */
import TableDataJqxGridNew from "@app/modules/Table/TableDataJqxGridNew";

/** CONFIG */
import {
  MONITORING_GARDU_JQ,
  MONITORING_GARDU_DETAIL_JQ,
  MONITORING_GARDU_SCADA_JQ,
} from "@app/configs/react-table/apkt.columns.config";

/** SERVICE */
import { API_PATH } from "@app/services/_path.service";
import { useSelector } from "react-redux";
import Filter from "./Filter";
import { ROLE_ACCESS, ROLE_ACTION } from "@app/helper/auth.helper";
import { head } from "lodash";

const tabOptions = [
  {
    label: "Histori Status Padam/Nyala Gardu",
    value: "1",
    pathService: API_PATH().apkt.monitoring_gardu_status_detail,
    column: MONITORING_GARDU_DETAIL_JQ(),
    primaryKey: "id_scd_statusgardu",
  },
  {
    label: "Histori Log SCADA",
    value: "2",
    pathService: API_PATH().apkt.his_11_digitalt,
    column: MONITORING_GARDU_SCADA_JQ(),
    primaryKey: "point_number",
  },
];

// type Props = {
//   optionCurrentUser?: any;
// };

export default function MonitoringGarduPageJQ() {
  // export default function MonitoringGarduPageJQ({ optionCurrentUser }: Props) {
  const { closeModal } = useSelector((state: any) => state.ui);

  const { currentUser } = useSelector((state: any) => state.auth);

  /** DATA RESP */
  const dataSelected = useRef<any>();
  const [action, setAction] = useState<string>();
  const [trigger, setTrigger] = useState<any>(null);

  const [tabActive, setTabActive] = useState<string>(tabOptions[0]["value"]);
  const [tabActiveConf, setTabActiveConf] = useState<any>(tabOptions[0]);

  /** ROW */

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        ...item,
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
            className={`w-100 badge badge-${item?.status_2 === "up" ? "success" : "danger"
              }`}
          >
            {item?.status_2 === "up" ? "Nyala" : "Padam"}
          </span>
        ),
      });
    });
    return dataTableValue;
    // setDataRows(dataTableValue);
  };

  const handleRowSelected = (data: any) => {
    dataSelected.current = data.current;
    // setDetails(dataSelected?.current?.point_number);
    setTrigger(dataSelected?.current?.point_number);
  };

  const handleRowSelected1 = (data: any) => {
    dataSelected.current = data.current;
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
        status_akhir: item?.status_akhir,
        status_awal: item?.status_awal,
      });
    });
    return dataTableValue;

    // setDetailRows(dataTableValue);
  };

  let roleAccess = ROLE_ACCESS("monitoring-gardu");
  const roleActions = {
    view: ROLE_ACTION(roleAccess, "view"),
    update: ROLE_ACTION(roleAccess, "update"),
    update_status: ROLE_ACTION(roleAccess, "update-status"),
  };

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
              <Filter optionCurrentUser={currentUser} />
              <TableDataJqxGridNew
                dataFieldsColsConfig={MONITORING_GARDU_JQ()}
                respDataApi={handleRespDataApi}
                // rowData={dataRows}
                path={API_PATH().apkt.monitoring_gardu_status}
                primaryKey={"id_scd_statusgardu"}
                onRowSelected={handleRowSelected}
                exportbtn={true}
                filterable={false}
                updatebtn={roleActions.update}
                filterParams={{
                  // sort_by: 'status_2',
                  // sort_by: { column: 'status_2', order: 'desc' },
                  // id_pusat: "a01b7809-0e38-45bf-849f-244e72bd4e13",

                  // id_pusat:
                  //   optionCurrentUser?.level == "PUSAT"
                  //     ? optionCurrentUser?.id_unit_lokasi
                  //     : queryParams?.__pusat,
                  // id_regional:
                  //   optionCurrentUser?.level == "REGIONAL"
                  //     ? optionCurrentUser?.id_unit_lokasi
                  //     : queryParams?.__regional,
                  // id_pemilik:
                  //   optionCurrentUser?.level == "UNIT_INDUK"
                  //     ? optionCurrentUser?.id_unit_lokasi
                  //     : queryParams?.__pemilik,
                  // id_pengelola:
                  //   optionCurrentUser?.level == "UP2D" ||
                  //     optionCurrentUser?.level == "UP3"
                  //     ? optionCurrentUser?.id_unit_lokasi
                  //     : queryParams?.__pengelola,
                  // id_sub_pengelola:
                  //   optionCurrentUser?.level == "ULP"
                  //     ? optionCurrentUser?.id_unit_lokasi
                  //     : queryParams?.__subpengelola,
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
                <TableDataJqxGridNew
                  dataFieldsColsConfig={tabActiveConf.column}
                  respDataApi={handleRespDetailApi}
                  path={tabActiveConf.pathService}
                  primaryKey={tabActiveConf.primaryKey}
                  filterParams={{ point_number: trigger }}
                  onRowSelected={handleRowSelected1}
                />
              </Card.Body>
            </Card>
          </Col>
        </>
        )} 
      </Row>
    </>
  );
}