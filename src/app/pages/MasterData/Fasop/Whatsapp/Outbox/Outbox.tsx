import React, { useState, useEffect, useRef } from "react";
import { Tab, Tabs, Card, Col, Row, Modal, Button, Form } from "react-bootstrap";
import { head } from "lodash";
import qs from "query-string";
import { exportingData } from "@app/store/reducers/app";
import { useDispatch } from "react-redux";

/** COMPONENT */
// import DynamicBebanAreaTable from "@app/modules/opsisdis/LaporanBeban/DynamicBebanAreaTable_outbox";
import TableDataJqxGridNew from "@app/modules/Table/TableDataJqxGridNew";
// import Filter from "@app/modules/opsisdis/PadamPenyulang/Filter";
import Filter from "./SubSistemFilter_outbox";
import moment from "moment";

/** CONFIG */
// import {
//   outbox_BULANAN_COLUMN, outbox_HARIAN_COLUMN, outbox_PERJAM_COLUMN, outbox_TAHUNAN_COLUMN,
// } from '@app/configs/react-table/opsisdis/laporan-beban.column.config';
import {
  OUTBOX_COLUMN,
  // LOAD_SUBSISTEM_FAKTOR_BULANAN_COLUMN
} from "@app/configs/react-table/opsisdis/padam-penyulang/padam-penyulang";
import { OUTBOX_COLUMN_JQWidget } from "@app/configs/react-table/opsisdis/padam-penyulang/laporan-penyulang.column";
// import { OUTBOX_COLUMN_MSG_JQWidget } from "@app/configs/react-table/opsisdis/padam-penyulang/laporan-penyulang.column";

// import ChartlaporanBeban from '@app/modules/opsisdis/ChartPadamPenyulang/ChartlaporanBeban';

/** SERVICE */
import { API_PATH } from "@app/services/_path.service";
// import { useSelector } from "react-redux";
// import { useSelector } from 'react-redux';
// import TableDataPagination from '@app/modules/Table/TableDataPagination';

