const isCellTouching = (position1, position2) => {
  return (
    Math.abs(position1.x - position2.x) <= 1 &&
    Math.abs(position1.y - position2.y) <= 1
  );
};

const isCellOutOfBounds = (position) => {
  return position.x < 0 || position.x > 9 || position.y < 0 || position.y > 9;
};

class Ship {
  #hits = 0;

  constructor(startPosition, length, vertical) {
    this.startPosition = startPosition;
    this.length = length;
    this.vertical = vertical;
    this.endPosition = {
      x: startPosition.x + (vertical ? 0 : length - 1),
      y: startPosition.y + (vertical ? length - 1 : 0),
    };
  }

  hit() {
    this.#hits++;
  }

  isSunk() {
    return this.#hits >= this.length;
  }

  isTouching(ship) {
    return (
      isCellTouching(this.startPosition, ship.startPosition) ||
      isCellTouching(this.endPosition, ship.startPosition) ||
      isCellTouching(this.startPosition, ship.endPosition) ||
      isCellTouching(this.endPosition, ship.endPosition)
    );
  }

  isOutOfBounds() {
    return (
      isCellOutOfBounds(this.startPosition) ||
      isCellOutOfBounds(this.endPosition)
    );
  }
}

class Gameboard {
  constructor() {
    this.unplacedShips = [null, 4, 3, 2, 1];
    this.placedShips = [];
    this.grid = Array.from({ length: 10 }, () =>
      Array.from({ length: 10 }, () => ({
        shipIndex: -1,
        status: "none",
      })),
    );
  }

  addShip(ship) {
    if (ship.length < 1 || ship.length > 4) {
      throw new Error("Ship length must be between 1 and 4.");
    } else if (this.unplacedShips[ship.length] <= 0) {
      throw new Error("Can't place any more ships of that length.");
    } else if (ship.isOutOfBounds()) {
      throw new Error("Ship must be within bounds.");
    } else if (this.placedShips.some((current) => ship.isTouching(current))) {
      throw new Error("Ships can't touch each other.");
    } else {
      this.unplacedShips[ship.length]--;
      this.placedShips.push(ship);
    }
  }

  placeShipsOnGrid() {
    for (const [shipIndex, ship] of this.placedShips.entries()) {
      if (ship.vertical) {
        for (let i = ship.startPosition.y; i <= ship.endPosition.y; i++) {
          this.grid[ship.startPosition.x][i].shipIndex = shipIndex;
        }
      } else {
        for (let i = ship.startPosition.x; i <= ship.endPosition.x; i++) {
          this.grid[i][ship.startPosition.y].shipIndex = shipIndex;
        }
      }
    }
  }
}

export { isCellTouching, isCellOutOfBounds, Ship, Gameboard };
