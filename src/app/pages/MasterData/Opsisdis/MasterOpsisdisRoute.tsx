import Error404 from '@app/components/Error/Error404';
import React from 'react'
import { Route, Routes } from 'react-router-dom';

import TopBarLoader from '@app/components/Loader/TopBarLoader';

/** PAGE */

const OpsPenyebabGangguanJQ = React.lazy(() => import("@app/pages/MasterData/Opsisdis/PenyebabGangguan/OpsPenyebabGangguanJQ"))
const OpsPenyebabGangguanForm = React.lazy(() => import("@app/pages/MasterData/Opsisdis/PenyebabGangguan/OpsPenyebabGangguanForm"))
const OpsRekananVendorPage = React.lazy(() => import("@app/pages/MasterData/Opsisdis/RekananVendor/OpsRekananVendorPage"))
const FrequensiMeterJQ = React.lazy(() => import("@app/pages/MasterData/Opsisdis/FrequensiMeter/FrequensiMeterJQ"))
// const FrequensiMeterPage = React.lazy(() => import("@app/pages/MasterData/Opsisdis/FrequensiMeter/FrequensiMeterPage"))
const FrequensiMeterForm = React.lazy(() => import("@app/pages/MasterData/Opsisdis/FrequensiMeter/FrequensiMeterForm"))
const AmrCustomerJQ = React.lazy(() => import("@app/pages/MasterData/Opsisdis/AmrCustomer/AmrCustomerJQ"))
const AmrCustomerForm = React.lazy(() => import("@app/pages/MasterData/Opsisdis/AmrCustomer/AmrCustomerForm"))
const FormChecklistPage = React.lazy(() => import("@app/pages/MasterData/Opsisdis/FormChecklist/FormChecklistPage"))
const IndikasiJQ = React.lazy(() => import("@app/pages/MasterData/Opsisdis/Indikasi/IndikasiJQ"))
const IndikasiForm = React.lazy(() => import("@app/pages/MasterData/Opsisdis/Indikasi/IndikasiForm"))
const FDIRJQ = React.lazy(() => import("@app/pages/MasterData/Opsisdis/FDIR/FDIRJQ"))
const FDIRForm = React.lazy(() => import("@app/pages/MasterData/Opsisdis/FDIR/FDIRForm"))
const FAIMTRZHMIIJQ = React.lazy(() => import("@app/pages/MasterData/Opsisdis/FAIMTRZHMII/FAIMTRZHMIIJQ"))
const FAIMTRZHMIIForm = React.lazy(() => import("@app/pages/MasterData/Opsisdis/FAIMTRZHMII/FAIMTRZHMIIForm"))
const FAIFIOHLHMIIJQ = React.lazy(() => import("@app/pages/MasterData/Opsisdis/FAIFIOHLHMII/FAIFIOHLHMIIJQ"))
const FAIFIOHLHMIIForm = React.lazy(() => import("@app/pages/MasterData/Opsisdis/FAIFIOHLHMII/FAIFIOHLHMIIForm"))
const CuacaJQ = React.lazy(() => import("@app/pages/MasterData/Opsisdis/Cuaca/CuacaJQ"))
const CuacaForm = React.lazy(() => import("@app/pages/MasterData/Opsisdis/Cuaca/CuacaForm"))
const CategoryGangguanJQ = React.lazy(() => import("@app/pages/MasterData/Opsisdis/CategoryGangguan/CategoryGangguanJQ"))
const CategoryGangguanForm = React.lazy(() => import("@app/pages/MasterData/Opsisdis/CategoryGangguan/CategoryGangguanForm"))
const DispatcherJQ = React.lazy(() => import("@app/pages/MasterData/Opsisdis/Dispatcher/DispatcherJQ"))
const DispatcherForm = React.lazy(() => import("@app/pages/MasterData/Opsisdis/Dispatcher/DispatcherForm"))
const StatusProteksiJQ = React.lazy(() => import("@app/pages/MasterData/Opsisdis/StatusProteksi/StatusProteksiJQ"))
const StatusProteksiForm = React.lazy(() => import("@app/pages/MasterData/Opsisdis/StatusProteksi/StatusProteksiForm"))
// const JarManageUploadPage = React.lazy(() => import("@app/pages/MasterData/Opsisdis/ManageUpload/JarManageUploadPage"))

export default function MasterOpsisdisRoute() {
  return (
    <>
      <Routes>
        <Route path="penyebab-gangguan">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><OpsPenyebabGangguanJQ /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><OpsPenyebabGangguanForm /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><OpsPenyebabGangguanForm /></React.Suspense>} />
        </Route>
        <Route path="frequensi-meter">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><FrequensiMeterJQ /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><FrequensiMeterForm /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><FrequensiMeterForm /></React.Suspense>} />
        </Route>
        <Route path="amr-customer">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><AmrCustomerJQ /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><AmrCustomerForm /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><AmrCustomerForm /></React.Suspense>} />
        </Route>
        <Route path="indikasi">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><IndikasiJQ /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><IndikasiForm /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><IndikasiForm /></React.Suspense>} />
        </Route>
        <Route path="fdir">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><FDIRJQ /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><FDIRForm /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><FDIRForm /></React.Suspense>} />
        </Route>
        <Route path="fai-mtrz-hmi">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><FAIMTRZHMIIJQ /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><FAIMTRZHMIIForm /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><FAIMTRZHMIIForm /></React.Suspense>} />
        </Route>
        <Route path="fiohl-hmi">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><FAIFIOHLHMIIJQ /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><FAIFIOHLHMIIForm /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><FAIFIOHLHMIIForm /></React.Suspense>} />
        </Route>
        <Route path="dispatcher">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><DispatcherJQ /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><DispatcherForm /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><DispatcherForm /></React.Suspense>} />
        </Route>
        <Route path="kategori-gangguan">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><CategoryGangguanJQ /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><CategoryGangguanForm /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><CategoryGangguanForm /></React.Suspense>} />
        </Route>
        <Route path="cuaca">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><CuacaJQ /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><CuacaForm /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><CuacaForm /></React.Suspense>} />
        </Route>
        <Route path="status-proteksi">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><StatusProteksiJQ /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><StatusProteksiForm /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><StatusProteksiForm /></React.Suspense>} />
        </Route>
        <Route path="vendor" element={<React.Suspense fallback={<TopBarLoader />}><OpsRekananVendorPage /></React.Suspense>} />
        <Route path="ceklis" element={<React.Suspense fallback={<TopBarLoader />}><FormChecklistPage /></React.Suspense>} />
        {/* <Route path="management-upload" element={<React.Suspense fallback={<TopBarLoader />}><JarManageUploadPage /></React.Suspense>} /> */}

        <Route path="*" element={<Error404 type="admin" />}></Route>
      </Routes>
    </>
  )
}
