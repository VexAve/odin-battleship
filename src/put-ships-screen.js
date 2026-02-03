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

  const createDraggableShip = (length) => {
    const shipElement = document.createElement("div");
    shipElement.className = "ship";
    for (let i = 0; i < length; i++) {
      const shipCell = document.createElement("div");
      shipCell.className = "ship-cell";
      shipElement.appendChild(shipCell);
    }

    let prevMouseX, prevMouseY;

    shipElement.addEventListener("mousedown", (e) => {
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      document.addEventListener("mousemove", dragMouseMove);
      document.addEventListener("mouseup", dragMouseUp);
    });

    const dragMouseMove = (e) => {
      shipElement.style.top =
        Math.min(
          window.innerHeight - shipElement.offsetHeight,
          Math.max(0, shipElement.offsetTop + e.clientY - prevMouseY),
        ) + "px";
      shipElement.style.left =
        Math.min(
          window.innerWidth - shipElement.offsetWidth,
          Math.max(0, shipElement.offsetLeft + e.clientX - prevMouseX),
        ) + "px";

      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const dragMouseUp = () => {
      document.removeEventListener("mousemove", dragMouseMove);
      document.removeEventListener("mouseup", dragMouseUp);
    };

    return shipElement;
  };

  content.appendChild(loadPlayerBoard(0));
  content.appendChild(createDraggableShip(4));

  return content;
};
