import styled from "@emotion/styled";
import dayjs from "dayjs";
import { FC } from "react";

interface JourneySpotProps {
  time: number;
  city: string;
}

const StyledJourneySpot = styled('div')((props) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  columnGap: '20px',
}));

const StyledTime = styled('div')((props) => ({
  fontSize: '24px',
}));

const StyledDate = styled('div')((props) => ({
  fontSize: '18px',
}));

const StyledCity = styled('div')((props) => ({
  fontSize: '18px',
  color: 'gray'
}));

const JourneySpot: FC<JourneySpotProps> = ({ time, city }) => {
  const date = dayjs(time);
  return (
    <StyledJourneySpot>
      <StyledTime>{date.format('LT')}</StyledTime>
      <StyledDate>{date.format('dddd, MMMM D')}</StyledDate>
      <StyledCity>{city}</StyledCity>
    </StyledJourneySpot>
  );
}

export default JourneySpot;