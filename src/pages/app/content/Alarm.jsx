import React, { useContext, useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import alarmSfx from "../../../assets/alarm.wav";

export default function Alarm() {
  const ref = React.useRef(null);

  function playAlarm() {
    setTimeout(() => {
      const myAudio = document.getElementById("audio_player").play();
    }, 800);
  }

  useEffect(() => {
    playAlarm();
  }, []);

  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert
        sx={{
          display: "flex",
          flexDirection: "row",
          alignContent: "center",
          justifyContent: "flex-start",
        }}
        severity="error"
      >
        Alerta de estado de emergência !
        <audio
          id="audio_player"
          ref={ref}
          style={{ height: "100%", display: "none" }}
          preload="none"
          controls
          loop
          autoPlay
        >
          <source src={alarmSfx} type="audio/wav" />
        </audio>
      </Alert>
    </Stack>
  );
}
