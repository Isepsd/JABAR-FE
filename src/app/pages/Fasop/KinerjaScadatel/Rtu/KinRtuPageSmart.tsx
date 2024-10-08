import React, { useEffect, useState, useMemo } from 'react';
import { API_PATH } from '@app/services/_path.service';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
import { SCADATEL_KINERJA_RTU_BULAN_COLUMN_GRID } from '@app/configs/react-table/fasop/scadatel-column';
import SmartGridComponent from '@app/modules/Table/SmartGridComponent';
import KinRtuDetailPage from './KinRtuDetailPage';
import Filter from './Filter';
import CardWidget from '@app/components/Card/CardWidget';

interface FilterValues {
    [key: string]: any;
}

export default function MainComponent() {
    const [roleActions, setRoleActions] = useState<{ [key: string]: boolean }>({});
    const [detailspath1, setDetailspath1] = useState<string | null>(null);
    const [detailspath2, setDetailspath2] = useState<string | null>(null);
    const [detailspath3, setDetailspath3] = useState<string | null>(null);
    const [detailspath4, setDetailspath4] = useState<string | null>(null);
    const [detailspath5, setDetailspath5] = useState<string | null>(null);
   
    const [filterValues, setFilterValues] = useState<FilterValues>({});
    const [filterParams, setFilterParams] = useState<any>({});

    useEffect(() => {
        let roleAccess = ROLE_ACCESS("rtu");
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
            rekap_kinerja: 1,
            id_induk_pointtype: '3d391819-4288-4699-80f4-7ebd5ae0d733',

            ...filterValues
        });
    }, [filterValues]);

    const handleRespDataApi = useMemo(() => (data: any) => {
        if (data && data.results) {
          return data.results.map((result: any) => ({
            number: result?.number,
            point_number: result?.point_number,
            nama_pointtype: result?.nama_pointtype,
            path1: result?.path1,
            path2: result?.path2,
            path3: result?.path3,
            path4: result?.path4,
            poin: result?.poin,
            durasi_alltime: result?.durasi_alltime,
            durasi_uptime: result?.durasi_uptime,
            durasi_downtime: result?.durasi_downtime,
            avability: result?.avability,
            kinerja: 1
          }));
        }
        return [];
      }, []);
    const handleRowSelected = (data: any) => {   
        if (data?.data) {
            const currentData = data.data;
            if (currentData.path1) {
                setDetailspath1(currentData.path1);
            } else { 
                setDetailspath1(null);
            }
        } else {
            setDetailspath1(null);
        }
        if (data?.data) {
            const currentData = data.data;
            if (currentData.path2) {
                setDetailspath2(currentData.path2);
            } else { 
                setDetailspath2(null);
            }
        } else {
            setDetailspath2(null);
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
      
        if (data?.data) {
            const currentData = data.data;
            if (currentData.path4) {
                setDetailspath4(currentData.path4);
            } else { 
                setDetailspath4(null);
            }
        } else {
            setDetailspath4(null);
        }
        if (data?.data) {
            const currentData = data.data;
            if (currentData.path5) {
                setDetailspath5(currentData.path5);
            } else { 
                setDetailspath5(null);
            }
        } else {
            setDetailspath5(null);
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
                     path={API_PATH().fasop.kinerja.digital}
                      filterParams={filterParams}
                      dataFieldsColsConfig={SCADATEL_KINERJA_RTU_BULAN_COLUMN_GRID()}
                      primaryKey={'id'}
                      respDataApi={handleRespDataApi}
                      onRowSelected={handleRowSelected}
                      exportbtn={true}
                      isFilter={false}
                      selectionmode="singlerow"
                      width={'100%'}
                      height={'450px'}
                  />
              </div>
          }
          </div>
          <hr className='my-4' />
          <KinRtuDetailPage 
              filterParams={{   path1: detailspath1,path2: detailspath2,path3: detailspath3,path4: detailspath4,path5: detailspath5 }}
              filterValues={filterValues} 
          />
        </>
    );
}
