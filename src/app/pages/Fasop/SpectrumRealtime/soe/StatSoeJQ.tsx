import React, { useState, useEffect, useRef } from 'react';
import JqxTabs from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtabs';

/** CONFIG */
import { SCADATEL_STATUS_SOE_COLUMN_JQX } from '@app/configs/react-table/fasop/spectrum-realtime.column';

/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';
import { getAllByPath } from '@app/services/main.service';
import axios from 'axios';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';

export default function StatTelemeteringPageJQnew() {
  let roleAccess = ROLE_ACCESS("telemetering");
  const source = axios.CancelToken.source();
  const roleActions = {
    view: ROLE_ACTION(roleAccess, 'view'),
    create: ROLE_ACTION(roleAccess, 'create'),
    update: ROLE_ACTION(roleAccess, 'update'),
    delete: ROLE_ACTION(roleAccess, 'delete'),
  };

  const dataSelected = useRef<any>();
  const [filterParams, setFilterParams] = useState({

    page: 1,
    limit: 20,
    sort_by: '-sequence'
  });

/** MAP DATA FROM API RESPONSE */
const handleRespDataApi = (data: any) => {
  let dataTableValue: any = [];

  // Fungsi untuk mengonversi waktu ke GMT+7 dengan mengganti 'T' menjadi spasi
  const convertToGMT7 = (timeStamp: any) => {
    const date = new Date(timeStamp);
    const gmt7Offset = 7 * 60 * 60 * 1000; // GMT+7 dalam milidetik
    const localTime = new Date(date.getTime() + gmt7Offset);
    return localTime.toISOString().replace('T', ' ').replace('Z', ''); // Hapus 'Z' dan ubah 'T' menjadi spasi
  };

  data?.forEach((item: any) => {
    // Konversi time_stamp dan system_time_stamp ke GMT+7 dengan spasi
    const timeStampGMT7 = item?.time_stamp ? convertToGMT7(item.time_stamp) : '';
    // const systemTimeStampGMT7 = item?.system_time_stamp ? convertToGMT7(item.system_time_stamp) : '';

    dataTableValue.push({
      number: item?.number,
      time_stamp: item?.msec ? `${timeStampGMT7}.${item.msec}` : timeStampGMT7,
      system_time_stamp: item?.system_time_stamp_tzlocal,
      message_text: item?.message_text
    });
  });

  return dataTableValue;
};



  const handleRowSelected = (data: any) => {
    dataSelected.current = data.current;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const req: any = await getAllByPath(API_PATH().fasop.realtime.soe, filterParams, source.token);
        const { results } = req;
        handleRespDataApi(results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const timer = setInterval(() => {
      setFilterParams(prevParams => ({
        ...prevParams,
        // Adjust the parameters as needed here
        // Example change, incrementing the page number
      }));
      fetchData();
    }, 5000); // Refresh every 5 seconds (5000 milliseconds)

    // Initial data fetch
    fetchData();

    return () => {
      // source.cancel();
      clearInterval(timer);
    };
  }, [filterParams]); // Dependency on filterParams to trigger updates

  return (
    <>
      {roleActions.create && roleActions.update && roleActions.delete &&
        <JqxTabs theme={"light"}>
          <ul style={{ marginLeft: 10 }} key="1">
            <li><i className="fa-solid fa-server"></i> Soe</li>
          </ul>
          <div key="2">
            <TableDataJqxGridNew
              // TABLE DATA
              path={API_PATH().fasop.realtime.soe}
              filterParams={filterParams} // Use the filterParams state
              dataFieldsColsConfig={SCADATEL_STATUS_SOE_COLUMN_JQX()}
              primaryKey={'id_pointtype'}
              respDataApi={handleRespDataApi}
              filterable={true}
              onRowSelected={handleRowSelected}
              exportbtn={true}
            />
          </div>
        </JqxTabs>
      }
    </>
  );
}
