import React, { useEffect } from "react";
import ColumnChart from "./ColumnChart/ColumnChart";
import { Box, Grid, Tab, Tabs, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Theme from "../../../../style/theme";

export default function Chart({
  chart,
  axisX,
  axisY,
  XLabel,
  YLabel,
  chartTitle,
}) {
  const theme = useTheme();
  const xlMQuery = useMediaQuery(theme.breakpoints.down("sm"));
  const mdMQuery = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Grid
      item
      lg={10}
      xs={12}
      md={12}
      sx={{
        overflow: xlMQuery ? "auto" : mdMQuery ? "auto" : "hidden",
        overflowY: "hidden",
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
        width: "100%",
        height: xlMQuery ? "50vh" : mdMQuery ? "50vh" : "50vh",
        border: "solid 1px #eaeaea",
        padding: "25px 25px 25px 25px",
        margin: "5px 5px 5px 5px",
      }}
    >
      <Typography color="#666">{chartTitle}</Typography>
      <br />
      <ColumnChart
        chart={chart}
        axisX={axisX}
        axisY={axisY}
        XLabel={XLabel}
        YLabel={YLabel}
        sizeX={xlMQuery ? 500 : mdMQuery ? 1000 : 1700}
      />
    </Grid>
  );
}
