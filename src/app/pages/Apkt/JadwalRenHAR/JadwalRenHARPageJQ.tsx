import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Card, Tab, Tabs } from "react-bootstrap";
import TableDataJqxGridNew from "@app/modules/Table/TableDataJqxGridNew";
/** CONFIG */
import {
  LAPORAN_RENHAR_JQ,
  LAPORAN_RENHAR_DETAIL_JQ,
} from "@app/configs/react-table/apkt.columns.config";

/** SERVICE */
import { API_PATH } from "@app/services/_path.service";
import { useSelector } from "react-redux";
import Filter from "./Filter";
import { ROLE_ACCESS, ROLE_ACTION } from "@app/helper/auth.helper";
import { head } from "lodash";
import qs from "query-string";
import moment from 'moment';

const tabOptions = [
  {
    label: "Detail Laporan",
    value: "1",
    pathService: API_PATH().apkt.trans_jar_det_har,
    column: LAPORAN_RENHAR_DETAIL_JQ(),
    primaryKey: "id_scd_statusgardu",
  },
];

type Props = {
  optionCurrentUser?: any;

};

export default function MonitoringGarduPageJQ({ optionCurrentUser }: Props) {
  const { closeModal } = useSelector((state: any) => state.ui);

  const { currentUser } = useSelector((state: any) => state.auth);
  const queryParams = qs.parse(location.search);

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
            className={`w-100 badge badge-${item?.status_2 == "up" ? "success" : "danger"
              }`}
          >
            {item?.status_2 == "up" ? "Nyala" : "Padam"}
          </span>
        ),
      });
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

  const handleRowSelected = (data: any) => {
    dataSelected.current = data.current;
    setTrigger(dataSelected?.current?.point_number);
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
            className={`w-100 badge badge-${item?.status_akhir == "Nyala" ? "success" : "danger"
              }`}
          >
            {item?.status_akhir}
          </span>
        ),
        status_awal: (
          <span
            className={`w-100 badge badge-${item?.status_awal == "Nyala" ? "success" : "danger"
              }`}
          >
            {item?.status_awal}
          </span>
        ),
      });
    });
    return dataTableValue;

    // setDetailRows(dataTableValue);
  };
  let roleAccess = ROLE_ACCESS("jadwal-renhar");
  const roleActions = {
    view: ROLE_ACTION(roleAccess, "view"),
    update: ROLE_ACTION(roleAccess, "update"),
    // update_status: ROLE_ACTION(roleAccess, "update-status"),
  };

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
      {roleActions.update && (
        <Row className="">
          <Col md={12} className="mb-4 position-static">
            <Card className="card-widget position-static">
              <Card.Header className="text-uppercase">
                Monitoring Pengiriman Approve Jadwal Pemeliharaan ke APKT
              </Card.Header>
              <Card.Body>
                <Filter
                  onFilterChange={handleFilterChange}
                  optionCurrentUser={currentUser}
                />
                <div key="2">
                  <TableDataJqxGridNew
                    // updateKirimApkt={roleActions.update}
                    dataFieldsColsConfig={LAPORAN_RENHAR_JQ()}
                    respDataApi={handleRespDataApi}
                    path={API_PATH().apkt.trans_jar_har}
                    primaryKey={"id_scd_statusgardu"}
                    onRowSelected={handleRowSelected}
                    exportbtn={true}
                    filterable={false}
                    filterParams={{
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
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>

          {trigger && (
            <>
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
                  <Card.Body>
                    <TableDataJqxGridNew
                      dataFieldsColsConfig={tabActiveConf.column}
                      respDataApi={handleRespDetailApi}
                      path={tabActiveConf.pathService}
                      primaryKey={tabActiveConf.primaryKey}
                      filterParams={{ point_number: trigger }}
                    />
                  </Card.Body>
                </Card>
              </Col>
            </>
          )}
        </Row>
      )}
    </>
  );
}
