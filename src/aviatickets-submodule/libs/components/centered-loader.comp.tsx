import { Stack, CircularProgress } from "@mui/material";
import { FC } from "react";

const CenteredLoader: FC = () => {
  return (
    <Stack alignContent="center" flexWrap="wrap">
      <CircularProgress />
    </Stack>
  );
}


export default CenteredLoader;