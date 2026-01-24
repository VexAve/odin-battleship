const loadPlayerGrid = (gameboard) => {
  const content = document.createElement("div");

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

      if (gameboard.grid[i][j].shipIndex !== -1) {
        cells[i][j].style.backgroundColor = "lightblue";
      }
    }
  }

  return content;
};

export default (players, gameboards) => {
  const content = document.createElement("div");
  content.id = "game-screen";

  content.appendChild(loadPlayerGrid(gameboards[0]));

  return content;
};
