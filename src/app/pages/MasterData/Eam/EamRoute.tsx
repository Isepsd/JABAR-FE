import Error404 from "@app/components/Error/Error404";
import React from "react";
import { Route, Routes } from "react-router-dom";

import TopBarLoader from "@app/components/Loader/TopBarLoader";

/** PAGE */

const AsetFormPage = React.lazy(
  () => import("@app/pages/MasterData/Eam/Aset/AsetFormPage")
);

const AsetMutasiFormPage = React.lazy(
  () => import("@app/pages/MasterData/Eam/Aset/AsetMutasiFormPage")
);
const AsetPage = React.lazy(
  () => import("@app/pages/MasterData/Eam/Aset/AsetPage")
);

const AsetGroupFormPage = React.lazy(
  () => import("@app/pages/MasterData/Eam/AsetGroup/AsetGroupFormPage")
);
const AsetGroupPage = React.lazy(
  () => import("@app/pages/MasterData/Eam/AsetGroup/AsetGroupPage")
);

const AsetKategoriFormPage = React.lazy(
  () => import("@app/pages/MasterData/Eam/AsetKategori/AsetKategoriFormPage")
);
const AsetKategoriPage = React.lazy(
  () => import("@app/pages/MasterData/Eam/AsetKategori/AsetKategoriPage")
);

const AsetKondisiFormPage = React.lazy(
  () => import("@app/pages/MasterData/Eam/AsetKondisi/AsetKondisiFormPage")
);
const AsetKondisiPage = React.lazy(
  () => import("@app/pages/MasterData/Eam/AsetKondisi/AsetKondisiPage")
);

const AsetManufakturFormPage = React.lazy(
  () =>
    import("@app/pages/MasterData/Eam/AsetManufaktur/AsetManufakturFormPage")
);
const AsetManufakturPage = React.lazy(
  () => import("@app/pages/MasterData/Eam/AsetManufaktur/AsetManufakturPage")
);

const AsetStatusFormPage = React.lazy(
  () => import("@app/pages/MasterData/Eam/AsetStatus/AsetStatusFormPage")
);
const AsetStatusPage = React.lazy(
  () => import("@app/pages/MasterData/Eam/AsetStatus/AsetStatusPage")
);

const JenisMutasiFormPage = React.lazy(
  () => import("@app/pages/MasterData/Eam/JenisMutasi/JenisMutasiFormPage")
);
const JenisMutasiPage = React.lazy(
  () => import("@app/pages/MasterData/Eam/JenisMutasi/JenisMutasiPage")
);

const StatusMutasiFormPage = React.lazy(
  () => import("@app/pages/MasterData/Eam/StatusMutasi/StatusMutasiFormPage")
);
const StatusMutasiPage = React.lazy(
  () => import("@app/pages/MasterData/Eam/StatusMutasi/StatusMutasiPage")
);

const HealthIndexFormPage = React.lazy(
  () => import("@app/pages/MasterData/Eam/HealthIndex/HealthIndexFormPage")
);
const HealthIndexPage = React.lazy(
  () => import("@app/pages/MasterData/Eam/HealthIndex/HealthIndexPage")
);

const BagianFormPage = React.lazy(
  () => import("@app/pages/MasterData/Eam/Bagian/BagianFormPage")
);
const BagianPage = React.lazy(
  () => import("@app/pages/MasterData/Eam/Bagian/BagianPage")
);

const BobotPrioritasFormPage = React.lazy(
  () =>
    import("@app/pages/MasterData/Eam/BobotPrioritas/BobotPrioritasFormPage")
);
const BobotPrioritasPage = React.lazy(
  () => import("@app/pages/MasterData/Eam/BobotPrioritas/BobotPrioritasPage")
);

const AsetRakFormPage = React.lazy(
  () => import("@app/pages/MasterData/Eam/AsetRak/AsetRakFormPage")
);
const AsetRakPage = React.lazy(
  () => import("@app/pages/MasterData/Eam/AsetRak/AsetRakPage")
);

const AsetLantaiFormPage = React.lazy(
  () => import("@app/pages/MasterData/Eam/AsetLantai/AsetLantaiFormPage")
);
const AsetLantaiPage = React.lazy(
  () => import("@app/pages/MasterData/Eam/AsetLantai/AsetLantaiPage")
);

const AsetRuanganFormPage = React.lazy(
  () => import("@app/pages/MasterData/Eam/AsetRuangan/AsetRuanganFormPage")
);
const AsetRuanganPage = React.lazy(
  () => import("@app/pages/MasterData/Eam/AsetRuangan/AsetRuanganPage")
);

const GroupHarFormPage = React.lazy(
  () => import("@app/pages/MasterData/Eam/GroupHar/GroupHarFormPage")
);
const GroupHarPage = React.lazy(
  () => import("@app/pages/MasterData/Eam/GroupHar/GroupHarPage")
);

