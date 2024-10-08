import React, { useState, useEffect } from "react";
import { Tab, Tabs, Card, Col, Row } from "react-bootstrap";
import { head } from "lodash";
// import qs from "query-string";

/** COMPONENT */
import DynamicBebanAreaTable from "@app/modules/opsisdis/LaporanBeban/DynamicBebanAreaTable";
import Filter from "@app/modules/opsisdis/TracingBeban/Filter";

/** CONFIG */
import {
  LAPORAN_BEBAN_PENYULANG_BULAN,
  LAPORAN_BEBAN_PENYULANG_HARI,
  LAPORAN_BEBAN_PENYULANG_JAM,
  LAPORAN_BEBAN_PENYULANG_TAHUN,
} from "@app/configs/react-table/opsisdis/laporan-beban.column.config";
import {
  BEBAN_PENYULANG_BULAN_COLUMN_JQWIDGET,
  BEBAN_PENYULANG_HARIAN_COLUMN_JQWIDGET,
  BEBAN_PENYULANG_PERJAM_COLUMN_JQWIDGET,
  BEBAN_PENYULANG_TAHUN_COLUMN_JQWIDGET,
} from "@app/configs/jqwidget/laporan-beban-penyulang.config";

/** SERVICE */
import { API_PATH } from "@app/services/_path.service";
import { JENIS_LOKASI } from "@app/configs/jenis-lokasi.config";
import { getAllByPath } from "@app/services/main.service";
import axios from "axios";
import TopBarLoader from "@app/components/Loader/TopBarLoader";
import { exportingData } from "@app/store/reducers/app";
import { useDispatch } from "react-redux";

// import FilterPessrJam from '@app/modules/opsisdis/TracingBeban/FilterPerJam';
import { useSelector } from "react-redux";
// import TableDataPagination from '@app/modules/Table/TableDataPagination';
const tabOptions = [
  {
    label: "Beban Per Jam",
    value: "beban_perjam",
    format: "DD/MM/YYYY HH:mm",
    pathService: API_PATH().opsisdis.laporan_beban.penyulang.jam,
    column: LAPORAN_BEBAN_PENYULANG_JAM(),
    // column: BEBAN_PENYULANG_PERJAM_COLUMN_JQWIDGET(),
    primaryKey: "id",
  },
  {
    label: "Beban Harian",
    value: "beban_harian",
    format: "DD/MM/YYYY",
    pathService: API_PATH().opsisdis.laporan_beban.penyulang.harian,
    column: LAPORAN_BEBAN_PENYULANG_HARI(),
    // column: BEBAN_PENYULANG_HARIAN_COLUMN_JQWIDGET(),
    primaryKey: "id",
  },
  {
    label: "Beban  Bulanan",
    value: "puncak_bulanan",
    format: "MM/YYYY",
    pathService: API_PATH().opsisdis.laporan_beban.penyulang.bulanan,
    column: LAPORAN_BEBAN_PENYULANG_BULAN(),
    // column: BEBAN_PENYULANG_BULAN_COLUMN_JQWIDGET(),
    primaryKey: "id",
  },
  {
    label: "Beban  Tahunan",
    value: "puncak_tahunan",
    format: "YYYY",
    pathService: API_PATH().opsisdis.laporan_beban.penyulang.tahunan,
    column: LAPORAN_BEBAN_PENYULANG_TAHUN(),
    // column: BEBAN_PENYULANG_TAHUN_COLUMN_JQWIDGET(),
    primaryKey: "id",
  },
];

const customFilter = [
  {
    search: "__ref_lokasi_gi",
    field: "id_gardu_induk",
  },
  {
    search: "__ref_lokasi_penyulang",
    field: "id_ref_lokasi_penyulang",
  },
];

