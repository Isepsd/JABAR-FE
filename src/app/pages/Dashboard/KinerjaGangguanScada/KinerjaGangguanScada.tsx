import React, { useMemo, useState ,useEffect} from 'react';
import { Col, Row,Card } from 'react-bootstrap';
import CardInfoChildren from '@app/components/Card/CardInfoChildren'
import GrafikKomulatifUP2DBANTENGangguanDami from '@app/modules/Dashboard/GrafikKomulatifUP2DBANTENGangguanDami';
// import GrafikKomulatifRC from '@app/modules/Dashboard/GrafikKomulatifBANGKARC';

import axios from 'axios';
import moment from 'moment';
import TopBarLoader from '@app/components/Loader/TopBarLoader';
// import { getAllByPath } from '@app/services/main.service';
import {

  CONFIG_GRAFIK_KOMULATIF_gangguan_up2dbantendummi,
 
  // CONFIG_GRAFIK_KOMULATIFRC
} from '@app/configs/kinerja-scada.config';
import RTUOutOfPoolUP2DBANTEN from '@app/modules/Dashboard/RTUOutOfPoolUP2DBANTEN';

// import TMTSOutOfPool from '@app/modules/Dashboard/TMTSOutOfPool';
// import CardWidget from '@app/components/Card/CardWidget';
import { nanoid } from '@reduxjs/toolkit';
export default function MonitoringRTU() {
 
  const [grafikKomulatif] = useState<any>(CONFIG_GRAFIK_KOMULATIF_gangguan_up2dbantendummi);
  // const [grafikKomulatifRC] = useState<any>(CONFIG_GRAFIK_KOMULATIFRC);

  const source = axios.CancelToken.source();
  const containerStyle:any = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px'
  };

  const itemStyle = {
    flex: '1',
    minWidth: '200px'
  };
  const [loading, setLoading] = useState<boolean>();
  const renderGrafikKomulatif = useMemo(() => {
    return (
      <div style={containerStyle}>
        {grafikKomulatif.map((item: any) => (
          <div style={itemStyle} key={nanoid()} className='mb-2'>
            <GrafikKomulatifUP2DBANTENGangguanDami
              subtitle={item.subtitle}
              title={item.title}
              path={item.path}
              useDummyData={item.useDummyData}
            />
          </div>
        ))}
      </div>
    );
  }, [grafikKomulatif]); // Add `grafikKomulatif` as a dependency
  // const renderGrafikKomulatifRC = useMemo(() => {
  //   return grafikKomulatifRC?.map((item: any) => {
  //     return (
  //       <div className='mb-2' key={nanoid()}>
  //         <GrafikKomulatifRC path={item?.path} title={item?.title} />
  //       </div>
  //     );
  //   });
  // }, [grafikKomulatifRC]);

  


  const [data, setData] = useState<any>([]);
// Pilihan untuk menggunakan data dummy
const useDummyData = true; // Atur ini sesuai kebutuhan

/** GET DATA PAGINATION */
const getAllData = async () => {
  setLoading(true);

  // Simulasi penundaan untuk meniru panggilan API
  await new Promise((resolve) => setTimeout(resolve, 300));

  try {
    // Jika menggunakan data dummy
    if (useDummyData) {
      const dummyData = [
        {
          id_meter: 1,
          ref_frek: { nama: 'Frequency 1' },
          value_1: 10,
          value_2: 20,
          datum_2: new Date().toISOString(),
          statusdevice_2: 'Connected'
        },
        {
          id_meter: 2,
          ref_frek: { nama: 'Frequency 2' },
          value_1: 30,
          value_2: 40,
          datum_2: new Date().toISOString(),
          statusdevice_2: 'Disconnected'
        },
        {
          id_meter: 3,
          ref_frek: { nama: 'Frequency 3' },
          value_1: 50,
          value_2: 60,
          datum_2: new Date().toISOString(),
          statusdevice_2: 'Connected'
        }
      ];

      // Format data dummy
      let formattedData = dummyData.map((d: any) => {
        d.min = d.value_1;
        d.max = d.value_2;
        d.icon = "fa fa-gear";
        d.sufixTitle = 'MW';
        d.title = d?.ref_frek.nama;
        d.classBgCard = 'bg-aqua';
        d.routeDetail = `detail/${d.id_meter}`;
        d.date = moment(d?.datum_2).format('DD-MM-YYYY HH:mm:ss');
        d.status = d?.statusdevice_2;
        return d;
      });

      setData(formattedData);
      setLoading(false);

      // Anda bisa memilih untuk memanggil getAllData lagi secara berkala jika perlu
      setTimeout(() => {
        getAllData();
      }, 300000);

    } else {
      // Jika tidak menggunakan data dummy, lakukan panggilan API
      // const params = { page: 1, limit: 1000 };
      // const req: any = await getAllByPath('opsisdis/frekuensi/scd-frek-rtl', params, source.token);
      // const { results } = req;
      // let formattedData = results?.map((d: any) => {
      //   d.min = d.value_1;
      //   d.max = d.value_2;
      //   d.icon = "fa fa-gear";
      //   d.sufixTitle = 'Hz';
      //   d.title = d?.ref_frek.nama;
      //   d.classBgCard = 'bg-aqua';
      //   d.routeDetail = `detail/${d.id_meter}`;
      //   d.date = moment(d?.datum_2).format('DD-MM-YYYY HH:mm:ss');
      //   d.status = d?.statusdevice_2;
      //   return d;
      // });

      // setData(formattedData);
      // setLoading(false);

      // setTimeout(() => {
      //   getAllData();
      // }, 300000);
    }
  } catch (err: any) {
    setLoading(false);

    setTimeout(() => {
      getAllData();
    }, 300000);
  }
};

