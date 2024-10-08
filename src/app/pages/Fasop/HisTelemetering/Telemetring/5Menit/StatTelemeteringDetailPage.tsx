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
    const [dataTelemetring, setDataTelemetring] = useState<any>({ series: [], categories: [] });

    // Fetch data for telemetering
    const getAllDataTelemetring = async () => {
        setLoading(true);
        try {
            const params = {
                page: 1, // Assuming page is static for this example
                limit: 10, // Assuming limit is static for this example
                ...filterParams,
               
            };

            const req:any = await getAllByPath(API_PATH().fasop.histele.analog_5m, params, source.token);
            const { results } = req;

            if (Array.isArray(results)) {
                const seriesData = results.map((item: any) => item.value);
                const categories = results.map((item: any) => item.datum);

                setDataTelemetring({
                    series: [{ name: 'Telemetering', data: seriesData }],
                    categories: categories
                });
            } else {
                console.error('Unexpected results format:', results);
                setDataTelemetring({ series: [], categories: [] });
            }
        } catch (err: any) {
            if (axios.isCancel(err)) {
                console.log('Request cancelled');
            } else {
                console.error('Error fetching data:', err);
            }
            setDataTelemetring({ series: [], categories: [] });
        } finally {
            setLoading(false);
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
            {filterParams?.point_number && (
                <Row>
                    <Col md={12} className='mb-4'>
                        <TopBarLoader isLoading={loading} />
                        <Card className='card-widget'>
                            <Card.Header><h4>Detail Grafik Telemetring 5 Menit</h4></Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col md={12} key={1} className='mb-4'>
                                    <ChartDs
                                        titles={`TELEMETERING ${filterParams?.path3 || ''}`}
                                        series={dataTelemetring.series}
                                        categories={dataTelemetring.categories}
                                        typeChart='line'
                                        />
                                    </Col>
                                    {dataTelemetring.series?.length === 0 && (
                                        <div className='border'>
                                            <div className="position-relative"><NoData /></div>
                                        </div>
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
