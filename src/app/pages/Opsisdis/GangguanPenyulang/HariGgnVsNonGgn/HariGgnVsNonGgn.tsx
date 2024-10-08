import React, { useState, useEffect } from 'react'
import { Tab, Tabs, Card, Col, Row } from 'react-bootstrap';
import { head } from 'lodash';

/** HELPER */

/** COMPONENT */
import DynamicBebanAreaTable from '@app/modules/opsisdis/PadamPenyulang/DynamicBebanAreaTable';
// import SubSistemFilter from '@app/modules/opsisdis/PadamPenyulang/SubSistemFilter';
import SubSistemFilter from './SubSistemFilter';
/** CONFIG */
import { useSelector } from 'react-redux';
import {
  HAR_GGN_VS_NON_GGN_COLUMN
} from '@app/configs/react-table/opsisdis/padam-penyulang/padam-penyulang';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import ChartlaporanBeban from './ChartNyobaPadamPenyulang';

import { TOTAL_LAMA_PADAM_GANGGUAN_COLUMN_JQWidget } from '@app/configs/react-table/opsisdis/padam-penyulang/laporan-penyulang.column';
import { GROUP_DAYA_AKTIF_JQWidget } from '@app/configs/jqwidget/_more-jqwidget.column.config';
import qs from 'query-string';

const tabOptions = [
  { label: 'Hari GGN VS non GGN', value: 'puncak_tahunan', format: 'YYYY', pathService: API_PATH().opsisdis.laporan_beban.pembangkit.tahunan, column: HAR_GGN_VS_NON_GGN_COLUMN(), primaryKey: 'id' },
]

export default function HariGgnVsNonGgn() {
  const queryParams = qs.parse(location.search);
  const [tabActive, setTabActive] = useState<string>(tabOptions[0]['value'])
  const [tabActiveConf, setTabActiveConf] = useState<any>(tabOptions[0])
  // const { activeFilters } = useSelector(
  //   (state: any) => state.ui
  // );

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
                <SubSistemFilter tabActive={tabActive} optionCurrentUser={currentUser} optionJenisLayanan={false} isRegional={true} isUID={true} isUP2D={true} configFilter={[]} />

              </div>
              <hr />
              {Object.keys(queryParams).length > 0 && (
                // {activeFilters?.filters?.id_pengelola && (
                <ChartlaporanBeban
                  tabActive={tabActive}
                  path={tabActiveConf.pathService}
                  format={tabActiveConf.format}
                  page="laporan-beban-pembangkit"
                />
              )}
              {/* // } */}
            </Card.Body>
            {Object.keys(queryParams).length > 0 && (
              // {activeFilters?.filters?.id_pengelola && (
              <Card.Body>
                {tabActive == "puncak_tahunan" &&
                  <DynamicBebanAreaTable pathService={API_PATH().opsisdis.laporan_beban.pembangkit.tahunan} columnsConfig={TOTAL_LAMA_PADAM_GANGGUAN_COLUMN_JQWidget()} primaryKey={tabActiveConf.primaryKey} tabActive={'puncak_tahunan'} label="laporan beban pembangkit" columnsGroupConfig={GROUP_DAYA_AKTIF_JQWidget("Tahun")} />
                }
              </Card.Body>
            )}
            {/* )} */}
          </Card>
        </Col>

      </Row>
    </>
  )
}
