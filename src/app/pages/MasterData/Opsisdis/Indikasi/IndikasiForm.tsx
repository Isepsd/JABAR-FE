import React, { useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import ButtonCancel from '@app/components/Button/ButtonCancel';

import { API_PATH } from '@app/services/_path.service';
import SelectFormStatic from '@app/modules/SelectForm/SelectFormStatic';
import { OPTION_INDIKASI } from '@app/configs/select-options/rekap_padam.select';
import FormData from '@app/modules/Form/FormData';
import Button from '@app/components/Button/Button';
import {
  IIndikasi,
  IndikasiField,
} from '@app/interface/master-data/indikasi.interface';
import FormInputControl from '@app/components/Input/FormInputControl';

export default function IndikasiForm() {
  const [path] = useState(API_PATH().master.opsisdis.rekap_padam.indikasi);
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    nama: Yup.string().required(),
    jenis: Yup.string().required(),
  });

  const [formModel] = useState<any>();
  const { register, handleSubmit, setValue, formState, control, setError } =
    useForm<IIndikasi>({
      resolver: yupResolver(validationSchema),
      defaultValues: formModel,
    });
  const { errors }: any = formState || {};
  const onSubmitForm = (data: any) => {
    setDataParams(data);
  };
  const watchJenis = useWatch({ control, name: 'jenis' });

  return (
    <>
      <FormData
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        fields={IndikasiField}
        path={path}
        customLabel='state'
        onLoading={setLoading}
        overrideType={{ status: 'string' }}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row className='mb-3'>
            <Col>
              <FormInputControl
                required={true}
                labelName='Nama'
                type='text'
                register={register('nama')}
                isInvalid={errors?.nama as boolean | undefined}
                message={errors?.nama?.message}
                placeholder='Nama'
              />
              <Form.Group className='mb-3' controlId='jenis'>
                <Form.Label>Jenis</Form.Label>
                <SelectFormStatic
                  control={control}
                  errors={errors}
                  fieldName='jenis'
                  options={OPTION_INDIKASI}
                  placeholder='Pilih'
                  defaultValue={watchJenis}
                />
              </Form.Group>
             
            </Col>
          </Row>

          <Form.Group className='mt-4'>
            <Button type='submit' variant='primary' isLoading={loading}>
              Save
            </Button>
            <ButtonCancel />
          </Form.Group>
        </Form>
      </FormData>
    </>
  );
}
