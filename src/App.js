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
  const markers = [
    {
      position: [50.0832, 14.4353], // Praha hl.n. coordinates
      name: 'Praha hl.n.',
      description: 'Tady můžeš narazit na jednoho kamaráda co dělá průvodčího. S 8 ',
    },
    {
      position: [50.0847, 14.3569],
      name: 'Břevnovský klášterní pivovar',
      description: 'Benediktini umí kalit jakož i pivo vařit.',
    },
    {
      position: [50.0971, 14.3999], 
      name: 'Dejvická nádražka',
      description: 'Stylový pajzl.',
    },
    {
      position: [49.0459, 14.0743], 
      name: 'Hospoda pod Kostelem',
      description: 'Tady můžeš narazit na tu ku*du arafatskou.',
    },
    {
      position: [50.0982, 14.3885], 
      name: 'Klubovna',
      description: 'Delirium.',
    },
    {
      position: [49.0261, 14.0774], 
      name: 'Sudetenland',
      description: 'Jen pro vyvolené.',
    },
    {
      position: [49.0129, 13.9984], 
      name: 'Lockal U Jelena',
      description: 'ČERPADLA!!!',
    },
    {
      position: [50.0832, 14.4143], 
      name: 'Standard Cafe',
      description: 'Fajn barmanstvo',
    },
    {
      position: [50.0977, 14.3961], 
      name: 'Kavárna Alibi',
      description: 'I lahváč někdy přijde vhod',
    },
  ];

  const handleMarkerClick = (event, marker) => {
    // Handle marker click event
    console.log('Kliknutí na pívo!', marker.name);
  };

  return (
    <div className="App">
      <MapContainer center={[50.0906, 14.3954]} zoom={13} style={{ height: '100vh', width: '100%' }}>
        <ChangeMarkerSizeOnZoom />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="Map data © OpenStreetMap contributors" />
        {markers.map((marker, index) => (
          <Marker key={index} position={marker.position} icon={createCustomMarkerIcon(13)} onClick={handleMarkerClick}>
            <Popup>
              <h1>{marker.name}</h1>
              <h6>Něco o tomto místě:</h6>
              <p>{marker.description}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default App;
