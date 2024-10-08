import React, { useState } from "react";
// import JqxTabs from "jqwidgets-scripts/jqwidgets-react-tsx/jqxtabs";

/** CONFIG */
import { SOE_COLUMNS_JQX } from "@app/configs/react-table/fasop/soe.column";

/** COMPONENTS */
import TableDataJqxGridNew from "@app/modules/Table/TableDataJqxGridNew";
import "jqwidgets-scripts/jqwidgets/jqxtabs";

/** SERVICE */
import { API_PATH } from "@app/services/_path.service";
// import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
import SoeFilter from "@app/modules/Fasop/SoeFilter";

import moment from "moment";
export default function KinerjaScadaPageJQ() {
  // const [roleActions, setRoleActions] = useState<any>({});

  /** GET DATA unit pembangkit */

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
        ...item,
        number: item?.number,
        time_stamp: item?.msec ? `${timeStampGMT7}.${item.msec}` : timeStampGMT7,
        system_time_stamp: item?.system_time_stamp_tzlocal,
        path1: item?.path1,
        path2: item?.path2,
        path3: item?.path3,
        path4: item?.path4,
        path5: item?.path5,
        message_text: item?.message_text,
        msgstatus: item?.msgstatus,
        // { text: 'Status', datafield: 'msgstatus', width: '10%', editable: false, },
        // { text: 'Tag', datafield: 'tag', width: '10%', editable: false, },
        // { text: 'Operator', datafield: 'operator', width: '10%', editable: false, },
        // { text: 'Limit', datafield: 'limit', width: '10%', editable: false, },
        // { text: 'value', datafield: 'value', width: '10%', editable: false, },
      });
    });
    return dataTableValue;
  };

  const [filterValues, setFilterValues] = useState<any>({
    tanggal_akhir: moment().format("YYYY-MM-DD HH:mm:ss"),
    tanggal_mulai: moment().subtract(1, "hour").format("YYYY-MM-DD HH:mm:ss"),
 
  });
  const handleFilterChange = (newFilterValues: any) => {
    setFilterValues(newFilterValues);
  };
  const handleCheckedRows = (data: any) => {
    return data;
  };
  // const handleCheckedRows2 = (data: any) => {
  //     return data;
  // }

  return (
    <>
      <SoeFilter onFilterChange={handleFilterChange} />

      {/* <JqxTabs theme="light"> */}
      {/* <ul style={{ marginLeft: 10 }} key="1">
          <li><i className="fa-solid fa-server"></i> Ketersediaan Peralatan SCADA</li> */}
      {/* <li><i className="fa-solid fa-business-time"></i> Konfigurasi Retency</li> */}
      {/* </ul> */}
      {/* <div key="2"> */}
      <TableDataJqxGridNew
        //TABLE DATA
        path={API_PATH().fasop.laporan_scada.soe_alarm_proteksi}
        filterParams={{
          sort_by: "-time_stamp",
          ...filterValues,
        }}
        dataFieldsColsConfig={SOE_COLUMNS_JQX()}
        primaryKey={"id_kin_digital_harian"}
        respDataApi={handleRespDataApi}
        filterable={true}
        onRowSelected={handleCheckedRows}
        exportbtn={true}
      />
      {/* </div> */}
      {/* </JqxTabs> */}
    </>
  );
}
