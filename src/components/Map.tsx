import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Coords } from "../types";
import { useEffect } from "react";

type Props = {
    coords: Coords
    onMapClick: (lat: number, lon: number) => void
}


export default function Map({ coords, onMapClick }: Props) {

    const { lat, lon } = coords;

    return (
        <>
            <MapContainer center={[lat, lon]} zoom={5} className="h-[500px] w-full rounded-lg" >
                <MapUpdater coords={coords} />
                <MapClick onMapClick={onMapClick} />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[lat, lon]} />
            </MapContainer>
        </>
    );
}

function MapUpdater({ coords }: { coords: Coords }) {
    const map = useMap();

    useEffect(() => {
        map.setView([coords.lat, coords.lon], 5);
    }, [coords.lat, coords.lon, map]);

    return null;
}

function MapClick({ onMapClick }: { onMapClick: (lat: number, lon: number) => void }) {

    const map = useMap();

    map.on('click', (e) => {
        const { lat, lng } = e.latlng;
        map.panTo([lat, lng]);
        onMapClick(lat, lng);
    });

    return null
}