useEffect(() => {
  getAllData();
  return () => {
    source.cancel();
  };
}, []);
  // const getAllData = async () => {
  //   setLoading(true);

  //   await new Promise((resolve) => setTimeout(resolve, 300));

  //   try {
  //     const params = {
  //       page: 1,
  //       limit: 1000
  //     };

  //     const req: any = await getAllByPath('opsisdis/frekuensi/scd-frek-rtl', params, source.token);

  //     const { results } = req;
  //     let data = results?.map((d: any) => {
  //       d.min = d.value_1;
  //       d.max = d.value_2;
  //       d.icon = "fa fa-gear";
  //       d.sufixTitle = 'Hz';
  //       d.title = d?.ref_frek.nama;
  //       d.classBgCard = 'bg-aqua';
  //       d.routeDetail = `detail/${d.id_meter}`
  //       d.date = moment(d?.datum_2).format('DD-MM-YYYY HH:mm:ss')
  //       // d.status = d?.statusdata_1 == "1" ? "Connected" : "Disconected"
  //       d.status = d?.statusdevice_2
  //       return d;
  //     });

  //     setData(data);
  //     setLoading(false);

  //     setTimeout(() => {
  //       getAllData()
  //     }, 300000);

  //   } catch (err: any) {
  //     setLoading(false);

  //     setTimeout(() => {
  //       getAllData();
  //     }, 300000);
  //   }
  // };

  /** READ PAGINATION AND FILTER CHANGE */
  // useEffect(() => {
  //   getAllData();
  //   return () => {
  //     source.cancel()
  //   }
  // }, []);
  return (
    <>
      <TopBarLoader isLoading={loading} />
      {/* KINERJA SCADA  */}
      <Row className='mb-2 gx-2'>
     
      <Col md={9} sm>
          <Card className='card-widget'>
            <Card.Header className='text-uppercase'>Monitoring</Card.Header>
            <Card.Body>
              <Row>
                {
                  data?.map((item: any, index: number) => (
                    <Col key={index} md={4} xs={12} className='mb-3 mb-md-0'>
                      <CardInfoChildren {...item} >
                        <div className='p-3'>
                          <div className="d-flex justify-content-center" style={{ fontSize: "3rem", fontWeight: 500 }}>{item?.max} {item?.sufixTitle}</div>
                          <div className='d-flex justify-content-center' style={{ fontSize: "1.3rem", fontWeight: 500 }}>{item?.status}</div>
                          <div className="d-flex justify-content-center" style={{ fontSize: "1rem", fontWeight: 500 }}>{item?.date}</div>
                        </div>


                      </CardInfoChildren>

                      {/* <CardInfoChildren {...item} >
                        <div className='p-3'>
                          <div className='d-flex flex-row-reverse fs-7 align-middle'>
                            {item?.date} <i className="fa fa-calendar ms-2 me-2"></i>
                          </div>
                          <div className='d-flex flex-row-reverse' style={{ fontSize: "3rem", fontWeight: 500 }}>{item?.status}</div>
                        </div>
                        <div className="d-flex justify-content-center" style={{ fontSize: "2rem", fontWeight: 500 }}>{item?.max} {item?.sufixTitle}</div>
                      </CardInfoChildren> */}
                    </Col>
                  ))
                }
              </Row>
            </Card.Body>
          </Card>
          {renderGrafikKomulatif}
        </Col>
        <Col md={3}>
          <RTUOutOfPoolUP2DBANTEN />
          {/* <TMTSOutOfPool /> */}
        </Col>
      </Row>

     

    </>
  );
}
