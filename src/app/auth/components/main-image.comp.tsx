import { Grid, Typography, styled } from "@mui/material";
import React, { FC } from "react";
import loginBg from "assets/loginBg.jpg";

const StyledTypography = styled(Typography)(({ theme }) => ({
  paddingTop: "15vh",
  color: "white",
  fontWeight: "200",
  fontSize: "5rem",

  [theme.breakpoints.down("md")]: {
    color: "transparent",
  },
  [theme.breakpoints.only("xs")]: {
    paddingTop: "2vh",
    color: "white",
    fontSize: "2.5rem",
  },
}));

const StyledGrid = styled(Grid)(({ theme }) => ({
  backgroundImage: `url(${loginBg})`,
  backgroundRepeat: "no-repeat",
  backgroundColor:
    theme.palette.mode === "light"
      ? theme.palette.grey[50]
      : theme.palette.grey[900],
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  width: "100%",
  justifyContent: "center",
}));

const MainImage: FC = () => {
  return (
    <StyledGrid item xs={false} sm={4} md={7}>
      <StyledTypography>AviaTickets</StyledTypography>
    </StyledGrid>
  );
};

export default MainImage;
