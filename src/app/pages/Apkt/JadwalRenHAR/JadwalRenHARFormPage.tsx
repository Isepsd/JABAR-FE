import React, { useState } from 'react';
// import { Button, Col, Form } from 'react-bootstrap';
import { Col, Form } from 'react-bootstrap';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { IJadwalRenHAR, JadwalRenHARField } from '@app/interface/master-data/apkt-jadwal-renhar.interface';

import FormData from '@app/modules/Form/FormData';
import ButtonCancel from '@app/components/Button/ButtonCancel';
import { API_PATH } from '@app/services/_path.service';
import Button from '@app/components/Button/Button';
import moment from 'moment';

export default function MappingGarduFormPage() {
    const [loading, setLoading] = useState<boolean>(false);
    const [dataParams, setDataParams] = useState<any>();

    /** FORM  HANDLE */
    const validationSchema = Yup.object().shape({
        tgl_mulai: Yup.string().required("Data Harus diisi"),
        tgl_selesai: Yup.string().required("Data Harus diisi"),
    });



    const [formModel] = useState<any>({
        tgl_mulai: moment().format("YYYY-MM-DD HH:mm:ss"),
        tgl_selesai: moment().format("YYYY-MM-DD HH:mm:ss"),
    });

    const {
        register,
        handleSubmit,
        setValue,
        setError,
        // control,
        formState,
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: formModel,
    });
    const { errors }: any = formState || {};
    // const watchStatus = useWatch({ control, name: 'aktif' });
    // const watchStatus = useWatch({ control, name: 'id_wa_kontak' });

    /** SUBMIT FORM HANDLING */
    const onSubmitForm = (data: IJadwalRenHAR) => {
        setDataParams(data);
    };

    return (
        <>
            <FormData
                setError={setError}
                setValue={setValue}
                dataParams={dataParams}
                fields={JadwalRenHARField}
                path={API_PATH().apkt.trans_jar_det_har_cek_status}
                onLoading={setLoading}
            >
                <Col md="6" xs="12">
                    <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
                        <Form.Group className='mb-3'>
                            <Form.Label>
                                Tanggal Mulai Pelaksanaan
                            </Form.Label>
                            <Form.Control
                                isInvalid={errors?.tgl_mulai as boolean | undefined}
                                type='datetime-local'
                                formTarget='YYYY-MM-DD HH:mm:ss'
                                {...register('tgl_mulai')}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {errors?.tgl_mulai?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>
                                Tanggal Selesai Pelaksanaan
                            </Form.Label>
                            <Form.Control
                                isInvalid={errors?.tgl_selesai as boolean | undefined}
                                type='datetime-local'
                                formTarget='YYYY-MM-DD HH:mm:ss'
                                {...register('tgl_selesai')}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {errors?.tgl_selesai?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className='mt-4'>
                            <Button type='submit' variant='primary' disabled={loading}>  Simpan </Button>
                            <ButtonCancel />
                        </Form.Group>
                    </Form>
                </Col>
            </FormData>
        </>
    );
}
