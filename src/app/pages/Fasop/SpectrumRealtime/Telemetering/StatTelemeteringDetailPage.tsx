import React, { useEffect, useState } from 'react';
import { Card, Form, Row, Col, InputGroup } from 'react-bootstrap';
import Button from '@app/components/Button/Button';
import { getAllByPath } from '@app/services/main.service';
import { API_PATH } from '@app/services/_path.service';
import TopBarLoader from '@app/components/Loader/TopBarLoader';
import axios from 'axios';
import moment from 'moment';
import ChartDs from './ChartDs';
import NoData from '@app/components/Error/NoData';


export default function GroupWhatsappDetailPage({ filterParams }: any) {
    const source = axios.CancelToken.source();
    const [loading, setLoading] = useState(false);
    const [dataTelemetring, setdataTelemetring] = useState<any>([]);
    const [currentDate, setCurrentDate] = useState(moment().format('YYYY'));
    
     /** GET DATA  */
     const getAllDataTelemetring = async () => {
        setLoading(true);

        try {
            const req: any = await getAllByPath(API_PATH().fasop.realtime.analog, { tahun: currentDate, }, source.token);
            const { results } = req;
            setdataTelemetring(results)

            setLoading(false);
        } catch (err: any) {
            setLoading(false);
        }

    };

    useEffect(() => {
        setCurrentDate(moment().format('YYYY'));
        // setDt1(moment().subtract(5, 'minutes').format('HH:mm'));
        // setDt2(moment().format('HH:mm'));

        getAllDataTelemetring();
      
        return () => {
            source.cancel('Request cancelled');
        };
    }, []);


    const handleFormSubmit = (e: any) => {
        e.preventDefault();
        // Perform form submission logic here
        getAllDataTelemetring();
        
    };
    return (
        <>
        
            {filterParams?.point_number &&
              <Row>
              <Col md={12} className='mb-4'>
              <TopBarLoader isLoading={loading} />
            <Card className='card-widget'>
                <Card.Header>  <h4>Dashboard Overview</h4> </Card.Header>
                <Card.Body>
                    <Form className='d-flex flex-column align-items-center mb-4' onSubmit={handleFormSubmit}>
                        <Row className='align-items-center'>
                            <Col xs='auto'>
                                <InputGroup className='mb-2'>
                                    <InputGroup.Text>TAHUN</InputGroup.Text>
                                    <Form.Control type='years' name='tahun' value={currentDate} onChange={(e) => setCurrentDate(e.target.value)} />
                                </InputGroup>
                            </Col>

                            <Col xs='auto'>
                                <Button type='submit' className='mb-2'> Tampilkan </Button>
                            </Col>

                            {/* Add the "Print Page" button */}
                            {/* <Col xs='auto'>
                                <Button type='button' className='mb-2' onClick={() => window.print()}> Print Page </Button>
                            </Col> */}
                        </Row>
                    </Form>

                    <Row>
                        {/* {data?.map((i: any, index: number) => ( */}
                        <Col md={6} key={1} className='mb-4'>
                            <ChartDs titles={'TELEMETERING'} series={dataTelemetring.series} categories={dataTelemetring.categories} typeChart='line' />
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
            }

           
        </>
    );
}
