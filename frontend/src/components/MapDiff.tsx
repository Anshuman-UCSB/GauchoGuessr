import React from "react";
import {
    GoogleMap,
    useJsApiLoader,
    Marker,
    Polyline,
} from "@react-google-maps/api";
import { GOOGLE_MAPS_API_KEY } from "../config";

const containerStyle = {
    width: "110%",
    height: "110%",
};

const options = {
    streetViewControl: false,
    mapTypeControl: false,
    zoom: 20,
    draggable: false,
    styles: [
        {
            featureType: "poi",
            elementType: "labels",
            stylers: [
                {
                    visibility: "off",
                },
            ],
        },
        {
            featureType: "transit.station",
            stylers: [
                {
                    visibility: "off",
                },
            ],
        },
    ],
};

interface MapProps {
    UserMarker: {
        lat: number;
        lng: number;
    };
    realMarker: {
        lat: number;
        lng: number;
    };
    distance: number;
}

function DiffMap(MapProps: MapProps) {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    });
    const [map, setMap] = React.useState(null);
    const onLoad = React.useCallback(function callback(map: any) {
        const bounds = new window.google.maps.LatLngBounds();
        points.forEach((point) => {
            bounds.extend(new window.google.maps.LatLng(point.lat, point.lng));
        });
        map.fitBounds(bounds);

        setMap(map);
    }, []);

    const onUnmount = React.useCallback(function callback(map: any) {
        setMap(null);
    }, []);
    const points = [MapProps.realMarker, MapProps.UserMarker];
    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={MapProps.realMarker}
            zoom={20}
            onLoad={onLoad}
            onUnmount={onUnmount}
            streetView={undefined}
            options={options}
        >
            <Marker
                position={MapProps.realMarker}
                label={
                    "Actual Location: Lat " +
                    MapProps.realMarker.lat +
                    " Long " +
                    MapProps.realMarker.lng
                }
            >
                Hello World{" "}
            </Marker>
            <Marker
                position={MapProps.UserMarker}
                label={
                    "Your Location: Lat " +
                    MapProps.UserMarker.lat +
                    " Long " +
                    MapProps.UserMarker.lng
                }
            >
                {" "}
                HI again
            </Marker>
            {/* {points.map((point, index) => (
        <Marker
          key={index}
          position={{ lat: point.lat, lng: point.lng }}
        />
      ))} */}

            <Polyline
                path={points.map((point) => ({
                    lat: point.lat,
                    lng: point.lng,
                }))}
                options={{
                    strokeColor: "#FF0000",
                    strokeOpacity: 1,
                    strokeWeight: 2,
                }}
            />
            <></>
        </GoogleMap>
    ) : (
        <></>
    );
}

export default React.memo(DiffMap);

//export default <div></div>
