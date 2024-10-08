import { toNumber } from "lodash";
import React from "react";
import { Marker } from "react-leaflet";
// import { InfoWindowPetaRTU } from "./InfoWindowPetaRTU";
interface IPetaRTUPOOL {
  data?: any
}
export default function PetaRTUPOOL({ data }: IPetaRTUPOOL) {

  return (
    <>
      {data?.map((item: any, index: number) => (
        <React.Fragment key={index}>
          {/* {item?.jenis_laporan === "PEMELIHARAAN" ? */}

          <Marker
            position={{
              lat: toNumber(item?.latitude),
              lng: toNumber(item?.longitude),
            }}
            key={index}
          >
            {/* <Popup>
              <InfoWindowPetaRTU data={item} />
            </Popup> */}
          </Marker>
          {/* : null} */}
        </React.Fragment>

      ))
      }
    </>
  )
}