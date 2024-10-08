import React, { useState, useEffect } from 'react'
import { Tab, Tabs, Card, Col, Row } from 'react-bootstrap';
import { head } from 'lodash';
import qs from 'query-string';
import { exportingData } from '@app/store/reducers/app';
import { useDispatch } from 'react-redux';

/** COMPONENT */
import DynamicBebanAreaTable from '@app/modules/opsisdis/LaporanBeban/DynamicBebanAreaTable';
import Filter from '@app/modules/opsisdis/TracingBeban/Filter';

/** CONFIG */
import {
  BEBAN_SUBSISTEM_PERJAM_COLUMN, BEBAN_SUBSISTEM_HARIAN_COLUMN, BEBAN_PUNCAK_BULANAN_SUBSISTEM_COLUMN, BEBAN_PUNCAK_TAHUNAN_SUBSISTEM_COLUMN,
} from '@app/configs/react-table/opsisdis/laporan-beban.column.config';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
const tabOptions = [
  { label: 'Beban Per Jam', value: 'beban_perjam', format: 'DD/MM/YYYY HH:mm', pathService: API_PATH().opsisdis.laporan_beban.subsistem.jam, column: BEBAN_SUBSISTEM_PERJAM_COLUMN(), primaryKey: 'id' },
  { label: 'Beban Harian', value: 'beban_harian', format: 'DD/MM/YYYY', pathService: API_PATH().opsisdis.laporan_beban.subsistem.harian, column: BEBAN_SUBSISTEM_HARIAN_COLUMN(), primaryKey: 'id' },
  { label: 'Beban  Bulanan', value: 'puncak_bulanan', format: 'MM/YYYY', pathService: API_PATH().opsisdis.laporan_beban.subsistem.bulanan, column: BEBAN_PUNCAK_BULANAN_SUBSISTEM_COLUMN(), primaryKey: 'id' },
  { label: 'Beban  Tahunan', value: 'puncak_tahunan', format: 'YYYY', pathService: API_PATH().opsisdis.laporan_beban.subsistem.tahunan, column: BEBAN_PUNCAK_TAHUNAN_SUBSISTEM_COLUMN(), primaryKey: 'id' },
]

export default function TracingBebanSubSistemPage() {
  const queryParams = qs.parse(location.search);
  const dispatch = useDispatch();

  const [tabActive, setTabActive] = useState<string>(tabOptions[0]['value'])
  const [tabActiveConf, setTabActiveConf] = useState<any>(tabOptions[0])
  // const { activeFilters } = useSelector(
  //   (state: any) => state.ui
  // );

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
                isSubSistem={true}
                isOperator={true}
                isSatuan={true}
                isNilai={true}
                isBebanPuncak={tabActive != 'beban_perjam'}
                configFilter={[]}
              />
            </Card.Body>
            {(Object.keys(queryParams).length > 0) && (

              <Card.Body>
                {tabActive == "beban_perjam" &&
                  <DynamicBebanAreaTable pathService={tabActiveConf.pathService}
                    columnsConfig={tabActiveConf.column} primaryKey={tabActiveConf.primaryKey} tabActive={'beban_perjam'} label="beban_sub_sistem" />
                }
                {tabActive == "beban_harian" &&
                  <DynamicBebanAreaTable pathService={tabActiveConf.pathService}
                    columnsConfig={tabActiveConf.column} primaryKey={tabActiveConf.primaryKey} tabActive={'beban_harian'} label="beban_sub_sistem" />
                }
                {tabActive == "puncak_bulanan" &&
                  <DynamicBebanAreaTable pathService={tabActiveConf.pathService}
                    columnsConfig={tabActiveConf.column} primaryKey={tabActiveConf.primaryKey} tabActive={'puncak_bulanan'} label="beban_sub_sistem" />
                }
                {tabActive == "puncak_tahunan" &&
                  <DynamicBebanAreaTable pathService={tabActiveConf.pathService}
                    columnsConfig={tabActiveConf.column} primaryKey={tabActiveConf.primaryKey} tabActive={'puncak_tahunan'} label="beban_sub_sistem" />
                }
                {/* <DynamicBebanAreaTable
                  pathService={tabActiveConf.pathService}
                  columnsConfig={tabActiveConf.column}
                  primaryKey={tabActiveConf.primaryKey}
                  tabActive={tabActive}
                  label={'beban_sub_sistem'}
                /> */}
              </Card.Body>
            )}
          </Card>
        </Col>
      </Row>
    </>
  )
}
