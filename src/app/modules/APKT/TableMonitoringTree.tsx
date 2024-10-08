import React, { useMemo, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import ReactTable from '@app/components/ReactTable';
import Pagination from '@app/components/Pagination/Pagination';

import { useApp } from '@app/context/AppContext';

import TableDataListAction from '@app/modules/Table/TableDataListAction';
import { getAllByPath, postByPath } from '@app/services/main.service';
import TopBarLoader from '@app/components/Loader/TopBarLoader';
import { get } from 'lodash';
import { Button } from '@app/components';
import { API_PATH } from '@app/services/_path.service';
// import ModalForm from '@app/components/Modals/ModalForm';
import ModalForm from '@app/components/Modals/ModalFormNyala';
// import UploadPadam from '@app/pages/Apkt/GangguanDanPemeliharaan/UploadPadamJQ';
import UploadPadam from '@app/pages/Apkt/GangguanDanPemeliharaanTree/UploadPadamJQ';
import ModalConfirm from '@app/components/Modals/ModalConfirm';
import ModalNotif from '@app/components/Modals/ModalNotif';
import { notificationTemplate } from '@app/helper/notificationTemplate';
import { addNotification } from '@app/store/notification/notification.action';
import { useDispatch, useSelector } from 'react-redux';
// import moment from 'moment';
// import { objectToFormData } from "@app/helper/params.helper";


export default function TableMonitoringTree({
  event = "padam",
  move = true,
  rowSelect = false,
  rowSelectType = "checkbox",
  onCheckedRows,
  dataSelected,
  filterParams,
  isUpdateNyala = true,
  path,
  configColumns,
  trigger,
  roleActions
}: ITreeJaringan) {
  const source = axios.CancelToken.source();
  const { currentUser } = useSelector((state: any) => state.auth);
  const { searchValue } = useApp();

  // const pathLokasi = 'master/jaringan/ref-lokasi';

  const [loading, setLoading] = useState<boolean>();

  const [pagination, setPagination] = useState({
    perPage: 10,
    offset: 0,
    currentPage: 0,
    pageCount: 0,
    totalData: 0,
    marginPagesDisplayed: 2,
    pageRangeDisplayed: 7,
  });
  const dispatch = useDispatch();
  const [modal, setModal] = useState<any>({
    approved: false,
    size: 'md',
    title: `Update Tanggal Nyala`,
  });

  const initFilters = {
    keyword: '',
    order: 'asc',
    id_ref_lokasi: undefined,
  };

  const [filters, setFilters] = useState<any>(initFilters);
  const jenis_laporan = dataSelected?.current?.jenis_laporan
  const status_laporan = dataSelected?.current?.status_laporan

  /** DATA RESP */
  const [data, setData] = useState<any>([]);
  const [dataRowsSelect, setDataRowsSelect] = useState<any>([])
  const [modalConfirm, setModalConfirm] = useState<any>({
    show: false,
    approved: false,
    size: 'sm',
    icon: 'fa-regular fa-circle-question',
    description: `Kirim Padam Ke APKT`,
    subDescriotion: ``,
    textApproved: 'Kirim',
    classApproved: 'success',
    textDecline: 'Cancel',
    scrollable: false,
  });
  const [modalConfirmNyala, setModalConfirmNyala] = useState<any>({
    show: false,
    approved: false,
    size: 'sm',
    icon: 'fa-regular fa-circle-question',
    description: `Kirim Nyala Ke APKT`,
    subDescriotion: ``,
    textApproved: 'Kirim',
    classApproved: 'success',
    textDecline: 'Cancel',
    scrollable: false,
  });
  const [modalNotif, setmodalNotif] = useState<any>({
    show: false,
    approved: false,
    size: 'sm',
    icon: 'fa-solid fa-triangle-exclamation',
    description: `Tidak bisa kirim ke APKT !`,
    subDescriotion: `Jenis laporan PEMELIHARAAN atau status laporan sudah close tidak bisa dikirim ke APKT !`,
    textButton: 'Mengerti',
    scrollable: false,
  });

  const getColorLabelPadam = (status: any) => {
    if (status == 'sedang kirim padam') {
      return { color: 'warning' }
    } else if (status == 'sukses kirim padam') {
      return { color: 'success' }
    } else if (status == 'gagal kirim padam') {
      return { color: 'danger' }
    } else {
      return { color: 'default' }
    }
  };
  const getColorLabelNyala = (status: any) => {
    if (status == 'sedang kirim nyala') {
      return { color: 'warning' }
    } else if (status == 'sukses kirim nyala') {
      return { color: 'success' }
    } else if (status == 'gagal kirim nyala') {
      return { color: 'danger' }
    } else {
      return { color: 'default' }
    }
  };

  /** INIT DATA TREE */
  //yang nyoba lewat id_paren_lokasi
  const buildTreeFromFlatData = (data: any[]) => {
    const idMapping = data.reduce((acc: any, el: any, i: number) => {
      acc[el.id_lokasi] = i;
      return acc;
    }, {});
  
    let rootNodes: any[] = [];
    data.forEach((el: any) => {
      // Cek apakah item ini punya parent
      if (el.id_parent_lokasi) {
        // Cek apakah parent-nya ada di idMapping
        const parentEl = data[idMapping[el.id_parent_lokasi]];
        if (parentEl) {
          // Jika ada parent, tambahkan ke subRows parent
          parentEl.subRows = [...(parentEl.subRows || []), el];
        } else {
          // Jika parent tidak ditemukan, anggap ini root node
          rootNodes.push(el);
        }
      } else {
        // Jika tidak ada parent, ini root node
        rootNodes.push(el);
      }
    });
  
    return rootNodes;
  };
  
  const remappedTreeJaringanData = (data: any[]) => {
    const treeData = buildTreeFromFlatData(data);
    return treeData.map((d: any) => ({
      ...d,
      id_apkt_trans_jar_det: d?.id_apkt_trans_jar_det,
      nama_lokasi: d?.nama_lokasi,
      id: d?.id_lokasi,
      id_ref_jenis_lokasi: d?.nama_jenis_lokasi,
      kode_lokasi: d?.kode_lokasi,
      no_tiang: d?.no_tiang,
      alamat: d?.alamat,
      jenis_laporan: jenis_laporan,
      status_laporan: status_laporan,
      status_listrik: (
        <span className={`w-100 badge badge-${d?.tgl_nyala ? 'success' : 'danger'}`}>
          {d?.tgl_nyala ? 'Nyala' : 'Padam'}
        </span>
      ),
      coverage: d?.coverage,
      subRows: d.subRows, // gunakan subRows yang telah dibangun di `buildTreeFromFlatData`
      status_apkt_kirim_padam: (
        <span className={`w-100 badge badge-${getColorLabelPadam(d?.status_apkt_kirim_padam)?.color}`}>
          {d?.status_apkt_kirim_padam}
        </span>
      ),
      status_apkt_kirim_nyala: (
        <span className={`w-100 badge badge-${getColorLabelNyala(d?.status_apkt_kirim_nyala)?.color}`}>
          {d?.status_apkt_kirim_nyala}
        </span>
      ),
    }));
  };
  
  
  //yang children
  // const remappedTreeJaringanData = (tree: any, level = 0) => {
  //   return tree
  //     ? tree?.map((d: any) => {
  //       // return {
  //       const remappedData = {
  //         ...d,
  //         nama_lokasi: d?.nama_lokasi,
  //         id: d?.id_ref_lokasi,
  //         id_ref_jenis_lokasi: d?.nama_jenis_lokasi,
  //         kode_lokasi: d?.kode_lokasi,
  //         no_tiang: d?.no_tiang,
  //         alamat: d?.alamat,
  //         jenis_laporan: jenis_laporan,
  //         status_laporan: status_laporan,
  //         status_listrik: (<span className={`w-100 badge badge-${d?.tgl_nyala ? 'success' : 'danger'}`}>{d?.tgl_nyala ? 'Nyala' : 'Padam'}</span>),
  //         coverage: d?.coverage,
  //         subRows: remappedTreeJaringanData(d?.children, level + 1),
  //         status_apkt_kirim_padam: (<span className={`w-100 badge badge-${getColorLabelPadam(d?.status_apkt_kirim_padam)?.color}`}>{d?.status_apkt_kirim_padam}</span>),
  //         status_apkt_kirim_nyala: (<span className={`w-100 badge badge-${getColorLabelNyala(d?.status_apkt_kirim_nyala)?.color}`}>{d?.status_apkt_kirim_nyala}</span>),

  //         level: level,
  //       };
  //       // Console.log untuk melihat data remapping
  //     console.log('Remapped Data:', remappedData);

  //     return remappedData;
  //     })
  //     : undefined;
  // };

  /** COLUMN FILTER */
  const [columns, setColumns] = useState<any>(
    move
      ? configColumns
      : (configColumns as any)
        .map((col: any) => {
          return col;
        })
        .filter((f: any) => f?.accessor != 'action')
  );

  const [dataColumns, setDataColumns] = useState<any>([]);
  /** NOTIFICATION HANDLER */
  const dispatchNotification = (msg: string = '', type: string = '') => {
    const notification = notificationTemplate(msg, type);
    dispatch(addNotification({ ...notification, message: msg, type: type }));
  };

  useEffect(() => {
    setFilters((prevState: any) => ({
      ...prevState,
      search: searchValue,
    }));
  }, [searchValue]);

  const dataTable = useMemo(() => data, [data]);

  /** GET DATA PAGINATION */
  const getAllData = async () => {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      const params = {
        // page: "-1",
        // limit: "-1",
        // page: pagination.currentPage + 1,
        // limit: pagination.perPage,
        // id_apkt_trans_jar: dataSelected?.id,
        id_apkt_trans_jar: dataSelected?.id_apkt_trans_jar,
        // ...filters,
        sort_by: "+tgl_laporan",//date desc
        ...filterParams
      };

      delete params.order;

      const req: any = await getAllByPath(get(API_PATH(), path),
        params,
        source.token
      );

      const { results }: any = req;

      const dataLength = results ? results.length : 0;

      if (dataLength > 0) {
        const dataResults: any = results;
        let data = remappedTreeJaringanData(dataResults);
        // console.log("data", data);

        setData(data ? data : []);
      } else {
        setData([]);
        setPagination((prevState) => ({
          ...prevState,
          pageCount: 1,
          totalData: 0,
        }));
      }

      setLoading(false);
    } catch (err: any) {
      setLoading(false);
    }
  };

  /**
   * ! Pagination
   * @param e
   */
  const handlePaginationClick = (e: any) => {
    const selectedPage = e.selected;
    const offset = selectedPage * pagination.perPage;

    setPagination((prevState) => ({
      ...prevState,
      offset: offset,
      currentPage: selectedPage,
    }));
  };

  const handleSort = useCallback(({ sortBy }: any) => {
    if (sortBy.length > 0) {
      setFilters((prevState: any) => ({
        ...prevState,
        sort_by: sortBy[0]['id'],
        order: sortBy[0]['desc'] ? 'desc' : 'asc',
      }));
    }
  }, []);

  const handleSelectRow = (rows: any) => {
    setDataRowsSelect(() => {
      return [...rows]
    })
    onCheckedRows(rows)
  }

  /** READ PAGINATION AND FILTER CHANGE */
  useEffect(() => {
    if (filters?.id_ref_lokasi) {
      getAllData();
    }
  }, [pagination?.currentPage, filters]);

  /** COLUMN SHOW HIDE EVENT HANDLE */
  useEffect(() => {
    const cols = columns?.filter(({ show }: any) => show === true);
    setDataColumns(cols);
  }, [columns]);

  useEffect(() => {
    getAllData();
    return () => {
      setData([]);
      source.cancel();
    };
  }, [dataSelected, trigger]);

  const kirimPadamAPKT = async () => {
    let message;
    
    //default
    // try {

    //   const params = dataRowsSelect.map((item: any) => ({
    //     id_apkt_trans_jar_det: item?.id_apkt_trans_jar_det,
    //     id_apkt_trans_jar: item?.id_apkt_trans_jar,
    //     id_user_update: currentUser.id_user,
    //     id_user_update_padam: currentUser.id_user,
    //     status_apkt_kirim_padam: 0,
    //     tgl_apkt_kirim_padam: moment().format('YYYY-MM-DD HH:mm:ss'),
    //     tgl_user_update: moment().format('YYYY-MM-DD HH:mm:ss'),
    //   }));

    //   // const datas = { datas: params };
    //   const datas = params;
    //   console.log({ datas: datas });
    //   await putAsetExtAtrBatch(get(API_PATH(), "apkt.trans_jar_detail_batch"),
    //     params,
    //     // params.id_apkt_trans_jar_det,
    //     source.token
    //   );
    //   dispatchNotification(`Sukses ${message ? message : ''}`, 'success');
    //   getAllData();
    // } catch (err: any) {
    //   setLoading(false);
    //   dispatchNotification(`Gagal ${message ? message : ''}`, 'danger');
    // }

    //new
    try {

      let params: any = {
        id_user_entri: currentUser.id_user,
        event: "padam"
      };
      let ids: any = []
      dataRowsSelect?.map((item: any) => {

        params.id_apkt_trans_jar = item?.id_apkt_trans_jar
        // params.id_apkt_trans_jar = dataSelected?.id_apkt_trans_jar
        item?.children?.map((items: any) => {
          ids.push(items?.id_apkt_trans_jar_det)

        })
        ids.push(item?.id_apkt_trans_jar_det)
      })
      params.ids = ids;
      await postByPath(get(API_PATH(), "apkt.trans_jar_detail"),
        params,
        source.token
      );
      dispatchNotification(`Sukses ${message ? message : ''}`, 'success');
    } catch (err: any) {
      setLoading(false);
      dispatchNotification(`Gagal ${message ? message : ''}`, 'danger');
    }
  };

  const kirimNyalaAPKT = async () => {
    let message;

    //default
    // try {

    //   const params = dataRowsSelect.map((item: any) => ({
    //     id_apkt_trans_jar_det: item?.id_apkt_trans_jar_det,
    //     id_apkt_trans_jar: item?.id_apkt_trans_jar,
    //     id_user_update: currentUser.id_user,
    //     id_user_update_nyala: currentUser.id_user,
    //     status_apkt_kirim_nyala: 1,
    //     tgl_apkt_kirim_nyala: moment().format('YYYY-MM-DD HH:mm:ss'),
    //     tgl_user_update: moment().format('YYYY-MM-DD HH:mm:ss'),
    //   }));

    //   // const datas = { datas: params };
    //   const datas = params;
    //   console.log({ datas: datas });
    //   await putAsetExtAtrBatch(get(API_PATH(), "apkt.trans_jar_detail_batch"),
    //     params,
    //     // params?.id_apkt_trans_jar_det,
    //     source.token,
    //   );
    //   dispatchNotification(`Sukses ${message ? message : ''}`, 'success');
    //   getAllData();
    // } catch (err: any) {
    //   setLoading(false);
    //   dispatchNotification(`Gagal ${message ? message : ''}`, 'danger');
    // }

    //new
    try {

      let params: any = {
        id_user_entri: currentUser.id_user,
        event: "nyala"
      };
      let ids: any = []
      dataRowsSelect?.map((item: any) => {

        params.id_apkt_trans_jar = item?.id_apkt_trans_jar
        // params.id_apkt_trans_jar = dataSelected?.id_apkt_trans_jar
        item?.children?.map((items: any) => {
          ids.push(items?.id_apkt_trans_jar_det)

        })
        ids.push(item?.id_apkt_trans_jar_det)
      })
      params.ids = ids;
      await postByPath(get(API_PATH(), "apkt.trans_jar_detail"),
        params,
        source.token
      );
      dispatchNotification(`Sukses ${message ? message : ''}`, 'success');
    } catch (err: any) {
      setLoading(false);
      dispatchNotification(`Gagal ${message ? message : ''}`, 'danger');
    }
  };

  // const kirimNyalaAPKT = async () => {
  //   let message;

  //   try {
  //     const params = dataRowsSelect.map((item: any) => ({
  //       id_apkt_trans_jar_det: item?.id_apkt_trans_jar_det,
  //       id_apkt_trans_jar: item?.id_apkt_trans_jar,
  //       id_user_update: currentUser.id_user,
  //       status_apkt_kirim_nyala: 1,
  //       tgl_apkt_kirim_nyala: moment().format('YYYY-MM-DD HH:mm:ss'),
  //       tgl_user_update: moment().format('YYYY-MM-DD HH:mm:ss'),
  //     }));

  //     // const datas = { datas: params };
  //     const datas = params;
  //     console.log({ datas: datas });


  //     // const paramsReq = objectToFormData(datas);
  //     // const paramsRequest = [datas];

  //     await postByPath(get(API_PATH(), "apkt.trans_jar_detail"), datas, source.token);
  //     dispatchNotification(`Sukses ${message ? message : ''}`, 'success');
  //     getAllData();
  //   } catch (err) {
  //     setLoading(false);
  //     dispatchNotification(`Gagal ${message ? message : ''}`, 'danger');
  //   }
  // };


  const onShowModal = () => {
    setModal((prev: any) => ({ ...prev, show: true }))
  }
  const onShowModalConfirm = () => {
    let desc = event == "nyala" ? `Kirim Nyala Ke APKT` : "Kirim Padam Ke APKT"
    // console.log("event", event);
    // console.log("desc", desc);
    desc;

    setModalConfirm((prev: any) => ({
      ...prev, show: true
    }))
  }
  const onShowModalConfirmNyala = () => {
    setModalConfirmNyala((prev: any) => ({
      ...prev, show: true
    }))
  }

  const onShowModalNotif = () => {
    setmodalNotif((prev: any) => ({
      ...prev, show: true
    }))
  }

  const callbackModalConfirm = (approved = false) => approved && kirimPadamAPKT();
  const callbackModalConfirmNyala = (approved = false) => approved && kirimNyalaAPKT();
  // console.log("roleActions", roleActions);

  return (
    <>
      <TopBarLoader isLoading={loading} />
      <TableDataListAction
        columns={columns}
        setColumns={setColumns}
        childrenPosition='left'
        add={false}
        filter={false}
      >
        <div className='d-flex'>
          {isUpdateNyala && roleActions?.update_tanggal_nyala &&
            <Button disabled={dataRowsSelect?.length == 0} className='me-2' onClick={onShowModal}>Update Tanggal Nyala</Button>
          }

          {event == "nyala" && roleActions?.update_kirim_nyala &&
            <Button disabled={dataRowsSelect?.length == 0} onClick={jenis_laporan == 'GANGGUAN' && status_laporan == 'open' ? onShowModalConfirmNyala : onShowModalNotif} >Kirim Nyala ke APKT</Button>
          }
          {event == "padam" && roleActions?.update_kirim_padam &&
            <Button disabled={dataRowsSelect?.length == 0} onClick={jenis_laporan == 'GANGGUAN' && status_laporan == 'open' ? onShowModalConfirm : onShowModalNotif} >Kirim Padam ke APKT</Button>
          }
        </div>
      </TableDataListAction>
      <ReactTable
        rowSelect={rowSelect}
        rowSelectType={rowSelectType}
        containerClass='table-responsive mt-3'
        columns={dataColumns}
        data={dataTable}
        onSort={handleSort}
        onCheckedRows={handleSelectRow}
        styles={{ height: '20rem' }}
      />
      <Pagination
        pagination={pagination}
        handlePaginationClick={handlePaginationClick}
      />
      <ModalConfirm
        modalConfirmProps={modalConfirmNyala}
        callbackModalConfirm={callbackModalConfirmNyala}
      />
      <ModalConfirm
        modalConfirmProps={modalConfirm}
        callbackModalConfirm={callbackModalConfirm}
      />
      <ModalForm modalProps={modal}>
        <UploadPadam dataRowsSelect={dataRowsSelect} path={path} />
      </ModalForm>

      <ModalNotif
        ModalNotifProps={modalNotif}
        callbackModalNotif={callbackModalConfirm}
      />
    </>
  );
}

export interface ITreeJaringan {
  move?: boolean;
  rowSelect?: boolean;
  isUpdateNyala?: boolean;
  rowSelectType?: string;
  onCheckedRows?: any;
  tabActiveConf?: any;
  filterParams?: any;
  dataSelected?: any;
  path?: any;
  event?: any;
  configColumns?: any;
  trigger?: any;
  roleActions?: any;
}