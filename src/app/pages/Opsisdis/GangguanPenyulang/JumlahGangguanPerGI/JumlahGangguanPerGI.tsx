import React, { useState, useEffect } from 'react'
import { Tab, Tabs, Card, Col, Row } from 'react-bootstrap';
import { head } from 'lodash';
import qs from 'query-string';
import { exportingData } from '@app/store/reducers/app';
import { useDispatch, useSelector } from 'react-redux';

/** COMPONENT */
import DynamicBebanAreaTable from '@app/modules/opsisdis/LaporanBeban/DynamicBebanAreaTable';
// import Filter from '@app/modules/opsisdis/PadamPenyulang/Filter';
import SubSistemFilter from './SubSistemFilter';

/** CONFIG */
import {
  JUMLAH_GANGGUAN_PER_GI_COLUMN
} from '@app/configs/react-table/opsisdis/padam-penyulang/padam-penyulang';
import { JUMLAH_GANGGUAN_PER_GI_COLUMN_JQWidget } from '@app/configs/react-table/opsisdis/padam-penyulang/laporan-penyulang.column';

import ChartlaporanBeban from '@app/modules/opsisdis/ChartPadamPenyulang/ChartlaporanBeban';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';

const tabOptions = [
  { label: 'Jumlah Gangguan Per GI', value: 'beban_perjam', format: 'DD/MM/YYYY HH:mm', pathService: API_PATH().opsisdis.gangguan_penyulang.jumlah_gangguan_per_gi, column: JUMLAH_GANGGUAN_PER_GI_COLUMN(), primaryKey: 'id' },
]
export default function JumlahGangguanPerGI() {
  const queryParams = qs.parse(location.search);
  const dispatch = useDispatch();

  const [tabActive, setTabActive] = useState<string>(tabOptions[0]['value'])
  const [tabActiveConf, setTabActiveConf] = useState<any>(tabOptions[0])
  // const { activeFilters } = useSelector(
  //   (state: any) => state.ui
  // );
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
              <div>
                {/* <Filter
                  tabActive={tabActive}
                  optionCurrentUser={currentUser}
                  optionJenisLayanan={false}
                  isUID={true}
                  // isOperator={true}
                  // isSatuan={true}
                  // isNilai={true}
                  isUP2D={true}
                  // isBebanPuncak={tabActive != 'beban_perjam'}
                  // isJumlah={true}
                  isKaliTrip={true}
                  configFilter={["id_pengelola"]}
                /> */}
                <SubSistemFilter tabActive={tabActive} optionCurrentUser={currentUser} optionJenisLayanan={false} isRegional={true} isUID={true} isUP2D={true} configFilter={[]} />
              </div>
              <hr />
              {(Object.keys(queryParams).length > 0) && (
                // {activeFilters?.filters?.id_pengelola && ( 
                <ChartlaporanBeban
                  tabActive={tabActive}
                  path={tabActiveConf.pathService}
                  format={tabActiveConf.format}
                  page="laporan-beban-pembangkit"
                />
              )}
            </Card.Body>
            {(Object.keys(queryParams).length > 0) && (
              // {activeFilters?.filters?.id_pengelola && ( 
              <Card.Body>
                {tabActive == "beban_perjam" &&
                  <DynamicBebanAreaTable pathService={API_PATH().opsisdis.gangguan_penyulang.jumlah_gangguan_per_gi}
                    columnsConfig={JUMLAH_GANGGUAN_PER_GI_COLUMN_JQWidget()} primaryKey={tabActiveConf.primaryKey} tabActive={'beban_perjam'} label="beban_uid" />
                }
              </Card.Body>
            )}

          </Card>
        </Col>
      </Row>
    </>
  )
}