export default function TracingBebanPenyulangPage() {
  // const queryParams = qs.parse(location.search);
  const dispatch = useDispatch();

  const [tabActive, setTabActive] = useState<string>(tabOptions[0]["value"]);
  const [tabActiveConf, setTabActiveConf] = useState<any>(tabOptions[0]);
  const source = axios.CancelToken.source();
  const [loading, setLoading] = useState<any>(true);
  const [opiotnsGarduInduk, setOpiotnsGarduInduk] = useState<any>();
  const { activeFilters } = useSelector((state: any) => state.ui);

  const { currentUser } = useSelector((state: any) => state.auth);

  /** GET DATA gardu induk */
  const getAllData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    try {
      const params = {
        page: -1,
        limit: -1,
        sort_by: "nama_lokasi",
        id_ref_jenis_lokasi: JENIS_LOKASI().gardu_induk,
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
      setOpiotnsGarduInduk(unit);
    } catch (err: any) {
      setLoading(false);
      setOpiotnsGarduInduk(null);
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
      {/* <CardFilter>
        <Filter
          tabActive={tabActive}
          isGarduInduk={true}
          isOperator={true}
          isSatuan={true}
          isNilai={true}
          isBebanPuncak={tabActive != 'beban_perjam'}
          configFilter={[]}
        />
      </CardFilter> */}
      <TopBarLoader isLoading={loading} />
      {opiotnsGarduInduk && (
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
                {/* <div className="px-2 mt-2"> */}
                {/* {tabActive == 'beban_perjam' && <FilterPerJam
                  tabActive={'beban_perjam'}
                  isGarduInduk={true}
                  isOperator={true}
                  isSatuan={true}
                  isPenyulang={true}
                  isNilai={true}
                  isBebanPuncak={tabActive != 'beban_perjam'}
                  configFilter={[]} />}
                {tabActive != 'beban_perjam' && */}
                <Filter
                  page="tracing-beban-penyulang"
                  tabActive={tabActive}
                  optionCurrentUser={currentUser}
                  isGarduInduk={true}
                  isUID={true}
                  isOperator={true}
                  isSatuan={true}
                  isPenyulang={true}
                  isNilai={true}
                  isBebanPuncak={tabActive != "beban_perjam"}
                  configFilter={[]}
                  // configFilter={[
                  //   "id_ref_lokasi_gi",
                  //   "id_ref_lokasi_penyulang",
                  // ]}
                  optionsGarduInduk={opiotnsGarduInduk}
                />
                {/* } */}
                {/* </div> */}
                <hr />
              </Card.Body>
              {/* {Object.keys(queryParams).length > 0 && ( */}
              {activeFilters?.filters?.id_ref_lokasi_penyulang &&
                activeFilters?.filters?.id_ref_lokasi_gi && (
                  <Card.Body>
                    {/* {tabActive == "beban_perjam" &&
                    <DynamicBebanAreaTable pathService={API_PATH().opsisdis.laporan_beban.penyulang.jam} columnsConfig={LAPORAN_BEBAN_PENYULANG_JAM()} primaryKey={tabActiveConf.primaryKey}  tabActive={'beban_perjam'} label="beban_penyulang_perjam" />
                  }
                  {tabActive == "beban_harian" &&
                    <DynamicBebanAreaTable pathService={API_PATH().opsisdis.laporan_beban.penyulang.harian} columnsConfig={LAPORAN_BEBAN_PENYULANG_HARI()} primaryKey={tabActiveConf.primaryKey}  tabActive={'beban_harian'} label="beban_penyulang_harian" />
                  }
                  {tabActive == "puncak_bulanan" &&
                    <DynamicBebanAreaTable pathService={API_PATH().opsisdis.laporan_beban.penyulang.bulanan} columnsConfig={LAPORAN_BEBAN_PENYULANG_BULAN()} primaryKey={tabActiveConf.primaryKey}  tabActive={'puncak_bulanan'} label="beban_penyulang_bulanan" />
                  }
                  {tabActive == "puncak_tahunan" &&
                    <DynamicBebanAreaTable pathService={API_PATH().opsisdis.laporan_beban.penyulang.tahunan} columnsConfig={LAPORAN_BEBAN_PENYULANG_TAHUN()} primaryKey={tabActiveConf.primaryKey}  tabActive={'puncak_tahunan'} label="beban_penyulang_tahunan" />
                  } */}
                    {tabActive == "beban_perjam" && (
                      <DynamicBebanAreaTable
                        pathService={
                          API_PATH().opsisdis.laporan_beban.penyulang.jam
                        }
                        columnsConfig={BEBAN_PENYULANG_PERJAM_COLUMN_JQWIDGET()}
                        configParams={customFilter}
                        filterParams={{}}
                        primaryKey={tabActiveConf.primaryKey}
                        tabActive={"beban_perjam"}
                        label="beban_penyulang_perjam"
                      />
                    )}
                    {tabActive == "beban_harian" && (
                      <DynamicBebanAreaTable
                        pathService={
                          API_PATH().opsisdis.laporan_beban.penyulang.harian
                        }
                        columnsConfig={BEBAN_PENYULANG_HARIAN_COLUMN_JQWIDGET()}
                        configParams={customFilter}
                        filterParams={{}}
                        primaryKey={tabActiveConf.primaryKey}
                        tabActive={"beban_harian"}
                        label="beban_penyulang_harian"
                      />
                    )}
                    {tabActive == "puncak_bulanan" && (
                      <DynamicBebanAreaTable
                        pathService={
                          API_PATH().opsisdis.laporan_beban.penyulang.bulanan
                        }
                        columnsConfig={BEBAN_PENYULANG_BULAN_COLUMN_JQWIDGET()}
                        configParams={customFilter}
                        filterParams={{}}
                        primaryKey={tabActiveConf.primaryKey}
                        tabActive={"puncak_bulanan"}
                        label="beban_penyulang_bulanan"
                      />
                    )}
                    {tabActive == "puncak_tahunan" && (
                      <DynamicBebanAreaTable
                        pathService={
                          API_PATH().opsisdis.laporan_beban.penyulang.tahunan
                        }
                        columnsConfig={BEBAN_PENYULANG_TAHUN_COLUMN_JQWIDGET()}
                        configParams={customFilter}
                        filterParams={{}}
                        primaryKey={tabActiveConf.primaryKey}
                        tabActive={"puncak_tahunan"}
                        label="beban_penyulang_tahunan"
                      />
                    )}
                    {/* <DynamicBebanAreaTable
                    pathService={tabActiveConf.pathService}
                    columnsConfig={tabActiveConf.column}
                    primaryKey={tabActiveConf.primaryKey}
                    tabActive={tabActive}
                    label={'beban_penyulang'}

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
