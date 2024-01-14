import React from "react";
import Pano from "../components/Pano";
import MyMap from "../components/Map";
import DiffMap from "../components/MapDiff";
const mapProps = {
    UserMarker: {
        lat: 34.4131,
        lng: -119.843269
    },
    realMarker: {
        lat: 34.41311,
        lng: -119.85326
    },
    distance: 0
};

export default function Gamepage() {
    return <div>
        <div><Pano width="1300" height="1000" src="https://i.imgur.com/k9HhbOz.jpg" title="Demo" /></div>
        <div><MyMap></MyMap></div>
        <div><DiffMap UserMarker={mapProps.UserMarker} realMarker={mapProps.realMarker} distance={mapProps.distance} /></div>
        </div>;
}
