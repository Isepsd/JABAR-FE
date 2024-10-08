import Error404 from '@app/components/Error/Error404';
import React from 'react'
import { Route, Routes } from 'react-router-dom';

import TopBarLoader from '@app/components/Loader/TopBarLoader';

/** PAGE */
const TotalGangguanPerBulanPage = React.lazy(() => import("@app/pages/Opsisdis/PadamPenyulang/TotalGangguanPerBulan/TotalGangguanPerBulanPage"))
const TotalLamaPadamPenyulangPage = React.lazy(() => import("@app/pages/Opsisdis/PadamPenyulang/TotalLamaPadamPenyulang/TotalLamaPadamPenyulangPage"))
const LamaPadamPenyulangGangguanPage = React.lazy(() => import("@app/pages/Opsisdis/PadamPenyulang/LamaPadamPenyulangGangguan/LamaPadamPenyulangGangguanPage"))
const LamaPadamPerAreaPage = React.lazy(() => import("@app/pages/Opsisdis/PadamPenyulang/LamaPadamPerArea/LamaPadamPerArea"))
const Padam5MenitPage = React.lazy(() => import("@app/pages/Opsisdis/PadamPenyulang/Padam5Menit/Padam5Menit"))
const Padam5MenitPerAreaPage = React.lazy(() => import("@app/pages/Opsisdis/PadamPenyulang/Padam5MenitPerArea/Padam5MenitPerArea"))
const PadamKurangDari5MenitPerAreaPage = React.lazy(() => import("@app/pages/Opsisdis/PadamPenyulang/PadamKurangDari5MenitPerArea/PadamKurangDari5MenitPerArea"))
const PadamTrafoDanPenyulangPage = React.lazy(() => import("@app/pages/Opsisdis/PadamPenyulang/PadamTrafoDanPenyulang/PadamTrafoDanPenyulang"))

export default function PadamPenyulangRouter() {
  return (
    <>
      <Routes>
        <Route path="total-gangguan-per-bulan" element={<React.Suspense fallback={<TopBarLoader />}><TotalGangguanPerBulanPage /></React.Suspense>} />
        <Route path="total-lama-padam-penyulang" element={<React.Suspense fallback={<TopBarLoader />}><TotalLamaPadamPenyulangPage /></React.Suspense>} />
        <Route path="lama-padam-penyulang-gangguan" element={<React.Suspense fallback={<TopBarLoader />}><LamaPadamPenyulangGangguanPage /></React.Suspense>} />
        <Route path="lama-padam-per-area" element={<React.Suspense fallback={<TopBarLoader />}><LamaPadamPerAreaPage /></React.Suspense>} />
        <Route path="padam-5-menit" element={<React.Suspense fallback={<TopBarLoader />}><Padam5MenitPage /></React.Suspense>} />
        <Route path="padam-5-menit-per-area" element={<React.Suspense fallback={<TopBarLoader />}><Padam5MenitPerAreaPage /></React.Suspense>} />
        <Route path="padam-kurang-dari-5-menit-per-area" element={<React.Suspense fallback={<TopBarLoader />}><PadamKurangDari5MenitPerAreaPage /></React.Suspense>} />
        <Route path="padam-trafo-dan-penyulang" element={<React.Suspense fallback={<TopBarLoader />}><PadamTrafoDanPenyulangPage /></React.Suspense>} />
        <Route path="*" element={<Error404 type="admin" />}></Route>
      </Routes>
    </>
  )
}
