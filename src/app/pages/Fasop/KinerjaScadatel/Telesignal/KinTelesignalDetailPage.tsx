import React, { useRef } from 'react';

/** CONFIG */
import { SCADATEL_KINERJA_DETAIL_COLUMN_JQX } from "@app/configs/react-table/fasop/scadatel-column";

/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';

export default function KinTelemeteringDetailPage({ filterParams, filterValues  }: any) {
    
    const dataSelected = useRef<any>();

    /** MAP DATA FROM API RESPONSE */
    const handleRespDataApi = (data: any) => {
        let dataTableValue: any = [];
        data?.forEach((item: any) => {
            dataTableValue.push({
                number: item?.number,
                thn_bln:item?.thn_bln,
                point_number: item?.point_number,
                path1: item?.path1,
                path2: item?.path2,
                path3: item?.path3,
                path4: item?.path4,
                path5: item?.path5,
                status_2: item?.status_2,
                datum: item?.datum,
                durasi_alltime: item?.durasi_alltime,
                durasi_uptime: item?.durasi_uptime,
                durasi_downtime: item?.durasi_downtime,
                avability: item?.avability,
                kinerja:item?.kinerja,
                nama_pointtype: item?.nama_pointtype
            });
        });
        return dataTableValue;
    }

    const path1 = filterParams?.path1 || null;
    const path2 = filterParams?.path2 || null;
    const path3 = filterParams?.path3 || null;
    const path4 = filterParams?.path4 || null;
    const path5 = filterParams?.path5 || null;
    const nama_pointtype = filterParams?.nama_pointtype || null;
    const point_number = filterParams?.point_number || null;
   

     const mergedFilterParams = {
        ...filterParams,
        ...filterValues,
        path1,
        path2,
        path3,
        path4,
        path5,
        nama_pointtype,
        point_number,
        
       
    };


    const handleRowSelected = (data: any) => {
        dataSelected.current = data;
    }

    return (
        <>
            {filterParams?.path1 &&
                <TableDataJqxGridNew
                    //TABLE DATA
                    path={API_PATH().fasop.kinerja.digital}
                    filterParams={{sort_by:'-datum',...mergedFilterParams}}
                    dataFieldsColsConfig={SCADATEL_KINERJA_DETAIL_COLUMN_JQX()}
                    primaryKey={'id_scd_statusgardu'}
                    respDataApi={handleRespDataApi}
                    filterable={true}
                    onRowSelected={handleRowSelected}
                    exportbtn={true}
                />
            }

        </>
    );
}
