import React, { useRef } from 'react';

/** CONFIG */
import { KIN_SCADA_DETAIL_COLUMNS_JQX } from '@app/configs/react-table/fasop/spectrum-kinerja.column';

/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { timeFormat } from '@app/helper/time.helper';
export default function MonitoringKeyPointDetailPage({ filterParams }: any) {

    const dataSelected = useRef<any>();

    /** MAP DATA FROM API RESPONSE */
    const handleRespDataApi = (data: any) => {
        let dataTableValue: any = [];
        data?.forEach((item: any) => {
            dataTableValue.push({
            peralatan_scada: item.peralatan_scada,
            path1text: item?.path1,
            path2text: item?.path2,
            path3text: item?.path3,
        tanggal_awal: item?.datum_1 ? timeFormat(item.datum_1, "DD-MM-YYYY HH:mm:ss") : "-",
        satuan_awal: item.status_1,
        tanggal_akhir: item?.datum_2 ? timeFormat(item.datum_2, "DD-MM-YYYY HH:mm:ss") : "-",
        point_number:item?.point_number,
        satuan_akhir: item.satuan_2,
        durasi: item?.durasi,
        keterangan: item?.kesimpulan,

            });
        });
        return dataTableValue;
    }


    const handleRowSelected = (data: any) => {
        dataSelected.current = data;
    }
    
    const point_number = filterParams?.point_number || null;
    const jenispoint = filterParams?.jenispoint || null;

     const mergedFilterParams = {
        ...filterParams,
        point_number: point_number,
        jenispoint: jenispoint
    };
    return (
        <>
            {filterParams?.point_number &&
                <TableDataJqxGridNew
                    //TABLE DATA
                    path={API_PATH().fasop.laporan_scada.histori_peralatan_scada}
                    filterParams={{sort_by: 'nama',...mergedFilterParams}}
                    dataFieldsColsConfig={KIN_SCADA_DETAIL_COLUMNS_JQX()}
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