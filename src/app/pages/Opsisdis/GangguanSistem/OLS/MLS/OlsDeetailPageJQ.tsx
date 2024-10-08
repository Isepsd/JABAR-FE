import React, { useRef } from 'react';

/** CONFIG */
import { GANGGUAN_DETAIL_ENTRI_GRID, } from '@app/configs/react-table/opsisdis/rekap-padam/rekap-padam.column';
/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';

export default function RekapPadamDetailPageJQ({ filterParams, filterValues }: any) {
    const dataSelected = useRef<any>();

    /** MAP DATA FROM API RESPONSE */
    const handleRespDataApi = (data: any) => {
        let dataTableValue: any = [];
        data?.forEach((item: any) => {
            dataTableValue.push({
                number: item?.number,
                id:item?.id,
                gangguan_penyulang_id:item?.gangguan_penyulang_id,
                dispatcher_id:item?.dispatcher_id,
                tanggal:item?.itanggal,
                uraian:item?.uraian,
                peralatan:item?.peralatan,
                nama:item?.nama,
                gardu_padam:item?.gardu_padam,
                arus:item?.arus,
                rele_kerja:item?.rele_kerja,
                remote:item?.remote,
                titik_manuver:item?.titik_manuver,
                arus_r:item?.arus_r,
                arus_s:item?.arus_s,
                arus_t:item?.arus_t,
                arus_n:item?.arus_n,
                ens:item?.ens,
            });
        });
        return dataTableValue;
    }

    const gangguan_penyulang_id = filterParams?.gangguan_penyulang_id || null;

   

     const mergedFilterParams = {
        ...filterParams,
        ...filterValues,
        gangguan_penyulang_id,
  
       
    };

    const handleRowSelected = (data: any) => {
        dataSelected.current = data;
    }

    return (
        <>
            {filterParams?.gangguan_penyulang_id &&
                <TableDataJqxGridNew
                    // TABLE DATA
                    path={API_PATH().opsisdis.rekap_padam.detail}
                    filterParams={{sort_by:'-datum',...mergedFilterParams}}
                    dataFieldsColsConfig={GANGGUAN_DETAIL_ENTRI_GRID()}
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