const tabOptions = [
  {
    label: "Pesan",
    value: "beban_perjam",
    format: "DD/MM/YYYY HH:mm",
    pathService: API_PATH().master.fasop.whatsapp.log,
    // pathService: API_PATH().master.fasop.whatsapp.message,
    column: OUTBOX_COLUMN(),
    primaryKey: "id",
  },
  // { label: 'Beban Harian', value: 'beban_harian', format: 'DD/MM/YYYY', pathService: API_PATH().opsisdis.laporan_beban.uid.harian, column: outbox_HARIAN_COLUMN(), primaryKey: 'id' },
  // { label: 'Beban  Bulanan', value: 'puncak_bulanan', format: 'MM/YYYY', pathService: API_PATH().opsisdis.laporan_beban.uid.bulanan, column: outbox_BULANAN_COLUMN(), primaryKey: 'id' },
  // { label: 'Beban  Tahunan', value: 'puncak_tahunan', format: 'YYYY', pathService: API_PATH().opsisdis.laporan_beban.uid.tahunan, column: outbox_TAHUNAN_COLUMN(), primaryKey: 'id' },
];
// export default function Outbox({ optionCurrentUser }: any) {
export default function Outbox() {
  const queryParams = qs.parse(location.search);
  const dispatch = useDispatch();
  // const { currentUser } = useSelector((state: any) => state.auth);

  const [tabActive, setTabActive] = useState<string>(tabOptions[0]["value"]);
  const [tabActiveConf, setTabActiveConf] = useState<any>(tabOptions[0]);
  const dataSelected = useRef<any>();
  // const [details, setDetails] = useState<any>();
  // const [trigger, setTrigger] = useState<any>();
  // const { activeFilters } = useSelector(
  //   (state: any) => state.ui
  // );

  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);



  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        // LOG
        number: item?.number,
        id: item?.id,
        nama_kontak: item?.kontak?.nama,
        no_kontak: item?.kontak?.no_kontak,
        msg: item?.msg,
        datum_sent: item?.datum_sent,
        status_sent: item?.status_sent === 1 ? "Terkirim" : item?.status_sent === 2 ? "Tidak Terkirim" : "Pending",
        datum_created: item?.datum_created,
        pesan_error: item?.pesan_error,

        // //MESSAGE
        // number: item?.number,
        // id: item?.id,
        // nohp: item?.nohp,
        // msg: item?.msg,
        // res_wa_gtw: item?.res_wa_gtw === 1 ? "Terkirim" : item?.status_sent === 2 ? "Tidak Terkirim" : "Pending",
        // datum_created: item?.datum_created,

      });
    });
    return dataTableValue;
  };

  const [filterValues, setFilterValues] = useState<any>({
    // datum_after: moment().subtract(1, "day").format("YYYY-MM-DD"),
    // datum_before: moment().format("YYYY-MM-DD"),
    datum_after: moment().subtract(1, "day").format("YYYY-MM-DD HH:mm:ss"),
    datum_before: moment().format("YYYY-MM-DD HH:mm:ss"),

    msg: null,
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
    //   optionCurrentUser?.level == "UP2D" || optionCurrentUser?.level == "UP3"
    //     ? optionCurrentUser?.id_unit_lokasi
    //     : queryParams?.__pengelola,
    // id_sub_pengelola:
    //   optionCurrentUser?.level == "ULP"
    //     ? optionCurrentUser?.id_unit_lokasi
    //     : queryParams?.__subpengelola,
  });

  const handleFilterChange = (newFilterValues: any) => {
    setFilterValues(newFilterValues);
  };


  useEffect(() => {
    const active: any = head(
      tabOptions.filter((x: any) => x.value == tabActive)
    );
    setTabActiveConf(active);
    dispatch(exportingData(null));
  }, [tabActive]);

  const handleRowSelected = (data: any) => {
    dataSelected.current = data.current;
    // setDetails(dataSelected?.current?.id);
    // setTrigger(dataSelected?.current?.id);
    setMessage(dataSelected?.current?.msg); // mengisi data pesan
    handleOpenModal(); // membuka modal
  };

  return (
    <>
      <Row>
        <Col md={12} className="mb-4 mt-4 position-static">
          <Card className="card-widget position-static">
            <Card.Body>
              <Tabs
                defaultActiveKey="1"
                activeKey={tabActive}
                onSelect={(k: any) => setTabActive(k)}
                className="mb-3 tab-sm"
              >
                {tabOptions.map((tab: any) => (
                  <Tab key={tab.value} eventKey={tab.value} title={tab.label} />
                ))}
              </Tabs>
              <div>
                <Filter
                  // tabActive={tabActive}
                  // isUID={true}
                  // isOperator={true}
                  // isSatuan={true}
                  // isNilai={true}
                  // isBebanPuncak={tabActive != 'beban_perjam'}
                  onFilterChange={handleFilterChange}
                // optionCurrentUser={currentUser}
                // optionCurrentUser={currentUser}
                />
              </div>
              <hr />
              {/* <ChartlaporanBeban
                  tabActive={tabActive}
                  path={tabActiveConf.pathService}
                  format={tabActiveConf.format}
                  page="laporan-beban-pembangkit"
                /> */}
            </Card.Body>
            {Object.keys(queryParams).length > 0 && (
              <Card.Body>
                {tabActive == "beban_perjam" && (
                  <TableDataJqxGridNew
                    //LOG
                    path={API_PATH().master.fasop.whatsapp.log}
                    dataFieldsColsConfig={OUTBOX_COLUMN_JQWidget()}
                    // autoheight={false}
                    autorowheight={false}
                    //MESSAGE
                    // path={API_PATH().master.fasop.whatsapp.message}
                    // dataFieldsColsConfig={OUTBOX_COLUMN_MSG_JQWidget()}
                    primaryKey={tabActiveConf.primaryKey}
                    respDataApi={handleRespDataApi}
                    filterable={false}
                    onRowSelected={handleRowSelected}
                    // primaryKey={"id"}
                    // tabActive={"beban_perjam"}
                    // label="outbox"
                    filterParams={{
                      // datum_before: moment().format("YYYY-MM-DD") + " 23:59",
                      // datum_after:
                      //   moment().subtract(2, "day").format("YYYY-MM-DD") +
                      //   " 00:00",
                      ...filterValues,
                    }}
                  />
                )}
                {/* {tabActive == "beban_harian" &&
                  <DynamicBebanAreaTable pathService={tabActiveConf.pathService}
                    columnsConfig={tabActiveConf.column} primaryKey={tabActiveConf.primaryKey} tabActive={'beban_harian'} label="outbox" />
                }
                {tabActive == "puncak_bulanan" &&
                  <DynamicBebanAreaTable pathService={tabActiveConf.pathService}
                    columnsConfig={tabActiveConf.column} primaryKey={tabActiveConf.primaryKey} tabActive={'puncak_bulanan'} label="outbox" />
                }
                {tabActive == "puncak_tahunan" &&
                  <DynamicBebanAreaTable pathService={tabActiveConf.pathService}
                    columnsConfig={tabActiveConf.column} primaryKey={tabActiveConf.primaryKey} tabActive={'puncak_tahunan'} label="outbox" />
                } */}
                {/* <DynamicBebanAreaTable
                  pathService={tabActiveConf.pathService}
                  columnsConfig={tabActiveConf.column}
                  primaryKey={tabActiveConf.primaryKey}
                  tabActive={tabActive}
                  label={'outbox'}
                /> */}
              </Card.Body>
            )}
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Pesan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formMessage">
              <Form.Label>Pesan</Form.Label>
              <Form.Control
                as="textarea"
                rows={30}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Tutup
          </Button>
          {/* <Button variant="primary" onClick={handleCloseModal}>
            Simpan
          </Button> */}
        </Modal.Footer>
      </Modal>

    </>
  );
}
