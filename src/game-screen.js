export default (
  players,
  gameboards,
  firstPlayerTurn,
  onNextTurn,
  onGameOver,
) => {
  const content = document.createElement("div");
  content.id = "game-screen";

  const loadPlayerBoard = (playerIndex, currentTurn) => {
    const playerBoard = document.createElement("div");
    playerBoard.className = `player-board${currentTurn ? "" : " show-hover"}`;

    const playerName = document.createElement("h2");
    playerBoard.appendChild(playerName);
    playerName.textContent = `${players[playerIndex].name}${currentTurn ? " (You)" : ""}`;

    const grid = document.createElement("div");
    playerBoard.appendChild(grid);
    grid.className = "grid";

    const displayGrid = () => {
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          cells[i][j].className =
            gameboards[playerIndex].grid[i][j].shipIndex === -1
              ? "cell " + gameboards[playerIndex].grid[i][j].status
              : currentTurn
                ? "cell show-ship"
                : "cell none";
          if (gameboards[playerIndex].grid[i][j].status === "hit") {
            cells[i][j].className = "cell hit";
            cells[i][j].textContent = "✖";
            if (
              gameboards[playerIndex].placedShips[
                gameboards[playerIndex].grid[i][j].shipIndex
              ].isSunk()
            ) {
              cells[i][j].classList.add("sunk");
            }
          }
        }
      }
    };

    const cells = [];
    for (let i = 0; i < 10; i++) {
      cells.push([]);
      for (let j = 0; j < 10; j++) {
        cells[i].push(document.createElement("div"));
        grid.appendChild(cells[i][j]);
        cells[i][j].className = "cell";
        cells[i][j].textContent = "•";

        if (!currentTurn) {
          cells[i][j].addEventListener("click", () => {
            if (playerBoard.classList.contains("show-hover")) {
              try {
                if (!gameboards[playerIndex].receiveAttack({ x: i, y: j })) {
                  playerBoard.classList.remove("show-hover");
                  setTimeout(onNextTurn, 1000);
                } else if (gameboards[playerIndex].allShipsSunk()) {
                  playerBoard.classList.remove("show-hover");
                  setTimeout(() => onGameOver(!currentTurn), 1000);
                }
                displayGrid();
              } catch {
                // Invalid cell target.
              }
            }
          });
        }
      }
    }

    displayGrid();

    return playerBoard;
  };

  content.appendChild(loadPlayerBoard(0, firstPlayerTurn));
  content.appendChild(loadPlayerBoard(1, !firstPlayerTurn));

  return content;
};
