import Error404 from '@app/components/Error/Error404';
import React from 'react'
import { Route, Routes } from 'react-router-dom';

import TopBarLoader from '@app/components/Loader/TopBarLoader';

/** PAGE */
const DaftarPenyulangPadam = React.lazy(() => import("@app/pages/Opsisdis/GangguanPenyulang/DaftarPenyulangPadam/DaftarPenyulangPadam"))
const KaliTripPerPenyulangPerBulan = React.lazy(() => import("@app/pages/Opsisdis/GangguanPenyulang/KaliTripPerPenyulangPerBulan/KaliTripPerPenyulangPerBulan"))
const KaliTripPerPenyulangPerTanggal = React.lazy(() => import("@app/pages/Opsisdis/GangguanPenyulang/KaliTripPerPenyulangPerTanggal/KaliTripPerPenyulangPerTanggal"))
const GangguanPenyulangPerIndikasiRelay = React.lazy(() => import("@app/pages/Opsisdis/GangguanPenyulang/GangguanPenyulangPerIndikasiRelay/GangguanPenyulangPerIndikasiRelay"))
const TotalGangguanPerArea = React.lazy(() => import("@app/pages/Opsisdis/GangguanPenyulang/TotalGangguanPerArea/TotalGangguanPerArea"))
const TotalGangguanPerGI = React.lazy(() => import("@app/pages/Opsisdis/GangguanPenyulang/TotalGangguanPerGI/TotalGangguanPerGI"))
const TripBersamaan = React.lazy(() => import("@app/pages/Opsisdis/GangguanPenyulang/TripBersamaan/TripBersamaan"))
const JumlahGangguanPerGI = React.lazy(() => import("@app/pages/Opsisdis/GangguanPenyulang/JumlahGangguanPerGI/JumlahGangguanPerGI"))
const HariGgnVsNonGgn = React.lazy(() => import("@app/pages/Opsisdis/GangguanPenyulang/HariGgnVsNonGgn/HariGgnVsNonGgn"))

export default function GangguanPenyulangRouter() {
  return (
    <>
      <Routes>
        <Route path="daftar-penyulang-padam" element={<React.Suspense fallback={<TopBarLoader />}><DaftarPenyulangPadam /></React.Suspense>} />
        <Route path="kali-trip-per-penyulang-per-bulan" element={<React.Suspense fallback={<TopBarLoader />}><KaliTripPerPenyulangPerBulan /></React.Suspense>} />
        <Route path="kali-trip-per-penyulang-per-tanggal" element={<React.Suspense fallback={<TopBarLoader />}><KaliTripPerPenyulangPerTanggal /></React.Suspense>} />
        <Route path="gangguan-penyulang-per-indikasi-relay" element={<React.Suspense fallback={<TopBarLoader />}><GangguanPenyulangPerIndikasiRelay /></React.Suspense>} />
        <Route path="total-gangguan-per-area" element={<React.Suspense fallback={<TopBarLoader />}><TotalGangguanPerArea /></React.Suspense>} />
        <Route path="total-gangguan-per-gi" element={<React.Suspense fallback={<TopBarLoader />}><TotalGangguanPerGI /></React.Suspense>} />
        <Route path="trip-bersamaan" element={<React.Suspense fallback={<TopBarLoader />}><TripBersamaan /></React.Suspense>} />
        <Route path="jumlah-gangguan-per-gi" element={<React.Suspense fallback={<TopBarLoader />}><JumlahGangguanPerGI /></React.Suspense>} />
        <Route path="hari-ggn-vs-non-ggn" element={<React.Suspense fallback={<TopBarLoader />}><HariGgnVsNonGgn /></React.Suspense>} />
        <Route path="*" element={<Error404 type="admin" />}></Route>
      </Routes>
    </>
  )
}
