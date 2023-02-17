import React from "react";
import GoogleMapReact from "google-map-react";
import { Marker } from "./Marker";
import { Me } from "./Me";
import currentLocationAtom from "../../recoil/currentLocation";
import { useRecoilState } from "recoil";

const Map = (props) => {
  const [currentLocation, setCurrentLocation] =
    useRecoilState(currentLocationAtom);
  return (
    <div style={{ height: "90vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAIIvisruWTsCnEATJNSnmLjNJbUZG8CKQ" }}
        center={props.center}
        zoom={props.zoom}
        onChange={props.onChange}
      >
        <Me lat={currentLocation.lat} lng={currentLocation.lng} />
        {props.markerList.map((marker) => {
          return <Marker {...marker} />;
        })}
      </GoogleMapReact>
    </div>
  );
};

export { Map };
