export default (players, gameboards, onDone) => {
  const content = document.createElement("div");
  content.id = "put-ships-screen";

  // Put tabs here.
  
  const loadPlayerBoard = (playerIndex) => {
    const playerBoard = document.createElement("div");

    const grid = document.createElement("div");
    playerBoard.appendChild(grid);
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

    return playerBoard;
  }

  content.appendChild(loadPlayerBoard(0));

  return content;
};
