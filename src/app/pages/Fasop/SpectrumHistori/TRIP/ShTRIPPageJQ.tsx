import React, { useState, useEffect } from 'react';

/** CONFIG */
import { HIS_TRIP_COLUMNS_JQX } from '@app/configs/react-table/fasop/spectrum-history.column';

/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';
import 'jqwidgets-scripts/jqwidgets/jqxtabs';
import moment from 'moment';
import CardWidget from '@app/components/Card/CardWidget';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
import TripFilter from './TripFilter';


export default function ShTRIPPageJQ() {
  const [roleActions, setRoleActions] = useState<any>({});

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        id: item?.id,
        number: item?.number,
        path1: item?.path1,
        path2: item?.path2,
        path3: item?.path3,
        path4: item?.path4,
        datum_1: item?.datum_1,
        datum_2: item?.datum_2,
        ocr: item?.ocr,
        gfr: item?.gfr,
        i: item?.i,
        ifr: item?.ifr,
        ifs: item?.ifs,
        ift: item?.ift,
        ifn: item?.ifn,
        cbtr: item?.cbtr
      });
    });
    return dataTableValue;
  }

  useEffect(() => {
    let roleAccess = ROLE_ACCESS("trip");
    const roleAct = {
      view: ROLE_ACTION(roleAccess, 'view'),
    };
    setRoleActions(roleAct);
    console.log('roleAct', roleAct);
  }, []);

  const [filterValues, setFilterValues] = useState<any>({
    datum_after: moment().subtract(1, 'day').format('YYYY-MM-DD'),
    datum_before: moment().format('YYYY-MM-DD'),
    path1: '',
    path2: '',
    path3: '',
    // id_induk_pointtype: null,
    // jenispoint: null,

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
      <CardWidget title='FILTER'>
        <TripFilter onFilterChange={handleFilterChange} />
      </CardWidget>

      {roleActions.view &&
        <div key="2">
          <TableDataJqxGridNew
            //TABLE DATA
            path={API_PATH().fasop.history.trip}
            filterParams={{ ...filterValues }}
            dataFieldsColsConfig={HIS_TRIP_COLUMNS_JQX()}
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