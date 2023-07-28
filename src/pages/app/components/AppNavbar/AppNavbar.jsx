import React, { useContext, useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import LoginIcon from "@mui/icons-material/Login";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import AppBar from "@mui/material/AppBar";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import FaceIcon from "@mui/icons-material/Face";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import Theme from "../../../../style/theme";
import { AuthContext } from "../../../../context/auth";
import { useNavigate } from "react-router-dom";
import { ThirtyFpsSelectOutlined } from "@mui/icons-material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function AppNavbar({ filterData, deviceData }) {
  const [currentPath, setCurrentPath] = useState([]);
  const [navigationIcon, setNavigationIcon] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const theme = useTheme();
  const xlMQuery = useMediaQuery(theme.breakpoints.down("sm"));
  const mdMQuery = useMediaQuery(theme.breakpoints.down("md"));

  // --------------- Logout Function
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
  };

  // --------------- Navigation
  useEffect(() => {
    const currentRoute = window.location.pathname;
    const currentIcon = currentRoute.includes("dashboard") ? (
      <HomeIcon />
    ) : (
      <DashboardIcon />
    );

    setCurrentPath(currentRoute);
    setNavigationIcon(currentIcon);
  }, []);

  const handleNavigateTo = () => {
    if (currentPath != null) {
      if (currentPath === "/app/dashboard") {
        navigate("/app");
      } else if (currentPath === "/app") {
        navigate("/app/dashboard");
      }
    } else {
      console.log("Erro ao resolver rotas !!");
      logout();
    }
  };

  // --------------- Cards filter by Name
  const handleChange = (e) => {
    const query = e.target.value;
    const data = deviceData.filter((device) => {
      if (query === "") return device;
      return device.device_name.toLowerCase().includes(query.toLowerCase());
    });
    filterData(data);
  };

  const renderUserChip = () => {
    if (xlMQuery) {
      return;
    } else if (mdMQuery) {
      return;
    } else {
      return (
        <Chip
          color="info"
          sx={{ marginRight: "1.5%" }}
          icon={<FaceIcon />}
          label={JSON.parse(localStorage.getItem("user")).email}
        />
      );
    }
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <AppBar position="static" sx={{ background: Theme.secondaryGradient }}>
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              SCAE - Sistema de Comunicação para Area da Enfermagem
            </Typography>
            {renderUserChip()}
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={() => handleNavigateTo()}
            >
              {navigationIcon}
            </IconButton>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={() => handleLogout()}
            >
              <LoginIcon />
            </IconButton>
            <Search
              sx={{
                display: currentPath.includes("dashboard") ? "none" : "block",
              }}
            >
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onChange={handleChange}
              />
            </Search>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
