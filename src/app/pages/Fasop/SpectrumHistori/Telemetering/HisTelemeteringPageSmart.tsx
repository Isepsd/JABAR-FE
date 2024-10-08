import React, { useEffect, useState, useMemo } from 'react';
import { API_PATH } from '@app/services/_path.service';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
import { SCADATEL_HISTORI_TELEMETERING_COLUMN_GRID } from '@app/configs/react-table/fasop/spectrum-history.column';
import SmartGridComponent from '@app/modules/Table/SmartGridComponent';
import FilterJQ from './FilterJQ';
import CardWidget from '@app/components/Card/CardWidget';
import moment from 'moment';

interface FilterValues {
  [key: string]: any;
}

export default function HisTelemeteringPageSmart() {
  const [roleActions, setRoleActions] = useState<{ [key: string]: boolean }>({});
  const [filterValues, setFilterValues] = useState<FilterValues>({});
  const [filterParams, setFilterParams] = useState<any>({});

  useEffect(() => {
    let roleAccess = ROLE_ACCESS("telemetering");
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
      id_induk_pointtype: '798be05c-4df2-4945-9a47-5745a0de66c6',

      ...filterValues
    });
  }, [filterValues]);

  const handleRespDataApi = useMemo(() => (data: any) => {
    if (data && data.results) {
      return data.results.map((result: any) => ({
        id_pointtype: result?.id_pointtype,
        number: result?.number,
        point_number: result?.point_number,
        jenis: result?.jenis,
        path1: result?.path1,
        path2: result?.path2,
        path3: result?.path3,
        path4: result?.path4,
        path5: result?.path5,
        datum_1: result?.datum_1,
        status_1: result?.status_1,
        value_1: result?.value_1,
        msec_1: result?.msec_1,
        datum_2: result?.datum_2,
        status_2: result?.status_2,
        value_2: result?.value_2,
        msec_2: result?.msec_2,
        durasi: result?.durasi,
        status_data: result?.status_data,
        kesimpulan: result?.kesimpulan
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
        <FilterJQ onFilterChange={handleFilterChange} />
      </CardWidget>
      <div style={{ margin: '20px 0' }}> {/* Jarak diatur di sini */}
        {roleActions.view &&
          <div key="2">
            <SmartGridComponent
              path={API_PATH().fasop.history.analog}
              filterParams={filterParams}
              dataFieldsColsConfig={SCADATEL_HISTORI_TELEMETERING_COLUMN_GRID()}
              primaryKey={'id_pointtype'}
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
