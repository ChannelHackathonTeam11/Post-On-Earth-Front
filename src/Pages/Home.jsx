import React, { useState, useEffect } from "react";
import { Map } from "../Components/Home/Map";
import { Button } from "@mui/material";
import AdjustIcon from "@mui/icons-material/Adjust";
import currentLocationAtom from "../recoil/currentLocation";
import { useRecoilState } from "recoil";
import axios from "../axios";

const Home = () => {
  const [center, setCenter] = useState({});
  const [currentLocation, setCurrentLocation] =
    useRecoilState(currentLocationAtom);
  const [markerList, setMarkerList] = useState([]);
  console.log(markerList);

  useEffect(() => {
    resetCenter();
    const getMarkerList = async () => {
      const response = await axios.get("/contents");
      setMarkerList(response.data);
    };
    getMarkerList();
  }, []);

  const getLocation = () => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  const resetCenter = async () => {
    console.log("resetCenter");
    const location = await getLocation();
    const lat = location.coords.latitude;
    const lng = location.coords.longitude;
    setCenter({ lat, lng });
    setCurrentLocation({ lat, lng });
  };

  const onChange = ({ center, zoom }) => {
    console.log(center, zoom);
    setCenter(center);
  };

  const adjustStyle = {
    height: "50px",
    width: "50px",
    boxSizing: "border-box",
    position: "relative",
    top: "-55px",
    right: "calc(-100vw + 70px)",
  };

  const mapStyle = {
    height: "90vh",
    width: "100vw",
  };

  return (
    <div>
      <div style={mapStyle}>
        <Map
          onChange={onChange}
          center={center}
          zoom={17}
          markerList={markerList}
        ></Map>

        <Button
          style={adjustStyle}
          variant="contained"
          color="primary"
          onClick={() => {
            resetCenter();
          }}
        >
          <AdjustIcon />
        </Button>
      </div>
    </div>
  );
};

export { Home };
