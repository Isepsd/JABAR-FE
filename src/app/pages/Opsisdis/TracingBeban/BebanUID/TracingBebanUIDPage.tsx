import React, { useState, useEffect } from 'react'
import { Tab, Tabs, Card, Col, Row } from 'react-bootstrap';
import { head } from 'lodash';
// import qs from 'query-string';
import { exportingData } from '@app/store/reducers/app';
import { useDispatch } from 'react-redux';

/** COMPONENT */
import DynamicBebanAreaTable from '@app/modules/opsisdis/LaporanBeban/DynamicBebanAreaTable';
import Filter from '@app/modules/opsisdis/TracingBeban/Filter';

/** CONFIG */
import {
  BEBAN_UID_BULANAN_COLUMN, BEBAN_UID_HARIAN_COLUMN, BEBAN_UID_PERJAM_COLUMN, BEBAN_UID_TAHUNAN_COLUMN,
} from '@app/configs/react-table/opsisdis/laporan-beban.column.config';

import { BEBAN_UID_BULAN_COLUMN_JQWIDGET, BEBAN_UID_HARIAN_COLUMN_JQWIDGET, BEBAN_UID_PERJAM_COLUMN_JQWIDGET, BEBAN_UID_TAHUN_COLUMN_JQWIDGET } from '@app/configs/jqwidget/laporan-beban-uid.config';

import { useSelector } from 'react-redux';
/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
// import { useSelector } from 'react-redux';
// import TableDataPagination from '@app/modules/Table/TableDataPagination';

const tabOptions = [
  { label: 'Beban Per Jam', value: 'beban_perjam', format: 'DD/MM/YYYY HH:mm', pathService: API_PATH().opsisdis.laporan_beban.uid.jam, column: BEBAN_UID_PERJAM_COLUMN(), primaryKey: 'id' },
  { label: 'Beban Harian', value: 'beban_harian', format: 'DD/MM/YYYY', pathService: API_PATH().opsisdis.laporan_beban.uid.harian, column: BEBAN_UID_HARIAN_COLUMN(), primaryKey: 'id' },
  { label: 'Beban  Bulanan', value: 'puncak_bulanan', format: 'MM/YYYY', pathService: API_PATH().opsisdis.laporan_beban.uid.bulanan, column: BEBAN_UID_BULANAN_COLUMN(), primaryKey: 'id' },
  { label: 'Beban  Tahunan', value: 'puncak_tahunan', format: 'YYYY', pathService: API_PATH().opsisdis.laporan_beban.uid.tahunan, column: BEBAN_UID_TAHUNAN_COLUMN(), primaryKey: 'id' },
]

const customFilter = [{
  search: "__pemilik",
  field: "pemilik",
}]
export default function TracingBebanUIDPage() {
  // const queryParams = qs.parse(location.search);
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
              <Filter
                tabActive={tabActive}
                optionCurrentUser={currentUser} 
                optionJenisLayanan={false}
                isUID2={true}
                isOperator={true}
                isSatuan={true}
                isNilai={true}
                isBebanPuncak={tabActive != 'beban_perjam'}
                configFilter={["pemilik"]}
              />
            </Card.Body>
            {/* {(Object.keys(queryParams).length > 0) && ( */}
            {activeFilters?.filters?.pemilik && (
                
              <Card.Body>
                {/* {tabActive == "beban_perjam" &&
                  <DynamicBebanAreaTable pathService={tabActiveConf.pathService}
                    configParams={customFilter} columnsConfig={tabActiveConf.column} primaryKey={tabActiveConf.primaryKey} tabActive={'beban_perjam'} label="beban_uid" />
                }
                {tabActive == "beban_harian" &&
                  <DynamicBebanAreaTable pathService={tabActiveConf.pathService}
                  configParams={customFilter} columnsConfig={tabActiveConf.column} primaryKey={tabActiveConf.primaryKey} tabActive={'beban_harian'} label="beban_uid" />
                }
                {tabActive == "puncak_bulanan" &&
                  <DynamicBebanAreaTable pathService={tabActiveConf.pathService}
                  configParams={customFilter} columnsConfig={tabActiveConf.column} primaryKey={tabActiveConf.primaryKey} tabActive={'puncak_bulanan'} label="beban_uid" />
                }
                {tabActive == "puncak_tahunan" &&
                  <DynamicBebanAreaTable pathService={tabActiveConf.pathService}
                  configParams={customFilter} columnsConfig={tabActiveConf.column} primaryKey={tabActiveConf.primaryKey} tabActive={'puncak_tahunan'} label="beban_uid" />
                } */}
                {tabActive == "beban_perjam" &&
                  <DynamicBebanAreaTable pathService={API_PATH().opsisdis.laporan_beban.uid.jam}
                    configParams={customFilter} columnsConfig={BEBAN_UID_PERJAM_COLUMN_JQWIDGET()} primaryKey={tabActiveConf.primaryKey} tabActive={'beban_perjam'} label="beban_uid" />
                }
                {tabActive == "beban_harian" &&
                  <DynamicBebanAreaTable pathService={API_PATH().opsisdis.laporan_beban.uid.harian}
                  configParams={customFilter} columnsConfig={BEBAN_UID_HARIAN_COLUMN_JQWIDGET()} primaryKey={tabActiveConf.primaryKey} tabActive={'beban_harian'} label="beban_uid" />
                }
                {tabActive == "puncak_bulanan" &&
                  <DynamicBebanAreaTable pathService={API_PATH().opsisdis.laporan_beban.uid.bulanan}
                  configParams={customFilter} columnsConfig={BEBAN_UID_BULAN_COLUMN_JQWIDGET()} primaryKey={tabActiveConf.primaryKey} tabActive={'puncak_bulanan'} label="beban_uid" />
                }
                {tabActive == "puncak_tahunan" &&
                  <DynamicBebanAreaTable pathService={API_PATH().opsisdis.laporan_beban.uid.tahunan}
                  configParams={customFilter} columnsConfig={BEBAN_UID_TAHUN_COLUMN_JQWIDGET()} primaryKey={tabActiveConf.primaryKey} tabActive={'puncak_tahunan'} label="beban_uid" />
                }
                {/* <DynamicBebanAreaTable
                  pathService={tabActiveConf.pathService}
                  columnsConfig={tabActiveConf.column}
                  primaryKey={tabActiveConf.primaryKey}
                  tabActive={tabActive}
                  label={'beban_uid'}
                /> */}
              </Card.Body>
             )} 

          </Card>
        </Col>
      </Row>
    </>
  )
}
