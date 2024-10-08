import Error404 from "@app/components/Error/Error404";
import React from "react";
import { Route, Routes } from "react-router-dom";

import TopBarLoader from "@app/components/Loader/TopBarLoader";
import BotTelegramFormPage from "./Telegram/BotTelegram/BotTelegramFormPage";
import GroupTelegramFormPage from "./Telegram/GroupTelegram/GroupTelegramFormPage";

/** PAGE */
const FasIPPage = React.lazy(
  () => import("@app/pages/MasterData/Fasop/IP/FasIPPage")
);
const FasIPFormPage = React.lazy(
  () => import("@app/pages/MasterData/Fasop/IP/FasIPFormPage")
);

const FasPointAnalogDigitalPageJQ = React.lazy(
  () =>
    import(
      "@app/pages/MasterData/Fasop/PointAnalogDigital/FasPointAnalogDigitalPageJQ"
    )
);

const FasPointAnalogDigitalFormPage = React.lazy(
  () =>
    import(
      "@app/pages/MasterData/Fasop/PointAnalogDigital/FasPointAnalogDigitalFormPage"
    )
);

const FasRTUPage = React.lazy(
  () => import("@app/pages/MasterData/Fasop/RTU/FasRTUPage")
);
const FasRTUFormPage = React.lazy(
  () => import("@app/pages/MasterData/Fasop/RTU/FasRTUFormPage")
);

const FasMasterPage = React.lazy(
  () => import("@app/pages/MasterData/Fasop/Master/FasMasterPage")
);
const FasMasterFormPage = React.lazy(
  () => import("@app/pages/MasterData/Fasop/Master/FasMasterFormPage")
);

const FasSistemScadaPageSmart = React.lazy(
  () =>
    import("@app/pages/MasterData/Fasop/SistemScada/FasSistemScadaPageSmart")
);
const FasSistemScadaFormPage = React.lazy(
  () => import("@app/pages/MasterData/Fasop/SistemScada/FasSistemScadaFormPage")
);

// const FasJenisPointPageJQ = React.lazy(() => import("@app/pages/MasterData/Fasop/JenisPoint/FasJenisPointPageJQ"))
const FasJenisPointPage = React.lazy(
  () => import("@app/pages/MasterData/Fasop/JenisPoint/FasJenisPointPage")
);
const FasJenisPointFormPage = React.lazy(
  () => import("@app/pages/MasterData/Fasop/JenisPoint/JenisPointForm")
);
const FasJenisPointDetailPage = React.lazy(
  () => import("@app/pages/MasterData/Fasop/JenisPoint/FasJenisPointDetailPage")
);
const FasJenisPointDetailFormPage = React.lazy(
  () => import("@app/pages/MasterData/Fasop/JenisPoint/JenisPointDetailForm")
);

const FasPointRCTRIPPage = React.lazy(
  () => import("@app/pages/MasterData/Fasop/PointRCTRIP/FasPointRCTRIPPage")
);
const FasPointRCTRIPFormPage = React.lazy(
  () => import("@app/pages/MasterData/Fasop/PointRCTRIP/FasPointRCTRIPFormPage")
);
const Path1Page = React.lazy(
  () => import("@app/pages/MasterData/Fasop/Path1/Path1Page")
);
const Path1Form = React.lazy(
  () => import("@app/pages/MasterData/Fasop/Path1/Path1Form")
);
const Path3Page = React.lazy(
  () => import("@app/pages/MasterData/Fasop/Path3/Path3Page")
);
const Path3Form = React.lazy(
  () => import("@app/pages/MasterData/Fasop/Path3/Path3Form")
);

const BotTelegramPageJQ = React.lazy(
  () =>
    import("@app/pages/MasterData/Fasop/Telegram/BotTelegram/BotTelegramPageJQ")
);
const GroupTelegramPageJQ = React.lazy(
  () =>
    import(
      "@app/pages/MasterData/Fasop/Telegram/GroupTelegram/GroupTelegramPageJQ"
    )
);
const KinerjaScadaPageJQ = React.lazy(
  () => import("@app/pages/MasterData/Fasop/KinerjaScada/KinerjaScadaPageJQ")
);
const KinerjaScadaForm = React.lazy(
  () => import("@app/pages/MasterData/Fasop/KinerjaScada/KinerjaScadaForm")
);

