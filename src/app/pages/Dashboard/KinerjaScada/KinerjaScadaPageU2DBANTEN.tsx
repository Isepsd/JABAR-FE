import React, { useEffect, useState } from 'react';
import { Card, Form, Row, Col, InputGroup } from 'react-bootstrap';
import Button from '@app/components/Button/Button';
// import { getAllByPath } from '@app/services/main.service';
// import { API_PATH } from '@app/services/_path.service';
import TopBarLoader from '@app/components/Loader/TopBarLoader';
import axios from 'axios';
import moment from 'moment';
import ChartDs from './ChartDs';
import NoData from '@app/components/Error/NoData';
import SelectFormStatic from '@app/modules/SelectForm/SelectFormStatic';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
export default function ResponsePembangkitPage() {
    const source = axios.CancelToken.source();
    const [loading, setLoading] = useState(false);
    const [dataTelemetring, setdataTelemetring] = useState<any>([]);
    const [dataRtu, setdataRtu] = useState<any>([]);
    const [dataSe, setdataSe] = useState<any>([]);
    const [dataTrip, setdataTrip] = useState<any>([]);
    const [dataEksFrek, setdataEksFrek] = useState<any>([]);
    const [dataEksTeg, setdataEksTeg] = useState<any>([]);
    const [dataTelesignal, setdataTelesignal] = useState<any>([]);
    const [dataMaster, setdataMaster] = useState<any>([]);
    const [dataRC, setdataRC] = useState<any>([]);
    const jenisLayananOptions: any = [
        { label: 'GI', value: 'GI' },
        { label: 'GH', value: 'GH' },
        // { label: 'CAMPURAN', value: 'CAMPURAN' }
      ]

      const validationSchema = Yup.object().shape({
        
        pilih_gi: Yup.string().nullable(),
      });
      const [formModel] = useState<any>({  pilih_gi:jenisLayananOptions});
      const {
      
        control,
        formState,
      } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: formModel,
      });
      const { errors }: any = formState || {};
    const [currentDate, setCurrentDate] = useState(moment().format('YYYY'));
    // const [dt1, setDt1] = useState(moment().subtract(5, 'minutes').format('HH:mm'));
    // const [dt2, setDt2] = useState(moment().format('HH:mm'));

    /** GET DATA  */
    // const getAllDataTelemetring = async () => {
    //     setLoading(true);

    //     try {
    //         const req: any = await getAllByPath(API_PATH().dashboard.kinerja_scada.tahun.telemetering, { tahun: currentDate, }, source.token);
    //         const { results } = req;
    //         setdataTelemetring(results)

    //         setLoading(false);
    //     } catch (err: any) {
    //         setLoading(false);
    //     }

    // };


    // const getAllDataRtu = async () => {
    //     setLoading(true);

    //     try {
    //         const req: any = await getAllByPath(API_PATH().dashboard.kinerja_scada.tahun.rtu, { tahun: currentDate, }, source.token);
    //         const { results } = req;
    //         setdataRtu(results)

    //         setLoading(false);
    //     } catch (err: any) {
    //         setLoading(false);
    //     }

    // };


    // const getAllDataSe = async () => {
    //     setLoading(true);

    //     try {
    //         const req: any = await getAllByPath(API_PATH().dashboard.kinerja_scada.tahun.state_estimator, { tahun: currentDate, }, source.token);
    //         const { results } = req;
    //         setdataSe(results)

    //         setLoading(false);
    //     } catch (err: any) {
    //         setLoading(false);
    //     }

    // };

    // const getAllDataTrip = async () => {
    //     setLoading(true);

    //     try {
    //         const req: any = await getAllByPath(API_PATH().dashboard.kinerja_scada.tahun.trip, { tahun: currentDate, }, source.token);
    //         const { results } = req;
    //         setdataTrip(results)

    //         setLoading(false);
    //     } catch (err: any) {
    //         setLoading(false);
    //     }

    // };
    // const getAllDataEksFrek = async () => {
    //     setLoading(true);

    //     try {
    //         const req: any = await getAllByPath(API_PATH().dashboard.kinerja_scada.tahun.eks_frek, { tahun: currentDate, }, source.token);
    //         const { results } = req;
    //         setdataEksFrek(results)

    //         setLoading(false);
    //     } catch (err: any) {
    //         setLoading(false);
    //     }

    // };

    // const getAllDataTelesignal = async () => {
    //     setLoading(true);

    //     try {
    //         const req: any = await getAllByPath(API_PATH().dashboard.kinerja_scada.tahun.telesignal, { tahun: currentDate, }, source.token);
    //         const { results } = req;
    //         setdataTelesignal(results)

    //         setLoading(false);
    //     } catch (err: any) {
    //         setLoading(false);
    //     }

    // };
    // const getAllDataMaster = async () => {
    //     setLoading(true);

    //     try {
    //         const req: any = await getAllByPath(API_PATH().dashboard.kinerja_scada.tahun.master, { tahun: currentDate, }, source.token);
    //         const { results } = req;
    //         setdataMaster(results)

    //         setLoading(false);
    //     } catch (err: any) {
    //         setLoading(false);
    //     }

    // };
    // const getAllDataRC = async () => {
    //     setLoading(true);

    //     try {
    //         const req: any = await getAllByPath(API_PATH().dashboard.kinerja_scada.tahun.rc, { tahun: currentDate, }, source.token);
    //         const { results } = req;
    //         setdataRC(results)

    //         setLoading(false);
    //     } catch (err: any) {
    //         setLoading(false);
    //     }

    // };
    // const getAllDataEksTeg = async () => {
    //     setLoading(true);

    //     try {
    //         const req: any = await getAllByPath(API_PATH().dashboard.kinerja_scada.tahun.eks_teg, { tahun: currentDate, }, source.token);
    //         const { results } = req;
    //         setdataEksTeg(results)

    //         setLoading(false);
    //     } catch (err: any) {
    //         setLoading(false);
    //     }

    // };
    const getAllDataTelemetring = async () => {
        setLoading(true);
    
        try {
            const results = {
                categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                series: [
                    {
                        name: 'Telemetring',
                        data: [150, 200, 250, 180, 220, 170, 190, 210, 230, 240, 260, 280]
                    }
                ]
            };
            setdataTelemetring(results);
    
            setLoading(false);
        } catch (err) {
            setLoading(false);
        }
    };
    
    const getAllDataRtu = async () => {
        setLoading(true);
    
        try {
            const results = {
                categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                series: [
                    {
                        name: 'RTU',
                        data: [50, 100, 150, 120, 160, 110, 130, 150, 170, 180, 200, 220]
                    }
                ]
            };
            setdataRtu(results);
    
            setLoading(false);
        } catch (err) {
            setLoading(false);
        }
    };
    
    const getAllDataSe = async () => {
        setLoading(true);
    
        try {
            const results = {
                categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                series: [
                    {
                        name: 'State Estimator',
                        data: [300, 350, 400, 320, 380, 310, 330, 350, 370, 380, 400, 420]
                    }
                ]
            };
            setdataSe(results);
    
            setLoading(false);
        } catch (err) {
            setLoading(false);
        }
    };
    
    const getAllDataTrip = async () => {
        setLoading(true);
    
        try {
            const results = {
                categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                series: [
                    {
                        name: 'Trip',
                        data: [20, 40, 60, 30, 50, 20, 40, 60, 80, 70, 90, 100]
                    }
                ]
            };
            setdataTrip(results);
    
            setLoading(false);
        } catch (err) {
            setLoading(false);
        }
    };
    
    const getAllDataEksFrek = async () => {
        setLoading(true);
    
        try {
            const results = {
                categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                series: [
                    {
                        name: 'Eks Frek',
                        data: [10, 15, 20, 12, 18, 11, 13, 15, 17, 18, 20, 22]
                    }
                ]
            };
            setdataEksFrek(results);
    
            setLoading(false);
        } catch (err) {
            setLoading(false);
        }
    };
    
    const getAllDataTelesignal = async () => {
        setLoading(true);
    
        try {
            const results = {
                categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                series: [
                    {
                        name: 'Telesignal',
                        data: [90, 100, 110, 95, 105, 90, 100, 110, 120, 115, 125, 130]
                    }
                ]
            };
            setdataTelesignal(results);
    
            setLoading(false);
        } catch (err) {
            setLoading(false);
        }
    };
    
    const getAllDataMaster = async () => {
        setLoading(true);
    
        try {
            const results = {
                categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                series: [
                    {
                        name: 'Master',
                        data: [400, 450, 500, 420, 480, 410, 430, 450, 470, 480, 500, 520]
                    }
                ]
            };
            setdataMaster(results);
    
            setLoading(false);
        } catch (err) {
            setLoading(false);
        }
    };
    
    const getAllDataRC = async () => {
        setLoading(true);
    
        try {
            const results = {
                categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                series: [
                    {
                        name: 'RC',
                        data: [30, 60, 90, 45, 75, 30, 60, 90, 120, 105, 135, 150]
                    }
                ]
            };
            setdataRC(results);
    
            setLoading(false);
        } catch (err) {
            setLoading(false);
        }
    };
    
    const getAllDataEksTeg = async () => {
        setLoading(true);
    
        try {
            const results = {
                categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                series: [
                    {
                        name: 'Eks Teg',
                        data: [5, 10, 15, 8, 12, 6, 7, 9, 11, 12, 14, 16]
                    }
                ]
            };
            setdataEksTeg(results);
    
            setLoading(false);
        } catch (err) {
            setLoading(false);
        }
    };
    
    
    useEffect(() => {
        setCurrentDate(moment().format('YYYY'));
        // setDt1(moment().subtract(5, 'minutes').format('HH:mm'));
        // setDt2(moment().format('HH:mm'));

        getAllDataTelemetring();
        getAllDataRtu();
        getAllDataTrip();
        getAllDataEksFrek();
        getAllDataTelesignal();
        getAllDataMaster();
        getAllDataSe();
        getAllDataRC();
        getAllDataEksTeg();
        return () => {
            source.cancel('Request cancelled');
        };
    }, []);
    // console.log(dataTelemetring.series)

    const handleFormSubmit = (e: any) => {
        e.preventDefault();
        // Perform form submission logic here
        getAllDataTelemetring();
        getAllDataRtu();
        getAllDataTrip();
        getAllDataEksFrek();
        getAllDataTelesignal();
        getAllDataMaster();
        getAllDataSe();
        getAllDataRC();
        getAllDataEksTeg();
    };

    return (
        <>
            <TopBarLoader isLoading={loading} />
            <Card className='card-widget'>
                <Card.Header>  <h4>Dashboard Overview</h4> </Card.Header>
                <Card.Body>
                     <Row className="align-items-center justify-content-start"  onSubmit={handleFormSubmit}>
                <Col xs="12" sm="auto" className="mb-2">
                    <InputGroup>
                        <InputGroup.Text>TAHUN</InputGroup.Text>
                        <Form.Control
                            type="text"
                            name="tahun"
                            value={currentDate}
                            onChange={(e) => setCurrentDate(e.target.value)}
                        />
                    </InputGroup>
                </Col>
                <Col xs="12" sm="6" md="3" className="mb-2">
                    <Form.Group>
                        <SelectFormStatic
                            options={jenisLayananOptions}
                            fieldName="pilih_gi"
                            placeholder="-- Pilihi Jenis --"
                            errors={errors}
                            control={control}
                        />
                    </Form.Group>
                </Col>
                <Col xs="12" sm="auto" className="mb-2">
                    <Button type="submit">Tampilkan</Button>
                </Col>
            </Row>

                    <Row>
                        {/* {data?.map((i: any, index: number) => ( */}
                        <Col md={6} key={1} className='mb-4'>
                            <ChartDs titles={'TELEMETERING'} series={dataTelemetring.series} categories={dataTelemetring.categories} typeChart='line' />
                        </Col>
                        <Col md={6} key={2} className='mb-4'>
                            <ChartDs titles={'RTU'} series={dataRtu.series} categories={dataRtu.categories} typeChart='line' />
                        </Col>
                        <Col md={6} className='mb-4'>
                            <ChartDs titles={'SE'} series={dataSe.series} categories={dataSe.categories} typeChart='line' />
                        </Col>
                        <Col md={6} className='mb-4'>
                            <ChartDs titles={'MASTER'} series={dataMaster.series} categories={dataMaster.categories} typeChart='line' />
                        </Col>
                        <Col md={6} className='mb-4'>
                            <ChartDs titles={'RC'} series={dataRC.series} categories={dataRC.categories} typeChart='line' />
                        </Col>
                        <Col md={6} className='mb-4'>
                            <ChartDs titles={'TELESIGNAL'} series={dataTelesignal.series} categories={dataTelesignal.categories} typeChart='line' />
                        </Col>

                        <Col md={6} className='mb-4'>
                            <ChartDs titles={'TRIP'} series={dataTrip.series} categories={dataTrip.categories} typeChart='column' />
                        </Col>

                        <Col md={6} className='mb-4'>
                            <ChartDs titles={'EKSKURSI FREKWENSI'} series={dataEksFrek.series} categories={dataEksFrek.categories} typeChart='column' />
                        </Col>

                        <Col md={6} className='mb-4'>
                            <ChartDs titles={'EKSKURSI TEGANGAN'} series={dataEksTeg.series} categories={dataEksTeg.categories} typeChart='column' />
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
        </>
    );
}
