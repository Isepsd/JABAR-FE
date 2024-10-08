import Error404 from '@app/components/Error/Error404';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import TopBarLoader from '@app/components/Loader/TopBarLoader';

/** PAGE */
// const RekapPadamPage = React.lazy(() => import('@app/pages/Opsisdis/EntriGangguanPadam/RekapPadam/RekapPadamPage'));
// const RekapPadamDetail = React.lazy(() => import('@app/pages/Opsisdis/EntriGangguanPadam/RekapPadam/DetailRekapPadam'));
// const AddRekapPadam = React.lazy(() => import('@app/pages/Opsisdis/EntriGangguanPadam/RekapPadam/AddRekapPadam'));
// const RincianPadamPage = React.lazy(() => import('@app/pages/Opsisdis/EntriGangguanPadam/RincianPadam/RincianPadamPage'));
const RekapPadamPageJQ = React.lazy(() => import('@app/pages/Opsisdis/GangguanSistem/GangguanSubsistem/RekapPadamPageJQ'));
const UpdateRekapPadam = React.lazy(() => import('@app/pages/Opsisdis/GangguanSistem/GangguanSubsistem/UpdateRekapPadam'));
const OlsPageJQ = React.lazy(() => import('@app/pages/Opsisdis/GangguanSistem/OLS/MLS/OlsPageJQ'));
const UpdateAddOLS = React.lazy(() => import('@app/pages/Opsisdis/GangguanSistem/OLS/MLS/UpdateAddOLS'));
const UpdateEditOLS = React.lazy(() => import('@app/pages/Opsisdis/GangguanSistem/OLS/MLS/UpdateEditOLS'));
const GangguanUFRPageJQ = React.lazy(() => import('@app/pages/Opsisdis/GangguanSistem/GangguanUFR/GangguanUFRPageJQ'));
const UpdateGangguanUFR = React.lazy(() => import('@app/pages/Opsisdis/GangguanSistem/GangguanUFR/UpdateGangguanUFR'));

export default function GangguanSistemRoute() {
  return (
    <>

        
      <Routes>
      <Route path='gangguan-sub-sistem'>
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><RekapPadamPageJQ /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><UpdateRekapPadam /></React.Suspense>} />
          <Route path="rekap/add" element={<React.Suspense fallback={<TopBarLoader />}><UpdateRekapPadam /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><UpdateRekapPadam /></React.Suspense>} />
        </Route>
      <Route path='ols-mls'>
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><OlsPageJQ /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><UpdateAddOLS /></React.Suspense>} />
          {/* <Route path="rekap/add" element={<React.Suspense fallback={<TopBarLoader />}><UpdateEditOLS /></React.Suspense>} /> */}
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><UpdateEditOLS /></React.Suspense>} />
        </Route>
       
      <Route path='gangguan-ufr'>
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}><GangguanUFRPageJQ /></React.Suspense>} />
          <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><UpdateGangguanUFR /></React.Suspense>} />
          <Route path="rekap/add" element={<React.Suspense fallback={<TopBarLoader />}><UpdateGangguanUFR /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><UpdateGangguanUFR /></React.Suspense>} />
        </Route>
       
        <Route path='*' element={<Error404 type='admin' />}></Route>
      </Routes>
    </>
  );
}
