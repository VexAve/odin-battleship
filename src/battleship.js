class Ship {
  #hits = 0;

  constructor(position, length, vertical) {
    this.position = position;
    this.length = length;
    this.vertical = vertical;
  }

  hit() {
    this.#hits++;
  }

  isSunk() {
    return this.#hits >= this.length;
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
    } else {
      this.unplacedShips[ship.length]--;
      this.placedShips.push(ship);
    }
  }
}

export { Ship, Gameboard };
