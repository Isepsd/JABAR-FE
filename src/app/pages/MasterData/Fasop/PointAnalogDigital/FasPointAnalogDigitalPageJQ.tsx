import React, { useState, useRef, useEffect, useMemo } from 'react';
import { POINT_ANALOG_DIGITAL_COLUMN_JQX } from '@app/configs/react-table/master-fasop.columns.config';
import { getAllByPath } from '@app/services/main.service';
import { useLocation, useNavigate } from 'react-router-dom';
import TableDataJqxGridNewPeralatanScada from '@app/modules/Table/TableDataJqxGridNewPeralatanScada';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
import axios from 'axios';
import JqxTabs from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtabs';
import Filter from './Filter';
import ModalFormWO from '@app/components/Modals/ModalFormWO';
import CpointUpload from './CpointUpload';
import FasPointAnalogDigitalFormPage from './FasPointAnalogDigitalFormPage';
import { API_PATH } from '@app/services/_path.service';
import TopBarLoader from '@app/components/Loader/TopBarLoader';

export default function FasPointAnalogDigitalPageJQ() {
  const location = useLocation();
  const navigate = useNavigate();
  const dataSelected = useRef<any>();
  const [roleActions, setRoleActions] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const source = axios.CancelToken.source();
  const [scada, setScada] = useState<any>([]);
  const originalDataRef = useRef<any[]>([]);
  const [modal, setModal] = useState<any>({
    approved: false,
    size: 'lg',
    title: `Upload From Excel`,
  });

  const [modalEdit, setModalEdit] = useState<any>({
    approved: false,
    size: 'lg',
    title: `Edit Data`,
  });

  const [filterParams, setFilterParams] = useState<any>({ sort_by: '-updated_at' });
  // State to track whether changesubmit is being used
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [filterValues, setFilterValues] = useState<any>({}); // Menyimpan filter terbaru

  // Function to load initial data and cache it
  const getAllData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    try {
      const params = {
        page: -1,
        limit: -1,
        is_induk: 'INDUK',
      };


      const req: any = await getAllByPath(API_PATH().master.fasop.point_type_get, params, source.token);

      const { results } = req;
      let unit: any = []
      results?.map((item: any) => {
        unit.push({
          label: item?.name,
          value: item?.id_pointtype,
          jenis: item?.jenispoint
        })
      })
      setLoading(false)
      setScada(unit)
    } catch (err: any) {
      setScada(null)
      setLoading(false)
    }
  };



  const handleRowSelected = (data: any) => {
    dataSelected.current = data.current;
  };

  const getAllDatamaster = async (updatedParams: any) => {
    setLoading(true);
    try {
      const params = {
        page: 1,
        limit: 10,
        is_induk: 'INDUK',
        ...filterParams,
        ...updatedParams
      };
      const req: any = await getAllByPath(API_PATH().master.fasop.c_point, params, source.token);
      const results = req?.results || [];
      const unit = results.map((item: any) => ({
        label: item?.name,
        value: item?.id_pointtype,
        jenis: item?.jenispoint,
      }));
      setLoading(false);
      return unit; // Mengembalikan data unit langsung dari fungsi ini
    } catch (err) {
      setLoading(false);
      return []; // Mengembalikan array kosong jika terjadi kesalahan
    }
  };

  // Function to handle data refresh with filter changes (called when changesubmit)
  // const refreshData = (newFilterValues?: any) => {
  //   setIsSubmitting(true); // Set flag to indicate data is being updated through changesubmit
  //   const currentFilterParams = filterParams.current || {};
  //   const updatedParams = { ...currentFilterParams, ...newFilterValues };
  //   setFilterParams(updatedParams);

  //   // Fetch data with new filter values
  //   getAllDatamaster(updatedParams);

  //   originalDataRef.current = []; // Clear cache for fresh data
  //   setIsSubmitting(false); // Reset flag after data is updated
  // };



  const changesubmit = (newFilterValues?: any) => {
    setIsSubmitting(true); // Set flag to indicate data is being updated
    const currentFilterParams = filterParams.current || {};
    // Gunakan nilai filter terbaru atau nilai baru yang disubmit
    const updatedParams = { ...currentFilterParams, ...filterParams, ...newFilterValues };
    setFilterParams(updatedParams);

    // Fetch data dengan filter yang diperbarui
    getAllDatamaster(updatedParams);

    originalDataRef.current = []; // Clear cache untuk data baru
    // setIsSubmitting(true); // Reset flag setelah data diperbarui

  };
  useEffect(() => {
    const params = {
      page: 1,
      limit: 10,
      is_induk: 'INDUK',
      ...filterParams,
    };
    getAllDatamaster(params);
    originalDataRef.current = []; // Clear cache to force data refetch

    return () => {
      source.cancel('Operation canceled due to new request.');
    };
  }, [filterParams]);


  const handleFilterChange = (newFilterValues: any) => {
    setIsSubmitting(true); // Set flag to indicate data is being updated through changesubmit
    setFilterParams((prev: any) => ({ ...prev, ...newFilterValues })); // Gabungkan dengan existing params
    setIsSubmitting(false); // Reset flag after data is updated
  };
  // Memoized function to transform data
  const memoizedRespDataApi = useMemo(() => {
    return (data: any) => {
      const newData = data.map((item: any) => ({
        number: item?.number,
        id: item?.id,
        jenis_point: item?.pointtype?.name || '-',
        id_pointtype: item?.nama_pointtype || '-',
        point_number: item?.point_number,
        point_name: item?.point_name,
        point_text: item?.point_text || '-',
        point_type: item?.point_type,
        kinerja: item?.kinerja,
        send_telegram: item?.send_telegram,
        capture_telemetring: item?.capture_telemetring,
        ack: item?.ack,
        path1: item?.path1,
        path2: item?.path2,
        path3: item?.path3,
        path4: item?.path4,
        path5: item?.path5,
        keterangan_point: item?.keterangan_point,
        zona: item?.zona,
        station: item?.station,
        bay: item?.bay,
        value: item?.value,
        last_update: item?.last_update,
      }));

      // Check if data should be cached (initial load) or always update when submitting
      if (originalDataRef.current.length === 0 || isSubmitting) {
        originalDataRef.current = newData; // Always update cache when submitting
      }

      return originalDataRef.current;
    };
  }, [filterParams, isSubmitting]); // Depend on isSubmitting as well

  useEffect(() => {
    let roleAccess = ROLE_ACCESS('point-analog-digital');
    const roleAct = {
      view: ROLE_ACTION(roleAccess, 'view'),
      update: ROLE_ACTION(roleAccess, 'update'),
      delete: ROLE_ACTION(roleAccess, 'delete'),
      upload: ROLE_ACTION(roleAccess, 'upload'),
    };
    setRoleActions(roleAct);
  }, []);

  useEffect(() => {
    getAllData();
  }, []);


  const onShowModal = () => {
    setModal((prev: any) => ({ ...prev, show: true }));
  };

  const onShowModalEdit = (item: any) => {
    dataSelected.current = item.current;
    setModalEdit((prevState: any) => ({
      ...prevState,
      show: true,
    }));
    const params = new URLSearchParams(location.search);
    params.set('id', item.current?.id || '');
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  const handleClose = () => {
    setModal((prevState: any) => ({ ...prevState, show: false }));
    setModalEdit((prevState: any) => ({ ...prevState, show: false }));
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete('id');
    const currentFilters = filterParams ? `&${new URLSearchParams(filterParams).toString()}` : '';
    const newUrl = `${window.location.pathname}?${searchParams.toString()}${currentFilters}`;
    window.history.replaceState({}, '', newUrl);

  };

  return (
    <>
      <TopBarLoader isLoading={loading} />
      <Filter optionsScada={scada} onFilterChange={handleFilterChange} />
      {scada && (
        <div style={{ margin: '20px' }}>
          <JqxTabs theme={'light'}>
            <ul style={{ marginLeft: 10 }} key="1">
              <li><i className="fa-solid fa-server"></i> Telemetering</li>
            </ul>
            <div key="2">
              <TableDataJqxGridNewPeralatanScada
                uploadbtn={roleActions.upload}
                updatebtn={roleActions.update}
                onClickUpdate={onShowModalEdit}
                path={API_PATH().master.fasop.c_point} // Data path is provided here
                filterParams={filterParams} // Pass the dynamic filterParams
                dataFieldsColsConfig={POINT_ANALOG_DIGITAL_COLUMN_JQX()} // Column configurations
                primaryKey={'id'} // Define the primary key
                respDataApi={memoizedRespDataApi} // Use the memoized function here
                filterable={true} // Enable filtering
                onRowSelected={handleRowSelected} // Handle row selection
                exportbtn={true} // Enable export button
                onShowModal={onShowModal} // Show modal on action
                onFilterChange={handleFilterChange}
              />
              <hr className="my-4" />
            </div>
            <ModalFormWO modalProps={{ ...modal, setShow: handleClose }}>
              <CpointUpload handleClose={handleClose} dataSelected={dataSelected} />
            </ModalFormWO>
            <ModalFormWO modalProps={{ ...modalEdit, setShow: handleClose }}>
              <FasPointAnalogDigitalFormPage
                handleClose={handleClose}
                changesubmit={changesubmit} // Call changesubmit on form submit
                originalDataRef={originalDataRef} />
            </ModalFormWO>
          </JqxTabs>
        </div>
      )}
    </>
  );
}
