import React, { useRef } from 'react';

/** CONFIG */
import { MONITORING_KEY_POINT_DETAIL_COLUMN_JQX } from "@app/configs/react-table/fasop/monitoring-key-point.column ";

/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';

export default function MonitoringKeyPointDetailPage({ filterParams }: any) {

    const dataSelected = useRef<any>();

    /** MAP DATA FROM API RESPONSE */
    const handleRespDataApi = (data: any) => {
        let dataTableValue: any = [];
        data?.forEach((item: any) => {
            dataTableValue.push({
                point_number: item?.point_number,
                number: item?.number,
                path1: item?.path1,
                path2: item?.path2,
                path3: item?.path3,
                path4: item?.path4,
                kesimpulan: item?.kesimpulan,
                value: item?.value,
                datum_capture: item?.datum_capture
            });
        });
        return dataTableValue;
    }


    const handleRowSelected = (data: any) => {
        dataSelected.current = data;
    }
    
    const path1 = filterParams?.path1 || null;
    const path3 = filterParams?.path3 || null;

     const mergedFilterParams = {
        ...filterParams,
        sort_by: 'datum_capture',
        path1: path1,
        path3: path3
    };
    return (
        <>
            {filterParams?.path3 &&
                <TableDataJqxGridNew
                    //TABLE DATA
                    path={API_PATH().fasop.laporan_scada.monitoring_keypoint_detail}
                    filterParams={mergedFilterParams}
                    dataFieldsColsConfig={MONITORING_KEY_POINT_DETAIL_COLUMN_JQX()}
                    primaryKey={'point_number'}
                    respDataApi={handleRespDataApi}
                    filterable={true}
                    onRowSelected={handleRowSelected}
                    exportbtn={true}
                />
            }

        </>
    );
}