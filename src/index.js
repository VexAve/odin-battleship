import "./styles.css";
import loadGameScreen from "./game-screen";

const body = document.querySelector("body");
body.replaceChildren(loadGameScreen());