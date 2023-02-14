import React, { useState, useEffect } from "react";
import { Map } from "../Components/Home/Map";
import { Button } from "@mui/material";
import AdjustIcon from "@mui/icons-material/Adjust";

const Home = () => {
  const [center, setCenter] = useState({});

  useEffect(() => {
    resetCenter();
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
        <Map onChange={onChange} center={center} zoom={15}></Map>

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
      <Button variant="contained" color="primary" disableElevation>
        로그인 할래요
      </Button>
      <Button variant="outlined" color="primary">
        회원가입 할래요
      </Button>
    </div>
  );
};

export { Home };
