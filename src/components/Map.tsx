import { MapContainer, Marker, TileLayer, useMap, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Coords } from "../types";
import { useEffect, useMemo } from "react";
// @ts-ignore
import * as maptilersdk from "@maptiler/leaflet-maptilersdk";
import { useTheme } from "./ThemeProvider";

type Props = {
    coords: Coords
    onMapClick: (lat: number, lon: number) => void
}

const API_KEY = import.meta.env.VITE_API_KEY;

export default function Map({ coords, onMapClick }: Props) {
    const { lat, lon } = coords;

    return (
        <div className='relative w-full h-[300px] sm:h-[400px] md:h-[500px]'>
            <MapContainer
                center={[lat, lon]}
                zoom={5}
                className="h-full w-full"
                zoomControl={false} // We'll add it back in a custom position if needed
                scrollWheelZoom={true}
            >
                <ZoomControl position="bottomright" />
                <MapUpdater coords={coords} />
                <MapClick onMapClick={onMapClick} />
                <MapTilerLayerComponent />

                <Marker position={[lat, lon]} />
            </MapContainer>
        </div>
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

function MapTilerLayerComponent() {
    const map = useMap();
    const { theme } = useTheme();

    // Determine the map style based on theme
    const mapStyle = useMemo(() => {
        const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
        return isDark ? "basic-dark" : "bright";
    }, [theme]);

    useEffect(() => {
        const tileLayer = new maptilersdk.MaptilerLayer({
            style: mapStyle,
            apiKey: "s2PdDjbdSpl8cWwO5JrP",
        });

        tileLayer.addTo(map);

        return () => {
            map.removeLayer(tileLayer);
        };
    }, [map, mapStyle]);

    return null;
}
