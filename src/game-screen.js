const loadPlayerGrid = () => {
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
    }
  }

  return content;
};

export default () => {
  const content = document.createElement("div");
  content.id = "game-screen";

  content.appendChild(loadPlayerGrid());

  return content;
};
