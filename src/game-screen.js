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

      if (gameboard.grid[i][j].shipIndex === -1) {
        if (gameboard.grid[i][j].status === "miss") {
          cells[i][j].style.backgroundColor = "lightgrey";
          cells[i][j].textContent = "•";
          cells[i][j].style.color = "darkgrey";
        } else if (gameboard.grid[i][j].status === "flag") {
          cells[i][j].style.backgroundColor = "darkgrey";
          cells[i][j].textContent = "•";
          cells[i][j].style.color = "grey";
        }
      } else {
        cells[i][j].style.backgroundColor = "lightblue";
        if (gameboard.grid[i][j].status === "hit") {
          cells[i][j].style.backgroundColor = "pink";
          cells[i][j].textContent = "✖";
          cells[i][j].style.color = "red";
        }
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
