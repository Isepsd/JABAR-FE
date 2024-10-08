import Error404 from "@app/components/Error/Error404";
import React from "react";
import { Route, Routes } from "react-router-dom";

import TopBarLoader from "@app/components/Loader/TopBarLoader";

/** PAGE */
const DashboardAsetPage = React.lazy(
  () => import("./DashboardAset/DashboardAsetPage")
);
const ManuverTopJaringanPage = React.lazy(
  () => import("./ManuverTopJaringan/ManuverTopJaringanPage")
);
const PengirimanGarduPage = React.lazy(
  () => import("./PengirimanGardu/PengirimanGarduPage")
);
const MonitoringGarduPage = React.lazy(
  () => import("./MonitoringGardu/MonitoringGarduPageJQ")
);
const PengirimanRencanaHARPage = React.lazy(
  () => import("./PengirimanRencanaHAR/PengirimanRencanaHARPage")
);
const MonitoringApktPage = React.lazy(
  // () => import("./MonitoringApkt/MonitoringApktPage copy")
  () => import("./GangguanDanPemeliharaanTree/GangguanDanPemeliharaanPage copy")
);
const FormInputLaporan = React.lazy(
  () => import("./GangguanDanPemeliharaanTree/FormInputLaporanJQ")
  // () => import("./MonitoringApkt/FormInputLaporanJQ")
);
const FormInputLaporanNew = React.lazy(
  () => import("./GangguanDanPemeliharaan/FormInputLaporanJQ")
);
const GangguanDanPemeliharaanPage = React.lazy(
  () => import("./GangguanDanPemeliharaan/GangguanDanPemeliharaanPage copy")
  // () => import("./GangguanDanPemeliharaanTree/GangguanDanPemeliharaanPage copy")
);
// const FormUpdateJenisLaporan = React.lazy(
//   () => import("./GangguanDanPemeliharaan/FormUpdateJenisLaporanJQ")
// );
// const FormUpdateNOAPKT = React.lazy(
//   () => import("./GangguanDanPemeliharaan/FormUpdateNOAPKTJQ")
// );
const DaftarPenyulangTidakKirimApktPage = React.lazy(
  () => import("./DaftarPenyulangTidakKirimApkt/DaftarPenyulangTidakKirimApkt")
);
const MappingGarduPage = React.lazy(
  () => import("./MappingGarduSCADA/MappingGarduPageJQ")
);
// const MappingGarduForm = React.lazy(
//   () => import("./MappingGarduSCADA/MappingGarduFormPage")
// );
const JadwalRenHARPage = React.lazy(
  () => import("./JadwalRenHAR/JadwalRenHARPageJQ")
);
const FormJadwalRenHARPage = React.lazy(
  () => import("./JadwalRenHAR/JadwalRenHARFormPage")
);

export default function ApktRoute() {
  return (
    <>
      <Routes>
        <Route
          path="dashboard"
          element={
            <React.Suspense fallback={<TopBarLoader />}>
              <DashboardAsetPage />
            </React.Suspense>
          }
        />
        <Route
          path="manuver-topologi"
          element={
            <React.Suspense fallback={<TopBarLoader />}>
              <ManuverTopJaringanPage />
            </React.Suspense>
          }
        />
        <Route
          path="pengiriman-gardu"
          element={
            <React.Suspense fallback={<TopBarLoader />}>
              <PengirimanGarduPage />
            </React.Suspense>
          }
        />
        <Route
          path="monitoring-gardu"
          element={
            <React.Suspense fallback={<TopBarLoader />}>
              <MonitoringGarduPage />
            </React.Suspense>
          }
        />
        <Route
          path="pengiriman-rencana-har"
          element={
            <React.Suspense fallback={<TopBarLoader />}>
              <PengirimanRencanaHARPage />
            </React.Suspense>
          }
        />
        {/* <Route
          path="monitoring"
          element={
            <React.Suspense fallback={<TopBarLoader />}>
              <MonitoringApktPage />
            </React.Suspense>
          }
        /> */}
        {/* <Route
          path="gangguan-dan-pemeliharaan"
          element={
            <React.Suspense fallback={<TopBarLoader />}>
              <GangguanDanPemeliharaanPage />
            </React.Suspense>
          }
        />
        <Route
          path="gangguan-dan-pemeliharaan?id="
          element={
            <React.Suspense fallback={<TopBarLoader />}>
              <FormUpdateJenisLaporan />
            </React.Suspense>
          }
        /> */}
        <Route path="monitoring">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <MonitoringApktPage />
              </React.Suspense>
            }
          />
          <Route
            path="add"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <FormInputLaporan />
              </React.Suspense>
            }
          />
          {/* <Route
            path="jenis_laporan/:id"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <FormUpdateJenisLaporan />
              </React.Suspense>
            }
          /> */}
          {/* <Route
            path="no_apkt/:id"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <FormUpdateNOAPKT />
              </React.Suspense>
            }
          /> */}
          {/* <Route
            path="jenis_laporan/:id"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <FormUpdateNOAPKT />
              </React.Suspense>
            }
          /> */}
        </Route>
        <Route path="gangguan-dan-pemeliharaan">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <GangguanDanPemeliharaanPage />
              </React.Suspense>
            }
          />
          {/* <Route
            path="jenis_laporan/:id"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <FormUpdateJenisLaporan />
              </React.Suspense>
            }
          /> */}
          {/* <Route
            path="no_apkt/:id"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <FormUpdateNOAPKT />
              </React.Suspense>
            }
          /> */}
          <Route
            path="add"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <FormInputLaporanNew />
              </React.Suspense>
            }
          />
          {/* <Route
            path="jenis_laporan/:id"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <FormUpdateNOAPKT />
              </React.Suspense>
            }
          /> */}
        </Route>
        <Route
          path="daftar-penyulang-zone-segment-tidak-kirim-apkt"
          element={
            <React.Suspense fallback={<TopBarLoader />}>
              <DaftarPenyulangTidakKirimApktPage />
            </React.Suspense>
          }
        />
        {/* <Route
          path="mapping-gardu"
          element={
            <React.Suspense fallback={<TopBarLoader />}>
              <MappingGarduPage />
            </React.Suspense>
          }
        /> */}
        <Route path="mapping-gardu">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <MappingGarduPage />
              </React.Suspense>
            }
          />
          {/* <Route
            path="edit/:id"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <MappingGarduForm />
              </React.Suspense>
            }
          /> */}
        </Route>
        {/* <Route
          path="jadwal-renhar"
          element={
            <React.Suspense fallback={<TopBarLoader />}>
              <JadwalRenHARPage />
            </React.Suspense>
          }
        /> */}
        <Route path="jadwal-renhar">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <JadwalRenHARPage />
              </React.Suspense>
            }
          />
          <Route
            path="kirim_apkt/:id"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <FormJadwalRenHARPage />
              </React.Suspense>
            }
          />
        </Route>
        <Route path="*" element={<Error404 type="admin" />}></Route>
      </Routes>
    </>
  );
}