const BotWhatsappPage = React.lazy(
  () =>
    import("@app/pages/MasterData/Fasop/Whatsapp/BotWhatsapp/BotWhatsappPageJQ")
);
const BotWhatsappFormPage = React.lazy(
  () =>
    import(
      "@app/pages/MasterData/Fasop/Whatsapp/BotWhatsapp/BotWhatsappFormPage"
    )
);
const KontakWhatsappPage = React.lazy(
  () =>
    import(
      "@app/pages/MasterData/Fasop/Whatsapp/KontakWhatsapp/KontakWhatsappPage"
    )
);
const KontakWhatsappFormPage = React.lazy(
  () =>
    import(
      "@app/pages/MasterData/Fasop/Whatsapp/KontakWhatsapp/KontakWhatsappFormPage"
    )
);
const GroupWhatsappPage = React.lazy(
  () =>
    import(
      "@app/pages/MasterData/Fasop/Whatsapp/GroupWhatsapp/GroupWhatsappPage"
    )
);
const GroupWhatsappFormPage = React.lazy(
  () =>
    import(
      "@app/pages/MasterData/Fasop/Whatsapp/GroupWhatsapp/GroupWhatsappFormPage"
    )
);
const APIWAGatewayPage = React.lazy(
  () =>
    import("@app/pages/MasterData/Fasop/Whatsapp/APIWAGateway/APIWAGatewayPage")
);
const Outbox = React.lazy(
  () => import("@app/pages/MasterData/Fasop/Whatsapp/Outbox/Outbox")
);
const DaftarPointTidakKirimWA = React.lazy(
  () =>
    import(
      "@app/pages/MasterData/Fasop/Whatsapp/DaftarPointTidakKirimWA/DaftarPointTidakKirimWA"
    )
);
const SendWhatsapp = React.lazy(
  () =>
    import(
      "@app/pages/MasterData/Fasop/Whatsapp/KirimWhatsApp/KirimWhatsappPage"
    )
);

const BlokMessageBlast = React.lazy(
  () => import("@app/pages/MasterData/Fasop/BlokMessageBlast/BlokMessageBlast")
);

