import Error404 from '@app/components/Error/Error404';
import React from 'react'
import { Route, Routes } from 'react-router-dom';

import TopBarLoader from '@app/components/Loader/TopBarLoader';

/** PAGE */
const DaftarDokumenJQ = React.lazy(() => import("@app/pages/Opsisdis/Dokumen/DaftarDokumen/DaftarDokumenJQ"))
const DaftarDokumenDetailPage = React.lazy(() => import("@app/pages/Opsisdis/Dokumen/DaftarDokumen/DaftarDokumenDetailPage"))
const UploadDokumenJQ = React.lazy(() => import("@app/pages/Opsisdis/Dokumen/UploadDokumen/UploadDokumenJQ"))
const UploadDokumenDetailPage = React.lazy(() => import("@app/pages/Opsisdis/Dokumen/UploadDokumen/UploadDokumenDetailPage"))
const UploadDokumenFormPage = React.lazy(() => import("@app/pages/Opsisdis/Dokumen/UploadDokumen/UploadDokumenFormPage"))
// const UploadDokumenDetailFormPage = React.lazy(() => import("@app/pages/Opsisdis/Dokumen/UploadDokumen/UploadDokumenDetailFormPage"))

export default function DokumenRoute() {
  return (
    <>
      <Routes>
        <Route path="daftar-dokumen">
          <Route path="" element={<React.Suspense fallback={<TopBarLoader />}>
            <DaftarDokumenJQ /></React.Suspense>} />
          <Route path="detail/:id" element={<React.Suspense fallback={<TopBarLoader />}>
            <DaftarDokumenDetailPage /></React.Suspense>} />
        </Route>

        <Route path="upload-dokumen">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <UploadDokumenJQ />
              </React.Suspense>
            }
          />
          <Route
            path="add"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <UploadDokumenFormPage />
              </React.Suspense>
            }
          />
          <Route
            path="edit/:id"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <UploadDokumenFormPage />
              </React.Suspense>
            }
          />
          <Route path="detail/:id">
            <Route
              path=""
              element={
                <React.Suspense fallback={<TopBarLoader />}>
                  <UploadDokumenDetailPage />
                </React.Suspense>
              }
            />
          </Route>
        </Route>
        <Route path="*" element={<Error404 type="admin" />}></Route>
      </Routes>
    </>
  )
}
