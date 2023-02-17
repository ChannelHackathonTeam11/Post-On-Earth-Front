import React, { useState, useEffect } from "react";
import { Map } from "../Components/Home/Map";
import { Button } from "@mui/material";
import AdjustIcon from "@mui/icons-material/Adjust";
import currentLocationAtom from "../recoil/currentLocation";
import { useRecoilState } from "recoil";
import AddIcon from "@mui/icons-material/Add";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import userInfoAtom from "../recoil/userInfo";
const Home = () => {
  const [center, setCenter] = useState({});
  const [currentLocation, setCurrentLocation] =
    useRecoilState(currentLocationAtom);
  const [markerList, setMarkerList] = useState([]);
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userInfoAtom);

  useEffect(() => {
    resetCenter();
    const getMarkerList = async () => {
      const response = await axios.get("/contents");
      setMarkerList(response.data.data);
    };
    getMarkerList();
  }, []);

  const getLocation = () => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  const resetCenter = async () => {
    if (currentLocation.lat) {
      setCenter(currentLocation);
      return;
    }
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

  const handleAdd = () => {
    navigate("/write");
  };

  const adjustStyle = {
    height: "50px",
    width: "50px",
    boxSizing: "border-box",
    position: "relative",
    top: "-55px",
    right: "calc(-100vw + 70px)",
  };
  const addStyle = {
    height: "50px",
    width: "50px",
    boxSizing: "border-box",
    position: "relative",
    top: "-55px",
    right: "calc(-100vw + 200px)",
  };

  const mapStyle = {
    height: "90vh",
    width: "100vw",
  };

  const loginStyle = {};
  const registerStyle = {};
  const wrapStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    position: "absolute",
    bottom: "0px",
    width: "100%",
    backgroundColor: "white",
    zIndex: "100",
    height: "80px",
    padding: "15px",
    boxSizing: "border-box",
  };
  const appStyle = {
    height: "100vh",
    width: "100vw",
    overFlow: "hidden",
  };

  return (
    <div style={appStyle}>
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

        {userInfo.user_id ? (
          <Button
            style={addStyle}
            variant="contained"
            color="primary"
            onClick={() => {
              handleAdd();
            }}
          >
            <AddIcon />
          </Button>
        ) : null}

        {userInfo.user_id ? null : (
          <div style={wrapStyle}>
            <Button
              style={loginStyle}
              variant="contained"
              color="primary"
              onClick={() => {
                navigate("/login");
              }}
            >
              로그인하기
            </Button>
            <Button
              style={registerStyle}
              variant="contained"
              color="primary"
              onClick={() => {
                navigate("/register");
              }}
            >
              가입하기
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export { Home };
