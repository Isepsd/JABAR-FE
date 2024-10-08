import React, { useState, useEffect } from "react";
import { Tab, Tabs, Card, Col, Row } from "react-bootstrap";
import { head } from "lodash";
// import qs from "query-string";

/** COMPONENT */
import DynamicBebanAreaTable from "@app/modules/opsisdis/LaporanBeban/DynamicBebanAreaTable";
import Filter from "@app/modules/opsisdis/TracingBeban/Filter";

/** CONFIG */
import {
  BEBAN_TRAFOGI_PERJAM_COLUMN,
  BEBAN_TRAFOGI_HARIAN_COLUMN,
  BEBAN_TRAFOGI_PUNCAK_BULANAN_COLUMN,
  BEBAN_TRAFOGI_PUNCAK_TAHUNAN_COLUMN,
} from "@app/configs/react-table/opsisdis/laporan-beban.column.config";
/** SERVICE */
import { API_PATH } from "@app/services/_path.service";
import { getAllByPath } from "@app/services/main.service";
import axios from "axios";
import { JENIS_LOKASI } from "@app/configs/jenis-lokasi.config";
import TopBarLoader from "@app/components/Loader/TopBarLoader";
import { exportingData } from "@app/store/reducers/app";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
// import TableDataPagination from '@app/modules/Table/TableDataPagination';
import {
  BEBAN_TRAFOGI_BULAN_COLUMN_JQWIDGET,
  BEBAN_TRAFOGI_HARIAN_COLUMN_JQWIDGET,
  BEBAN_TRAFOGI_PERJAM_COLUMN_JQWIDGET,
  BEBAN_TRAFOGI_TAHUN_COLUMN_JQWIDGET,
} from "@app/configs/jqwidget/laporan-bebean-trago-gi-non-ktt.config";

const tabOptions = [
  {
    label: "Beban Per Jam",
    value: "beban_perjam",
    format: "DD/MM/YYYY HH:mm",
    pathService: API_PATH().opsisdis.laporan_beban.trafo_gi.jam,
    column: BEBAN_TRAFOGI_PERJAM_COLUMN(),
    primaryKey: "id",
  },
  {
    label: "Beban Harian",
    value: "beban_harian",
    format: "DD/MM/YYYY",
    pathService: API_PATH().opsisdis.laporan_beban.trafo_gi.harian,
    column: BEBAN_TRAFOGI_HARIAN_COLUMN(),
    primaryKey: "id",
  },
  {
    label: "Beban  Bulanan",
    value: "puncak_bulanan",
    format: "MM/YYYY",
    pathService: API_PATH().opsisdis.laporan_beban.trafo_gi.bulanan,
    column: BEBAN_TRAFOGI_PUNCAK_BULANAN_COLUMN(),
    primaryKey: "id",
  },
  {
    label: "Beban  Tahunan",
    value: "puncak_tahunan",
    format: "YYYY",
    pathService: API_PATH().opsisdis.laporan_beban.trafo_gi.tahunan,
    column: BEBAN_TRAFOGI_PUNCAK_TAHUNAN_COLUMN(),
    primaryKey: "id",
  },
];

const customFilter = [
  {
    search: "__ref_lokasi_gi",
    field: "id_gardu_induk",
  },
  {
    search: "__ref_lokasi_trafo_gi",
    field: "id_ref_lokasi_trafo_gi",
  },
];

