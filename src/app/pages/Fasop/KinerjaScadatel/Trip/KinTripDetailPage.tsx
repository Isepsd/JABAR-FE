import React, { useRef } from 'react';

/** CONFIG */
import { HIS_TRIP_COLUMNS_JQX } from '@app/configs/react-table/fasop/spectrum-history.column';

/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';

export default function KinTelemeteringDetailPage({ filterParams,filterValues }: any) {
    
    const dataSelected = useRef<any>();

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

    const path1 = filterParams?.path1 || null;
    const path2 = filterParams?.path2 || null;
    const path3 = filterParams?.path3 || null;
    const path4 = filterParams?.path4 || null;
    const path5 = filterParams?.path5 || null;
   

     const mergedFilterParams = {
        ...filterParams,
        ...filterValues,
        path1,
        path2,
        path3,
        path4,
        path5,
       
    };

    const handleRowSelected = (data: any) => {
        dataSelected.current = data;
    }

    return (
        <>
            {filterParams?.path1 &&
                <TableDataJqxGridNew
                    //TABLE DATA
                    path={API_PATH().fasop.history.trip}
                    filterParams={{sort_by:'-datum_1',...mergedFilterParams}}
                    dataFieldsColsConfig={HIS_TRIP_COLUMNS_JQX()}
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
