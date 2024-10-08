import React, { useState, useEffect } from 'react';
/** CONFIG */
import { KIN_SCADA_COLUMNS } from '@app/configs/react-table/fasop/spectrum-kinerja.column';

/** COMPONENTS */
import TableData from '@app/modules/Table/TableData';
import TableDataListAction from '@app/modules/Table/TableDataListAction';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAllByPath } from '@app/services/main.service';
import axios from 'axios';
import TopBarLoader from '@app/components/Loader/TopBarLoader';
import Filter from './Filter';

export default function KinerjaScadaPage() {
  let [searchParams, setSearchParams] = useSearchParams();
  const { activePaging } = useSelector((state: any) => state.ui);

  /** DATA RESP */
  const [dataRows, setDataRows] = useState<any>([]);
  const [columns, setColumns] = useState<any>(KIN_SCADA_COLUMNS());
  const [dataColumns, setDataColumns] = useState<any>([]);
  const [scada, setScada] = useState<any>([]);
  const source = axios.CancelToken.source();
  const [loading, setLoading] = useState<boolean>(false);

  /** GET DATA unit pembangkit */
  const getAllData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    try {
      const params = {
        page: -1,
        limit: -1,
        is_induk: 'INDUK',
      };


      const req: any = await getAllByPath(API_PATH().master.fasop.point_type_get, params, source.token);

      const { results } = req;
      let unit: any = []
      results?.map((item: any) => {
        unit.push({
          label: item?.name,
          value: item?.id_pointtype,
          jenis: item?.jenispoint
        })
      })
      setLoading(false)
      setScada(unit)
    } catch (err: any) {
      setScada(null)
      setLoading(false)
    }
  };

  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        ...item,
        peralatan_scada: item.peralatan_scd,
        b1: item?.path1text,
        b2: item?.path2text,
        b3: item?.path3text,
        down: item.downtime,
        durasi: item?.durasi,
        avability: item?.avability,
      });
    });
    setDataRows(dataTableValue);
  };

  /** COLUMN SHOW HIDE EVENT HANDLE */
  useEffect(() => {
    const cols = columns?.filter(({ show }: any) => show === true);
    setDataColumns(cols);
  }, [columns]);

  useEffect(() => {
    if (activePaging) {
      searchParams.delete('point_type');
      setSearchParams(searchParams);
    }
  }, [activePaging])

  useEffect(() => {
    getAllData()
  }, [])



  return (
    <>
      <TopBarLoader isLoading={loading} />
      <TableDataListAction
        add={false}
        columns={columns}
        setColumns={setColumns}
        filterLayout='card'
      >
        <Filter optionsScada={scada} />
      </TableDataListAction >

      <TableData
        columnsConfig={dataColumns}
        respDataApi={handleRespDataApi}
        rowData={dataRows}
        path={API_PATH().fasop.laporan_scada.kinerja_peralatan_scada}
        primaryKey={'id_kin_scd'}
      />
    </>
  );
}
