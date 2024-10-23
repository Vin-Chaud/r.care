import { Fonts, Purples } from "@/design_components/design_system";
import { pageWidthStyles } from "@/design_components/PageLayout";
import { useEffect, useState } from "react";
import styled from "styled-components";

const expirySeconds = 15 * 60;

export function Timer() {
  const [time, setTime] = useState(expirySeconds);
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        const next = prev - 1;
        return next < 0 ? expirySeconds : next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <TimerLayout>
      <div>
        {"⌛ The offer expires in"}
        <strong>{formatTime(time)}</strong>
      </div>
    </TimerLayout>
  );
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

const TimerLayout = styled.section`
  position: relative;
  width: 100%;
  height: 50px;
  background-color: ${Purples.PurpleF9};

  display: flex;
  justify-content: center;
  align-items: center;

  ${Fonts.Montserrat}
  font-size: 12px;
  font-weight: 600;

  strong {
    font-size: 17px;
    font-weight: 700;
    margin-inline: 0.5em;
  }
`;
