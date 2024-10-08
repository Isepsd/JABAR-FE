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
// import {
//   BEBAN_UID_BULANAN_COLUMN, BEBAN_UID_HARIAN_COLUMN, BEBAN_UID_PERJAM_COLUMN, BEBAN_UID_TAHUNAN_COLUMN,
// } from '@app/configs/react-table/opsisdis/laporan-beban.column.config';
import {
  TRIP_BERSAMAAN_COLUMN
  // LOAD_SUBSISTEM_FAKTOR_BULANAN_COLUMN 
} from '@app/configs/react-table/opsisdis/padam-penyulang/padam-penyulang';
import { TRIP_BERSAMAAN_COLUMN_JQWidget } from '@app/configs/react-table/opsisdis/padam-penyulang/laporan-penyulang.column';

// import ChartlaporanBeban from '@app/modules/opsisdis/ChartPadamPenyulang/ChartlaporanBeban';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
// import { useSelector } from 'react-redux';
// import TableDataPagination from '@app/modules/Table/TableDataPagination';

const tabOptions = [
  { label: 'Trip Bersamaan', value: 'beban_perjam', format: 'DD/MM/YYYY HH:mm', pathService: API_PATH().opsisdis.gangguan_penyulang.trip_bersamaan, column: TRIP_BERSAMAAN_COLUMN(), primaryKey: 'id' },
  // { label: 'Beban Harian', value: 'beban_harian', format: 'DD/MM/YYYY', pathService: API_PATH().opsisdis.laporan_beban.uid.harian, column: BEBAN_UID_HARIAN_COLUMN(), primaryKey: 'id' },
  // { label: 'Kali Trip Per Penyulang Per Tanggal', value: 'beban_bulanan', format: 'MM/YYYY', pathService: API_PATH().opsisdis.laporan_beban.uid.bulanan, column: KALI_TRIP_PER_PENYULANG_PER_BULAN_COLUMN(), primaryKey: 'id' },
  // { label: 'Beban  Tahunan', value: 'puncak_tahunan', format: 'YYYY', pathService: API_PATH().opsisdis.laporan_beban.uid.tahunan, column: BEBAN_UID_TAHUNAN_COLUMN(), primaryKey: 'id' },
]
export default function TripBersamaan() {
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
                  configFilter={["id_pengelola"]}
                /> */}
                <SubSistemFilter tabActive={tabActive} optionCurrentUser={currentUser} optionJenisLayanan={false} isRegional={true} isUID={true} isUP2D={true} configFilter={[]} />
              </div>
              <hr />
              {/* <ChartlaporanBeban
                  tabActive={tabActive}
                  path={tabActiveConf.pathService}
                  format={tabActiveConf.format}
                  page="laporan-beban-pembangkit"
                /> */}
            </Card.Body>
            {(Object.keys(queryParams).length > 0) && (
              // {activeFilters?.filters?.id_pengelola && (   
              <Card.Body>
                {tabActive == "beban_perjam" &&
                  <DynamicBebanAreaTable pathService={API_PATH().opsisdis.gangguan_penyulang.trip_bersamaan}
                    columnsConfig={TRIP_BERSAMAAN_COLUMN_JQWidget()} primaryKey={tabActiveConf.primaryKey} tabActive={'beban_perjam'} label="beban_uid" />
                }
              </Card.Body>
            )}

          </Card>
        </Col>
      </Row>
    </>
  )
}
