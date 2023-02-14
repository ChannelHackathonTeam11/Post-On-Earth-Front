import React from "react";
import GoogleMapReact from "google-map-react";
import { Marker } from "./Marker";
const Map = (props) => {
  return (
    <div style={{ height: "90vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAIIvisruWTsCnEATJNSnmLjNJbUZG8CKQ" }}
        center={props.center}
        zoom={props.zoom}
        onChange={props.onChange}
      >
        <Marker lat={36.3882236} lng={127.37922609999998} text="My Marker" />
      </GoogleMapReact>
    </div>
  );
};

export { Map };
