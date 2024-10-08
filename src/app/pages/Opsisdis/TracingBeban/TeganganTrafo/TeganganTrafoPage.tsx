import React, { useState, useEffect } from 'react'
import { Tab, Tabs, Card, Col, Row } from 'react-bootstrap';
import { head } from 'lodash';
import { exportingData } from '@app/store/reducers/app';
import { useDispatch,useSelector } from 'react-redux';

/** HELPER */

/** COMPONENT */
import DynamicBebanAreaTable from '@app/modules/opsisdis/LaporanBeban/DynamicBebanAreaTable';
import Filter from '@app/modules/opsisdis/TracingBeban/Filter';

/** CONFIG */
import { TEGANGAN_HARIAN_COLUMN, TEGANGAN_PUNCAK_BULANAN_COLUMN, TEGANGAN_PUNCAK_TAHUNAN_COLUMN, TEGANGAN_PERJAM_COLUMN } from '@app/configs/react-table/opsisdis/laporan-beban.column.config';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
// import qs from 'query-string';
import { getAllByPath } from '@app/services/main.service';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
import axios from 'axios';
import TopBarLoader from '@app/components/Loader/TopBarLoader';

import { BEBAN_TEGANGAN_BULAN_COLUMN_JQWIDGET, BEBAN_TEGANGAN_PERJAM_COLUMN_JQWIDGET,BEBAN_TEGANGAN_HARIAN_COLUMN_JQWIDGET, BEBAN_TEGANGAN_TAHUN_COLUMN_JQWIDGET } from '@app/configs/jqwidget/laporan-beban-tegangan.config';


const tabOptions = [
  { label: 'Tegangan Per 5 Menit', value: 'beban_perjam', format: 'DD/MM/YYYY HH:mm', pathService: API_PATH().opsisdis.laporan_beban.trafo_gi_5.jam, column: TEGANGAN_PERJAM_COLUMN(), primaryKey: 'id' },
  { label: 'Tegangan Harian', value: 'beban_harian', format: 'DD/MM/YYYY', pathService: API_PATH().opsisdis.laporan_beban.trafo_gi_5.harian, column: TEGANGAN_HARIAN_COLUMN(), primaryKey: 'id' },
  { label: 'Tegangan  Bulanan', value: 'puncak_bulanan', format: 'MM/YYYY', pathService: API_PATH().opsisdis.laporan_beban.trafo_gi_5.bulanan, column: TEGANGAN_PUNCAK_BULANAN_COLUMN(), primaryKey: 'id' },
  { label: 'Tegangan  Tahunan', value: 'puncak_tahunan', format: 'YYYY', pathService: API_PATH().opsisdis.laporan_beban.trafo_gi_5.tahunan, column: TEGANGAN_PUNCAK_TAHUNAN_COLUMN(), primaryKey: 'id' },
]

const customFilter = [{
  search: "__ref_lokasi_gi",
  field: "id_gardu_induk",
}, {
  search: "__ref_lokasi_trafo_gi",
  field: "id_ref_lokasi_trafo_gi",
}]

