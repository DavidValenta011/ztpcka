import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import markerIcon from './Images/znacka.png'; // Import your custom marker icon

// Create a custom icon using the imported marker icon image
const createCustomMarkerIcon = (zoom) => L.icon({
  iconUrl: markerIcon,
  iconSize: [zoom * 1, zoom * 1.4],
  iconAnchor: [zoom * 1, zoom * 1.4],
  popupAnchor: [0, -zoom * 1.4],
});

function ChangeMarkerSizeOnZoom({ zoom }) {
  const map = useMap();

  // Update marker icon size when zoom changes
  const [, setMarkerIconSize] = useState(zoom);

  map.on('zoom', () => {
    const newZoom = map.getZoom();
    setMarkerIconSize(newZoom);
  });

  return null;
}


function App() {
  const url = 'https://opendata.iprpraha.cz/CUR/DOP/DOP_TSK_Stani_ZTP_b/WGS_84/DOP_TSK_Stani_ZTP_b.json';
  
  const [markers, setMarkers] = React.useState([]); 

  React.useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setMarkers(data.features);
      })
      .catch(error => {
        console.error('Error fetching JSON:', error);
      });
  }, []); // Empty dependency array to ensure the effect runs only once

  const handleMarkerClick = (event, marker) => {
    console.log('Kliknutí na invalidní místo!', marker.properties.OBJECTID);
  };

  return (
    <div className="App">
      <MapContainer center={[50.0906, 14.3954]} zoom={13} style={{ height: '100vh', width: '100%' }}>
        <ChangeMarkerSizeOnZoom />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="Map data © OpenStreetMap contributors" />
        {markers.map((marker, index) => (
          <Marker key={index} position={[marker.geometry.coordinates[1], marker.geometry.coordinates[0]]} icon={createCustomMarkerIcon(13)} onClick={handleMarkerClick}>
            <Popup>
              <h6>Počet míst:</h6>
              <p>{marker.properties.POCET_PS}</p>
              <h6>Rozměry:</h6>
              <p>délka: {marker.properties.ROZM_DELKA} m, šířka: {marker.properties.ROZM_SIRKA} m</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default App;
