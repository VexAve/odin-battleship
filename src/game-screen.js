const displayGrid = (gameboard, cells) => {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      cells[i][j].className =
        gameboard.grid[i][j].shipIndex > -1
          ? "cell show-ship"
          : "cell " + gameboard.grid[i][j].status;
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

const loadPlayerGrid = (player, gameboard, currentTurn) => {
  const content = document.createElement("div");
  content.className = "player-grid";

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

      if (currentTurn) {
        cells[i][j].addEventListener("click", () => {
          gameboard.receiveAttack({ x: i, y: j });
          displayGrid(gameboard, cells);
        });
      }
    }
  }

  displayGrid(gameboard, cells);

  return content;
};

export default (players, gameboards, firstPlayerTurn) => {
  const content = document.createElement("div");
  content.id = "game-screen";

  const playerGrids = document.createElement("div");
  content.appendChild(playerGrids);
  playerGrids.id = "player-grids";

  playerGrids.appendChild(
    loadPlayerGrid(players[0], gameboards[0], firstPlayerTurn),
  );
  playerGrids.appendChild(
    loadPlayerGrid(players[1], gameboards[1], !firstPlayerTurn),
  );

  return content;
};
