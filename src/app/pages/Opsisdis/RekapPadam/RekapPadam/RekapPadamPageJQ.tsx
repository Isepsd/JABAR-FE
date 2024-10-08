import React, { useEffect, useState ,useRef} from 'react';
import JqxTabs from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtabs';
import { useNavigate } from 'react-router-dom';
/** CONFIG */
import { MONITORING_KINERJA_SCADA_COLUMN_JQX, } from '@app/configs/react-table/master-fasop.columns.config';

/** COMPONENTS */
import TableDataJqxGridNew from '@app/modules/Table/TableDataJqxGridNew';

// import ModalForm from '@app/components/Modals/ModalForm';
import moment from 'moment';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
import { localeFormatter } from '@app/helper/number.helper';

export default function ConfigsPage() {
    const navigate = useNavigate();
    const [roleActions, setRoleActions] = useState<any>({});
    const [actionparent, setActionParent] = useState<string>();
    const dataSelected = useRef<any>();

 /** MODAL */
 const [modalCopyWA, setModalCopyWA] = useState<any>({
    approved: false,
    size: 'md',
    title: `Copy Whatapps`,
  });
  const [modalInsertPhoto, setModalInsertPhoto] = useState<any>({
    approved: false,
    size: 'md',
    title: `Tambah Foto`,
  });

  const [modalViewPhoto, setModalViewPhoto] = useState<any>({
    approved: false,
    size: 'md',
    title: `View Foto`,
  });



  const copyWA = (item: any) => {
    dataSelected.current=item;
    setModalCopyWA((prev: any) => ({ ...prev, show: true }));
  };

  const insertPhoto = (item: any) => {
    dataSelected.current=item;
    setModalInsertPhoto((prev: any) => ({ ...prev, show: true }));
  };

  const viewPhoto = (item: any) => {
    dataSelected.current=item;
    setModalViewPhoto((prev: any) => ({ ...prev, show: true }));
  };

  const handlePosting = (item: any) => {
    dataSelected.current=item;
    setActionParent('posting-rekap-padam')
  }

  const handleDelete = (item: any) => {
    dataSelected.current=item;
    setActionParent('delete')
  }

  const handleDetail = (item: any) => {
    navigate(`detail/${item?.id_trans_ep}`);
  }


    /** MAP DATA FROM API RESPONSE */
   const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any, index: any) => {
      let keypoint: any = (item?.gangguan_padam == "PERALATAN")?item?.keypoint?.nama_lokasi:item?.lbs_manual;
      // console.log("item porintg", item?.posting);
      // console.log("parseFloat(item.r)", localeFormatter(item.r));
      let status: any = ''
      switch (item.status) {
        case 'Padam': status = <div className='text-danger'>Padam</div>; break;
        case 'Normal': status = <div className='text-success'>Normal</div>; break;
        case 'Nyala Bertahap': status = <div className='text-warning'>Nyala Bertahap</div>; break;
        default: break;
      }
      // console.log("item.ens", item.ens);

      dataTableValue.push({
        ...item,
        no_event: item.no_event || '-',
        no_apkt: item.no_apkt || '-',
        status: status,
        beban_padam: localeFormatter(item.beban_padam),
        ens: localeFormatter(item.ens) + " kWh",
        // ens: localeFormatter(100.13),
        r: localeFormatter(item.r),
        s: localeFormatter(item.s),
        t: localeFormatter(item.t),
        n: localeFormatter(item.n),
        // r: item.r,
        // s: item.s,
        // t: item.t,
        // n: item.n,
        lat: item.lat || '-',
        lon: item.lon || '-',
        cuaca: item?.ref_ep_cuaca?.nama,
        keypoint: (!item?.posting && roleActions?.update) ? (
          <a className='btn-link pointer' onClick={() => {
            navigate(`edit/${item?.id_trans_ep}`);
          }}>
            {keypoint}
          </a>
        ) : <span onClick={() => { handleDetail(item) }}>{keypoint}</span>,
        // keypoint: (
        //   <a className='btn-link' onClick={() => {
        //     navigate(`edit/${item?.id_trans_ep}`);
        //   }}>
        //     {item?.keypoint?.nama_lokasi}
        //   </a>
        // ),
        photo: item?.photo ? <span 
          className='' 
          onClick={() => { 
            viewPhoto(item);
          }}>Photo</span> : '-',
        durasi: item?.durasi || '-',
        jam_buka: item.jam_buka ? moment(item.jam_buka).format('DD-MM-YYYY HH:mm:ss') : '-',
        jam_trip: item.jam_trip ? moment(item.jam_trip).format('DD-MM-YYYY HH:mm:ss') : '-',
        jam_tutup: item.jam_tutup ? moment(item.jam_tutup).format('DD-MM-YYYY HH:mm:ss') : '-',
        jam_normal: item.jam_normal ? moment(item.jam_normal).format('DD-MM-YYYY HH:mm:ss') : '-',
        date: moment(item.tanggal).format('DD-MM-YYYY'),
        number: item.number,
        id: item?.id_meter,
        ufr: item?.id_meter,
        penyulang: item?.id_meter,
        gardu_induk: item?.id_meter,
        indikasi: item?.ref_ep_indikasi?.nama,
        kategori: item?.ref_ep_indikasi?.kategori,
        up3: item?.keypoint?.up3?.nama_lokasi,
        ulp: item?.keypoint?.ulp?.nama_lokasi,
        // action: (
        //   <Dropdown className='hide-toogle hide-focus'>
        //     <Dropdown.Toggle variant='light' id={`jar-detail-act-${index}`}>
        //       <i className='fa-solid fa-ellipsis font-weight-bold'></i>
        //     </Dropdown.Toggle>
        //     <Dropdown.Menu>
        //       {roleActions?.posting &&
        //         <Dropdown.Item onClick={() => {
        //           handlePosting(item)
        //         }}>
        //           Posting
        //         </Dropdown.Item>
        //       }
        //       {/* <Dropdown.Item onClick={() => {
        //         updatePosting({
        //           id_trans_ep: item?.id_trans_ep,
        //           posting: 1,
        //         })
        //       }}>
        //         Posting
        //       </Dropdown.Item> */}
        //       {roleActions?.delete &&
        //         < Dropdown.Item onClick={() => handleDelete(item)}>
        //           Delete
        //         </Dropdown.Item>
        //       }
        //       <Dropdown.Item onClick={() => copyWA(item)}>
        //         Copy WA
        //       </Dropdown.Item>
        //       {roleActions?.insert_photo &&
        //         <Dropdown.Item onClick={() => insertPhoto(item)}>
        //           Insert Photo
        //         </Dropdown.Item>
        //       }
        //     </Dropdown.Menu>
        //   </Dropdown >
        // ),
      });
    });
    return dataTableValue;
  };
    const handleCheckedRows = (data: any) => {
        dataSelected.current= data;
    }

    
  
    /** EDIT HANDLING */
    // const handleEdit = (item: any) => {
    //     dataSelected.current = item;
    // };

    // const handleAddClick = () => {
    //     dataSelected.current = undefined;
    //     setModal((prevState: any) => ({
    //         ...prevState,
    //         show: true,
    //     }));
    // };

    // Initialize jqxTabs
    useEffect(() => {
        let roleAccess = ROLE_ACCESS("fasop-md-kinerja-scada");
        const roleAct = {
            view: ROLE_ACTION(roleAccess, 'view'),
            create: ROLE_ACTION(roleAccess, 'create'),
            update: ROLE_ACTION(roleAccess, 'update'),
            delete: ROLE_ACTION(roleAccess, 'delete'),
        };
        setRoleActions(roleAct);
    }, []);


    return (
        <> 
           {roleActions.create && roleActions.update && roleActions.delete &&
            <JqxTabs theme="light">
                <ul style={{ marginLeft: 10 }} key="1">
                    <li><i className="fa-solid fa-server"></i> Kinerja SCADA</li>
                </ul>
                <div key="2">
            <TableDataJqxGridNew
                //AKSI 
                addbtn={roleActions.create}
                // onClickAdd={handleAddClick}
                updatebtn={roleActions.update}
                // onClickUpdate={handleEdit}
                deletebtn={roleActions.delete}

                //TABLE DATA
                path={API_PATH().opsisdis.rekap_padam.trans_ep}
                filterParams={{}}
                dataFieldsColsConfig={MONITORING_KINERJA_SCADA_COLUMN_JQX()}
                primaryKey={'id_trans_ep'}
                respDataApi={handleRespDataApi}
                filterable={true}
                onRowSelected={handleCheckedRows}
                exportbtn={true}
            />
           
            </div>
        </JqxTabs>
        }
        </>
    );
}
