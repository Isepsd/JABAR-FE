import React, { useState, useRef } from 'react';
import RequiredInfo from '@app/components/Info/RequiredInfo';
import { Col, Form } from 'react-bootstrap';
import Button from '@app/components/Button/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { Kirim_wa_field } from '@app/interface/master-data/fasop-whatsapp-kirim-wa';
import FormData from '@app/modules/Form/FormData';
import ButtonCancel from '@app/components/Button/ButtonCancel';
import { API_PATH } from '@app/services/_path.service';
import DynamicDropdown from '@app/components/DynamicDropdown/DynamicDropDownListWithCheckbox';
import moment from 'moment';

export default function KirimWhatsappFormPage() {
    const [loading, setLoading] = useState<boolean>(false);
    const [dataParams, setDataParams] = useState<any>();
    const { currentUser } = useSelector((state: any) => state.auth);
    const [dataSelected, setDataSelected] = useState<any>([]);
    const dropdownRef = useRef<any>(null);

    const validationSchema = Yup.object().shape({
        id_wa_kontak: Yup.array().min(1, 'Data tidak valid').required('This field is required'),
        msg: Yup.string().required('Please Input Message'),
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
    const { errors }: any = formState || {};

    const handleChecked = (item: any) => {
        setDataSelected(item.current);
    };
    
    const onSubmitForm = (data: any) => {
        const formattedData = dataSelected.map((item: any) => ({
            id_user_created : currentUser.id_user,
            status : 1,
            status_sent : 0,
            date_send : moment().format('YYYY-MM-DD HH:mm:ss'),
            id_wa_kontak : item,
            msg : data.msg
        }));
        const datas = { datas: formattedData };
        setDataParams(datas);
        clearDropdownSelection();
    };

    const clearDropdownSelection = () => {
        dropdownRef.current?.clearSelection();
    };

    return (
        <>
            <FormData
                setError={setError}
                setValue={setValue}
                dataParams={dataParams}
                fields={Kirim_wa_field}
                path={API_PATH().master.fasop.whatsapp.kirim}
                onLoading={setLoading}
                onGetDataResult={setDataSelected}
                redirectSubmitted={false}
            >
                <Col md="6" xs="12">
                    <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
                        <Form.Group>
                            <Form.Label column md='2'>
                                No Kontak <RequiredInfo />
                            </Form.Label>
                            <DynamicDropdown
                                ref={dropdownRef} 
                                pathServiceName='master.fasop.whatsapp.kontak'
                                displayMember={'nama'}
                                valueMember={'id_wa_kontak'}
                                theme={'light'}
                                checkboxes={true}
                                filterable={true}
                                placeHolder={'Silahkan Pilih Kontak'}
                                width={'100%'}
                                height={30}
                                onSelected={handleChecked} 
                                fieldName={'id_wa_kontak'} // Set the field name for validation
                                errors={errors} 
                                control={control}                         
                            ></DynamicDropdown>
                            <Form.Control.Feedback type='invalid'>
                                {errors?.id_wa_kontak?.message}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className='mb-3'>
                            <Form.Label>Pesan</Form.Label>
                            <Form.Control as='textarea' {...register('msg')} rows={8} isInvalid={errors.msg} />
                            <Form.Control.Feedback type='invalid'>
                                {errors?.msg?.message}
                            </Form.Control.Feedback>
                        </Form.Group>


                        <Form.Group className='mt-4'>
                            <Button type='submit' variant='primary' isLoading={loading}>Simpan</Button>
                            <ButtonCancel />
                        </Form.Group>
                    </Form>
                </Col>
            </FormData>
        </>
    );
}
