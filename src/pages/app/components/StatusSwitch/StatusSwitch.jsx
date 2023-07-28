import * as React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export default function StatusSwitch({ status }) {
  const Message = status === "NONE" ? "Normal" : "Emergência";
  const Severity = status === "NONE" ? "info" : "error";

  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert variant="filled" severity={Severity}>
        {Message}
      </Alert>
    </Stack>
  );
}
