import React, { useContext, useState, useEffect } from "react";
import useSound from "use-sound";
import Main from "./components/Main/Main";
import AppNavbar from "./components/AppNavbar/AppNavbar";
import Base from "./content/Base";
import Container from "./content/Container";
import Alarm, { playAlarm } from "./content/Alarm";

import { io } from "socket.io-client";
import { AuthContext } from "../../context/auth";
import { toast } from "react-hot-toast";

export default function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [alert, setAlert] = useState(false);
  const [deviceList, setDeviceList] = useState([]);
  const { logout } = useContext(AuthContext);

  // Socket settup
  // const URL = "http://localhost:8080";
  const URL = "https://api.apps.theveiga.com";
  const socket = io(URL);

  //Get Devices
  const getDevices = () => {
    toast.dismiss();
    const promisse = fetch(process.env.REACT_APP_API_ESP32)
      .then((response) => response.json())
      .then((json) => {
        setDeviceList(json);
        setFilteredData(json);
        setData(json);
      })
      .then(socket.off("device_update"))
      .catch((error) => console.log(error));
    toast.promise(promisse, {
      loading: "Buscando dados...",
      success: "Concluido !",
      error: "Erro ao buscar dados.",
    });
  };

  //UpdateEventListener
  const manageUpdateDevicesEvent = () => {
    if (!socket.id) {
      socket.on("device_update");
      getDevices();
    } else {
      setTimeout(() => {
        getDevices();
      }, 800);
    }
  };

  //Filter Method
  const filterData = (data) => {
    if (data.length > 0) {
      setFilteredData(data);
    }
  };

  //Socket.io Kickoff
  useEffect(() => {
    function onUpdateEvent() {
      manageUpdateDevicesEvent();
    }

    socket.on("device_update", onUpdateEvent);

    return () => {
      socket.off("device_update", onUpdateEvent);
    };
  }, [manageUpdateDevicesEvent]);

  //App Kickoff
  useEffect(() => {
    manageUpdateDevicesEvent();
  }, []);

  //Alert kickoff
  useEffect(() => {
    let isEmergence = false;
    deviceList.forEach((device) => {
      if (device.device_status !== "NONE") {
        isEmergence = true;
      }
    });

    if (isEmergence) {
      setAlert(true);
    } else {
      setAlert(false);
    }
  }, [deviceList]);

  return (
    <>
      <Base>
        <Container>
          {/* -------------------------- Navbar */}
          <AppNavbar filterData={filterData} deviceData={data} />

          {/* -------------------------- Alert */}
          {alert && <Alarm />}

          {/* -------------------------- Main App Logic */}
          {data.length > 0 && <Main deviceData={filteredData} />}
        </Container>
      </Base>
    </>
  );
}
