import React, { useState, useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import moment from 'moment';
import GrafikKomulatifUP2DBANTEN from '@app/modules/Dashboard/GrafikKomulatifUP2DBANTEN';
import GrafikKomulatifUP2DBANTENInfo from '@app/modules/Dashboard/GrafikKomulatifUP2DBANTENInfo';
import Filter from './Filter';
import StatisticKinerjaScadaUP2DBANTEN from '@app/modules/Dashboard/StatisticKinerjaScadaUP2DBANTEN';
import CardWidget from '@app/components/Card/CardWidget';
import { nanoid } from '@reduxjs/toolkit';

import {
  CONFIG_BOX_BULANAN,
  CONFIG_BOX_KOMULATIF,
  CONFIG_GRAFIK_KOMULATIF,
  CONFIG_INFO_RTU,
  CONFIG_BOX_BULANAN_LALU
} from '@app/configs/kinerja-scada-UP2D.config';

export default function KinerjaScadaPage() {
  const [boxBulanan] = useState<any>(CONFIG_BOX_BULANAN);
  const [boxBulananlalu] = useState<any>(CONFIG_BOX_BULANAN_LALU);
  const [boxKomulatif] = useState<any>(CONFIG_BOX_KOMULATIF);
  const [grafikKomulatif] = useState<any>(CONFIG_GRAFIK_KOMULATIF);
  const [Grafikinfo] = useState<any>(CONFIG_INFO_RTU);

  const [updatedBoxBulanan, setUpdatedBoxBulanan] = useState<any>(boxBulanan);
  const [updatedBoxBulananLalu, setUpdatedBoxBulananLalu] = useState<any>(boxBulananlalu);
  const [updatedBoxKomulatif, setUpdatedBoxKomulatif] = useState<any>(boxKomulatif);
  const [filterValues, setFilterValues] = useState<any>({
    kinerja_scada: 'SCADA',
    nama_induk_pointtype: 'RTU',
    tahun: moment().format('YYYY'),
    bulan:'',
  });

  const handleFilterChange = (newFilterValues: any) => {
    setFilterValues(newFilterValues);
  };

  const updateBoxFilters = (box: any[]) => {
    return box.map((item: any) => ({
      ...item,
      filterParams: { ...item?.filterParams, ...filterValues },
    }));
  };

  useEffect(() => {
    setUpdatedBoxBulanan(updateBoxFilters(boxBulanan));
  }, [boxBulanan, filterValues]);

  useEffect(() => {
    setUpdatedBoxBulananLalu(updateBoxFilters(boxBulananlalu));
  }, [boxBulananlalu, filterValues]);

  useEffect(() => {
    setUpdatedBoxKomulatif(updateBoxFilters(boxKomulatif));
  }, [boxKomulatif, filterValues]);



  const pathMap:any = {
    SCADA: 'dashboard_up2d_banten.kinerja_scada',
    RC: 'dashboard_up2d_banten.kinerja_rc',
    TRIP: 'dashboard_up2d_banten.kinerja_trip',
  };

  const getPathBasedOnKinerjaScada = (basePath: string) => {
    return pathMap[filterValues.kinerja_scada] || `${basePath}.default`; // Default path or handle unknown cases
  };

  return (
    <>
      <CardWidget title='Filter'>
        <Filter onFilterChange={handleFilterChange} />
      </CardWidget>
      <hr />
      <Row className='mb-2 gx-2'>
        <Col md={12}>
          <CardWidget title='Kinerja SCADA UP2D BANTEN'>
            <Row className='gx-1'>
              <Col md='4'>
            
                {updatedBoxBulanan?.map((item: any) => (
                  <Col md={8} key={item?.id || nanoid()} className='mb-2'>
                    <StatisticKinerjaScadaUP2DBANTEN
                      variant={item?.variant}
                      label0='name'
                      path={getPathBasedOnKinerjaScada(item?.basePath)} // Update path dynamically
                      suffix={item?.suffix}
                      filterParams={item?.filterParams}
                      fieldName0='value'
                      subname0='label'
                      fieldName1=''
                      subname1=''
                      fieldName2=''
                      subname2=''
                    />
                  </Col>
                ))}
              </Col>

              <Col md='4'>
               
                {updatedBoxBulananLalu?.map((item: any) => (
                  <Col md={8} key={item?.id || nanoid()} className='mb-2'>
                    <StatisticKinerjaScadaUP2DBANTEN
                      variant={item?.variant}
                      label1='name'
                      path={getPathBasedOnKinerjaScada(item?.basePath)} // Update path dynamically
                      suffix={item?.suffix}
                      filterParams={item?.filterParams}
                      fieldName1='value'
                      subname1='label'
                      fieldName0=''
                      subname0=''
                      fieldName2=''
                      subname2=''
                    />
                  </Col>
                ))}
              </Col>

              <Col md='4'>
                
                {updatedBoxKomulatif?.map((item: any) => (
                  <Col md={8} key={item?.id || nanoid()} className='mb-2'>
                    <StatisticKinerjaScadaUP2DBANTEN
                      variant={item?.variant}
                      label2='name'
                      path={getPathBasedOnKinerjaScada(item?.basePath)} // Update path dynamically
                      suffix={item?.suffix}
                      filterParams={item?.filterParams}
                      fieldName1='value'
                      subname1='label'
                      fieldName0=''
                      subname0=''
                      fieldName2='value'
                      subname2='label'
                    />
                  </Col>
                ))}
              </Col>
            </Row>
          </CardWidget>
        </Col>
      </Row>

      <hr />
      <Row className='gx-2'>
        <Col md={8} className='mb-4'>
          {grafikKomulatif?.map((item: any) => (
            <div className='mb-2' key={nanoid()}>
              <GrafikKomulatifUP2DBANTEN
                path={getPathBasedOnKinerjaScada(item?.basePath)} // Update path dynamically
                title={item?.title}
                filterParams={{ ...item?.filterParams, ...filterValues }}
              />
            </div>
          ))}
        </Col>
      
        <Col md={12} lg={6} xl={4} style={{ height: '100%' }}> {/* Menambahkan style untuk memperpanjang Col */}
    <Card style={{ height: '100%' }}> {/* Sesuaikan tinggi card dengan tinggi Col */}
      <Card.Body style={{ height: '100%' }}> {/* Memastikan CardBody mengisi penuh Card */}
      <h5 className='card-title' style={{ borderBottom: '2px solid #000', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
        JUMLAH JENIS POINT
      </h5>
      <div style={{ height: '53rem' }}> {/* Sesuaikan tinggi chart di dalam CardBody */}
              {Grafikinfo?.map((item: any) => (
                <div className='mb-2' key={nanoid()}>
                  <GrafikKomulatifUP2DBANTENInfo
                    path={getPathBasedOnKinerjaScada(item?.basePath)} // Update path dynamically
                    title={item?.title}
                    filterParams={{ ...item?.filterParams, ...filterValues }}
                  />
                </div>
              ))}
                </div>
          </Card.Body>
        </Card>
      </Col>
       
      </Row>
    </>
  );
}
