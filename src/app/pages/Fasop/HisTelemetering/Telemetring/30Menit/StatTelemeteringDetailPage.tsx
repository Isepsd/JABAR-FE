import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';

import { getAllByPath } from '@app/services/main.service';
import { API_PATH } from '@app/services/_path.service';
import TopBarLoader from '@app/components/Loader/TopBarLoader';
import axios from 'axios';

import ChartDs from './ChartDs';
import NoData from '@app/components/Error/NoData';


export default function StatTelemeteringDetailPage({ filterParams,filterValues }: any) {
    const source = axios.CancelToken.source();
    const [loading, setLoading] = useState(false);
    const [dataTelemetring, setdataTelemetring] = useState<any>([]);
    const [page] = useState(1); // State for page
    const [limit] = useState(10); // State for limit
    
 // GET DATA
 const getAllDataTelemetring = async () => {
    setLoading(true);

    try {
        // Include page and limit in the request parameters
        const params = {
            page,
            limit,
            ...filterParams
        };

        const req: any = await getAllByPath(API_PATH().fasop.histele.analog_30m, params, source.token);
        const { results } = req;

        // Ensure results is an array
        if (Array.isArray(results)) {
            // Map the necessary data from results
            const seriesData = results.map((item: any) => item.value);
            const categories = results.map((item: any) => item.datum);

            setdataTelemetring({
                series: [{ name: 'Telemetering', data: seriesData }],
                categories: categories
            });
        } else {
            console.error('Unexpected results format:', results);
            setdataTelemetring({
                series: [],
                categories: []
            });
        }
        setLoading(false);
    } catch (err: any) {
        setLoading(false);
        console.error('Error fetching data:', err);
        setdataTelemetring({
            series: [],
            categories: []
        });
    }
};

useEffect(() => {
    if (filterParams?.point_number) {
        console.log('Fetching data for point_number:', filterParams.point_number);
        getAllDataTelemetring();
    }
    return () => {
        source.cancel('Request cancelled');
    };
}, [filterParams,filterValues]); // Only depend on filterParams

   
    return (
        <>
        
        {(filterParams?.path1 || filterParams?.path2 || filterParams?.path3 || filterParams?.path4 || filterParams?.path5) && (
              <Row>
              <Col md={12} className='mb-4'>
              <TopBarLoader isLoading={loading} />
            <Card className='card-widget'>
                <Card.Header>  <h4>Detail Grafik Telemetring 30 Menit </h4> </Card.Header>
                <Card.Body>
                   

                    <Row>
                        {/* {data?.map((i: any, index: number) => ( */}
                        <Col md={12} key={1} className='mb-4'>
                                     <ChartDs
                                        titles={`TELEMETERING ${filterParams?.path3 || ''}`}
                                        series={dataTelemetring.series}
                                        categories={dataTelemetring.categories}
                                        typeChart='line'
                                        />
                        </Col>
                
                        
                        {/* ))} */}


                        {/* <ChartDs titles={'RTU'} series={data.series} categories={data.categories} typeChart='line' /> */}
                        {/* {data?.map((i: any, index: number) => (
                            <Col md={6} key={index} className='mb-4'>

                                {i?.series?.length > 0 && (
                                    <div className='border'>
                                        <ChartDs titles={i.unit} series={i.series} categories={i.categories} typeChart='line' />
                                    </div>
                                )}
                                {i?.series?.length === 0 && (
                                    <>
                                        <h4 className="text-center font-weight-light">{i.unit}</h4>
                                        <div className="position-relative"><NoData /></div>
                                    </>
                                )}

                            </Col>
                        ))} */}

                        {dataTelemetring?.length === 0 && (
                            <>
                                <div className='border'>
                                    <div className="position-relative"><NoData /></div>
                                </div>
                            </>
                        )}
                    </Row>
                </Card.Body>
            </Card>
                </Col>
            </Row>
           )}

           
        </>
    );
}
