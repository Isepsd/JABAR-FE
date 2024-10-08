import React, { useState, useEffect } from 'react'
import { Tab, Tabs, Card, Col, Row } from 'react-bootstrap';
import { head } from 'lodash';

/** COMPONENT */
import DynamicBebanAreaTable from '@app/modules/opsisdis/LaporanBeban/DynamicBebanAreaTable';
import SubSistemFilter from '@app/modules/opsisdis/LaporanBeban/SubSistemFilter';

/** CONFIG */import { BEBAN_TRAFOGI_BULAN_COLUMN_JQWIDGET, BEBAN_TRAFOGI_HARIAN_COLUMN_JQWIDGET, BEBAN_TRAFOGI_PERJAM_COLUMN_JQWIDGET, BEBAN_TRAFOGI_TAHUN_COLUMN_JQWIDGET } from '@app/configs/jqwidget/laporan-bebean-trago-gi-non-ktt.config';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import ChartlaporanBeban from '@app/modules/opsisdis/ChartLaporanBeban/ChartlaporanBeban';
import { useSelector } from 'react-redux';
import { GROUP_DAYA_AKTIF_JQWidget } from '@app/configs/jqwidget/_more-jqwidget.column.config';

const tabOptions = [
  { label: 'Beban Per Jam', value: 'beban_perjam', format: 'DD/MM/YYYY HH:mm', pathService: API_PATH().opsisdis.laporan_beban.trafo_gi.jam, column: BEBAN_TRAFOGI_PERJAM_COLUMN_JQWIDGET(), primaryKey: 'id' },
  { label: 'Beban Harian', value: 'beban_harian', format: 'DD/MM/YYYY', pathService: API_PATH().opsisdis.laporan_beban.trafo_gi.harian, column: BEBAN_TRAFOGI_HARIAN_COLUMN_JQWIDGET(), primaryKey: 'id' },
  { label: 'Beban  Bulanan', value: 'puncak_bulanan', format: 'MM/YYYY', pathService: API_PATH().opsisdis.laporan_beban.trafo_gi.bulanan, column: BEBAN_TRAFOGI_BULAN_COLUMN_JQWIDGET(), primaryKey: 'id' },
  { label: 'Beban  Tahunan', value: 'puncak_tahunan', format: 'YYYY', pathService: API_PATH().opsisdis.laporan_beban.trafo_gi.tahunan, column: BEBAN_TRAFOGI_TAHUN_COLUMN_JQWIDGET(), primaryKey: 'id' },
]

const customFilter = [{
  search: "__ref_lokasi_gi",
  field: "id_gardu_induk",
}, {
  search: "__ref_lokasi_trafo_gi",
  field: "id_ref_lokasi_trafo_gi",
}]

export default function LbtTrafoGINonKTTPage() {
  const [tabActive, setTabActive] = useState<string>(tabOptions[0]['value'])
  const [tabActiveConf, setTabActiveConf] = useState<any>(tabOptions[0])
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
              <Tabs
                defaultActiveKey="1"
                activeKey={tabActive}
                onSelect={(k: any) => setTabActive(k)}
                className="mb-3 tab-sm">
                {
                  tabOptions.map((tab: any) => (
                    <Tab key={tab.value} eventKey={tab.value} title={tab.label} />
                  ))
                }
              </Tabs>


              <div className='px-2 mt-2'>
                <SubSistemFilter tabActive={tabActive} isGarduInduk={true} isTrafoNonKTT={true} isJenisLayanan={true} configFilter={["id_ref_lokasi_gi", "id_ref_lokasi_trafo_gi"]} />
              </div>
              <hr />

              {activeFilters?.filters?.id_ref_lokasi_gi &&
                <ChartlaporanBeban
                  tabActive={tabActive}
                  path={tabActiveConf.pathService}
                  format={tabActiveConf.format}
                />
              }
            </Card.Body>
            {activeFilters?.filters?.id_ref_lokasi_gi &&
              <>
                <Card.Header className='text-uppercase mt-4'></Card.Header>
                <Card.Body>
                  {tabActive == "beban_perjam" &&
                    <DynamicBebanAreaTable pathService={tabActiveConf.pathService}
                      columnsConfig={tabActiveConf.column}
                      primaryKey={tabActiveConf.primaryKey}
                      configParams={customFilter} tabActive={'beban_perjam'}
                      label="laporan beban trafo"
                    />
                  }
                  {tabActive == "beban_harian" &&
                    <DynamicBebanAreaTable
                      pathService={tabActiveConf.pathService}
                      columnsConfig={BEBAN_TRAFOGI_HARIAN_COLUMN_JQWIDGET()}
                      primaryKey={tabActiveConf.primaryKey}
                      configParams={customFilter}
                      tabActive={'beban_harian'}
                      label="laporan beban trafo"
                      columnsGroupConfig={GROUP_DAYA_AKTIF_JQWidget("Hari")}
                    />
                  }
                  {tabActive == "puncak_bulanan" &&
                    <DynamicBebanAreaTable pathService={tabActiveConf.pathService}
                      columnsConfig={tabActiveConf.column}
                      primaryKey={tabActiveConf.primaryKey}
                      configParams={customFilter} tabActive={'puncak_bulanan'} label="laporan beban trafo"
                      columnsGroupConfig={GROUP_DAYA_AKTIF_JQWidget("Bulan")}
                    />
                  }
                  {tabActive == "puncak_tahunan" &&
                    <DynamicBebanAreaTable pathService={tabActiveConf.pathService}
                      columnsConfig={tabActiveConf.column}
                      primaryKey={tabActiveConf.primaryKey}
                      configParams={customFilter} tabActive={'puncak_tahunan'} label="laporan beban trafo"
                      columnsGroupConfig={GROUP_DAYA_AKTIF_JQWidget("Tahun")}
                    />
                  }
                  {/* <DynamicBebanAreaTable
                    pathService={tabActiveConf.pathService}
                    columnsConfig={tabActiveConf.column}
                    primaryKey={tabActiveConf.primaryKey}
                    configParams={customFilter}
                    tabActive={tabActive}
                    label="laporan beban trafo" 
                  /> */}
                </Card.Body>
              </>

            }
          </Card>
        </Col>
      </Row>
    </>
  )
}
