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
}

export { Ship, Gameboard };
