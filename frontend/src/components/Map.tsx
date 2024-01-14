import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { GOOGLE_MAPS_API_KEY } from '../config';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const SbBounds = {
  //Values approximating the region around UCSB/Isla Vista
    se: {
        lat: 34.40421,
        lng: -119.844215
    },
    ne: {
        lat: 34.418661,
        lng: -119.838186
    },
    sw: {
        lat: 34.405928,
        lng: -119.877925
    },
    west: {
        lat: 34.419334,
        lng: -119.873250
    }
}

const center = {
    //Coordinates of Pardall Tunnel
  lat: 34.413103,
  lng: -119.853269
};
const options = {
    streetViewControl: false,
    mapTypeControl: false,
    zoom: 18,
    styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [
            {
              visibility: 'off',
            },
          ],
        },
        {
          featureType: 'transit.station',
          stylers: [
            {
              visibility: 'off',
            },
          ],
        },
      ],
  };

type MyMapProps = {
    handleLat: (lat: number) => void;
    handleLng: (lng: number) => void;
}

const MyMap: React.FC<MyMapProps> = ({handleLat, handleLng}) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY
  })
  const points = [SbBounds.se, SbBounds.ne, SbBounds.sw, SbBounds.west]
  const [map, setMap] = React.useState(null)
  const [marker, setMarker] = React.useState(center)
  const onMapClick = (e:any) => {
    setMarker(
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      }
    );
    handleLat(e.latLng.lat());
    handleLng(e.latLng.lng());
  };
  const onLoad = React.useCallback(function callback(map:any    ) {
    const bounds = new window.google.maps.LatLngBounds();
    points.forEach((point) => {
      bounds.extend(new window.google.maps.LatLng(point.lat, point.lng));
    });
    map.fitBounds(bounds);


    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map:any) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={onMapClick}
        streetView={undefined}
        options={options}
      >
        <Marker position={marker}> </Marker>
        <></>
      </GoogleMap>
  ) : <></>
}

export default React.memo(MyMap)

//export default <div></div>