export default function FasopRoute() {
  return (
    <>
      <Routes>
        <Route path="group-har">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <GroupHarPage />
              </React.Suspense>
            }
          />
          <Route
            path="add"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <GroupHarFormPage />
              </React.Suspense>
            }
          />
          <Route
            path="edit/:id"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <GroupHarFormPage />
              </React.Suspense>
            }
          />
        </Route>

        <Route path="aset-rak">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <AsetRakPage />
              </React.Suspense>
            }
          />
          <Route
            path="add"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <AsetRakFormPage />
              </React.Suspense>
            }
          />
          <Route
            path="edit/:id"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <AsetRakFormPage />
              </React.Suspense>
            }
          />
        </Route>

        <Route path="aset-lantai">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <AsetLantaiPage />
              </React.Suspense>
            }
          />
          <Route
            path="add"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <AsetLantaiFormPage />
              </React.Suspense>
            }
          />
          <Route
            path="edit/:id"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <AsetLantaiFormPage />
              </React.Suspense>
            }
          />
        </Route>

        <Route path="aset-ruangan">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <AsetRuanganPage />
              </React.Suspense>
            }
          />
          <Route
            path="add"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <AsetRuanganFormPage />
              </React.Suspense>
            }
          />
          <Route
            path="edit/:id"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <AsetRuanganFormPage />
              </React.Suspense>
            }
          />
        </Route>
        <Route path="aset-kategori">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <AsetKategoriPage />
              </React.Suspense>
            }
          />
          <Route
            path="add"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <AsetKategoriFormPage />
              </React.Suspense>
            }
          />
          <Route
            path="edit/:id"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <AsetKategoriFormPage />
              </React.Suspense>
            }
          />
        </Route>
        <Route path="bobot-prioritas">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <BobotPrioritasPage />
              </React.Suspense>
            }
          />
          <Route
            path="add"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <BobotPrioritasFormPage />
              </React.Suspense>
            }
          />
          <Route
            path="edit/:id"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <BobotPrioritasFormPage />
              </React.Suspense>
            }
          />
        </Route>

        <Route path="bagian-ref">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <BagianPage />
              </React.Suspense>
            }
          />
          <Route
            path="add"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <BagianFormPage />
              </React.Suspense>
            }
          />
          <Route
            path="edit/:id"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <BagianFormPage />
              </React.Suspense>
            }
          />
        </Route>
        <Route path="aset-ref">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <AsetPage />
              </React.Suspense>
            }
          />
          <Route
            path="add"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <AsetFormPage />
              </React.Suspense>
            }
          />
          <Route
            path="edit/:id"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <AsetFormPage />
              </React.Suspense>
            }
          />
          <Route
            path="mutasi/:id"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <AsetMutasiFormPage />
              </React.Suspense>
            }
          />
        </Route>

        <Route path="aset-group">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <AsetGroupPage />
              </React.Suspense>
            }
          />
          <Route
            path="add"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <AsetGroupFormPage />
              </React.Suspense>
            }
          />
          <Route
            path="edit/:id"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <AsetGroupFormPage />
              </React.Suspense>
            }
          />
        </Route>

        <Route path="aset-kondisi">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <AsetKondisiPage />
              </React.Suspense>
            }
          />
          <Route
            path="add"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <AsetKondisiFormPage />
              </React.Suspense>
            }
          />
          <Route
            path="edit/:id"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <AsetKondisiFormPage />
              </React.Suspense>
            }
          />
        </Route>

        <Route path="aset-manufaktur">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <AsetManufakturPage />
              </React.Suspense>
            }
          />
          <Route
            path="add"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <AsetManufakturFormPage />
              </React.Suspense>
            }
          />
          <Route
            path="edit/:id"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <AsetManufakturFormPage />
              </React.Suspense>
            }
          />
        </Route>

        <Route path="aset-status">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <AsetStatusPage />
              </React.Suspense>
            }
          />
          <Route
            path="add"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <AsetStatusFormPage />
              </React.Suspense>
            }
          />
          <Route
            path="edit/:id"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <AsetStatusFormPage />
              </React.Suspense>
            }
          />
        </Route>

        <Route path="jenis-mutasi">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <JenisMutasiPage />
              </React.Suspense>
            }
          />
          <Route
            path="add"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <JenisMutasiFormPage />
              </React.Suspense>
            }
          />
          <Route
            path="edit/:id"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <JenisMutasiFormPage />
              </React.Suspense>
            }
          />
        </Route>

        <Route path="status-mutasi">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <StatusMutasiPage />
              </React.Suspense>
            }
          />
          <Route
            path="add"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <StatusMutasiFormPage />
              </React.Suspense>
            }
          />
          <Route
            path="edit/:id"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <StatusMutasiFormPage />
              </React.Suspense>
            }
          />
        </Route>

        <Route path="health-index">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <HealthIndexPage />
              </React.Suspense>
            }
          />
          <Route
            path="add"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <HealthIndexFormPage />
              </React.Suspense>
            }
          />
          <Route
            path="edit/:id"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <HealthIndexFormPage />
              </React.Suspense>
            }
          />
        </Route>

        <Route path="*" element={<Error404 type="admin" />}></Route>
      </Routes>
    </>
  );
}