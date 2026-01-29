export default (players, gameboards, firstPlayerTurn, onNextTurn, onGameOver) => {
  const content = document.createElement("div");
  content.id = "game-screen";

  const playerGrids = document.createElement("div");
  content.appendChild(playerGrids);
  playerGrids.id = "player-grids";

  const loadPlayerGrid = (currentPlayerIndex, currentTurn) => {
    const content = document.createElement("div");
    content.className = `player-grid${currentTurn ? "" : " show-hover"}`;

    const playerName = document.createElement("h2");
    content.appendChild(playerName);
    playerName.textContent = `${players[currentPlayerIndex].name}${currentTurn ? " (You)" : ""}`;

    const grid = document.createElement("div");
    content.appendChild(grid);
    grid.className = "grid";

    const displayGrid = () => {
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          cells[i][j].className =
            gameboards[currentPlayerIndex].grid[i][j].shipIndex === -1
              ? "cell " + gameboards[currentPlayerIndex].grid[i][j].status
              : currentTurn
                ? "cell show-ship"
                : "cell none";
          if (gameboards[currentPlayerIndex].grid[i][j].status === "hit") {
            cells[i][j].className = "cell hit";
            cells[i][j].textContent = "✖";
            if (
              gameboards[currentPlayerIndex].placedShips[
                gameboards[currentPlayerIndex].grid[i][j].shipIndex
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
            if (content.classList.contains("show-hover")) {
              try {
                if (
                  !gameboards[currentPlayerIndex].receiveAttack({ x: i, y: j })
                ) {
                  content.classList.remove("show-hover");
                  setTimeout(onNextTurn, 1000);
                } else if (gameboards[currentPlayerIndex].allShipsSunk()) {
                  content.classList.remove("show-hover");
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

    return content;
  };

  playerGrids.appendChild(loadPlayerGrid(0, firstPlayerTurn));
  playerGrids.appendChild(loadPlayerGrid(1, !firstPlayerTurn));

  return content;
};
