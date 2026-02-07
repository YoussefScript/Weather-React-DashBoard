import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type Props = {

}


export default function Map({ }: Props) {
    return (
        <>
            <MapContainer center={[24.0889, 32.8998]} zoom={5} className="h-[500px] w-[1000px] rounded-lg" >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[24.0889, 32.8998]} />
            </MapContainer>
        </>
    );
}