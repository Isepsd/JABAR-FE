import React, { useEffect, useState } from 'react';

/** CONFIG */
import { SCADATEL_HISTORI_TELESIGNAL_COLUMN_JQX } from "@app/configs/react-table/fasop/spectrum-history.column";

/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';
import 'jqwidgets-scripts/jqwidgets/jqxtabs';
import CardWidget from '@app/components/Card/CardWidget';


/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
import HistoryFilter from './HistoryFilter'
import moment from "moment";


export default function HisTelesignalPageJQ() {
  const [roleActions, setRoleActions] = useState<any>({});

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        id: item?.id,
        number: item?.number,
        point_number: item?.point_number,
        jenis: item?.jenis,
        path1: item?.path1,
        path2: item?.path2,
        path3: item?.path3,
        path4: item?.path4,
        path5: item?.path5,
        datum_1: item?.datum_1,
        status_1: item?.status_1,
        datum_2: item?.datum_2,
        status_2: item?.status_2,
        durasi: item?.durasi,
        // status_data: item?.status_data,
        kesimpulan: item?.kesimpulan

      });
    });
    return dataTableValue;
  }
  const [filterValues, setFilterValues] = useState<any>({
    datum_after: moment().format("YYYY-MM-DD") + " 00:00:00",
    datum_before: moment().format("YYYY-MM-DD") + " 23:59:59",
  });
  const handleFilterChange = (newFilterValues: any) => {
    setFilterValues(newFilterValues);
  };

  useEffect(() => {
    let roleAccess = ROLE_ACCESS("telesignal");
    const roleAct = {
      view: ROLE_ACTION(roleAccess, 'view'),
    };
    setRoleActions(roleAct);
    console.log('roleAct', roleAct);
  }, []);


  const handleCheckedRows = (data: any) => {
    return data;
  }
  // const handleCheckedRows2 = (data: any) => {
  //     return data;
  // }

  // Initialize jqxTabs
  return (
    <>
      <CardWidget title='FILTER'>
        <HistoryFilter onFilterChange={handleFilterChange} />
      </CardWidget>

      {roleActions.view &&
        <div key="2">

          <TableDataJqxGridNew

            //TABLE DATA
            path={API_PATH().fasop.history.digital}
            filterParams={{ id_induk_pointtype: "5a9d6c6f-a333-45cc-9c0f-06e244b7d00c", ...filterValues }}
            dataFieldsColsConfig={SCADATEL_HISTORI_TELESIGNAL_COLUMN_JQX()}
            primaryKey={'id'}
            respDataApi={handleRespDataApi}
            filterable={true}
            onRowSelected={handleCheckedRows}
            exportbtn={true}
          />
        </div>
      }
    </>
  );
}