import { React, useState, useEffect } from "react";
import DataTable from "../../content/DataTable";
import { toast } from "react-hot-toast";

function DataGrid() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const promisse = fetch(process.env.REACT_APP_API_DEVICE_LOGS)
      .then((response) => response.json())
      .then((json) => setData(json.sort((a, b) => a.log_id - b.log_id)))
      .catch((error) => console.log(error));

    toast.promise(promisse, {
      loading: "Buscando dados...",
      success: "Concluido !",
      error: "Erro ao buscar dados.",
    });
  }, []);

  return (
    <div style={{ width: "100%" }}>
      {data && data.length > 0 && <DataTable Data={data} />}
    </div>
  );
}

export default DataGrid;
