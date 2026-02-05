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

  const createDraggableShip = (length) => {
    const draggableShip = document.createElement("div");
    draggableShip.className = "ship";
    for (let i = 0; i < length; i++) {
      const shipCell = document.createElement("div");
      shipCell.className = "ship-cell";
      draggableShip.appendChild(shipCell);
    }

    let offsetX, offsetY;

    draggableShip.addEventListener("mousedown", (e) => {
      offsetX = parseInt(draggableShip.style.left || 0) - e.clientX;
      offsetY = parseInt(draggableShip.style.top || 0) - e.clientY;

      document.addEventListener("mousemove", dragMouseMove);
      document.addEventListener("mouseup", dragMouseUp);
    });

    const dragMouseMove = (e) => {
      draggableShip.style.left = clamp(
        e.clientX + offsetX,
        0,
        window.innerWidth - draggableShip.offsetWidth,
      ) + "px";
      draggableShip.style.top = clamp(
        e.clientY + offsetY,
        0,
        window.innerHeight - draggableShip.offsetHeight,
      ) + "px";
    };

    const dragMouseUp = () => {
      document.removeEventListener("mousemove", dragMouseMove);
      document.removeEventListener("mouseup", dragMouseUp);
    };

    return draggableShip;
  };

  content.appendChild(createDraggableShip(4));

  return content;
};
