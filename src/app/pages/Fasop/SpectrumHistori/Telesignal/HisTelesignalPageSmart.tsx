import React, { useEffect, useState, useMemo } from 'react';
import { API_PATH } from '@app/services/_path.service';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
import { SCADATEL_HISTORI_TELESIGNAL_COLUMN_GRID } from '@app/configs/react-table/fasop/spectrum-history.column';
import SmartGridComponent from '@app/modules/Table/SmartGridComponent';
import HistoryFilter from './HistoryFilter';
import CardWidget from '@app/components/Card/CardWidget';
import moment from 'moment';

interface FilterValues {
  [key: string]: any;
}

export default function HisTelesignalPageSmart() {
  const [roleActions, setRoleActions] = useState<{ [key: string]: boolean }>({});
  const [filterValues, setFilterValues] = useState<FilterValues>({});
  const [filterParams, setFilterParams] = useState<any>({});

  useEffect(() => {
    let roleAccess = ROLE_ACCESS("telesignal");
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
      id_induk_pointtype: '5a9d6c6f-a333-45cc-9c0f-06e244b7d00c',

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
        datum_2: result?.datum_2,
        status_2: result?.status_2,
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
        <HistoryFilter onFilterChange={handleFilterChange} />
      </CardWidget>
      <div style={{ margin: '20px 0' }}> {/* Jarak diatur di sini */}
        {roleActions.view &&
          <div key="2">
            <SmartGridComponent
              path={API_PATH().fasop.history.digital}
              filterParams={filterParams}
              dataFieldsColsConfig={SCADATEL_HISTORI_TELESIGNAL_COLUMN_GRID()}
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
