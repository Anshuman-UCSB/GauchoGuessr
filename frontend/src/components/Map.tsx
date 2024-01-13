/*import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { GOOGLE_MAPS_API_KEY } from '../config';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
    //Coordinates of Pardall Tunnel
  lat: 34.413103,
  lng: -119.853269
};

function MyMap() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY
  })

  const [map, setMap] = React.useState(null)
  const [marker, setMarker] = React.useState(center)
  const onMapClick = (e: MouseEvent) => {
    setMarker(
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      }
    );
  };
  const onLoad = React.useCallback(function callback(map:any    ) {
    const bounds = new window.google.maps.LatLngBounds(center);
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
        zoom={3}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={onMapClick}
      >
        {marker.map((marker) => (
        <Marker 
          position={{ 
            lat: marker.lat,
            lng: marker.lng 
          }} />
    ))}
        <></>
      </GoogleMap>
  ) : <></>
}

export default React.memo(MyMap)
*/
export default <div></div>