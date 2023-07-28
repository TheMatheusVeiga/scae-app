import React, { useContext, useState, useEffect } from "react";

import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import Moment from "moment";
import "moment/locale/pt-br";
import StatusSwitch from "../../components/StatusSwitch/StatusSwitch.jsx";
import Modal from "../ModalDialog/Modal.jsx";

export default function Main({ deviceData }) {
  const [data, setData] = useState(deviceData);
  const [filteredData, setFilteredData] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [currentDeviceId, setCurentDeviceId] = useState(0);
  const [modalData, setModalData] = useState([]);
  const [modalName, setModalName] = useState();

  //Media query params
  const theme = useTheme();
  const xlMQuery = useMediaQuery(theme.breakpoints.down("sm"));
  const mdMQuery = useMediaQuery(theme.breakpoints.down("md"));

  //Modal Control - Open + Sets
  const openModal = async (deviceId, deviceName) => {
    await getModalData(deviceId);
    setCurentDeviceId(deviceId);
    setModalName(deviceName);
    setModalOpen(true);
  };

  //Modal Control - Close + Reset
  const closeModal = () => {
    setModalOpen(false);
    setCurentDeviceId(0);
    setModalData([]);
  };

  //Modal Control - Get Modal Data
  const getModalData = (deviceId) => {
    const promisse = fetch(
      process.env.REACT_APP_API_DEVICE_LOGS_BY_ID + deviceId
    )
      .then((response) => response.json())
      .then((json) => setModalData(json))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    setData(deviceData);
  }, []);

  useEffect(() => {
    if (deviceData) setData(deviceData);
  }, [deviceData]);

  //Moment date ref
  Moment.locale("pt-br");

  return (
    <>
      {/*  -------------------------- Cards */}
      <div>
        <Grid
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: xlMQuery
              ? "center"
              : mdMQuery
              ? "center"
              : "flex-start",
          }}
          container
          spacing={2}
        >
          {data.length > 0 &&
            data.map((item, index) => (
              <>
                <Grid key={index} item lg={2} xs={8} md={2}>
                  <Card sx={{ maxWidth: 315, margin: "5px 0 5px 5px" }}>
                    <CardContent>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        {Moment(item.created_at).format("LL")}
                      </Typography>
                      <Typography variant="h6" component="div">
                        {item.device_name}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Id do dispositivo: {item.device_id}
                      </Typography>
                      <StatusSwitch status={item.device_status} />
                    </CardContent>
                    <CardActions>
                      <Button
                        onClick={() =>
                          openModal(item.device_id, item.device_name)
                        }
                        size="small"
                      >
                        Histórico
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              </>
            ))}
        </Grid>
        {modalData.length > 0 && (
          <Modal
            open={modalOpen}
            closeModal={closeModal}
            data={modalData}
            deviceId={currentDeviceId}
            deviceName={modalName}
          />
        )}
      </div>
    </>
  );
}
