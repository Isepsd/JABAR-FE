import React, { useState } from 'react';
import { Form, Col, Modal } from 'react-bootstrap';

import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import FormData from '@app/modules/Form/FormData';
import ButtonCancel from '@app/components/Button/ButtonCancel';
import { API_PATH } from '@app/services/_path.service';
import Button from '@app/components/Button/Button';

interface IFormUpdateMapping {
    dataSelected?: any;
    setModal?: any;
    // isUpdateNyala ?:boolean;
    id: any;
    //   setModal?: any;
    handleClose?: any;
}

// export default function MappingGarduFormPage() {
 export default function MappingGarduFormPage({ handleClose,id }: IFormUpdateMapping) {
    const [loading, setLoading] = useState<boolean>(false);
    const [dataParams, setDataParams] = useState<any>();

    /** FORM  HANDLE */
    const validationSchema = Yup.object().shape({
        path1: Yup.string().nullable(),
        gardu_mjd: Yup.string().required('Nama Wajib diisi'),
        // status_1: Yup.number().nullable().transform((_, v) => (v == 1 ? 1 : 0)),
        // status_2: Yup.number().nullable().transform((_, v) => (v == 1 ? 1 : 0)),
        status_1: Yup.string().oneOf(['up', 'down']).required(),
        status_2: Yup.string().nullable(),
    });



    const [formModel] = useState<any>({});

    const {
        register,
        handleSubmit,
        setValue,
        setError,
        control,
        formState,
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: formModel,
    });
    const { errors }: any = formState;
    const watchStatus = useWatch({ control, name: 'status_1' });
    // const watchStatus = useWatch({ control, name: 'id_wa_kontak' });

    /** SUBMIT FORM HANDLING */
    // const onSubmitForm = (data: IMappingGardu) => {
    const onSubmitForm = (data: any) => {
        data.id = id
        setDataParams(data);
        handleClose();
    };

    return (
        <>
            <FormData
                setError={setError}
                setValue={setValue}
                dataParams={dataParams}
                // fields={MappingGarduField}
                fields={{
                    path1: "",
                    gardu_mjd: "",
                    status_1: 'down',
                    status_2: 'down',
                }}
                path={API_PATH().apkt.monitoring_gardu_status}
                onLoading={setLoading}
            >
                <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
                    <Modal.Body>
                        <Form.Group as={Col} className='mb-3'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control {...register('path1')}
                                isInvalid={errors.path1} disabled />
                            <Form.Control.Feedback type='invalid'>
                                {errors?.path1?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>No Gardu MJD</Form.Label>
                            <Form.Control
                                {...register('gardu_mjd')}
                                isInvalid={errors.gardu_mjd}
                            />
                            <Form.Control.Feedback type='invalid'>
                                {errors?.gardu_mjd?.message}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Status</Form.Label>
                            <div className='ms-3 py-2'>
                                {/* <Form.Check
                                    type='switch'
                                    id='aktif'
                                    {...register('aktif')}
                                    label={watchStatus === true ? 'Ya' : 'Tidak'}
                                /> */}
                                <Form.Check
                                    type='switch'
                                    id='status_1'
                                    {...register('status_1')}
                                    label={watchStatus === 'up' ? 'Up (Aktif)' : 'Down (Tidak Aktif)'}
                                    checked={watchStatus === 'up'}
                                    onChange={() => setValue('status_1', watchStatus === 'up' ? 'down' : 'up')}
                                />
                            </div>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className='d-flex gap-2'>
                            <Button type='submit' variant='primary' disabled={loading}>  Simpan </Button>
                            <ButtonCancel type='modal' onClick={handleClose}/>
                        </div>
                    </Modal.Footer>
                </Form>
            </FormData>
        </>
    );
}
