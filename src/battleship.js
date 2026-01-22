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

export { Ship }