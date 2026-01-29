export default (players, onDone) => {
  const content = document.createElement("div");
  content.id = "start-screen";

  const playerForms = document.createElement("div");
  content.appendChild(playerForms);
  playerForms.id = "player-forms";

  const loadPlayerForm = (playerIndex) => {

  }

  playerForms.appendChild(loadPlayerGrid(0, firstPlayerTurn));
  playerForms.appendChild(loadPlayerGrid(1, !firstPlayerTurn));
}