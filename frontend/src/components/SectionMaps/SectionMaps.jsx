import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './SectionMaps.css';

// Importar imágenes de iconos
import markerIcon2x from '../../../public/marker-icon-2x.png';
import markerIcon from '../../../public/marker-icon.png';
import markerShadow from '../../../public/marker-shadow.png';

// Fijar el ícono de marcador
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const MapComponent = () => {
    const position = [-33.521457786915576, -70.77947007596359]; // Coordenadas especificadas
    const radius = 4000; // Radio en metros

    return (
        <div className='map'>
            <h1>Ubicados en</h1>
            <MapContainer center={position} zoom={12} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position}>
                    <Popup>
                        This is your specified location! <br /> Easily customizable.
                    </Popup>
                </Marker>
                <Circle center={position} radius={radius} color="red" fillColor="#f03" fillOpacity={0.5} />
            </MapContainer>
        </div>
    );
}

export default MapComponent;
