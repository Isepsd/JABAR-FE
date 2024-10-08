import React, { useState, useEffect, useRef } from 'react';

/** CONFIG */
import { HIS_REMOTE_COLUMNS_JQX } from '@app/configs/react-table/fasop/spectrum-history.column';
import { useLocation, useNavigate } from 'react-router-dom';
/** COMPONENTS */
import TableDataJqxGridNewButton from '@app/modules/Table/TableDataJqxGridNewButton';
import 'jqwidgets-scripts/jqwidgets/jqxtabs';
import CardWidget from '@app/components/Card/CardWidget';
import ModalFormWO from "@app/components/Modals/ModalFormWO";
import ShRemoteControlPageForm from './ShRemoteControlPageForm'
/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
import Filter from './Filter';
import moment from 'moment';

export default function ShRemoteControlPageJQ() {
  const [roleActions, setRoleActions] = useState<any>({});
  const dataSelected = useRef<any>();
  const location = useLocation();
  const navigate = useNavigate();
  const [modalEdit, setModalEdit] = useState<any>({
    approved: false,
    size: "lg",
    title: `Edit Data`,
  });
  /** MAP DATA FROM API RESPONSE */
  const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
      dataTableValue.push({
        id_his_rc: item?.id_his_rc,
        point_number: item?.point_number,
        // jenis: item?.jenis,
        number: item?.number,
        path1: item?.path1,
        path2: item?.path2,
        path3: item?.path3,
        path4: item?.path4,
        path5: item?.path5,
        msgoperator: item?.msgoperator,
        datum_1: item?.datum_1,
        datum_2: item?.datum_2,
        status_2: item?.status_2,
        status_1: item?.status_1,
        durasi: item?.durasi,
        rekon: item?.rekon,
        datum_rekon: item?.datum_rekon,
        kesimpulan_rekon: item?.kesimpulan_rekon,
        keterangan: item?.keterangan,
        kesimpulan: item?.kesimpulan,

      });
    });
    return dataTableValue;
  }

  const handleEdit = (item: any) => {
    dataSelected.current = item.current;
    setModalEdit((prevState: any) => ({
      ...prevState,
      show: true,
    }));

    // Add `id` parameter to URL
    const params = new URLSearchParams(location.search);
    params.set('id', item.current?.id_trans_drafting_wo || '');
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };
  const handleClose = () => {
    // Close all modals

    setModalEdit((prevState: any) => ({
      ...prevState,
      show: false,
    }));
   

    // Remove the `id` parameter from the URL search parameters
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete('id');
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.replaceState({}, '', newUrl);
  };

  const [filterValues, setFilterValues] = useState<any>({
    datum_after: moment().format("YYYY-MM-DD") + " 00:00:00",
    datum_before: moment().format("YYYY-MM-DD") + " 23:59:59",
    // path1text: "",
    // // path2text: "",
    // path3text: "",
    // // path4text: "",
    // id_unit: null,

  });

  useEffect(() => {
    let roleAccess = ROLE_ACCESS("remote-control");
    const roleAct = {
      view: ROLE_ACTION(roleAccess, 'view'),
      update: ROLE_ACTION(roleAccess, 'update'),
    };
    setRoleActions(roleAct);
    console.log('roleAct', roleAct);
  }, []);

  const handleFilterChange = (newFilterValues: any) => {
    setFilterValues(newFilterValues);
  };

  const handleCheckedRows = (data: any) => {
    dataSelected.current = data.current;
  }
  // const handleCheckedRows2 = (data: any) => {
  //     return data;
  // }
  return (
    <>

      <CardWidget title='FILTER'>
        <Filter onFilterChange={handleFilterChange} />
      </CardWidget>

      {roleActions.view && roleActions.update &&
        <div key="2">
          <TableDataJqxGridNewButton
           updaterekonbtn={roleActions.update}
           onClickUpdateRekon={handleEdit}
            //TABLE DATA
            path={API_PATH().fasop.history.rc}
            filterParams={{ ...filterValues }}
            dataFieldsColsConfig={HIS_REMOTE_COLUMNS_JQX()}
            primaryKey={'id_his_rc'}
            respDataApi={handleRespDataApi}
            filterable={true}
            onRowSelected={handleCheckedRows}
            exportbtn={true}
            minWidth={120}
            maxWidth={600}
          />
        </div>
      }

      <ModalFormWO modalProps={{ ...modalEdit, setShow: handleClose }}>
        <ShRemoteControlPageForm handleClose={handleClose} dataSelected={dataSelected} />
      </ModalFormWO>
    </>
  );
}