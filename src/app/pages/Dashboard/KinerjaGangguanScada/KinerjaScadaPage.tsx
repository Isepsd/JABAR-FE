import React, {  useState ,useMemo} from 'react';
import {Col,Row } from 'react-bootstrap';
// import Button from '@app/components/Button/Button';

import { API_PATH } from '@app/services/_path.service';

import CardWidget from '@app/components/Card/CardWidget';
import {

    CONFIG_GRAFIK_KOMULATIF,
    CONFIG_BOX_KOMULATIF
   
  } from '@app/configs/kinerja-scada.config';
import TableData from "@app/modules/Table/TableData";
import TableDataListAction from '@app/modules/Table/TableDataListAction';
import moment from 'moment';
import StatisticKinerjaScada from '@app/modules/Dashboard/StatisticKinerjaScada';
import { HIS_TRIP_DASHBOARD_COLUMNSS } from '@app/configs/react-table/fasop/spectrum-history.column';
import { timeFormatSec } from '@app/helper/time.helper';
import { Badge } from 'react-bootstrap';
import { nanoid } from '@reduxjs/toolkit';

export default function ResponsePembangkitPage() {


    const [grafikKomulatif] = useState<any>(CONFIG_GRAFIK_KOMULATIF);
    const [columns,setColumns] = useState<any>(HIS_TRIP_DASHBOARD_COLUMNSS());
    const [dataRows, setDataRows] = useState<any>([]);
    const [boxKomulatif] = useState<any>(CONFIG_BOX_KOMULATIF);

      const renderBoxKomulatif = useMemo(() => {
        return boxKomulatif?.map((item: any) => {
          return (
            <Col md={3} key={nanoid()} className='mb-2'>
              <StatisticKinerjaScada
                key={nanoid()}
                variant={item?.variant}
                path={item?.path}
                suffix={item?.suffix}
                label={item?.label}
                fieldName='nilai_komulatif'
              />
            </Col>
          );
        });
      }, [grafikKomulatif]);
    

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
              // ocr: item?.ocr,
              
              status_beban:item?.i,
              status_ifr:item?.ifr,
              status_ifs: item?.ifs,
              status_ift:item?.ift,
              status_ifn: item?.ifn,
              status_ocr: (
                <Badge bg={item?.ocr === 1 ? 'success' : 'danger'} className="text-white">
                  {item?.ocr === 1 ? 'ON' : 'OFF'}
                </Badge>
              ),
              status_gfr: (
                <Badge bg={item?.gfr === 1 ? 'success' : 'danger'} className="text-white">
                  {item?.gfr === 1 ? 'ON' : 'OFF'}
                </Badge>
              ),
              cbtr: (
                <Badge bg={item?.cbtr === 1 ? 'success' : 'danger'} className="text-white">
                  {item?.cbtr === 1 ? 'ON' : 'OFF'}
                </Badge>
              )
            });
          });
      
          setDataRows(dataTableValue)
        }
      
   
    return (
        <>
           
          
       
          <CardWidget title='Rekap Gangguan Scada'>
            <Row className='gx-1'>
            

              {/* {renderBoxBulanan} */}

              <Col md='12'>
                <hr />

                <div className='d-flex justify-content-left'>
                  <strong>KOMULATIF TAHUN {new Date().getFullYear()} SAMPAI BULAN INI</strong>
                </div>
              </Col>

              {renderBoxKomulatif}
            </Row>
          </CardWidget>
       
       
      
      
        <Row>
                      

    <TableDataListAction add={false} columns={columns} setColumns={setColumns} filterLayout="card" ></TableDataListAction>
      <TableData columnsConfig={columns} respDataApi={handleRespDataApi} rowData={dataRows} path={API_PATH().dashboard.kinerja_scada.trip.listtransmisi} primaryKey={'id_his_trip'} filterParams={{
        datum_1_after: moment().subtract(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
        datum_1_before: moment().format('YYYY-MM-DD HH:mm:ss'),
        sort_by: "datum_1",
        cek_trip:1 
      }} deleteConfirmation />
      
        </Row>

        </>
    );
}
