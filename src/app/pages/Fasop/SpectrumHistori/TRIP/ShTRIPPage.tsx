import React, { useState, useEffect } from 'react';
import moment from 'moment';

/** CONFIG */
import { HIS_TRIP_COLUMNS } from '@app/configs/react-table/fasop/spectrum-history.column';
import { timeFormatSec } from '@app/helper/time.helper';

/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';
import TableDataListAction from '@app/modules/Table/TableDataListAction';
import HistoryFilter from '@app/modules/Fasop/HistoryFilter'

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';

export default function ShTRIPPage() {
  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [columns, setColumns] = useState<any>(HIS_TRIP_COLUMNS());
  const [dataColumns, setDataColumns] = useState<any>([]);

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        ...item,
        b1: item?.path1,
        b2: item?.path2,
        b3: item?.path3,
        element: item?.path4,
        tanggal_awal: timeFormatSec(item.datum_1),
        tanggal_akhir: timeFormatSec(item.datum_2),
        ocr: item?.ocr,
        gfr: item?.gfr,
        beban: item?.i,
        ifr: item?.ifr,
        ifs: item?.ifs,
        ift: item?.ift,
        ifn: item?.ifn,
        cbtr: item?.cbtr
      });
    });

    setDataRows(dataTableValue)
  }

  /** COLUMN SHOW HIDE EVENT HANDLE */
  useEffect(() => {
    const cols = columns?.filter(({ show }: any) => show === true);
    setDataColumns(cols);
  }, [columns]);

  return (
    <>
      <TableDataListAction add={false} columns={columns} setColumns={setColumns} filterLayout="card">
        <HistoryFilter selectProps={{ fieldName: 'id_pointtype', pathServiceName: 'master.fasop.point_type', labelField: 'name', valueField: 'id_pointtype', placeholder: 'Pilih Jenis Point' }} queryParams={{ page: -1, jenispoint: 'TRIP' }} fieldKeyword='b1' isJenisPoint={false}
        />
      </TableDataListAction>

      <TableData columnsConfig={dataColumns} respDataApi={handleRespDataApi} rowData={dataRows} path={API_PATH().fasop.history.trip} primaryKey={'id_his_trip'} filterParams={{
        datum_1_after: moment().subtract(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
        datum_1_before: moment().format('YYYY-MM-DD HH:mm:ss'),
        sort_by: "datum_1"
      }} deleteConfirmation />
    </>
  );
}
