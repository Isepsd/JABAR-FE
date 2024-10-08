import React, { useEffect, useState ,useRef} from 'react';
import JqxTabs from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtabs';

/** CONFIG */
import { GANGGUAN_REKAP_PADAM_SISTEM, } from '@app/configs/react-table/opsisdis/rekap-padam/rekap-padam.column';
import Filter from './Filter'
/** COMPONENTS */
import TableDataJqxGridNewButton from '@app/modules/Table/TableDataJqxGridNewButton';

// import ModalForm from '@app/components/Modals/ModalForm';
import moment from 'moment';

/** SERVICE */
import { API_PATH } from '@app/services/_path.service';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';

export default function ConfigsPage() {

    const [roleActions, setRoleActions] = useState<any>({});

    const dataSelected = useRef<any>();

 



    /** MAP DATA FROM API RESPONSE */
   const handleRespDataApi = (data: any) => {
    let dataTableValue: any = [];
    data?.forEach((item: any) => {
  
      dataTableValue.push({
        ...item,
        number: item.number,
        id: item.id,
        gangguan_sistem_id: item?.gangguan_sistem_id,
        date: moment(item.tanggal_gangguan).format('DD-MM-YYYY'),
        up3_id: item?.up3,
        penyulang: item?.penyulang,
        ulp: item?.ulp,
        titik_gangguan: item?.titik_gangguan,
        zone: item?.zone,
        proteksi_gangguan: item?.nama_proteksi,
        kinerja: item?.kinerja,
        created_at:  moment(item.created_at).format('DD-MM-YYYY'),
       
      
      });
    });
    return dataTableValue;
  };
    const handleCheckedRows = (data: any) => {
        dataSelected.current= data;
    }

    
    const [filterValues, setFilterValues] = useState<any>({
        // datum_range_after: moment().subtract(1, "day").format("YYYY-MM-DD") ,
        // datum_range_before: moment().format("YYYY-MM-DD") ,
        
      });
      const handleFilterChange = (newFilterValues: any) => {
        setFilterValues(newFilterValues);
    };
  
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
      <Filter onFilterChange={handleFilterChange} />
           {roleActions.create && roleActions.update && roleActions.delete &&
            <JqxTabs theme="light">
                <ul style={{ marginLeft: 10 }} key="1">
                    <li><i className="fa-solid fa-server"></i> Gangguan Sub Sistem</li>
                </ul>
                <div key="2">
            <TableDataJqxGridNewButton
                //AKSI 
                addbtn={roleActions.create}
                // onClickAdd={handleAddClick}
                updatebtn={roleActions.update}
                // onClickUpdate={handleEdit}
                deletebtn={roleActions.delete}

                //TABLE DATA
                path={API_PATH().opsisdis.rekap_padam.trans_gangguan_sistem}
                filterParams={{
                  sort_by: '-tanggal_gangguan',
                ...filterValues
                }}
                dataFieldsColsConfig={GANGGUAN_REKAP_PADAM_SISTEM()}
                primaryKey={'id'}
                respDataApi={handleRespDataApi}
                filterable={true}
                onRowSelected={handleCheckedRows}
                exportbtn={true}
                minWidth={180}
                maxWidth={600}
            />
           
            </div>
        </JqxTabs>
        }
        </>
    );
}
