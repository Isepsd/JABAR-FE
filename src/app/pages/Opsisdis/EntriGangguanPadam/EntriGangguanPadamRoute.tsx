import Error404 from '@app/components/Error/Error404';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import TopBarLoader from '@app/components/Loader/TopBarLoader';

/** PAGE */
// const RekapPadamPage = React.lazy(() => import('@app/pages/Opsisdis/EntriGangguanPadam/RekapPadam/RekapPadamPage'));
const RekapPadamPageJQ = React.lazy(() => import('@app/pages/Opsisdis/EntriGangguanPadam/RekapPadam/RekapPadamPageJQ'));
const RekapPadamDetail = React.lazy(() => import('@app/pages/Opsisdis/EntriGangguanPadam/RekapPadam/DetailRekapPadam'));
// const AddRekapPadam = React.lazy(() => import('@app/pages/Opsisdis/EntriGangguanPadam/RekapPadam/AddRekapPadam'));
const UpdateRekapPadam = React.lazy(() => import('@app/pages/Opsisdis/EntriGangguanPadam/RekapPadam/UpdateRekapPadam'));
const RincianPadamPage = React.lazy(() => import('@app/pages/Opsisdis/EntriGangguanPadam/RincianPadam/RincianPadamPage'));

export default function EntriGangguanPadamRoute() {
  return (
    <>
      <Routes>
        <Route path='/' element={ <React.Suspense fallback={<TopBarLoader />}> <RekapPadamPageJQ /> </React.Suspense> } />
        {/* <Route path='/rekap' element={ <React.Suspense fallback={<TopBarLoader />}> <RekapPadamPageJQ /></React.Suspense>} /> */}
        <Route path='/add' element={ <React.Suspense fallback={<TopBarLoader />}> <UpdateRekapPadam /></React.Suspense>} />
        <Route path='/rekap/addjurnal' element={ <React.Suspense fallback={<TopBarLoader />}> <UpdateRekapPadam /></React.Suspense>} />
        <Route path='/edit/:id' element={ <React.Suspense fallback={<TopBarLoader />}> <UpdateRekapPadam /></React.Suspense>} />
        <Route path='/rekap/detail/:id' element={ <React.Suspense fallback={<TopBarLoader />}> <RekapPadamDetail /></React.Suspense>} />
        <Route path='rincian' element={ <React.Suspense fallback={<TopBarLoader />}> <RincianPadamPage /></React.Suspense>} />
        <Route path='*' element={<Error404 type='admin' />}></Route>
      </Routes>
    </>
  );
}
