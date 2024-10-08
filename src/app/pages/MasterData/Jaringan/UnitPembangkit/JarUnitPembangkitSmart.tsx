import React, { useEffect, useState } from 'react';
import { JENIS_LOKASI } from '@app/configs/jenis-lokasi.config';
import { API_PATH } from '@app/services/_path.service';
import { ROLE_ACCESS, ROLE_ACTION } from '@app/helper/auth.helper';
import { UNIT_PEMBANGKIT_COLUMN_GRID } from '@app/configs/react-table/master-jaringan.columns.config';
// import { DropDownButton } from 'smart-webcomponents-react/dropdownbutton';
// import { Tree, TreeItem, TreeItemsGroup } from 'smart-webcomponents-react/tree';
import SmartGridComponent from '@app/modules/Table/SmartGridComponent';



// import MasterDataFilter from '@app/modules/opsisdis/MasterData/MasterDataFilter';
// import { useSelector } from "react-redux";
// import qs from "query-string";
// import moment from 'moment';

// type Props = {
//     optionCurrentUser?: any;
//     optionJenisLayanan?: any;
//     optionJenisLayananTrafo?: any;
//     onFilterChange?: any;
// };

export default function MainComponent() {
    const [roleActions, setRoleActions] = useState<any>({});
    // const queryParams = qs.parse(location.search);
    // const { currentUser } = useSelector((state: any) => state.auth);
    // const dropdownbutton = useRef<any>(null);
    // const tree = useRef<any>(null);

    const handleRespDataApi = (data: any) => {
        return data.results.map((result: any) => ({
          id_unit_induk: result?.id_unit_induk?.nama_lokasi,
          id_ref_lokasi: result?.id_ref_lokasi,
          number: result.number,
          id: result?.id,
          nama: result?.nama_lokasi,
          parent_lokasi: result?.parent_lokasi?.nama_lokasi,
          alamat: result?.alamat,
          path1: result?.path1,
          path2: result?.path2,
          path3: result?.path3,
          tree_jaringan: result?.tree_jaringan === 1 ? <input type="checkBox" /> : null,
          status_listrik: result?.status_listrik === 1 ? <input type="checkBox" /> : null,
          lat: result?.lat,
          lon: result?.lon,
        //   showTreeJaringanCheckbox: result?.tree_jaringan === 1,
        //   showStatusListrikCheckbox: result?.status_listrik === 1,
        }));
      };
      
    useEffect(() => {
        let roleAccess = ROLE_ACCESS("unit-pembangkit");
        const roleAct = {
            view: ROLE_ACTION(roleAccess, 'view'),
            create: ROLE_ACTION(roleAccess, 'create'),
            update: ROLE_ACTION(roleAccess, 'update'),
            delete: ROLE_ACTION(roleAccess, 'delete'),
        };
        setRoleActions(roleAct);
        console.log('roleAct', roleAct);
    }, []);

    // const [filterValues, setFilterValues] = useState<any>({
    //     id_ref_lokasi_up3: null,
    //     id_ref_lokasi_up2b: null,
    //     id_ref_lokasi_subsistem: null,
    //     date: queryParams?.date ? queryParams?.date : moment().format("YYYY-MM-DD"),
    //     time: queryParams?.time ? queryParams?.time : null,
    //     id_parent_lokasi: queryParams?.__parent_lokasi ? queryParams?.__parent_lokasi : null,
    //     id_lokasi: queryParams?.__trafo_gi ? queryParams?.__trafo_gi : null,
    //     // id_pusat: optionCurrentUser?.level == "PUSAT" ? optionCurrentUser?.id_unit_lokasi : queryParams?.__pusat,
    //     // id_regional: optionCurrentUser?.level == "REGIONAL" ? optionCurrentUser?.id_unit_lokasi : queryParams?.__regional,
    //     // id_pemilik: optionCurrentUser?.level == "UNIT_INDUK" ? optionCurrentUser?.id_unit_lokasi : queryParams?.__pemilik,
    //     // id_pengelola: optionCurrentUser?.level == "UP2D" || optionCurrentUser?.level == "UP3" ? optionCurrentUser?.id_unit_lokasi : queryParams?.__pengelola,
    //     // id_sub_pengelola: optionCurrentUser?.level == "ULP" ? optionCurrentUser?.id_unit_lokasi : queryParams?.__subpengelola,
    // });

    // const handleFilterChange = (newFilterValues: any) => {
    //     setFilterValues(newFilterValues);
    // };

    // const handleChange = (event: any) => {
    //     dropdownbutton.current.placeholder = event.detail.item.label;
    // };

    // useEffect(() => {
    //     if (tree.current && dropdownbutton.current) {
    //         const dropDownButton = dropdownbutton.current,
    //             treeElement = tree.current.nativeElement;

    //         // Get the label of the selected tree item
    //         dropDownButton.placeholder = treeElement.querySelector('smart-tree-item[selected], smart-tree-items-group[selected]').label;
    //     }
    // }, [tree.current, dropdownbutton.current]);

    return (
        <>
           {/* <div className='px-2 mt-2'>
                <MasterDataFilter  onFilterChange={handleFilterChange} optionCurrentUser={currentUser} optionJenisLayanan={false}  isUnitPembangkit={true}   />
              </div> */}
            {/* <div>
                <DropDownButton ref={dropdownbutton} dropDownWidth="auto" onChange={handleChange}>
                    <Tree ref={tree}>
                        <TreeItem>Home</TreeItem>
                        <TreeItemsGroup>Solutions
                            <TreeItem>Education</TreeItem>
                            <TreeItem>Financial services</TreeItem>
                            <TreeItem>Government</TreeItem>
                            <TreeItem>Manufacturing</TreeItem>
                            <TreeItem>All industries and solutions</TreeItem>
                        </TreeItemsGroup>
                        <TreeItemsGroup expanded>Products
                            <TreeItem>PC products</TreeItem>
                            <TreeItem>Mobile products</TreeItem>
                            <TreeItem>All products</TreeItem>
                        </TreeItemsGroup>
                    </Tree>
                </DropDownButton>
            </div> */}
            {roleActions.create && roleActions.update && roleActions.delete &&
                    <div key="2">
                        <SmartGridComponent
                            addbtn={roleActions.create}
                            updatebtn={roleActions.update}
                            deletebtn={roleActions.delete}
                            path={API_PATH().master.jaringan.ref_lokasi}
                            filterParams={{ id_ref_jenis_lokasi: JENIS_LOKASI().unit_pembangkit}}
                            dataFieldsColsConfig={UNIT_PEMBANGKIT_COLUMN_GRID()}
                            primaryKey={'id_ref_lokasi'}
                            respDataApi={handleRespDataApi}
                            // selectionmode="checkbox"
                        />
                    </div>
            }
           
        </>
    );
}
