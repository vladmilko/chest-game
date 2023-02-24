import React, { useEffect, useState } from 'react';
import BoardComponent from './components/Board';
import LostFigures from './components/LostFigures';
import Timer from './components/Timer';
import { ColorTypes } from './enums/ColorTypes';
import { Board } from './models/Board';
import { Player } from './models/Player';
import './styles.less';

const App = () => {
  const [board, setBoard] = useState(() => new Board());

  const [playerWhite] = useState(() => new Player(ColorTypes.WHITE));
  const [playerBlack] = useState(() => new Player(ColorTypes.BLACK));
  const [playerCurrent, setPlayerCurrent] = useState<Player | null>(null);

  useEffect(() => {
    restart();
    setPlayerCurrent(playerWhite);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const restart = () => {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
  };

  const swapPlayer = () => {
    setPlayerCurrent((prevPlayer) =>
      prevPlayer?.color === ColorTypes.BLACK ? playerWhite : playerBlack,
    );
  };

  return (
    <div className="app">
      <Timer playerCurrent={playerCurrent} restart={restart} />
      <BoardComponent
        board={board}
        setBoard={setBoard}
        playerCurrent={playerCurrent}
        swapPlayer={swapPlayer}
      />
      <div>
        <LostFigures title="Черный фигуры" figures={board.lostBlackFigures} />
        <LostFigures title="Белые фигуры" figures={board.lostWhiteFigures} />
      </div>
    </div>
  );
};

export default App;
