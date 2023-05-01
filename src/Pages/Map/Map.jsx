import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
//import solarData from '../../solcelle.json'
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
import axios from "axios";
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
  const [solarData, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response1 = await axios.get(`https://xdmevphexshiintoioqy.supabase.co/rest/v1/solar${window.env.API_URL}?apikey=${window.env.API_KEY}`);
        setData(response1.data);
      } catch (error) {
        console.log(error);
      }
    }
    
    getData();
    
  }, []);
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
      {solarData.map((marker,index) => {
        let solarImg = ""
        if (marker.capacity_pr_panel_in_W * marker.number_of_panels < 9999 && marker.capacity_pr_panel_in_W * marker.number_of_panels > 0) {
            solarImg = small
        }
        if (marker.capacity_pr_panel_in_W * marker.number_of_panels < 25000 && marker.capacity_pr_panel_in_W * marker.number_of_panels > 10000) {
            solarImg = medium
        }
        if (marker.capacity_pr_panel_in_W * marker.number_of_panels > 1000000) {
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
            <Marker key={index} position={pos[0].position} icon={customWindmill}>
            <Popup>

                <img src={solarImg} alt="" />
            <h2>{marker.name}</h2>
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