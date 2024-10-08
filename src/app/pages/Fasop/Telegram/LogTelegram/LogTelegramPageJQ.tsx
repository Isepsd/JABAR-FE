import React, { useState } from 'react';
import JqxTabs from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtabs';


/** CONFIG */
import { TELEGRAM_LOG_COLUMNS_JQX } from '@app/configs/react-table/fasop/telegram.column';

/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';
import 'jqwidgets-scripts/jqwidgets/jqxtabs';


/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
// import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
import LogTelegramFilter from './LogTelegramFilter';

import moment from 'moment';
export default function LogTelegramPageJQ() {
  // const [roleActions, setRoleActions] = useState<any>({});
 
  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        id: item?.id,
        number: item?.number,
        msg: item?.msg,
        nama_bot: item.nama_bot,
        nama_chat: item.nama_chat,
        pesan_error: item.pesan_error,
        datum_sent: item.datum_sent,
        kirim_ulang: item?.kirim_ulang,
        status_sent: item?.status_sent

      });
    });
    return dataTableValue;
  }
  const [filterValues, setFilterValues] = useState<any>({
    datum_sent_1: moment().subtract(1, 'days').format('YYYY-MM-DD'), datum_sent_2: moment().format('YYYY-MM-DD'), id_telegram_bot: null, id_telegram_group: null
  
});
  const handleFilterChange = (newFilterValues: any) => {
    setFilterValues(newFilterValues);
};

  const handleCheckedRows = (data: any) => {
    return data;
  }
  // const handleCheckedRows2 = (data: any) => {
  //     return data;
  // }
  return (
    <>
    
        <LogTelegramFilter  onFilterChange={handleFilterChange} />
     

      <JqxTabs theme='light'>
        <ul style={{ marginLeft: 10 }} key="1">
          <li><i className="fa-solid fa-server"></i> Log Telegram</li>
        </ul>
        <div key="2">
          <TableDataJqxGridNew
            //TABLE DATA
            path={API_PATH().fasop.telegram.log}
            filterParams={{ sort_by: "id_telegram_bot", ...filterValues }}
            dataFieldsColsConfig={TELEGRAM_LOG_COLUMNS_JQX()}
            primaryKey={'id'}
            respDataApi={handleRespDataApi}
            filterable={true}
            onRowSelected={handleCheckedRows}
            exportbtn={true}
          />
        </div>
      </JqxTabs>
    </>
  );
}