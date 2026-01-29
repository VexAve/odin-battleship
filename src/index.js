import "./styles.css";
import { Ship, Gameboard, Player } from "./battleship";
import loadNextTurnScreen from "./next-turn-screen";
import loadGameScreen from "./game-screen";
import loadGameOverScreen from "./game-over-screen";

const testGameboard1 = new Gameboard();
const ship1 = new Ship({ x: 0, y: 3 }, 3, false);
testGameboard1.addShip(ship1);
const ship2 = new Ship({ x: 1, y: 0 }, 2, true);
testGameboard1.addShip(ship2);
testGameboard1.placeShipsOnGrid();

const testGameboard2 = new Gameboard();
const ship3 = new Ship({ x: 0, y: 3 }, 3, false);
testGameboard2.addShip(ship3);
const ship4 = new Ship({ x: 1, y: 0 }, 2, true);
testGameboard2.addShip(ship4);
testGameboard2.placeShipsOnGrid();

const testPlayer1 = new Player("Dylan", true);
const testPlayer2 = new Player("Vex", true);

const body = document.querySelector("body");

const switchToNextTurnScreen = (firstPlayerTurn) => {
  body.replaceChildren(
    loadNextTurnScreen([testPlayer1, testPlayer2], firstPlayerTurn, () =>
      switchToGameScreen(firstPlayerTurn),
    ),
  );
};

const switchToGameScreen = (firstPlayerTurn) => {
  body.replaceChildren(
    loadGameScreen(
      [testPlayer1, testPlayer2],
      [testGameboard1, testGameboard2],
      firstPlayerTurn,
      () => switchToNextTurnScreen(!firstPlayerTurn),
      switchToGameOverScreen
    ),
  );
};

const switchToGameOverScreen = (firstPlayerWin) => {
  body.replaceChildren(
    loadGameOverScreen([testPlayer1, testPlayer2], firstPlayerWin, null),
  );
};

// switchToGameOverScreen(true);
switchToNextTurnScreen(true);