export default function FasopRoute() {
  return (
    <>
      <Routes>
        <Route path="ip">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <FasIPPage />
              </React.Suspense>
            }
          />
          <Route
            path="add"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <FasIPFormPage />
              </React.Suspense>
            }
          />
          <Route
            path="edit/:id"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <FasIPFormPage />
              </React.Suspense>
            }
          />
        </Route>
        <Route path="point-analog-digital">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <FasPointAnalogDigitalPageJQ />
              </React.Suspense>
            }
          />
          <Route
            path="add"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <FasPointAnalogDigitalFormPage />
              </React.Suspense>
            }
          />
          <Route
            path="edit/:id"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <FasPointAnalogDigitalFormPage />
              </React.Suspense>
            }
          />
        </Route>
        <Route path="rtu">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <FasRTUPage />
              </React.Suspense>
            }
          />
          <Route
            path="add"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <FasRTUFormPage />
              </React.Suspense>
            }
          />
          <Route
            path="edit/:id"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <FasRTUFormPage />
              </React.Suspense>
            }
          />
        </Route>
        <Route path="master">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <FasMasterPage />
              </React.Suspense>
            }
          />
          <Route
            path="add"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <FasMasterFormPage />
              </React.Suspense>
            }
          />
          <Route
            path="edit/:id"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <FasMasterFormPage />
              </React.Suspense>
            }
          />
        </Route>
        <Route path="sistem-scada">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <FasSistemScadaPageSmart />
              </React.Suspense>
            }
          />
          <Route
            path="add"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <FasSistemScadaFormPage />
              </React.Suspense>
            }
          />
          <Route
            path="edit/:id"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <FasSistemScadaFormPage />
              </React.Suspense>
            }
          />
        </Route>
        <Route path="jenis-point">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <FasJenisPointPage />
              </React.Suspense>
            }
          />
          <Route
            path="add"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <FasJenisPointFormPage />
              </React.Suspense>
            }
          />
          <Route
            path="edit/:id"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <FasJenisPointFormPage />
              </React.Suspense>
            }
          />
          <Route path="detail/:id">
            <Route
              path=""
              element={
                <React.Suspense fallback={<TopBarLoader />}>
                  <FasJenisPointDetailPage />
                </React.Suspense>
              }
            />
            <Route
              path="add"
              element={
                <React.Suspense fallback={<TopBarLoader />}>
                  <FasJenisPointDetailFormPage />
                </React.Suspense>
              }
            />
            <Route
              path="edit/:detailId"
              element={
                <React.Suspense fallback={<TopBarLoader />}>
                  <FasJenisPointDetailFormPage />
                </React.Suspense>
              }
            />
          </Route>
        </Route>
        <Route path="ref-point-rctrip">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <FasPointRCTRIPPage />
              </React.Suspense>
            }
          />
          <Route
            path="add"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <FasPointRCTRIPFormPage />
              </React.Suspense>
            }
          />
          <Route
            path="edit/:id"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <FasPointRCTRIPFormPage />
              </React.Suspense>
            }
          />
        </Route>
        <Route path="path-1">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <Path1Page />
              </React.Suspense>
            }
          />
          <Route
            path="add"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <Path1Form />
              </React.Suspense>
            }
          />
          <Route
            path="edit/:id"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <Path1Form />
              </React.Suspense>
            }
          />
        </Route>
        <Route path="path-3">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <Path3Page />
              </React.Suspense>
            }
          />
          <Route
            path="add"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <Path3Form />
              </React.Suspense>
            }
          />
          <Route
            path="edit/:id"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <Path3Form />
              </React.Suspense>
            }
          />
        </Route>
        <Route path="telegram/bot">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <BotTelegramPageJQ />
              </React.Suspense>
            }
          />
          <Route
            path="add"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <BotTelegramFormPage />
              </React.Suspense>
            }
          />
          <Route
            path="edit/:id"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <BotTelegramFormPage />
              </React.Suspense>
            }
          />
        </Route>
        <Route path="telegram/group">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <GroupTelegramPageJQ />
              </React.Suspense>
            }
          />
          <Route
            path="add"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <GroupTelegramFormPage />
              </React.Suspense>
            }
          />
          <Route
            path="edit/:id"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <GroupTelegramFormPage />
              </React.Suspense>
            }
          />
        </Route>
        <Route path="kinerja-scada">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <KinerjaScadaPageJQ />
              </React.Suspense>
            }
          />
          <Route
            path="add"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <KinerjaScadaForm />
              </React.Suspense>
            }
          />
          <Route
            path="edit/:id"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <KinerjaScadaForm />
              </React.Suspense>
            }
          />
        </Route>
        <Route path="whatsapp/bot">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <BotWhatsappPage />
              </React.Suspense>
            }
          />
          <Route
            path="add"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <BotWhatsappFormPage />
              </React.Suspense>
            }
          />
          <Route
            path="edit/:id"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <BotWhatsappFormPage />
              </React.Suspense>
            }
          />
        </Route>
        <Route path="whatsapp/kontak">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <KontakWhatsappPage />
              </React.Suspense>
            }
          />
          <Route
            path="add"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <KontakWhatsappFormPage />
              </React.Suspense>
            }
          />
          <Route
            path="edit/:id"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <KontakWhatsappFormPage />
              </React.Suspense>
            }
          />
        </Route>
        <Route path="whatsapp/group">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <GroupWhatsappPage />
              </React.Suspense>
            }
          />
          <Route
            path="add"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <GroupWhatsappFormPage />
              </React.Suspense>
            }
          />
          <Route
            path="edit/:id"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <GroupWhatsappFormPage />
              </React.Suspense>
            }
          />
        </Route>
        <Route path="whatsapp/api-service">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <APIWAGatewayPage />
              </React.Suspense>
            }
          />
          {/* <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><GroupWhatsappFormPage /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><GroupWhatsappFormPage /></React.Suspense>} /> */}
        </Route>
        <Route path="whatsapp/outbox">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <Outbox />
              </React.Suspense>
            }
          />
          {/* <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><GroupWhatsappFormPage /></React.Suspense>} />
          <Route path="edit/:id" element={<React.Suspense fallback={<TopBarLoader />}><GroupWhatsappFormPage /></React.Suspense>} /> */}
        </Route>
        <Route path="whatsapp/daftar-point-kirim-wa">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <DaftarPointTidakKirimWA />
              </React.Suspense>
            }
          />
          {/* {/* <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><GroupWhatsappFormPage /></React.Suspense>} /> */}
          {/* <Route
            path="edit/:id"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <DaftarPointTidakKirimWA />
              </React.Suspense>
            }
          /> */}
        </Route>
        <Route path="whatsapp/kirim-wa">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <SendWhatsapp />
              </React.Suspense>
            }
          />
        </Route>
        <Route path="blok-message-blast">
          <Route
            path=""
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <BlokMessageBlast />
              </React.Suspense>
            }
          />
          {/* {/* <Route path="add" element={<React.Suspense fallback={<TopBarLoader />}><GroupWhatsappFormPage /></React.Suspense>} /> */}
          {/* <Route
            path="edit/:id"
            element={
              <React.Suspense fallback={<TopBarLoader />}>
                <DaftarPointTidakKirimWA />
              </React.Suspense>
            }
          /> */}
        </Route>
        <Route path="*" element={<Error404 type="admin" />}></Route>
      </Routes>
    </>
  );
}
