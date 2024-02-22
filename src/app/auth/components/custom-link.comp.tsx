import React, { FC } from "react";
import { Link, styled } from "@mui/material";

interface CustomLinkProps {
  text: string;
  onClick: React.MouseEventHandler;
}

const StyledLink = styled(Link)({
  cursor: "pointer",
});

const CustomLink: FC<CustomLinkProps> = ({ text, onClick }) => {
  return (
    <div onClick={onClick}>
      <StyledLink>{text}</StyledLink>
    </div>
  );
};

export default CustomLink;
