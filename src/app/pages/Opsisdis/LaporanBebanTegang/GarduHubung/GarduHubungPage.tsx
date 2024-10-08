import React, { useState, useEffect } from 'react'
import { Tab, Tabs, Card, Col, Row } from 'react-bootstrap';
import { head } from 'lodash';

/** COMPONENT */
import DynamicBebanAreaTable from '@app/modules/opsisdis/LaporanBeban/DynamicBebanAreaTable';
import SubSistemFilter from '@app/modules/opsisdis/LaporanBeban/SubSistemFilter';

/** CONFIG */import { BEBAN_GH_PERJAM_COLUMN_JQWIDGET, BEBAN_GH_HARIAN_COLUMN_JQWIDGET, BEBAN_GH_BULAN_COLUMN_JQWIDGET, BEBAN_GH_TAHUN_COLUMN_JQWIDGET } from '@app/configs/jqwidget/laporan-beban-gardu_hubung.config';
import { GROUP_DAYA_AKTIF_JQWidget } from '@app/configs/jqwidget/_more-jqwidget.column.config';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import ChartlaporanBeban from '@app/modules/opsisdis/ChartLaporanBeban/ChartlaporanBeban';
// import qs from 'query-string';
import { useSelector } from 'react-redux';

const tabOptions = [
  { label: 'Beban Per Jam', value: 'beban_perjam', format: 'DD/MM/YYYY HH:mm', pathService: API_PATH().opsisdis.laporan_beban.gardu_hubung.jam, column: BEBAN_GH_PERJAM_COLUMN_JQWIDGET(), primaryKey: 'id' },
  { label: 'Beban Harian', value: 'beban_harian', format: 'DD/MM/YYYY', pathService: API_PATH().opsisdis.laporan_beban.gardu_hubung.harian, column: BEBAN_GH_HARIAN_COLUMN_JQWIDGET(), primaryKey: 'id' },
  { label: 'Beban Bulanan', value: 'puncak_bulanan', format: 'MM/YYYY', pathService: API_PATH().opsisdis.laporan_beban.gardu_hubung.bulanan, column: BEBAN_GH_BULAN_COLUMN_JQWIDGET(), primaryKey: 'id' },
  { label: 'Beban Tahunan', value: 'puncak_tahunan', format: 'YYYY', pathService: API_PATH().opsisdis.laporan_beban.gardu_hubung.tahunan, column: BEBAN_GH_TAHUN_COLUMN_JQWIDGET(), primaryKey: 'id' },
]

const customFilter = [{
  search: "__ref_lokasi_gi",
  field: "id_gardu_induk",
}, {
  search: "__ref_lokasi_gh",
  field: "id_ref_lokasi_gh",
}]

export default function LbtBebanPenyulangPage() {
  const [tabActive, setTabActive] = useState<string>(tabOptions[0]['value'])
  const [tabActiveConf, setTabActiveConf] = useState<any>(tabOptions[0])
  // const queryParams = qs.parse(location.search);

  const { currentUser } = useSelector((state: any) => state.auth);

  const { activeFilters } = useSelector(
    (state: any) => state.ui
  );

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
                <SubSistemFilter tabActive={tabActive} optionCurrentUser={currentUser} optionJenisLayanan={false} isUID={true} isGarduInduk2={true} isPenyulang2={true} isGH={true} isSatuan={true} configFilter={["id_ref_lokasi_gi", "id_ref_lokasi_gh"]} />
              </div>
              <hr />
              {/* {(Object.keys(queryParams).length > 0) && ( */}
              {activeFilters?.filters?.id_ref_lokasi_gi && activeFilters?.filters?.id_ref_lokasi_gh && (  
                <>
                 
                  <ChartlaporanBeban tabActive={tabActive} path={tabActiveConf.pathService} format={tabActiveConf.format} page="laporan-beban-gh" />
                </>
              )}
            </Card.Body>
            {/* {(Object.keys(queryParams).length > 0) && ( */}
            {activeFilters?.filters?.id_ref_lokasi_gi && activeFilters?.filters?.id_ref_lokasi_gh && (  
              
              <>
                <Card.Header className='text-uppercase mt-4'></Card.Header>
                <Card.Body>
                  {tabActive == "beban_perjam" &&
                    <DynamicBebanAreaTable pathService={API_PATH().opsisdis.laporan_beban.gardu_hubung.jam} columnsConfig={BEBAN_GH_PERJAM_COLUMN_JQWIDGET()} primaryKey={tabActiveConf.primaryKey} configParams={customFilter} tabActive={'beban_perjam'} label="laporan beban penyulang" />
                  }
                  {tabActive == "beban_harian" &&
                    <DynamicBebanAreaTable pathService={API_PATH().opsisdis.laporan_beban.gardu_hubung.harian} columnsConfig={BEBAN_GH_HARIAN_COLUMN_JQWIDGET()} primaryKey={tabActiveConf.primaryKey} configParams={customFilter} tabActive={'beban_harian'} label="laporan beban penyulang" columnsGroupConfig={GROUP_DAYA_AKTIF_JQWidget("Hari")} />
                  }
                  {tabActive == "puncak_bulanan" &&
                    <DynamicBebanAreaTable pathService={API_PATH().opsisdis.laporan_beban.gardu_hubung.bulanan} columnsConfig={BEBAN_GH_BULAN_COLUMN_JQWIDGET()} primaryKey={tabActiveConf.primaryKey} configParams={customFilter} tabActive={'puncak_bulanan'} label="laporan beban penyulang"
                      columnsGroupConfig={GROUP_DAYA_AKTIF_JQWidget("Bulan")}
                    />
                  }
                  {tabActive == "puncak_tahunan" &&
                    <DynamicBebanAreaTable pathService={API_PATH().opsisdis.laporan_beban.gardu_hubung.tahunan} columnsConfig={BEBAN_GH_TAHUN_COLUMN_JQWIDGET()} primaryKey={tabActiveConf.primaryKey} configParams={customFilter} tabActive={'puncak_tahunan'} label="laporan beban penyulang"
                      columnsGroupConfig={GROUP_DAYA_AKTIF_JQWidget("Tahun")} />
                  }

                  {/* <DynamicBebanAreaTable pathService={tabActiveConf.pathService} columnsConfig={tabActiveConf.column} primaryKey={tabActiveConf.primaryKey} configParams={customFilter} tabActive={tabActive}
                  /> */}
                </Card.Body>
              </>
            )}
          </Card>
        </Col>
      </Row>
    </>
  )
}