export default function TracingTrafoGIPage() {
  // const queryParams = qs.parse(location.search);
  const dispatch = useDispatch();

  const [tabActive, setTabActive] = useState<string>(tabOptions[0]["value"]);
  const [tabActiveConf, setTabActiveConf] = useState<any>(tabOptions[0]);
  const { activeFilters } = useSelector((state: any) => state.ui);

  const { currentUser } = useSelector((state: any) => state.auth);

  useEffect(() => {
    const active: any = head(
      tabOptions.filter((x: any) => x.value == tabActive)
    );
    setTabActiveConf(active);
    dispatch(exportingData(null));
  }, [tabActive]);

  const source = axios.CancelToken.source();
  const [loading, setLoading] = useState<any>(true);
  const [opiotnsGarduInduk, setOpiotnsGarduInduk] = useState<any>();

  /** GET DATA gardu induk */
  const getAllData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    try {
      const params = {
        page: -1,
        limit: -1,
        sort_by: "nama_lokasi",
        id_ref_jenis_lokasi: JENIS_LOKASI().gardu_induk,
        jenis_layanan_in: "KTT,CAMPURAN",
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
    getAllData();
  }, []);

  return (
    <>
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
                <Filter
                  page="tracing-beban-ktt"
                  tabActive={tabActive}
                  isPenyulang={false}
                  isGarduInduk={true}
                  isUID={true}
                  isOperator={true}
                  isSatuan={true}
                  isNilai={true}
                  isTrafoKTT={true}
                  optionCurrentUser={currentUser}
                  optionJenisLayanan={false}
                  isBebanPuncak={tabActive != "beban_perjam"}
                  configFilter={[]}
                  optionsGarduInduk={opiotnsGarduInduk}
                />
              </Card.Body>
              {/* {Object.keys(queryParams).length > 0 && ( */}
              {activeFilters?.filters?.id_ref_lokasi_gi &&
                activeFilters?.filters?.id_ref_lokasi_trafo_gi && (
                  <Card.Body>
                    {/* {tabActive == "beban_perjam" &&
                    <DynamicBebanAreaTable pathService={tabActiveConf.pathService} columnsConfig={tabActiveConf.column} primaryKey={tabActiveConf.primaryKey} filterParams={{ jenis_layanan: 'KTT' }} tabActive={tabActiveConf.value} label={'beban_trafo_gi_perjam'} />
                  }
                  {tabActive == "beban_harian" &&
                    <DynamicBebanAreaTable pathService={tabActiveConf.pathService} columnsConfig={tabActiveConf.column} primaryKey={tabActiveConf.primaryKey} filterParams={{ jenis_layanan: 'KTT' }} tabActive={tabActiveConf.value} label={'beban_trafo_gi_harian'} />
                  }
                  {tabActive == "puncak_bulanan" &&
                    <DynamicBebanAreaTable pathService={tabActiveConf.pathService} columnsConfig={tabActiveConf.column} primaryKey={tabActiveConf.primaryKey} filterParams={{ jenis_layanan: 'KTT' }} tabActive={tabActiveConf.value} label={'beban_trafo_gi_bulanan'} />
                  }
                  {tabActive == "puncak_tahunan" &&
                    <DynamicBebanAreaTable pathService={tabActiveConf.pathService} columnsConfig={tabActiveConf.column} primaryKey={tabActiveConf.primaryKey} filterParams={{ jenis_layanan: 'KTT' }} tabActive={tabActiveConf.value} label={'beban_trafo_gi_tahunan'} />
                  } */}
                    {tabActive == "beban_perjam" && (
                      <DynamicBebanAreaTable
                        pathService={
                          API_PATH().opsisdis.laporan_beban.trafo_gi.jam
                        }
                        columnsConfig={BEBAN_TRAFOGI_PERJAM_COLUMN_JQWIDGET()}
                        primaryKey={tabActiveConf.primaryKey}
                        filterParams={{ jenis_layanan: "KTT" }}
                        configParams={customFilter}
                        tabActive={"beban_perjam"}
                        label={"beban_trafo_gi_perjam"}
                      />
                    )}
                    {tabActive == "beban_harian" && (
                      <DynamicBebanAreaTable
                        pathService={
                          API_PATH().opsisdis.laporan_beban.trafo_gi.harian
                        }
                        columnsConfig={BEBAN_TRAFOGI_HARIAN_COLUMN_JQWIDGET()}
                        primaryKey={tabActiveConf.primaryKey}
                        filterParams={{ jenis_layanan: "KTT" }}
                        configParams={customFilter}
                        tabActive={"beban_harian"}
                        label={"beban_trafo_gi_harian"}
                      />
                    )}
                    {tabActive == "puncak_bulanan" && (
                      <DynamicBebanAreaTable
                        pathService={
                          API_PATH().opsisdis.laporan_beban.trafo_gi.bulanan
                        }
                        columnsConfig={BEBAN_TRAFOGI_BULAN_COLUMN_JQWIDGET()}
                        primaryKey={tabActiveConf.primaryKey}
                        filterParams={{ jenis_layanan: "KTT" }}
                        configParams={customFilter}
                        tabActive={"puncak_bulanan"}
                        label={"beban_trafo_gi_bulanan"}
                      />
                    )}
                    {tabActive == "puncak_tahunan" && (
                      <DynamicBebanAreaTable
                        pathService={
                          API_PATH().opsisdis.laporan_beban.trafo_gi.tahunan
                        }
                        columnsConfig={BEBAN_TRAFOGI_TAHUN_COLUMN_JQWIDGET()}
                        primaryKey={tabActiveConf.primaryKey}
                        filterParams={{ jenis_layanan: "KTT" }}
                        configParams={customFilter}
                        tabActive={"puncak_tahunan"}
                        label={"beban_trafo_gi_tahunan"}
                      />
                    )}
                    {/* <DynamicBebanAreaTable
                    pathService={tabActiveConf.pathService}
                    columnsConfig={tabActiveConf.column}
                    primaryKey={tabActiveConf.primaryKey}
                    tabActive={tabActive}
                    filterParams={{ jenis_layanan: 'KTT' }}
                    label={'beban_trafo_gi'}
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
