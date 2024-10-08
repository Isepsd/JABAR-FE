import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Tab, Tabs } from 'react-bootstrap';

import TableInputJadwalJQ from '@app/modules/opsisdis/JawdalPemeliharaan/TableInputJadwalJQ';
import TableDetailJadwalPemeliharaanJQ from '@app/modules/opsisdis/JawdalPemeliharaan/TableDetailJadwalPemeliharaanJQ';
import { API_PATH } from '@app/services/_path.service';
import {
  INPUT_JADWAL_DOKUEMNTASI_COLUMN,
  INPUT_JADWAL_GARDU_COLUMN,
} from '@app/configs/react-table/opsisdis/jadwal-pemeliharaan.column';
import { head } from 'lodash';
import CardFilter from '@app/components/Filter/CardFilter';
import Filter from '@app/modules/opsisdis/JawdalPemeliharaan/Filter';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
import moment from 'moment';
const tabOptions = [
  {
    label: 'Gardu',
    value: 'gardu',
    format: 'DD/MM/YYYY HH:mm',
    pathService: API_PATH().opsisdis.jadwal_pemeliharaan.gardu,
    column: INPUT_JADWAL_GARDU_COLUMN(),
    primaryKey: 'id_trans_jadwal_har_gardu',
    add: true,
  },
  {
    label: 'Dokumentasi',
    value: 'dokumentasi',
    format: 'YYYY',
    pathService: API_PATH().opsisdis.jadwal_pemeliharaan.dok,
    column: INPUT_JADWAL_DOKUEMNTASI_COLUMN(),
    primaryKey: 'id_trans_jadwal_har_dok',
    add: true,
  },
];
function InputJadwal() {
  const [details, setDetails] = useState<any>();
  const [trigger, setTrigger] = useState<any>();
  const [tabActive, setTabActive] = useState<string>(tabOptions[0]['value']);
  const [tabActiveConf, setTabActiveConf] = useState<any>(tabOptions[0]);
  const [dataSelected] = useState<any>(null);
  const [roleActions, setRoleActions] = useState<any>({});

  useEffect(() => {
    const active: any = head(
      tabOptions.filter((x: any) => x.value == tabActive)
    );
    setTabActiveConf(active);
  }, [tabActive]);

  // const handleSelectedRows = (item: any) => {

  //   if (item?.length > 0) {
  //     setDataSelected(item[0]);
  //   }
  // };


  const handleRowSelected = (data: any) => {
    dataSelected.current = data.current;
    setDetails(dataSelected?.current?.id_apkt_trans_jar);
    setTrigger(dataSelected?.current?.id_apkt_trans_jar);
}
  const [filterValues, setFilterValues] = useState<any>({
    tgl_after: moment().subtract(1, 'days').format('YYYY-MM-DD'),
    tgl_before: moment().format('YYYY-MM-DD'),
    butuh_padam: null,
    status_pekerjaan: null,
    id_up3: null,
  
});
  const handleFilterChange = (newFilterValues: any) => {
    setFilterValues(newFilterValues);
};



  useEffect(() => {
    let roleAccess = ROLE_ACCESS("input-jadwal-pemeliharaan")
    const roleAct = {
      view: ROLE_ACTION(roleAccess, 'view'),
      approve: ROLE_ACTION(roleAccess, 'approve'),
      reject: ROLE_ACTION(roleAccess, 'reject'),
      create: ROLE_ACTION(roleAccess, 'create'),
      update: ROLE_ACTION(roleAccess, 'update'),
      delete: ROLE_ACTION(roleAccess, 'delete'),
    };
    setRoleActions(roleAct);
  }, [])

  return (
    <>
      <CardFilter>
        <Filter isStatusPek={false} isButuhPadam={false} isWilayah={false} onFilterChange={handleFilterChange} />
      </CardFilter>
      <Row>
        <Col md={12} className='mb-4 mt-4'>
          <Card className='card-widget position-static'>
            <Card.Header className='text-uppercase'>
              JADWAL PEMELIHARAAN
            </Card.Header>
            <Card.Body>
              <TableInputJadwalJQ
                roleActions={roleActions}
                  onCheckedRows={handleRowSelected}
                filterParams={{ sort_by: "tgl_after,tgl_before,status_pekerjaan,butuh_padam", ...filterValues }}
                page='input-jadwal-pemeliharaan'
                
              />
            </Card.Body>
          </Card>
        </Col>
        {trigger && (
          <Col md={12} className='mb-4 position-static'>
            <Card className='card-widget position-static'>
              <Card.Body>
                <Tabs
                  defaultActiveKey='1'
                  activeKey={tabActive}
                  onSelect={(k: any) => setTabActive(k)}
                  className='mb-3 tab-sm'
                >
                  {tabOptions.map((tab: any) => (
                    <Tab
                      key={tab.value}
                      eventKey={tab.value}
                      title={tab.label}
                    />
                  ))}
                </Tabs>
              </Card.Body>
              {tabActiveConf?.value == '1' &&
              <Card.Body>
                <TableDetailJadwalPemeliharaanJQ
                filterParams={{ ref_apkt_trans_jar: details ? details : null }} 
                  // path={tabActiveConf.pathService}
                  // columnsConfig={tabActiveConf.column}
                  // primaryKey={tabActiveConf.primaryKey}
                  // tabActive={tabActiveConf.value}
                  // parent={dataSelected}
                  // add={tabActiveConf.add}
                />
               
              </Card.Body>

}
            </Card>
          </Col>
        )}
      </Row>
    </>
  );
}

export default InputJadwal;
