import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import windmillData from '../../solcelle.json'
import icon from '../../Images/solar-panel.png'
import big from '../../Images/big.jpg'
import medium from '../../Images/medium.jpg'
import small from '../../Images/small.jpg'
import posIcon from '../../Images/blue_person.png'
import otherIcon from "../../Images/marker.svg"


import "leaflet/dist/leaflet.css";
import { NavLink } from "react-router-dom";
import { MarkerCluster } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";
import { MapStyle } from "./Map.style";
const createClusterCustomIcon = function (cluster: MarkerCluster) {
  return L.divIcon({
    html: `<span>${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: L.point(33, 33, false)
  });
};

let markers = []
let isLoaded = false
  

function MobileMap() {

    setTimeout(() => {
      isLoaded = true
    }, 1000);
    const customMarker = new L.icon({
      iconUrl: posIcon,
      iconSize: [33, 33],
      iconAnchor: [16, 16]
    });
    const customWindmill = new L.icon({
      iconUrl: icon,
      iconSize: [25, 30],
      iconAnchor: [13, 0]
    });
    function LocationMarker() {
      const [position, setPosition] = useState(null);
      const [bbox, setBbox] = useState([]);
  
      const map = useMap();
  
      useEffect(() => {
        map.locate().on("locationfound", function (e) {
          setPosition(e.latlng);
          map.flyTo(e.latlng, map.getZoom());
          const radius = e.accuracy;
          const circle = L.circle(e.latlng, radius);
          circle.addTo(map);
          setBbox(e.bounds.toBBoxString().split(","));
        });
      }, [map]);
      
      return position === null ? null : (
        <Marker position={position} icon={customMarker}>
          
          <Popup>
            Du er her
          </Popup>
        </Marker>
      );
    }

  


  return (
    <>

    <MapStyle>
    <MapContainer
      center={[56.1827476,9.4256881]}
      zoom={4}
      scrollWheelZoom
      style={{zIndex: "0", height: "100vh" }}
    >

      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
      
      <MarkerClusterGroup chunkedLoading>
      {windmillData.map((marker,index) => {
        let solarImg = ""
        if (marker.capacity_pr_panel_in_W < 1666 && marker.capacity_pr_panel_in_W > 0) {
            solarImg = small
        }
        if (marker.capacity_pr_panel_in_W < 3332 && marker.capacity_pr_panel_in_W > 1667) {
            solarImg = medium
        }
        if (marker.capacity_pr_panel_in_W < 5000 && marker.capacity_pr_panel_in_W > 3333) {
            solarImg = big
        }
         let pos = [
          {"position": {
            "lat": marker.Latitude,
            "lng": marker.Longtitude
          }
         }
        ]
        return (
            <Marker position={pos[0].position} icon={customWindmill}>
            <Popup>

                <img src={solarImg} alt="" />
            <h2>{marker.address}</h2>
            <h3>Kapacitet: {marker.capacity_pr_panel_in_W} W</h3>
            <h3>Paneler: {marker.number_of_panels}</h3>
            <NavLink to={`/${marker.sid}`}>Se mere</NavLink>
            </Popup>
          </Marker>)

          })}
        </MarkerClusterGroup>
        
        
      
    </MapContainer>
    </MapStyle>
    </>
  );
}

export default MobileMap;