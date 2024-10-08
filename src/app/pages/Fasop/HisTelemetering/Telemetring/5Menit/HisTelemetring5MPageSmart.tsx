import React, { useEffect, useState, useMemo } from 'react';
import { API_PATH } from '@app/services/_path.service';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
import { SCADATEL_STATUS_TELEMETERING_5m_COLUMN_GRID } from '@app/configs/react-table/fasop/spectrum-realtime.column';
import SmartGridComponent from '@app/modules/Table/SmartGridComponent';
import StatTelemeteringDetailPage from './StatTelemeteringDetailPage';
import Filter from './FilterJQ';
import CardWidget from '@app/components/Card/CardWidget';

interface FilterValues {
    [key: string]: any;
}

export default function MainComponent() {
    const [roleActions, setRoleActions] = useState<{ [key: string]: boolean }>({});
    const [detailspoint_number, setDetailspoint_number] = useState<string | null>(null);
    const [detailspath3, setDetailspath3] = useState<string | null>(null);
    const [filterValues, setFilterValues] = useState<FilterValues>({});
    const [filterParams, setFilterParams] = useState<any>({});

    useEffect(() => {
        let roleAccess = ROLE_ACCESS("gardu-hubung");
        const roleAct = {
            view: ROLE_ACTION(roleAccess, 'view'),
            create: ROLE_ACTION(roleAccess, 'create'),
            update: ROLE_ACTION(roleAccess, 'update'),
            delete: ROLE_ACTION(roleAccess, 'delete'),
        };
        setRoleActions(roleAct);
    }, []);

    useEffect(() => {
        console.log("Filter values updated:", filterValues);
        setFilterParams({
            point_type: 'A',
            sort_by: 'path1',
            ...filterValues
        });
    }, [filterValues]);

    const handleRespDataApi = useMemo(() => (data: any) => {
        if (data && data.results) {
          return data.results.map((result: any) => ({
            number: result.number,
            point_number: result.point_number,
            path1: result.path1,
            path2: result.path2,
            path3: result.path3,
            path4: result.path4,
            path5: result.path5,
            tanggal: result.datum,
            value: result.value,
          }));
        }
        return [];
      }, []);
    const handleRowSelected = (data: any) => {   
        if (data?.data) {
            const currentData = data.data;
            if (currentData.point_number) {
                setDetailspoint_number(currentData.point_number);
            } else { 
                setDetailspoint_number(null);
            }
        } else {
            setDetailspoint_number(null);
        }
        if (data?.data) {
            const currentData = data.data;
            if (currentData.path3) {
                setDetailspath3(currentData.path3);
            } else { 
                setDetailspath3(null);
            }
        } else {
            setDetailspath3(null);
        }
    };

    const handleFilterChange = (newFilterValues: FilterValues) => {
        setFilterValues(prevFilterValues => ({
            ...prevFilterValues,
            ...newFilterValues
        }));
    };

    return (
        <>
          <CardWidget title='FILTER'>
            <Filter onFilterChange={handleFilterChange} />
          </CardWidget>
          <div style={{ margin: '20px 0' }}> {/* Jarak diatur di sini */}
          {roleActions.create && roleActions.update && roleActions.delete &&
              <div key="2">
                  <SmartGridComponent
                      path={API_PATH().master.fasop.c_point}
                      filterParams={filterParams}
                      dataFieldsColsConfig={SCADATEL_STATUS_TELEMETERING_5m_COLUMN_GRID()}
                      primaryKey={'id'}
                      respDataApi={handleRespDataApi}
                      onRowSelected={handleRowSelected}
                      exportbtn={true}
                      isFilter={false}
                      selectionmode="singlerow"
                      width={'53%'}
                      height={'450px'}
                  />
              </div>
          }
          </div>
          <hr className='my-4' />
          <StatTelemeteringDetailPage 
              filterParams={{ point_number: detailspoint_number ,path3: detailspath3 }}
              filterValues={filterValues} 
          />
        </>
    );
}
