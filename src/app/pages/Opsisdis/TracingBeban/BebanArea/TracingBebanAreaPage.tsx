import React, { useState, useEffect } from "react";
import { Tab, Tabs, Card, Col, Row } from "react-bootstrap";
import { head } from "lodash";
// import qs from "query-string";
import { exportingData } from "@app/store/reducers/app";
import { useDispatch } from "react-redux";
import axios from "axios";
import { JENIS_LOKASI } from "@app/configs/jenis-lokasi.config";
import { getAllByPath } from "@app/services/main.service";
/** COMPONENT */
import DynamicBebanAreaTable from "@app/modules/opsisdis/LaporanBeban/DynamicBebanAreaTable";
import Filter from "@app/modules/opsisdis/TracingBeban/Filter";

/** CONFIG */
import {
  BEBAN_AREA_PERJAM_COLUMN,
  BEBAN_BULANAN_COLUMN,
  BEBAN_HARIAN_COLUMN,
  BEBAN_TAHUNAN_COLUMN,
} from "@app/configs/react-table/opsisdis/laporan-beban.column.config";

/** SERVICE */
import { API_PATH } from "@app/services/_path.service";
import { useSelector } from "react-redux";
import TopBarLoader from "@app/components/Loader/TopBarLoader";

const tabOptions = [
  {
    label: "Beban Per Jam",
    value: "beban_perjam",
    format: "DD/MM/YYYY HH:mm",
    pathService: API_PATH().opsisdis.laporan_beban.up3.jam,
    column: BEBAN_AREA_PERJAM_COLUMN(),
    primaryKey: "id",
  },
  {
    label: "Beban Harian",
    value: "beban_harian",
    format: "DD/MM/YYYY",
    pathService: API_PATH().opsisdis.laporan_beban.up3.harian,
    column: BEBAN_HARIAN_COLUMN(),
    primaryKey: "id",
  },
  {
    label: "Beban  Bulanan",
    value: "puncak_bulanan",
    format: "MM/YYYY",
    pathService: API_PATH().opsisdis.laporan_beban.up3.bulanan,
    column: BEBAN_BULANAN_COLUMN(),
    primaryKey: "id",
  },
  {
    label: "Beban  Tahunan",
    value: "puncak_tahunan",
    format: "YYYY",
    pathService: API_PATH().opsisdis.laporan_beban.up3.tahunan,
    column: BEBAN_TAHUNAN_COLUMN(),
    primaryKey: "id",
  },
];

export default function TracingBebanAreaPage() {
  // const queryParams = qs.parse(location.search);
  const dispatch = useDispatch();
  const source = axios.CancelToken.source();
  const { currentUser } = useSelector((state: any) => state.auth);
  const [tabActive, setTabActive] = useState<string>(tabOptions[0]["value"]);
  const [tabActiveConf, setTabActiveConf] = useState<any>(tabOptions[0]);
  const [loading, setLoading] = useState<any>(true);
  const [optionsArea, setOptionArea] = useState<any>();
  const { activeFilters } = useSelector((state: any) => state.ui);
  const getAllData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    try {
      const params = {
        page: -1,
        limit: -1,
        sort_by: "nama_lokasi",
        id_ref_jenis_lokasi: JENIS_LOKASI().up3,
      };

      const req: any = await getAllByPath(
        API_PATH().master.jaringan.ref_lokasi,
        params,
        source.token
      );

      const { results } = req;
      let unit: any = [];
      results?.map((item: any) => {
        unit.push({
          label: item?.nama_lokasi,
          value: item?.id_ref_lokasi,
        });
      });
      setLoading(false);
      setOptionArea(unit);
    } catch (err: any) {
      setLoading(false);
      setOptionArea(null);
    }
  };

  useEffect(() => {
    const active: any = head(
      tabOptions.filter((x: any) => x.value == tabActive)
    );
    setTabActiveConf(active);
    dispatch(exportingData(null));
  }, [tabActive]);

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <>
      <TopBarLoader isLoading={loading} />
      {optionsArea && (
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
                    <Tab
                      key={tab.value}
                      eventKey={tab.value}
                      title={tab.label}
                    />
                  ))}
                </Tabs>
                <Filter
                  tabActive={tabActive}
                  isArea={true}
                  isOperator={true}
                  isSatuan={true}
                  isNilai={true}
                  optionCurrentUser={currentUser}
                  isBebanPuncak={tabActive != "beban_perjam"}
                  configFilter={[]}
                  optionsArea={optionsArea}
                />
              </Card.Body>
              {activeFilters?.filters?.id_ref_lokasi_up3 > 0 && (
                <Card.Body>
                  {tabActive == "beban_perjam" && (
                    <DynamicBebanAreaTable
                      pathService={tabActiveConf.pathService}
                      columnsConfig={tabActiveConf.column}
                      primaryKey={tabActiveConf.primaryKey}
                      tabActive={tabActiveConf.value}
                      label={"beban_up3"}
                    />
                  )}
                  {tabActive == "beban_harian" && (
                    <DynamicBebanAreaTable
                      pathService={tabActiveConf.pathService}
                      columnsConfig={tabActiveConf.column}
                      primaryKey={tabActiveConf.primaryKey}
                      tabActive={tabActiveConf.value}
                      label={"beban_up3"}
                    />
                  )}
                  {tabActive == "puncak_bulanan" && (
                    <DynamicBebanAreaTable
                      pathService={tabActiveConf.pathService}
                      columnsConfig={tabActiveConf.column}
                      primaryKey={tabActiveConf.primaryKey}
                      tabActive={tabActiveConf.value}
                      label={"beban_up3"}
                    />
                  )}
                  {tabActive == "puncak_tahunan" && (
                    <DynamicBebanAreaTable
                      pathService={tabActiveConf.pathService}
                      columnsConfig={tabActiveConf.column}
                      primaryKey={tabActiveConf.primaryKey}
                      tabActive={tabActiveConf.value}
                      label={"beban_up3"}
                    />
                  )}

                  {/* <DynamicBebanAreaTable
                  pathService={tabActiveConf.pathService}
                  columnsConfig={tabActiveConf.column}
                  primaryKey={tabActiveConf.primaryKey}
                  tabActive={tabActive}
                  label={'beban_up3'}
                /> */}
                </Card.Body>
              )}
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
}
