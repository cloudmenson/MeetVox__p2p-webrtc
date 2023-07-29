import { useEffect, useState } from "react";

import * as Styles from "./styles";
import { Rec } from "src/assets";

const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const numberFormatWithZero = (n: number) => {
    return n < 10 ? `0${n}` : n;
  };

  const formattedDate = `${numberFormatWithZero(
    currentTime.getDate()
  )}.${numberFormatWithZero(
    currentTime.getMonth() + 1
  )}.${currentTime.getFullYear()}`;
  const formattedTime = `${numberFormatWithZero(
    currentTime.getHours()
  )}:${numberFormatWithZero(currentTime.getMinutes())}`;

  return (
    <Styles.Container>
      <Styles.LinkToMeetVox href="/">
        <Styles.Title>MeetVox</Styles.Title>
        <Styles.Rec src={Rec} alt="Recording image" />
      </Styles.LinkToMeetVox>

      <Styles.FormattedTime>{formattedTime}</Styles.FormattedTime>
      <Styles.FormattedDate>{formattedDate}</Styles.FormattedDate>
    </Styles.Container>
  );
};

export { Header };
