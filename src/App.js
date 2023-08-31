import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import markerIcon from './Images/beer.png'; // Import your custom marker icon

// Create a custom icon using the imported marker icon image
const createCustomMarkerIcon = (zoom) => L.icon({
  iconUrl: markerIcon,
  iconSize: [zoom * 1.25, zoom * 3.75],
  iconAnchor: [zoom * 0.625, zoom * 3.75],
  popupAnchor: [0, -zoom * 3.75],
});


// původní verze:
/*const createCustomMarkerIcon = (zoom) => L.icon({
  iconUrl: markerIcon,
  iconSize: [zoom * 5, zoom * 15],
  iconAnchor: [zoom * 2.5, zoom * 15],
  popupAnchor: [0, -zoom * 15],
});
*/

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
    console.log('Kliknutí na pívo!', marker.properties.OBJECTID);
  };

  return (
    <div className="App">
      <MapContainer center={[50.0906, 14.3954]} zoom={13} style={{ height: '100vh', width: '100%' }}>
        <ChangeMarkerSizeOnZoom />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="Map data © OpenStreetMap contributors" />
        {markers.features.map((marker, index) => (
          <Marker key={index} position={marker.geometry.coordinates} icon={createCustomMarkerIcon(13)} onClick={handleMarkerClick}>
            <Popup>
              <h6>Něco o tomto místě:</h6>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default App;
