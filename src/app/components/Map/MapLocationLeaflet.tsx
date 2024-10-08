import React, { useEffect, useState } from "react";
import { toNumber } from "lodash";
import { LayersControl, MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
interface IMapLocationLeaflet {
  children?: any
  position?: any
}
const MapLocationLeaflet = ({ children, position }: IMapLocationLeaflet) => {
  const [center, setCenter] = useState<any>({
    lat: toNumber(process.env.LATITUDE),
    lng: toNumber(process.env.LONGITUDE),
  });

  useEffect(() => {
    if (position?.latitude && position?.longitude) {
      setCenter({
        lat: position?.latitude,
        lng: position?.longitude
      })
    }
  }, [position])

  return (
    <div className="text-center" style={{ height: "100%", width: "100%" }}>
      <MapContainer
        center={center}
        zoom={6}
        scrollWheelZoom={false}
        // layers={[osm, streets]}
        style={{ height: '100%', width: '100wh' }}>
        <LayersControl position="topright">
          {/* openstreetmap */}

          <LayersControl.BaseLayer name="OSM" checked>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, <a href="https://www.mapbox.com/">Mapbox</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

            />
          </LayersControl.BaseLayer>
          {/* <LayersControl.BaseLayer name="Street">
            <TileLayer
              accessToken="pk.eyJ1IjoibWljaGFlbGNwIiwiYSI6ImNrN3V5eHVwNTAxMzgza2x1d2s1N3lkbmIifQ.Rmgw9tQHXVTL5_w6jvGjlw"
              url='https://tile.thunderforest.com/transport/{z}/{x}/{y}.png'
            />
          </LayersControl.BaseLayer> */}
          <LayersControl.BaseLayer name="Satellite">
            <TileLayer
              url='https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
              maxZoom={20}
              subdomains={['mt1', 'mt2', 'mt3']}
            />
          </LayersControl.BaseLayer>
          {/* <LayersControl.Overlay checked name="Padam"> */}
          {children}
          {/* </LayersControl.Overlay>
          <LayersControl.Overlay name="Nyala">
            {data?.map((item: any, index: number) => (
              <React.Fragment key={index}>
                {item?.status === "Nyala" ?

                  <Marker
                    position={{
                      lat: toNumber(item?.latitude),
                      lng: toNumber(item?.longitude),
                    }}
                    icon={data?.status == "Nyala" ? iconNyala : iconPadam}
                    key={index}
                  >
                    <Popup>
                      <CustomInfoWindow data={item} />
                    </Popup>
                  </Marker>
                  : null}
              </React.Fragment>
            ))
            }
          </LayersControl.Overlay> */}
        </LayersControl>

        {/* {children} */}
      </MapContainer>
    </div >
  );
};

export default MapLocationLeaflet;
