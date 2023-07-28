import { useState, useEffect } from "react";
import { Box, Grid, Tab, Tabs, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import DataGrid from "../DataGrid/DataGrid";
import Chart from "../Chart/Chart";

function FunctinoalDashboard() {
    const [tabIndex, setTabIndex] = useState(0);    
    const [chartData, setChartData] = useState({});
    const handleTabChange = (event, newTabIndex) => {
      setTabIndex(newTabIndex);
    };

    const theme = useTheme();
    const xlMQuery = useMediaQuery(theme.breakpoints.down("sm"));
    const mdMQuery = useMediaQuery(theme.breakpoints.down("md"));

    const buildStatusChart = (data) => {
      let result =[];
      let keys = Object.keys(data[0]);
      keys.forEach((element) => {
        result.push({key: element, value:data[0][element]});
      });
      return result;
    };

    const fixAxisYToNumber = (chart, axisXName, axisYName) => {
      return chart.map((item) => ({[axisXName]: item[axisXName], [axisYName]: parseInt(item[axisYName])}));
    }
  
    useEffect(() => {
      fetch(process.env.REACT_APP_API_CHARTS)
      .then((response) => response.json())
      .then((json) => {
        setChartData(json)
      })
      .catch((error) => console.log(error));
    }, []);
    

  return (
    <>
    <Box >
        {/* ----------- Headers */}
      <Box>
      <Tabs
        value={tabIndex}
        variant="scrollable"
        onChange={handleTabChange}
        scrollButtons="auto"
        sx={{ width: "100%" }}
      >
        <Tab label="Log das Atividades" />
        <Tab label="Gráficos" />
        <Tab label="Configurações" />
      </Tabs>
      </Box>

        {/* ----------- Bodys */}
      <Box sx={{ padding: 2, overflow: "hidden" }}>
        {tabIndex === 0 && (
          <Box sx={{display: "flex", height: "100%", width: "100%", overflowX: "scroll"}}>
            <DataGrid />
          </Box>
        )}
        {tabIndex === 1 && (
          <div>
            <Grid container spacing={2} sx={{
            padding: "0 0 0 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: xlMQuery
              ? "center"
              : mdMQuery
              ? "center"
              : "flex-start",
          }}>
              <Chart chart={fixAxisYToNumber(chartData.dataByDevices, "device_id", "changes")} axisX={"device_id"} axisY={"changes"} XLabel={"Id dos Dispositivos"} YLabel={"Qtd. de Mudanças"} chartTitle="Alterações por Dispositivo" />
              <Chart chart={fixAxisYToNumber(chartData.dataByDays, "dia", "changes")} axisX={"dia"} axisY={"changes"} XLabel={"Dias"} YLabel={"Qtd. de Mudanças"} chartTitle="Alterações por Dia" />
              <Chart chart={buildStatusChart(chartData.dataByStatus)} axisX={"key"} axisY={"value"} XLabel={"Indicadores"} YLabel={"Contador"} chartTitle="Resumo Geral de Status" />
            </Grid>
          </div>
        )}
        {tabIndex === 2 && (
          <Box>
            <Typography>Configurações</Typography>
          </Box>
        )}
      </Box>
    </Box>
    
    </>
  );
}

export default FunctinoalDashboard;