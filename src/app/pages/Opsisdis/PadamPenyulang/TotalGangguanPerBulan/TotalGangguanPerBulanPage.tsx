import React, { useState, useEffect } from 'react'
import { Tab, Tabs, Card, Col, Row } from 'react-bootstrap';
import { head } from 'lodash';

/** HELPER */

/** COMPONENT */
import DynamicBebanAreaTable from '@app/modules/opsisdis/PadamPenyulang/DynamicBebanAreaTable';
import SubSistemFilter from './SubSistemFilter';
/** CONFIG */
// import {
//   BEBAN_PEMBANGKIT_PERJAM_COLUMN, BEBAN_PEMBANGKIT_HARIAN_COLUMN, BEBAN_PEMBANGKIT_BULANAN_COLUMN, BEBAN_PEMBANGKIT_TAHUNAN_COLUMN,
//   // LOAD_SUBSISTEM_FAKTOR_BULANAN_COLUMN 
// } from '@app/configs/react-table/opsisdis/laporan-beban.column.config';

import {
  TOTAL_GANGGUAN_PER_BULAN_COLUMN
  // LOAD_SUBSISTEM_FAKTOR_BULANAN_COLUMN 
} from '@app/configs/react-table/opsisdis/padam-penyulang/padam-penyulang';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { useSelector } from 'react-redux';
// import ChartNyoba from '@app/modules/opsisdis/ChartPadamPenyulang/ChartNyoba';
// import ChartNyoba from '@app/modules/opsisdis/ChartPadamPenyulang/ChartPadamPenyulang';
import ChartNyoba from './ChartNyobaPadamPenyulang';
// import { BEBAN_PEMBANGKIT_BULAN_COLUMN_JQWidget, BEBAN_PEMBANGKIT_HARIAN_COLUMN_JQWidget, BEBAN_PEMBANGKIT_PERJAM_COLUMN_JQWIDGET, BEBAN_PEMBANGKIT_TAHUN_COLUMN_JQWidget } from '@app/configs/jqwidget/laporan-beban-pembangkit';
import { TOTAL_LAMA_PADAM_GANGGUAN_COLUMN_JQWidget } from '@app/configs/react-table/opsisdis/padam-penyulang/laporan-penyulang.column';
import { GROUP_DAYA_AKTIF_JQWidget } from '@app/configs/jqwidget/_more-jqwidget.column.config';
// import TableDataPagination from '@app/modules/Table/TableDataPagination';
import qs from "query-string";
const tabOptions = [
  // { label: 'Beban Per Jam', value: 'beban_perjam', format: 'DD/MM/YYYY HH:mm', pathService: API_PATH().opsisdis.laporan_beban.pembangkit.jam, column: BEBAN_PEMBANGKIT_PERJAM_COLUMN(), primaryKey: 'id' },
  // { label: 'Beban Harian', value: 'beban_harian', format: 'DD/MM/YYYY', pathService: API_PATH().opsisdis.laporan_beban.pembangkit.harian, column: BEBAN_PEMBANGKIT_HARIAN_COLUMN(), primaryKey: 'id' },
  // { label: 'Total Gangguan', value: 'puncak_bulanan', format: 'MM/YYYY', pathService: API_PATH().opsisdis.laporan_beban.pembangkit.bulanan, column: BEBAN_PEMBANGKIT_BULANAN_COLUMN(), primaryKey: 'id' },
  { label: 'Total Gangguan', value: 'puncak_tahunan', format: 'YYYY', pathService: API_PATH().opsisdis.padam_penyulang.total_ggn_bulan, column: TOTAL_GANGGUAN_PER_BULAN_COLUMN(), primaryKey: 'id' },
]


// type Props = {
//   optionCurrentUser?: any;
// };

