import React, { useState, useContext } from "react";
import Theme from "../../style/theme";
import { Box, Grid, TextField } from "@mui/material";
import { Typography } from "@mui/material";
import { FormControl, InputLabel, Input, FormHelperText } from "@mui/material";
import { ButtonGroup, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Logo from "../../assets/SCAE_logo_NoBg.png";
import LogoSvg from "../../assets/Logo_Svg_Ok.svg";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { authenticated, login } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  const theme = useTheme();
  const xlMQuery = useMediaQuery(theme.breakpoints.down("sm"));
  const mdMQuery = useMediaQuery(theme.breakpoints.down("md"));

  const renderDefault = () => {
    return (
      <div
        style={{
          background: Theme.primaryGradient,
          padding: "2%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid
          item
          xs={10}
          style={{
            borderRadius: "3px",
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            flexDirection: "row",
            padding: "1%",
            height: "80%",
            width: "100%",
          }}
        >
          <form
            style={{
              background: Theme.secondaryGradient,
              padding: "2%",
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              flexDirection: "column",
              width: xlMQuery ? "100%" : mdMQuery ? "100%" : "50%",
            }}
            onSubmit={handleSubmit}
          >
            <div
              style={{
                width: "100%",
                height: "50%",
                display: xlMQuery ? "none" : mdMQuery ? "none" : "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                background: Theme.primaryGradient,
                borderRadius: "3px",
              }}
            >
              <img src={Logo} />
            </div>
            <br />
            <FormControl>
              <TextField
                type="email"
                label="Email addres"
                htmlFor="my-input-email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <br />
            <FormControl>
              <TextField
                id="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <br />
            <Button
              style={{ background: Theme.primaryGradient }}
              type="submit"
              variant="contained"
              endIcon={<SendIcon />}
            >
              Login
            </Button>
            <br />
            <Button
              variant="contained"
              endIcon={<ArrowBackIcon />}
              style={{ background: Theme.primaryGradient }}
            >
              Voltar
            </Button>
          </form>
        </Grid>
      </div>
    );
  };

  const renderMobile = () => {
    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "end",
          justifyContent: "center",
          justifyItems: "end",
        }}
      >
        <Grid
          item
          xs={10}
          style={{
            borderRadius: "3px",
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            flexDirection: "row",
            height: "100%",
            width: "100%",
          }}
        >
          <form
            style={{
              background: Theme.secondaryGradient,
              padding: "2%",
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              flexDirection: "column",
              width: xlMQuery ? "100%" : mdMQuery ? "100%" : "50%",
            }}
            onSubmit={handleSubmit}
          >
            <div
              style={{
                width: "100%",
                height: "25%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img src={LogoSvg} />
            </div>
            <br />
            <FormControl>
              <TextField
                type="email"
                label="Email addres"
                htmlFor="my-input-email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <br />
            <FormControl>
              <TextField
                id="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <br />
            <Button
              style={{ background: Theme.primaryGradient }}
              type="submit"
              variant="contained"
              endIcon={<SendIcon />}
            >
              Login
            </Button>
            <br />
            <Button
              variant="contained"
              endIcon={<ArrowBackIcon />}
              style={{ background: Theme.primaryGradient }}
            >
              Voltar
            </Button>
          </form>
        </Grid>
      </div>
    );
  };

  const getStandarts = () => {
    if (xlMQuery) {
      console.log("Small = true ? : ", xlMQuery);
      return renderMobile();
    } else if (mdMQuery) {
      console.log("Medium = true ? : ", mdMQuery);
      return renderMobile();
    } else {
      console.log("Standart Rendering !");
      return renderDefault();
    }
  };

  return getStandarts();
}
