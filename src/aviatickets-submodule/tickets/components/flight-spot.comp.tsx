import { Stack, StackProps, styled } from "@mui/material";
import dayjs from "dayjs";
import { FC } from "react";

interface FlightSpotProps {
  time: number;
  city: string;
}

const StyledFlightSpot = styled('div')((props) => ({
  '@media(max-width: 500px)': {
    width: '100%'
  }
}));

const StyledStackContainer = styled(Stack)<StackProps>((props) => ({
  flexDirection: 'row',
  rowGap: '50px',
  columnGap: '70px',

  '@media(max-width: 500px)': {
    width: '100%'
  }
}));

const StyledStack = styled(Stack)<StackProps>((props) => ({
  flexDirection: 'row',
  columnGap: '20px',
  '@media(max-width: 500px)': {
    flexDirection: "column",
    width: '100%',
    alignItems: 'center'
  }
}));
const StyledTime = styled('div')((props) => ({}));
const StyledDate = styled('div')((props) => ({}));
const StyledCity = styled('div')((props) => ({}));

const FlightSpot: FC<FlightSpotProps> = ({ time, city }) => {
  const date = dayjs(time);
  return (
    <StyledFlightSpot>
      <StyledStackContainer>
        <StyledStack>
          <StyledTime>{date.format('LT')}</StyledTime>
          <StyledDate>{date.format('dddd, MMMM D')}</StyledDate>
          <StyledCity>{city}</StyledCity>
        </StyledStack>
      </StyledStackContainer>
    </StyledFlightSpot>
  );
}

export default FlightSpot;