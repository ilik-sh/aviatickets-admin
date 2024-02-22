import { Typography, Button, styled } from "@mui/material";
import { StackProps } from "@mui/material/Stack";
import { TypographyProps } from "@mui/material/Typography";
import { Stack } from "@mui/system";
import { FC } from "react";

interface BtnProps {
  text: string;
  href: string;
}

interface MessageProps {
  btnProps?: BtnProps;
  title: string;
  text?: string
}

const StyledMessage = styled('section')((props) => ({}));
const StyledContainer = styled(Stack)<StackProps>((props) => ({
  alignContent: 'center',
  flexWrap: 'wrap',
  width: '100%'
}));

const StyledContentContainer = styled(Stack)<StackProps>((props) => ({
  rowGap: '12px',
  maxWidth: '700px',
  alignItems: 'center'
}));

const StyledTitle = styled(Typography)<TypographyProps>((props) => ({
  fontSize: '1.8rem',
  fontWeight: 600
}));

const StyledSubtitle = styled(Typography)<TypographyProps>((props) => ({
  color: '#767676',
  fontSize: '1.2rem',
  fontWeight: 500
}));

const Message: FC<MessageProps> = ({ btnProps, title, text }) => {
  return (
    <StyledMessage>
      <StyledContainer>
        <StyledContentContainer>
          <StyledTitle>{title}</StyledTitle>
          {text && <StyledSubtitle>{text}</StyledSubtitle>}
          {btnProps && <Button variant="contained" href={btnProps.href}>{btnProps.text}</Button>}
        </StyledContentContainer>
      </StyledContainer>
    </StyledMessage>
  );
}

export default Message;