// const customFilter = [
//   {
//     search: "__pusat",
//     field: "id_pusat",
//   },
//   {
//     search: "__regional",
//     field: "id_regional",
//   },
//   {
//     search: "__pemilik",
//     field: "id_pemilik",
//   },
//   // {
//   //   search: "__pengelola",
//   //   field: "id_pengelola",
//   // },
//   // {
//   //   search: "__subpengelola",
//   //   field: "id_sub_pengelola",
//   // },
// ];
export default function TotalGangguanPerBulanPage() {
  // export default function TotalGangguanPerBulanPage({ optionCurrentUser }: Props) {
  const [tabActive, setTabActive] = useState<string>(tabOptions[0]['value'])
  const [tabActiveConf, setTabActiveConf] = useState<any>(tabOptions[0])
  // const { activeFilters } = useSelector(
  //   (state: any) => state.ui
  // );

  const queryParams = qs.parse(location.search);
  const { currentUser } = useSelector((state: any) => state.auth);



  useEffect(() => {
    const active: any = head(tabOptions.filter((x: any) => x.value == tabActive))
    setTabActiveConf(active)
  }, [tabActive])

  /** MAP DATA FROM API RESPONSE */
  // const dummyData = [
  //     { month: "Januari 2024", year: "2024", gangguan: "0", number: 1 },
  //     { month: "Februari 2024", year: "2024", gangguan: "0", number: 2 },
  //     { month: "Maret 2024", year: "2024", gangguan: "0", number: 3 },
  //     { month: "April 2024", year: "2024", gangguan: "0", number: 4 },
  //     { month: "Mei 2024", year: "2024", gangguan: "0", number: 5 },
  //     { month: "Juni 2024", year: "2024", gangguan: "0", number: 6 },
  //     { month: "Juli 2024", year: "2024", gangguan: "0", number: 7 },
  //     { month: "Agustus 2024", year: "2024", gangguan: "0", number: 8 },
  //     { month: "September 2024", year: "2024", gangguan: "0", number: 9 },
  //     { month: "Oktober 2024", year: "2024", gangguan: "0", number: 10 },
  //     { month: "November 2024", year: "2024", gangguan: "0", number: 11 },
  //     { month: "Desember 2024", year: "2024", gangguan: "0", number: 12 },

  //   ];


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
                {/* <SubSistemFilter tabActive={tabActive} isUnitPembangkit={true} isPembangkit={true} configFilter={["id_ref_lokasi_unit_pembangkit"]} /> */}
                {/* <SubSistemFilter tabActive={tabActive} configFilter={["id_ref_lokasi_gi"]} /> */}
                {/* <SubSistemFilter tabActive={tabActive} optionCurrentUser={currentUser} optionJenisLayanan={false} isUID={true} isGarduInduk={true} configFilter={["id_pusat","id_regional","id_pemilik"]}/> */}
                {/* <SubSistemFilter tabActive={tabActive} optionCurrentUser={currentUser} optionJenisLayanan={false} isRegional={true} isUID={true} isUP2D={true} configFilter={["id_pusat","id_regional","id_pemilik","id_pengelola"]}/> */}
                <SubSistemFilter tabActive={tabActive} optionCurrentUser={currentUser} optionJenisLayanan={false} isRegional={true} isUID={true} isUP2D={true} configFilter={[]} />

              </div>
              <hr />

              {/* {activeFilters?.filters?.id_pusat && activeFilters?.filters?.id_regional && activeFilters?.filters?.id_pemilik && activeFilters?.filters?.id_pengelola && activeFilters?.filters?.id_sub_pengelola && ( */}
              {/* {activeFilters?.filters?.id_pusat && activeFilters?.filters?.id_regional && activeFilters?.filters?.id_pemilik && ( */}
              {/* {activeFilters?.filters?.id_pengelola && ( */}
              {Object.keys(queryParams).length > 0 && (
                <ChartNyoba
                  tabActive={tabActive}
                  // path={tabActiveConf.pathService}
                  path={API_PATH().opsisdis.padam_penyulang.total_ggn_bulan}
                  format={tabActiveConf.format}
                  page="laporan-beban-pembangkit"
                />
              )}
              {/* // } */}

            </Card.Body>
            {/* {activeFilters?.filters?.id_ref_lokasi_unit_pembangkit && ( */}
            {/* {activeFilters?.filters?.id_pusat && activeFilters?.filters?.id_regional && activeFilters?.filters?.id_pemilik && activeFilters?.filters?.id_pengelola && activeFilters?.filters?.id_sub_pengelola && ( */}
            {/* {activeFilters?.filters?.id_pusat && activeFilters?.filters?.id_regional && activeFilters?.filters?.id_pemilik && ( */}
            {/* {activeFilters?.filters?.id_pengelola && ( */}
            {Object.keys(queryParams).length > 0 && (
              <Card.Body>
                {/* {tabActive == "beban_perjam" &&
                  <DynamicBebanAreaTable pathService={API_PATH().opsisdis.laporan_beban.pembangkit.jam} columnsConfig={BEBAN_PEMBANGKIT_PERJAM_COLUMN_JQWIDGET()} primaryKey={tabActiveConf.primaryKey} configParams={customFilter} tabActive={'beban_perjam'} label="laporan beban pembangkit" columnsGroupConfig={null} />
                }
                {tabActive == "beban_harian" &&
                  <DynamicBebanAreaTable pathService={API_PATH().opsisdis.laporan_beban.pembangkit.harian} columnsConfig={BEBAN_PEMBANGKIT_HARIAN_COLUMN_JQWidget()} primaryKey={tabActiveConf.primaryKey} configParams={customFilter} tabActive={'beban_harian'} label="laporan beban pembangkit" columnsGroupConfig={GROUP_DAYA_AKTIF_JQWidget("Hari")} />
                }
                {tabActive == "puncak_bulanan" &&
                  <DynamicBebanAreaTable pathService={API_PATH().opsisdis.laporan_beban.pembangkit.bulanan} columnsConfig={BEBAN_PEMBANGKIT_BULAN_COLUMN_JQWidget()} primaryKey={tabActiveConf.primaryKey} configParams={customFilter} tabActive={'puncak_bulanan'} label="laporan beban pembangkit" columnsGroupConfig={GROUP_DAYA_AKTIF_JQWidget("Bulan")} />
                } */}
                {/* {tabActive == "puncak_tahunan" &&
                  <DynamicBebanAreaTable configParams={customFilter} pathService={API_PATH().opsisdis.laporan_beban.pembangkit.tahunan} columnsConfig={TOTAL_LAMA_PADAM_GANGGUAN_COLUMN_JQWidget()} primaryKey={tabActiveConf.primaryKey} tabActive={'puncak_tahunan'} label="laporan beban pembangkit" columnsGroupConfig={GROUP_DAYA_AKTIF_JQWidget("Tahun")}/>
                } */}

                {tabActive == "puncak_tahunan" &&
                  <DynamicBebanAreaTable pathService={API_PATH().opsisdis.padam_penyulang.total_ggn_bulan} columnsConfig={TOTAL_LAMA_PADAM_GANGGUAN_COLUMN_JQWidget()} primaryKey={tabActiveConf.primaryKey} tabActive={'puncak_tahunan'} label="laporan beban pembangkit" columnsGroupConfig={GROUP_DAYA_AKTIF_JQWidget("Tahun")}
                    filterParams={{
                      // id_pusat:
                      //   optionCurrentUser?.level == "PUSAT"
                      //     ? optionCurrentUser?.id_unit_lokasi
                      //     : queryParams?.__pusat,
                      // id_regional:
                      //   optionCurrentUser?.level == "REGIONAL"
                      //     ? optionCurrentUser?.id_unit_lokasi
                      //     : queryParams?.__regional,
                      // id_pemilik:
                      //   optionCurrentUser?.level == "UNIT_INDUK"
                      //     ? optionCurrentUser?.id_unit_lokasi
                      //     : queryParams?.__pemilik,
                      // id_pengelola:
                      //   optionCurrentUser?.level == "UP2D" ||
                      //     optionCurrentUser?.level == "UP3"
                      //     ? optionCurrentUser?.id_unit_lokasi
                      //     : queryParams?.__pengelola,
                      // id_sub_pengelola:
                      //   optionCurrentUser?.level == "ULP"
                      //     ? optionCurrentUser?.id_unit_lokasi
                      //     : queryParams?.__subpengelola,
                    }}
                  />
                }

                {/* {tabActive == "puncak_tahunan" &&
                  <DynamicBebanAreaTable data={dummyData} />
                } */}


                {/* <DynamicBebanAreaTable pathService={tabActiveConf.pathService} columnsConfig={tabActiveConf.column} primaryKey={tabActiveConf.primaryKey}
                  configParams={customFilter} tabActive={tabActive}
                /> */}
              </Card.Body>
            )}
            {/* )} */}
          </Card>
        </Col>

      </Row>
    </>
  )
}