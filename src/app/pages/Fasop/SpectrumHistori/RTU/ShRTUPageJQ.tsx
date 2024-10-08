import React, { useState, useEffect } from 'react';

/** CONFIG */
import { HIS_RTU_COLUMNS_JQX } from '@app/configs/react-table/fasop/spectrum-history.column';

/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';
import 'jqwidgets-scripts/jqwidgets/jqxtabs';
import CardWidget from '@app/components/Card/CardWidget';

import HistoryFilter from './HistoryFilter'

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';

import moment from 'moment';

export default function ShRTUPageJQ() {
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
        datum_1: item?.datum_1,
        datum_2: item?.datum_2,
        status_1: item.status_1,
        status_2: item.status_2,
        kesimpulan: item.kesimpulan,
        // status_data: item.status_data,
        durasi: item?.durasi,

      });
    });
    return dataTableValue;
  }


  const [filterValues, setFilterValues] = useState<any>({
    datum_after: moment().format("YYYY-MM-DD") + " 00:00:00",
    datum_before: moment().format("YYYY-MM-DD") + " 23:59:59",

  });

  useEffect(() => {
    let roleAccess = ROLE_ACCESS("rtu");
    const roleAct = {
      view: ROLE_ACTION(roleAccess, 'view'),
    };
    setRoleActions(roleAct);
    console.log('roleAct', roleAct);
  }, []);

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
      <CardWidget title='FILTER'>
        <HistoryFilter onFilterChange={handleFilterChange} />
      </CardWidget>

      {roleActions.view &&
        <div key="2">

          <TableDataJqxGridNew

            //TABLE DATA
            path={API_PATH().fasop.history.digital}
            filterParams={{ id_induk_pointtype: "3d391819-4288-4699-80f4-7ebd5ae0d733", kinerja: 1, ...filterValues }}
            dataFieldsColsConfig={HIS_RTU_COLUMNS_JQX()}
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