import React from 'react';
// import React, { useRef } from 'react';
import TreeJaringan from '@app/modules/MasterData/TreeJaringan/TreeJaringan';
// import TableJqxTreeGrid from '@app/modules/Table/TableJqxTreeGrid';
// import { TREE_JARINGAN_JQX } from '@app/configs/react-table/master-jaringan.columns.config';
// import { API_PATH } from '@app/services/_path.service';


export default function JarTreeJaringan() {
  // const dataSelected = useRef<any>();

  // const handleCheckedRows = (data: any) => {
  //   dataSelected.current = data;
  // }

  return (
    <>
      <TreeJaringan></TreeJaringan>

      {/* <TableJqxTreeGrid
        //AKSI 
        // addbtn={roleActions.create}
        // updatebtn={roleActions.update}
        // deletebtn={roleActions.delete}
        //TABLE DATA
        path={API_PATH().master.jaringan.tree_jaringan}
        hierarchy={{ root: 'children' }}
        filterParams={{ page: -1, limit: -1, id_ref_jenis_lokasi: 4 }}
        dataFieldsColsConfig={TREE_JARINGAN_JQX()}
        exportbtn={true}
        // pageable={true}
        primaryKey={'id_ref_lokasi'}
        onRowSelected={handleCheckedRows}
      /> */}
    </>
  );
}