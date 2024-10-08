import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Card, Tab, Tabs } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

/** COMPONENT */
import TableDataJqxGridNew from "@app/modules/Table/TableDataJqxGridNew";
import TableDataJqxGridNewButton from '@app/modules/Table/TableDataJqxGridNewButton';

/** CONFIG */
import {
  MAPPING_GARDU_JQ,
  MAPPING_GARDU_DETAIL_JQ,
  MONITORING_GARDU_SCADA_JQ,
} from "@app/configs/react-table/apkt.columns.config";

/** SERVICE */
import { API_PATH } from "@app/services/_path.service";
import { useSelector } from "react-redux";
// import Filter from "./Filter";
import { ROLE_ACCESS, ROLE_ACTION } from "@app/helper/auth.helper";
import { head } from "lodash";
import ModalFormWO from "@app/components/Modals/ModalFormWO";
import FormGardu from "./MappingGarduFormPage";

const tabOptions = [
  {
    label: "Histori Perubahan Status",
    value: "1",
    //PATH MASIH YANG MONITORING STATUS GARDU
    pathService: API_PATH().apkt.monitoring_gardu_status_detail,
    column: MAPPING_GARDU_DETAIL_JQ(),
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

type Props = {
  // optionCurrentUser?: any;
  filterParams?: any;
};

// export default function MonitoringGarduPageJQ() {
  export default function MonitoringGarduPageJQ({ filterParams }: Props) {
  const { closeModal } = useSelector((state: any) => state.ui);

  /** DATA RESP */
  const dataSelected = useRef<any>();
  const [action, setAction] = useState<string>();

  const [tabActive, setTabActive] = useState<string>(tabOptions[0]["value"]);
  const [tabActiveConf, setTabActiveConf] = useState<any>(tabOptions[0]);
  const [trigger, setTrigger] = useState<any>(null);
  const navigate = useNavigate();
  const [modal, setModal] = useState<any>({
    approved: false,
    size: 'md',
    title: `Update No APKT`,
  });
  // const { currentUser } = useSelector((state: any) => state.auth);
  const handleClose = () => {
    // Close all modals
    setModal((prevState: any) => ({
      ...prevState,
      show: false,
    }));

    // Remove the `id` parameter from the URL search parameters
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete('id');
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.replaceState({}, '', newUrl);
  };

  const handleUpdate = (item: any) => {
    // Show the modal for updating jenis laporan without permission check
    dataSelected.current = item.current;
    setModal((prevState: any) => ({
      ...prevState,
      show: true,
    }));

    // Add `id` parameter to URL
    const params = new URLSearchParams(location.search);
    params.set('id', item.current?.id || '');
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };
  /** ROW */

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        ...item,
        number: item?.number,
        id: item?.id,
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
    // setDataRows(dataTableValue);
  };

  const handleRowSelected = (data: any) => {
    dataSelected.current = data.current;
    // dataSelected.current = data;
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
        // (
        //   <span
        //     className={`w-100 badge badge-${item?.status_akhir === "Nyala" ? "success" : "danger"
        //       }`}
        //   >
        //     {item?.status_akhir === "Nyala" ? "Nyala" : "Padam"}
        //   </span>
        // ),
        status_awal: item?.status_awal,
      });
    });
    return dataTableValue;

    // setDetailRows(dataTableValue);
  };

  let roleAccess = ROLE_ACCESS("mapping-gardu");
  const roleActions = {
    view: ROLE_ACTION(roleAccess, "view"),
    update: ROLE_ACTION(roleAccess, "update"),
    // update_status: ROLE_ACTION(roleAccess, "update-status"),
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
        {roleActions.update && (
          <Col md={12} className="mb-4 position-static">
            <Card className="card-widget position-static">
              <Card.Header className="text-uppercase">
                MAPPING GARDU SCADA - MJD
              </Card.Header>
              <Card.Body>
                <TableDataJqxGridNewButton
                  updatebtn={roleActions.update}
                  onClickUpdate={handleUpdate}
                  path={API_PATH().apkt.monitoring_gardu_status}
                  filterParams={{
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
                  dataFieldsColsConfig={MAPPING_GARDU_JQ()}
                  // primaryKey={'id_scd_statusgardu'}
                  primaryKey={'id'}
                  respDataApi={handleRespDataApi}
                  filterable={false}
                  onRowSelected={handleRowSelected}
                  exportbtn={true}
                />
              </Card.Body>
            </Card>
          </Col>
        )}
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
                <Card.Body>
                  <TableDataJqxGridNew
                    dataFieldsColsConfig={tabActiveConf.column}
                    respDataApi={handleRespDetailApi}
                    path={tabActiveConf.pathService}
                    primaryKey={tabActiveConf.primaryKey}
                    // filterParams={{ }}
                    filterParams={{ point_number: trigger }}
                    onRowSelected={handleRowSelected1}
                  />
                </Card.Body>
              </Card>
            </Col>
          </>
        )}
      </Row>
      <ModalFormWO modalProps={{...modal, setShow: handleClose}}>
            <FormGardu
              id={filterParams?.id}
              setModal={setModal}
              handleClose={handleClose}
            />
        </ModalFormWO>
    </>
  );
}
