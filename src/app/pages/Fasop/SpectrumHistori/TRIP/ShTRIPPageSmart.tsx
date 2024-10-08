import React, { useEffect, useState, useMemo } from 'react';
import { API_PATH } from '@app/services/_path.service';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
import { HIS_RTU_COLUMNS_GRID } from '@app/configs/react-table/fasop/spectrum-history.column';
import SmartGridComponent from '@app/modules/Table/SmartGridComponent';
import TripFilter from './TripFilter';
import CardWidget from '@app/components/Card/CardWidget';
import moment from 'moment';

interface FilterValues {
  [key: string]: any;
}

export default function ShTRIPPageSmart() {
  const [roleActions, setRoleActions] = useState<{ [key: string]: boolean }>({});
  const [filterValues, setFilterValues] = useState<FilterValues>({});
  const [filterParams, setFilterParams] = useState<any>({});

  useEffect(() => {
    let roleAccess = ROLE_ACCESS("rtu");
    const roleAct = {
      view: ROLE_ACTION(roleAccess, 'view'),
    };
    setRoleActions(roleAct);
  }, []);

  useEffect(() => {
    console.log("Filter values updated:", filterValues);
    setFilterParams({
      datum_after: moment().subtract(1, 'day').format('YYYY-MM-DD'),
      datum_before: moment().format('YYYY-MM-DD'),

      ...filterValues
    });
  }, [filterValues]);

  const handleRespDataApi = useMemo(() => (data: any) => {
    if (data && data.results) {
      return data.results.map((result: any) => ({
        id_his_trip: result?.id_his_trip,
        number: result?.number,
        path1: result?.path1,
        path2: result?.path2,
        path3: result?.path3,
        path4: result?.path4,
        datum_1: result?.datum_1,
        datum_2: result?.datum_2,
        ocr: result?.ocr,
        gfr: result?.gfr,
        i: result?.i,
        ifr: result?.ifr,
        ifs: result?.ifs,
        ift: result?.ift,
        ifn: result?.ifn,
        cbtr: result?.cbtr
      }));
    }
    return [];
  }, []);


  const handleFilterChange = (newFilterValues: FilterValues) => {
    setFilterValues(prevFilterValues => ({
      ...prevFilterValues,
      ...newFilterValues
    }));
  };

  return (
    <>
      <CardWidget title='FILTER'>
        <TripFilter onFilterChange={handleFilterChange} />
      </CardWidget>
      <div style={{ margin: '20px 0' }}> {/* Jarak diatur di sini */}
        {roleActions.view &&
          <div key="2">
            <SmartGridComponent
              path={API_PATH().fasop.history.trip}
              filterParams={filterParams}
              dataFieldsColsConfig={HIS_RTU_COLUMNS_GRID()}
              primaryKey={'id_his_trip'}
              respDataApi={handleRespDataApi}
              exportbtn={true}
              isFilter={false}
              selectionmode="singlerow"
              width={'100%'}
              height={'450px'}
            />
          </div>
        }
      </div>
    </>
  );
}
