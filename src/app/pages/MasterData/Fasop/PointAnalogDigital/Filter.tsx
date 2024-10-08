import React, { useState ,} from 'react';
import { Col, Form, Row } from 'react-bootstrap';

import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
// import isEmpty from 'lodash/isEmpty';

import FiltersForm from '@app/modules/Filters/FilterForm';
import FilterActionButton from '@app/modules/Filters/FilterActionButton';
import SelectAsyncDynamicNew from '@app/modules/SelectForm/SelectAsyncDynamic';
import SelectFormStatic from '@app/modules/SelectForm/SelectFormStatic';
// import { API_PATH } from '@app/services/_path.service';
export default function Filter({ optionsScada,onFilterChange }: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataParams, setDataParams] = useState<any>();
  // const [data, setData] = useState(null); 
  /** FORM  HANDLE */
  const validationSchema = Yup.object().shape({
    path1: Yup.string().nullable(),
    path2: Yup.string().nullable(),
    path3: Yup.string().nullable(),
    path4: Yup.string().nullable(),
    path5: Yup.string().nullable(),
    nama_pointtype: Yup.string().nullable(),
    id_induk_pointtype: Yup.string().nullable(),
    jenispoint: Yup.string().nullable(),

  });

  const [formModel] = useState<any>({
    path1: "",
    path2: "",
    path3: "",
    path4: "",
    path5: "",
    jenispoint: "",
    id_induk_pointtype: "",
    ismapping: "",
    id_pointtype: "",
    nama_pointtype: "",
  });


  const {
    handleSubmit,
    setValue,
    setError,
    formState,
    control
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formModel,
  });
  const { errors }: any = formState || {};
  const watchPath1 = useWatch({ control, name: 'path1' });
  const watchPath2 = useWatch({ control, name: 'path2' });
  const watchPath3 = useWatch({ control, name: 'path3' });
  const watchPath4 = useWatch({ control, name: 'path4' });
  /** SUBMIT FORM HANDLING */
  const onSubmitForm = (data: any) => {
    let params = data;
    if (data?.kinerja === "BULANAN") {
      delete params.harian;
    } else {
      delete params.bulanan;
    }
    let result = optionsScada?.filter((obj: any) => {
      return obj.value === idPointWatch;
    });
    data.jenispoint = result[0]?.jenis
    // setDataParams(params);
    onFilterChange (params)
    setDataParams(() => {
      return { ...params }
    });
  
  };

 

  const idPointWatch = useWatch({ control, name: 'id_induk_pointtype' });
  // const id_pointtypewatch = useWatch({ control, name: 'id_pointtype' });


  
  return (
    <>
      <FiltersForm
        setError={setError}
        setValue={setValue}
        dataParams={dataParams}
        onLoading={setLoading}
        fields={{
          path1: "",
          path2: "",
          path3: "",
          path4: "",
          path5: "",
          id_pointtype:'',
          nama_pointtype:'',
          jenispoint: '',
          id_induk_pointtype: '',
          ismapping: '',
        }}
      >
        <Form noValidate onSubmit={handleSubmit(onSubmitForm)}>
          <Row>
            <Col md={3} className="">
              <Form.Group className='mb-2'>
                <Form.Label>Peralatan SCADA</Form.Label>
                <SelectFormStatic
                  control={control}
                  errors={errors}
                  isClearable={true}
                  fieldName="id_induk_pointtype"
                  placeholder='Pilih ...'
                  options={optionsScada}
                />
              </Form.Group>

            </Col>
         
            <Col md={3} className="">
      <Form.Group className='mb-2'>
        <Form.Label>Jenis Point</Form.Label>
        <SelectAsyncDynamicNew
          fieldName='nama_pointtype'
          pathServiceName='master.fasop.point_type'
          labelField='name'
          valueField='name'
          placeholder='Pilih...'
          isClearable={true}
          errors={errors}
          control={control}
          watchParent={
            idPointWatch
          }
          queryParams={{
            page: 1,
            limit: 10,
            is_induk:'ANAK',
            sort_by: '-name',
            id_induk_pointtype: idPointWatch,
            status:1
          }}
        />
      </Form.Group>
    </Col>
            
    <Col md={2} className="">
              <Form.Group className='mb-2'>
                <Form.Label>Lokasi (B1)</Form.Label>
                <SelectAsyncDynamicNew
                  fieldName='path1'
                  pathServiceName='fasop.laporan_scada.path'
                  labelField='pathname'
                  valueField='pathname'
                  placeholder='Pilih...'
                  isClearable={true}
                  errors={errors}
                  control={control}
                  queryParams={{
                    page: 1,
                    limit: 10,
                    path: 'path1',
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={2} className="">
              <Form.Group className='mb-2'>
                <Form.Label>Tegangan (B2)</Form.Label>
                <SelectAsyncDynamicNew
                  fieldName='path2'
                  pathServiceName='fasop.laporan_scada.path'
                  labelField='pathname'
                  valueField='pathname'
                  placeholder='Pilih...'
                  isClearable={true}
                  errors={errors}
                  control={control}
                  watchParent={watchPath1}
                  queryParams={{
                    page: 1,
                    limit: 10,
                    path: 'path2',
                    ...(watchPath1 ? { path1: watchPath1 } : {}),
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={2} className="">
              <Form.Group className='mb-2'>
                <Form.Label>Bay (B3)</Form.Label>
                <SelectAsyncDynamicNew
                  fieldName='path3'
                  pathServiceName='fasop.laporan_scada.path'
                  labelField='pathname'
                  valueField='pathname'
                  placeholder='Pilih...'
                  isClearable={true}
                  errors={errors}
                  control={control}
                  watchParent={watchPath2}
                  queryParams={{
                    page: 1,
                    limit: 10,
                    path: 'path3',
                    ...(watchPath1 ? { path1: watchPath1 } : {}),
                    ...(watchPath2 ? { path2: watchPath2 } : {}),
                  }}
                />
              </Form.Group>

            </Col>
            <Col md={2} className="">
              <Form.Group className='mb-2'>
                <Form.Label>Element</Form.Label>
                <SelectAsyncDynamicNew
                  fieldName='path4'
                  pathServiceName='fasop.laporan_scada.path'
                  labelField='pathname'
                  valueField='pathname'
                  placeholder='Pilih...'
                  isClearable={true}
                  errors={errors}
                  control={control}
                  watchParent={watchPath3}
                  queryParams={{
                    page: 1,
                    limit: 10,
                    path: 'path4',
                    ...(watchPath1 ? { path1: watchPath1 } : {}),
                    ...(watchPath2 ? { path2: watchPath2 } : {}),
                    ...(watchPath3 ? { path3: watchPath3 } : {}),
                  }}
                />
              </Form.Group>

            </Col>
            <Col md={2} className="">
              <Form.Group className='mb-2'>
                <Form.Label>Info</Form.Label>
                <SelectAsyncDynamicNew
                  fieldName='path5'
                  pathServiceName='fasop.laporan_scada.path'
                  labelField='pathname'
                  valueField='pathname'
                  placeholder='Pilih...'
                  isClearable={true}
                  errors={errors}
                  control={control}
                  watchParent={watchPath4}
                  queryParams={{
                    page: 1,
                    limit: 10,
                    path: 'path5',
                    ...(watchPath1 ? { path1: watchPath1 } : {}),
                    ...(watchPath2 ? { path2: watchPath2 } : {}),
                    ...(watchPath3 ? { path3: watchPath3 } : {}),
                    ...(watchPath4 ? { path4: watchPath4 } : {}),
                  }}
                />
              </Form.Group>
            </Col>
            <Col md={3} className="">
              <Form.Group className='mb-2'>
                <Form.Label>Status Mapping</Form.Label>
                <SelectFormStatic
                  control={control}
                  errors={errors}
                  fieldName='ismapping'
                  placeholder='All'
                  options={[
                    { label: 'Sudah Mapping', value: 1 },
                    { label: 'Belum Mapping', value: 2 },
                  ]}
                  isClearable={true}
                />
              </Form.Group>
            </Col>

            <Col md={2} className="mt-2">
              <FilterActionButton className="justify-content-start" loading={loading} />
            </Col>
          </Row>
        </Form>
      </FiltersForm >
    </>
  );
}