export default function TeganganTrafoPage() {
  const dispatch = useDispatch();

  const [tabActive, setTabActive] = useState<string>(tabOptions[0]['value'])
  const [tabActiveConf, setTabActiveConf] = useState<any>(tabOptions[0])

  const { activeFilters } = useSelector(
    (state: any) => state.ui
  );

  const { currentUser } = useSelector((state: any) => state.auth);

  useEffect(() => {
    const active: any = head(tabOptions.filter((x: any) => x.value == tabActive))
    setTabActiveConf(active)
    dispatch(exportingData(null));
  }, [tabActive])

  const source = axios.CancelToken.source();
  const [loading, setLoading] = useState<any>(true)
  const [opiotnsGarduInduk, setOpiotnsGarduInduk] = useState<any>();

  /** GET DATA gardu induk */
  const getAllData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    try {
      const params = {
        page: -1,
        limit: -1,
        sort_by: "nama_lokasi",
        id_ref_jenis_lokasi: JENIS_LOKASI().gardu_induk
      };


      const req: any = await getAllByPath(API_PATH().master.jaringan.ref_lokasi, params, source.token);

      const { results } = req;
      let unit: any = []
      results?.map((item: any) => {
        unit.push({
          label: item?.nama_lokasi,
          value: item?.id_ref_lokasi
        })
      })
      setLoading(false)
      setOpiotnsGarduInduk(unit)
    } catch (err: any) {
      setLoading(false)
      setOpiotnsGarduInduk(null)
    }
  };
  useEffect(() => {
    getAllData()
  }, [])

  return (
    <>
      <TopBarLoader isLoading={loading} />
      {opiotnsGarduInduk &&
        <Row>
          <Col md={12} className='mb-4 mt-4 position-static'>
            <Card className='card-widget position-static'>
              <Card.Body>
                <Tabs defaultActiveKey="1" activeKey={tabActive} onSelect={(k: any) => setTabActive(k)} className="mb-3 tab-sm">
                  {
                    tabOptions.map((tab: any) => (
                      <Tab key={tab.value} eventKey={tab.value} title={tab.label} />
                    ))
                  }
                </Tabs>
                <div className='px-2 mt-2'>
                  <Filter
                    isGarduInduk={true}
                    isTrafo={true}
                    tabActive={tabActive}
                    optionCurrentUser={currentUser} 
                    optionJenisLayanan={false}
                    isUID={true}
                    isTreshold={tabActive != 'beban_perjam'}
                    configFilter={["id_ref_lokasi_gi", "id_ref_lokasi_trafo_gi"]}
                    optionsGarduInduk={opiotnsGarduInduk}
                  />
                </div>


              </Card.Body>

              <>
                <Card.Header className='text-uppercase mt-4'></Card.Header>
                {activeFilters?.filters?.id_ref_lokasi_gi && (
             
                <Card.Body>
                  {/* <DynamicBebanAreaTable pathService={tabActiveConf.pathService} columnsConfig={tabActiveConf.column} primaryKey={tabActiveConf.primaryKey}
                      configParams={customFilter} tabActive={tabActive}
                    /> */}
                  {tabActive == "beban_perjam" &&
                    <DynamicBebanAreaTable pathService={API_PATH().opsisdis.laporan_beban.trafo_gi_5.jam}
                      columnsConfig={BEBAN_TEGANGAN_PERJAM_COLUMN_JQWIDGET()} primaryKey={tabActiveConf.primaryKey} tabActive={'beban_perjam'} label="tegangan trafo" configParams={customFilter} />
                  }
                  {tabActive == "beban_harian" &&
                    <DynamicBebanAreaTable pathService={API_PATH().opsisdis.laporan_beban.trafo_gi_5.harian}
                      columnsConfig={BEBAN_TEGANGAN_HARIAN_COLUMN_JQWIDGET()} primaryKey={tabActiveConf.primaryKey} tabActive={'beban_harian'} label="tegangan trafo" configParams={customFilter} />
                  }
                  {tabActive == "puncak_bulanan" &&
                    <DynamicBebanAreaTable pathService={API_PATH().opsisdis.laporan_beban.trafo_gi_5.bulanan}
                      columnsConfig={BEBAN_TEGANGAN_BULAN_COLUMN_JQWIDGET()} primaryKey={tabActiveConf.primaryKey} tabActive={'puncak_bulanan'} label="tegangan trafo" configParams={customFilter} />
                  }
                  {tabActive == "puncak_tahunan" &&
                    <DynamicBebanAreaTable pathService={API_PATH().opsisdis.laporan_beban.trafo_gi_5.tahunan}
                      columnsConfig={BEBAN_TEGANGAN_TAHUN_COLUMN_JQWIDGET()} primaryKey={tabActiveConf.primaryKey} tabActive={'puncak_tahunan'} label="tegangan trafo" configParams={customFilter} />
                  }
                  {/* {tabActive == "beban_perjam" &&
                    <DynamicBebanAreaTable pathService={tabActiveConf.pathService}
                      columnsConfig={tabActiveConf.column} primaryKey={tabActiveConf.primaryKey} tabActive={'beban_perjam'} label="tegangan trafo" configParams={customFilter} />
                  }
                  {tabActive == "beban_harian" &&
                    <DynamicBebanAreaTable pathService={tabActiveConf.pathService}
                      columnsConfig={tabActiveConf.column} primaryKey={tabActiveConf.primaryKey} tabActive={'beban_harian'} label="tegangan trafo" configParams={customFilter} />
                  }
                  {tabActive == "puncak_bulanan" &&
                    <DynamicBebanAreaTable pathService={tabActiveConf.pathService}
                      columnsConfig={tabActiveConf.column} primaryKey={tabActiveConf.primaryKey} tabActive={'puncak_bulanan'} label="tegangan trafo" configParams={customFilter} />
                  }
                  {tabActive == "puncak_tahunan" &&
                    <DynamicBebanAreaTable pathService={tabActiveConf.pathService}
                      columnsConfig={tabActiveConf.column} primaryKey={tabActiveConf.primaryKey} tabActive={'puncak_tahunan'} label="tegangan trafo" configParams={customFilter} />
                  } */}
                </Card.Body>
                )}
              </>
            </Card>

          </Col>
        </Row>
      }
    </>
  )
}
