import React, { FC, useEffect, useRef, useState } from 'react';
import { ColorTypes } from '../../enums/ColorTypes';
import { Player } from '../../models/Player';

interface TimerProps {
  playerCurrent: Player | null;
  restart: () => void;
}

const Timer: FC<TimerProps> = ({ playerCurrent, restart }) => {
  const [blackPlayerTime, setBlackPlayerTime] = useState(300);
  const [whitePlayerTime, setWhitePlayerTime] = useState(300);

  const timer = useRef<null | ReturnType<typeof setInterval>>(null);

  const startTimer = () => {
    if (timer.current) {
      clearInterval(timer.current);
    }

    const decrementFunction =
      playerCurrent?.color === ColorTypes.WHITE
        ? decrementWhitePlayerTimer
        : decrementBlackPlayerTimer;

    timer.current = setInterval(decrementFunction, 1000);
  };

  useEffect(startTimer, [playerCurrent]);

  const decrementBlackPlayerTimer = () => {
    setBlackPlayerTime((prev) => prev - 1);
  };
  const decrementWhitePlayerTimer = () => {
    setWhitePlayerTime((prev) => prev - 1);
  };

  const handleRestart = () => {
    setBlackPlayerTime(300);
    setWhitePlayerTime(300);
    restart();
  };

  return (
    <div>
      <div>
        <button onClick={handleRestart}>Restart game</button>
      </div>
      <h2>
        Черные - {blackPlayerTime}
        Белые - {whitePlayerTime}
      </h2>
    </div>
  );
};

export default Timer;
