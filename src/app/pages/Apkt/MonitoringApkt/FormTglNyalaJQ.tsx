import React, { useState, useEffect } from 'react';
import { Form, Modal, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import ButtonCancel from '@app/components/Button/ButtonCancel';
import { API_PATH } from '@app/services/_path.service';
import Button from '@app/components/Button/Button';
import RequiredInfo from '@app/components/Info/RequiredInfo';
import axios from 'axios';
// import FormDataModal from '@app/modules/Form/FormDataModal';
import FormDataModal from '@app/modules/Form/FormDataModal_APKT_putJQ';
import { get } from 'lodash';
import moment from 'moment';
import { UpdatePadamField } from '@app/interface/apkt-trans-jar.interface';

function FormTglPadamJQ({ dataSelected }: any) {
  const { currentUser } = useSelector((state: any) => state.auth);
  const source = axios.CancelToken.source();

  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams,
    setDataParams
  ] = useState<any>();

  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    tgl_nyala: Yup.string().required("Data Harus diisi"),
    // id_apkt_trans_jar: Yup.number().typeError("Data harus diisi"),
    // ids: Yup.array().typeError("Data harus diisi")
  });

  const [formModel] = useState<any>({
    tgl_nyala: moment().format("YYYY-MM-DD HH:mm:ss"),
    // event: "update_nyala"
  });
  const { register, handleSubmit, setValue, setError, formState } =
    useForm<any>({
      resolver: yupResolver(validationSchema),
      defaultValues: formModel,
    });
  const { errors }: any = formState || {};
  /** WATCH / SUBSCRIBVE FORM CHANGES */

  /** SUBMIT FORM HANDLING */
  // const onSubmitForm = (data: any) => {
  //   const params: any = {
  //     ...data,
  //     id_user_entri: currentUser.id_user,
  //   };

  //   let ids: any = []
  //   dataSelected?.map((item: any) => {
  //     params.id_apkt_trans_jar = item?.id_apkt_trans_jar
  //     item?.children?.map((items: any) => {
  //       ids.push(items?.id_apkt_trans_jar_det)

  //     })
  //     ids.push(item?.id_apkt_trans_jar_det)
  //   })
  //   params.ids = ids;
  //   // console.log('params', params);
  //   setDataParams(params);
  // };

  const onSubmitForm = (data: any) => {
    const params = dataSelected.map((item: any) => ({
      // id_apkt_trans_jar_det: item?.id_apkt_trans_jar_det,
      // id_apkt_trans_jar: item?.id_apkt_trans_jar,
      // id_user_update: currentUser.id_user,
      // tgl_nyala: data.tgl_nyala,
      id_apkt_trans_jar_det: item?.id_apkt_trans_jar_det,
      id_apkt_trans_jar: item?.id_apkt_trans_jar,
      // id_user_update: currentUser.id_user,
      id_user_update_nyala: currentUser.id_user,
      status_apkt_kirim_nyala: 1,
      tgl_apkt_kirim_nyala: moment().format('YYYY-MM-DD HH:mm:ss'),
      tgl_user_update_nyala: moment().format('YYYY-MM-DD HH:mm:ss'),
      tgl_nyala: data.tgl_nyala,
      mode_kirim_apkt: 'MANUAL',
    }));

    const datas = { datas: params };
    // const datas = params;
    console.log(datas);
    setDataParams(datas);

  }



  useEffect(() => {
    return () => {
      source.cancel('Request Canceled');
    };
  }, []);



  return (
    <>
      <FormDataModal
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        fields={UpdatePadamField}
        path={get(API_PATH(), "apkt.trans_jar_detail_batch")}
        onLoading={setLoading}
        customLabel={'hide'}
        isModal={true}
        ids='id_apkt_trans_jar_det'
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Modal.Body>
            <Row>
              <Form.Group className='mb-3'>
                <Form.Label>
                  Tanggal
                  <RequiredInfo />
                </Form.Label>
                <Form.Control
                  isInvalid={errors?.tgl_nyala as boolean | undefined}
                  type='datetime-local'
                  formTarget='YYYY-MM-DD HH:mm:ss'
                  {...register('tgl_nyala')}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors?.tgl_nyala?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <div className='d-flex gap-2'>
              <ButtonCancel type='modal' />
              <Button
                type='submit'
                variant='primary'
                disabled={loading}
                isLoading={loading}
              >
                Simpan
              </Button>
            </div>
          </Modal.Footer>
        </Form>
      </FormDataModal>
    </>
  );
}

export default FormTglPadamJQ;
