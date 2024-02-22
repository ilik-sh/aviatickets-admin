import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { styled } from "@mui/system";

const NotFoundContainer = styled(Container)`
  padding-top: 20vh;
`;

const NotFoundBox = styled(Box)`
  background-color: gray;
  padding: 5rem 2.5rem;
  color: white;

  @media (min-width: 600px) {
    padding: 5rem 5.5rem;
  }

  border-radius: 16px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  text-align: center;
`;

const NotFoundPage = () => {
  return (
    <NotFoundContainer maxWidth="xs">
      <NotFoundBox>
        <Typography variant="h4" mb={1.2}>
          404 Error - Page Not Found
        </Typography>
        <Typography>Something went wrong...</Typography>
      </NotFoundBox>
    </NotFoundContainer>
  );
};

export default NotFoundPage;
