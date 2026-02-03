const clamp = (value, min, max) => {
  return Math.min(max, Math.max(min, value));
};

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
  };

  const playerBoard = loadPlayerBoard(0);
  content.appendChild(playerBoard);

  const createshipElement = (length) => {
    const shipElement = document.createElement("div");
    shipElement.className = "ship";
    for (let i = 0; i < length; i++) {
      const shipCell = document.createElement("div");
      shipCell.className = "ship-cell";
      shipElement.appendChild(shipCell);
    }

    const rect = shipElement.getBoundingClientRect();
    let prevMouseX, prevMouseY;

    shipElement.addEventListener("mousedown", (e) => {
      prevMouseX = shipElement.getBoundingClientRect() - e.clientX;
      prevMouseY = e.clientY;

      document.addEventListener("mousemove", dragMouseMove);
      document.addEventListener("mouseup", dragMouseUp);
    });

    const dragMouseMove = (e) => {
      shipElement.style.left = clamp(
        shipElement.offsetLeft + e.clientX - prevMouseX,
        0,
        window.innerWidth - shipElement.offsetWidth,
      );
      shipElement.style.top = clamp(
        shipElement.offsetTop + e.clientY - prevMouseY,
        0,
        window.innerHeight - shipElement.offsetHeight,
      );

      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const dragMouseUp = () => {
      document.removeEventListener("mousemove", dragMouseMove);
      document.removeEventListener("mouseup", dragMouseUp);
    };

    return shipElement;
  };

  content.appendChild(createshipElement(4));

  return content;
};
