import { Container, SxProps } from "@mui/material";
import { FC, ReactElement } from "react";

interface LayoutProps {
  children: ReactElement;
  sx?: SxProps;
}

const Layout: FC<LayoutProps> = ({ children, sx }) => {
  const defaultSx = { px: "48px", py: "32px" };

  return (
    <Container sx={{ ...defaultSx, ...sx }} maxWidth={"xl"}>
      {children}
    </Container>
  );
};

export default Layout;
