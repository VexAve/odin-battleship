const displayGrid = (gameboard, cells, showShips) => {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      cells[i][j].className =
        gameboard.grid[i][j].shipIndex === -1
          ? "cell " + gameboard.grid[i][j].status
          : showShips
            ? "cell show-ship"
            : "cell none";
      if (gameboard.grid[i][j].status === "hit") {
        cells[i][j].className = "cell hit";
        cells[i][j].textContent = "✖";
        if (gameboard.placedShips[gameboard.grid[i][j].shipIndex].isSunk()) {
          cells[i][j].classList.add("sunk");
        }
      }
    }
  }
};

const loadPlayerGrid = (player, gameboard, currentTurn, onNextTurn) => {
  const content = document.createElement("div");
  content.className = `player-grid${currentTurn ? "" : " show-hover"}`;

  const playerName = document.createElement("h2");
  content.appendChild(playerName);
  playerName.textContent = `${player.name}${currentTurn ? " (You)" : ""}`;

  const grid = document.createElement("div");
  content.appendChild(grid);
  grid.className = "grid";

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
          try {
            if (!gameboard.receiveAttack({ x: i, y: j })) {
              content.classList.remove("show-hover");
              setTimeout(onNextTurn, 1000);
            }
            displayGrid(gameboard, cells, false);
          } catch {
            // Invalid cell target.
          };
        });
      }
    }
  }

  displayGrid(gameboard, cells, currentTurn);

  return content;
};

export default (players, gameboards, firstPlayerTurn, onNextTurn) => {
  const content = document.createElement("div");
  content.id = "game-screen";

  const playerGrids = document.createElement("div");
  content.appendChild(playerGrids);
  playerGrids.id = "player-grids";

  playerGrids.appendChild(
    loadPlayerGrid(players[0], gameboards[0], firstPlayerTurn, onNextTurn),
  );
  playerGrids.appendChild(
    loadPlayerGrid(players[1], gameboards[1], !firstPlayerTurn, onNextTurn),
  );

  return content;
};
