import rotateImage from "./assets/rotate-left.svg";

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

  const loadShipGenerator = (playerIndex, length) => {
    const shipGenerator = document.createElement("div");
    shipGenerator.className = "ship-generator";

    const shipCount = document.createElement("span");
    shipGenerator.appendChild(shipCount);
    shipCount.textContent = gameboards[playerIndex].unplacedShips[length];

    const rotateButton = document.createElement("button");
    shipGenerator.appendChild(rotateButton);
    const rotateButtonImage = document.createElement("img");
    rotateButton.appendChild(rotateButtonImage);
    rotateButtonImage.src = rotateImage;

    let vertical = false;

    const createDraggableShip = () => {
      const draggableShip = document.createElement("div");
      draggableShip.className = "ship";
      for (let i = 0; i < length; i++) {
        const shipCell = document.createElement("div");
        shipCell.className = "ship-cell";
        draggableShip.appendChild(shipCell);
      }

      if (!vertical) {
        draggableShip.style.display = "flex";
      }

      let offsetX,
        offsetY,
        boardRect,
        mouseMoved = false;

      const startDragging = (e) => {
        offsetX = parseInt(draggableShip.style.left || 0) - e.clientX;
        offsetY = parseInt(draggableShip.style.top || 0) - e.clientY;

        boardRect = playerBoard.getBoundingClientRect();

        e.stopPropagation();
        document.addEventListener("mousemove", dragMouseMove);
        document.addEventListener("mousedown", stopDragging);
      };

      draggableShip.addEventListener("mousedown", startDragging, {
        once: true,
      });

      const dragMouseMove = (e) => {
        if (!mouseMoved) {
          document.addEventListener("mouseup", stopDragging);
          mouseMoved = true;
        }

        draggableShip.style.left =
          clamp(
            e.clientX + offsetX,
            0,
            window.innerWidth - draggableShip.offsetWidth,
          ) + "px";
        draggableShip.style.top =
          clamp(
            e.clientY + offsetY,
            0,
            window.innerHeight - draggableShip.offsetHeight,
          ) + "px";

        if (
          e.clientX + offsetX >= boardRect.left - 25 &&
          e.clientX + offsetX <=
            boardRect.left + 525 - (vertical ? 1 : length) * 50 &&
          e.clientY + offsetY >= boardRect.top - 25 &&
          e.clientY + offsetY <=
            boardRect.top + 525 - (vertical ? length : 1) * 50
        ) {
          draggableShip.style.left =
            Math.round((e.clientX + offsetX - boardRect.left) / 50) * 50 +
            boardRect.left +
            "px";
          draggableShip.style.top =
            Math.round((e.clientY + offsetY - boardRect.top) / 50) * 50 +
            boardRect.top +
            "px";
        }
      };

      const stopDragging = () => {
        mouseMoved = false;
        document.removeEventListener("mousemove", dragMouseMove);
        document.removeEventListener("mousedown", stopDragging);
        document.removeEventListener("mouseup", stopDragging);
        draggableShip.addEventListener("mousedown", startDragging, {
          once: true,
        });
      };

      return draggableShip;
    };

    content.appendChild(createDraggableShip(4, false));

    return shipGenerator;
  };

  content.appendChild(loadShipGenerator(0, 4));

  return content;
};
