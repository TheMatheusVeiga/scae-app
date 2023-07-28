import React, { useContext, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { toast } from "react-hot-toast";
import Moment from "moment";
import "moment/locale/pt-br";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

//Moment date ref
Moment.locale("pt-br");

export default function Modal({
  open,
  closeModal,
  data,
  deviceId,
  deviceName,
}) {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      onClose={closeModal}
      aria-describedby="alert-dialog-slide-description"
      maxWidth="sm"
      fullWidth="false"
    >
      <DialogTitle>Histórico de Atualizações: {deviceName}</DialogTitle>
      <DialogContent>
        <DialogContentText color="text.secondary">
          Id do dispositivo: {deviceId}{" "}
        </DialogContentText>
        <br />
        {data.map((item, index) => (
          <>
            <Box
              sx={{
                border: "solid 1px #b3b3b3",
                borderRadius: "3px",
                marginBottom: "2%",
                padding: "10px",
              }}
            >
              <DialogContentText
                key={index}
                id="alert-dialog-slide-description"
              >
                Data da Alteração: {Moment(item.change_date).format("LLL")}
              </DialogContentText>
              <DialogContentText
                key={index}
                id="alert-dialog-slide-description"
              >
                Alterado Dê:{" "}
                <Stack direction="row" spacing={1}>
                  <Chip
                    size="small"
                    variant="outlined"
                    label={
                      item.log_from === "NONE"
                        ? "Estado Normal"
                        : "Estado de Emergência"
                    }
                    color={item.log_from === "NONE" ? "info" : "error"}
                  />
                </Stack>
              </DialogContentText>
              <DialogContentText
                key={index}
                id="alert-dialog-slide-description"
              >
                Alterado Para:{" "}
                <Stack direction="row" spacing={1}>
                  <Chip
                    size="small"
                    variant="outlined"
                    label={
                      item.log_to === "NONE"
                        ? "Estado Normal"
                        : "Estado de Emergência"
                    }
                    color={item.log_to === "NONE" ? "info" : "error"}
                  />
                </Stack>
              </DialogContentText>
            </Box>
          </>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => closeModal()}>Fechar</Button>
      </DialogActions>
    </Dialog>
  );
}
