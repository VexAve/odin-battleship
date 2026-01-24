import "./styles.css";
import { Ship, Gameboard, Player } from "./battleship";
import loadGameScreen from "./game-screen";

const testGameboard = new Gameboard();
const ship1 = new Ship({ x: 0, y: 3 }, 3, false);
testGameboard.addShip(ship1);
const ship2 = new Ship({ x: 1, y: 0 }, 2, true);
testGameboard.addShip(ship2);
testGameboard.placeShipsOnGrid();
testGameboard.receiveAttack({ x: 3, y: 0 }); // miss
testGameboard.receiveAttack({ x: 1, y: 3 }); // hit
testGameboard.receiveAttack({ x: 1, y: 0 }); // hit
testGameboard.receiveAttack({ x: 1, y: 1 }); // fatal hit

const body = document.querySelector("body");
body.replaceChildren(loadGameScreen(null, [testGameboard]));
