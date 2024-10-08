import React, { useState, useEffect } from 'react'
import { Tab, Tabs, Card, Col, Row } from 'react-bootstrap';
import { head } from 'lodash';

/** HELPER */

/** COMPONENT */
import DynamicBebanAreaTable from '@app/modules/opsisdis/LaporanBeban/DynamicBebanAreaTable';
import SubSistemFilter from '@app/modules/opsisdis/LaporanBeban/SubSistemFilter';

/** CONFIG */
import {
  KWH_BULANAN,
  // BEBAN_PUNCAK_BULANAN_UP2B_COLUMN, BEBAN_PUNCAK_TAHUNAN_UP2B_COLUMN, BEBAN_UP2B_PERJAM_COLUMN,
} from '@app/configs/react-table/opsisdis/laporan-beban.column.config';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { useSelector } from 'react-redux';
// import ChartlaporanBeban from '@app/modules/opsisdis/ChartLaporanBeban/ChartlaporanBeban';

import { BEBAN_KWH_BULANAN_COLUMN_JQWIDGET } from '@app/configs/jqwidget/laporan-beban-kwh-bulanan';

const tabOptions = [
  // { label: 'Beban Per Jam', value: 'beban_perjam', format: 'DD/MM/YYYY HH:mm', pathService: API_PATH().opsisdis.laporan_beban.up2b.jam, column: BEBAN_UP2B_PERJAM_COLUMN(), primaryKey: 'id' },
  // { label: 'Beban Harian', value: 'beban_harian', format: 'DD/MM/YYYY', pathService: API_PATH().opsisdis.laporan_beban.up2b.harian, column: BEBAN_HARIAN_UP2B_COLUMN(), primaryKey: 'id' },
  { label: 'Beban  Bulanan', value: 'puncak_bulanan', format: 'MM/YYYY', pathService: API_PATH().opsisdis.laporan_beban.up2b.bulanan, column: KWH_BULANAN(), primaryKey: 'id' },
  // { label: 'Beban  Tahunan', value: 'puncak_tahunan', format: 'YYYY', pathService: API_PATH().opsisdis.laporan_beban.up2b.tahunan, column: BEBAN_PUNCAK_TAHUNAN_UP2B_COLUMN(), primaryKey: 'id' },
]


const customFilter = [{
  search: "__ref_lokasi_gi",
  field: "id_ref_lokasi_gi",
}]

export default function LbtBebankWhBulananPage() {
  const [tabActive, setTabActive] = useState<string>(tabOptions[0]['value'])
  const [tabActiveConf, setTabActiveConf] = useState<any>(tabOptions[0])
  const { activeFilters } = useSelector(
    (state: any) => state.ui
  );

  const { currentUser } = useSelector((state: any) => state.auth);



  useEffect(() => {
    const active: any = head(tabOptions.filter((x: any) => x.value == tabActive))
    setTabActiveConf(active)
  }, [tabActive])

  return (
    <>
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
                <SubSistemFilter tabActive={tabActive} optionCurrentUser={currentUser} optionJenisLayanan={false} isUID={true} isGarduInduk={true} configFilter={["id_ref_lokasi_gi"]} />
              </div>
              <hr />
              {/* {activeFilters?.filters?.id_ref_lokasi_gi && (
                <ChartlaporanBeban tabActive={tabActive} path={tabActiveConf.pathService} format={tabActiveConf.format} page="laporan-beban-up2b" />
              )} */}
            </Card.Body>
            {activeFilters?.filters?.id_ref_lokasi_gi && (
              <Card.Body>
                {/* {tabActive == "beban_perjam" &&
                  <DynamicBebanAreaTable pathService={API_PATH().opsisdis.laporan_beban.up2b.jam} columnsConfig={BEBAN_UP2B_PERJAM_COLUMN()} primaryKey={tabActiveConf.primaryKey} configParams={customFilter} tabActive={'beban_perjam'} label="laporan beban up2b" />
                } */}
                {/* {tabActive == "beban_harian" &&
                  <DynamicBebanAreaTable pathService={API_PATH().opsisdis.laporan_beban.up2b.harian} columnsConfig={BEBAN_HARIAN_UP2B_COLUMN()} primaryKey={tabActiveConf.primaryKey} configParams={customFilter} tabActive={'beban_harian'} label="laporan beban up2b" />
                } */}
                {tabActive == "puncak_bulanan" &&
                  <DynamicBebanAreaTable pathService={API_PATH().opsisdis.laporan_beban.up2b.bulanan} columnsConfig={BEBAN_KWH_BULANAN_COLUMN_JQWIDGET()} primaryKey={tabActiveConf.primaryKey} configParams={customFilter} tabActive={'puncak_bulanan'} label="laporan beban up2b" />
                }
                {/* {tabActive == "puncak_tahunan" &&
                  <DynamicBebanAreaTable pathService={API_PATH().opsisdis.laporan_beban.up2b.tahunan} columnsConfig={BEBAN_PUNCAK_TAHUNAN_UP2B_COLUMN()} primaryKey={tabActiveConf.primaryKey} configParams={customFilter} tabActive={'puncak_tahunan'} label="laporan beban up2b" />
                } */}
                {/* <DynamicBebanAreaTable pathService={tabActiveConf.pathService} columnsConfig={tabActiveConf.column} primaryKey={tabActiveConf.primaryKey}
                  configParams={customFilter} tabActive={tabActive}
                /> */}
              </Card.Body>
            )}
          </Card>
        </Col>
      </Row>
    </>
  )
}
