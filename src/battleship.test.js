import {
  isCellTouching,
  isCellOutOfBounds,
  Ship,
  Gameboard,
} from "./battleship";

test("isCellTouching(position1, position2)", () => {
  expect(isCellTouching({ x: 0, y: 0 }, { x: 0, y: 0 })).toBe(true);
  expect(isCellTouching({ x: 0, y: 0 }, { x: 1, y: 1 })).toBe(true);
  expect(isCellTouching({ x: 0, y: 0 }, { x: 1, y: 2 })).toBe(false);
});

test("isCellOutOfBounds(position)", () => {
  expect(isCellOutOfBounds({ x: 0, y: 10 })).toBe(true);
  expect(isCellOutOfBounds({ x: -1, y: 0 })).toBe(true);
  expect(isCellOutOfBounds({ x: 0, y: 0 })).toBe(false);
});

describe("Ship class", () => {
  test("new Ship(startPosition, length, vertical)", () => {
    const ship1 = new Ship({ x: 1, y: 2 }, 4, true);
    expect(ship1.startPosition).toEqual({ x: 1, y: 2 });
    expect(ship1.length).toBe(4);
    expect(ship1.vertical).toBe(true);
    expect(ship1.endPosition).toEqual({ x: 1, y: 5 });

    const ship2 = new Ship({ x: 4, y: 3 }, 2, false);
    expect(ship2.startPosition).toEqual({ x: 4, y: 3 });
    expect(ship2.length).toBe(2);
    expect(ship2.vertical).toBe(false);
    expect(ship2.endPosition).toEqual({ x: 5, y: 3 });
  });

  test("hit() and isSunk()", () => {
    const ship = new Ship({ x: 1, y: 2 }, 2, true);
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });

  test("isTouching(ship)", () => {
    const ship1 = new Ship({ x: 0, y: 0 }, 3, true);
    const ship2 = new Ship({ x: 0, y: 4 }, 3, true);
    const ship3 = new Ship({ x: 0, y: 4 }, 3, true);
    expect(ship1.isTouching(ship2)).toBe(false);
    expect(ship2.isTouching(ship3)).toBe(true);
  });
});

describe("Gameboard class", () => {
  test("new Gameboard()", () => {
    const gameboard = new Gameboard();
    expect(gameboard.unplacedShips).toEqual([null, 4, 3, 2, 1]);
    expect(gameboard.placedShips).toEqual([]);
    expect(gameboard.grid.length).toBe(10);
    expect(gameboard.grid[0].length).toBe(10);
    expect(gameboard.grid[9][9]).toEqual({ shipIndex: -1, status: "none" });
  });

  describe("addShip(ship)", () => {
    const gameboard = new Gameboard();

    test("successful addShip(ship)", () => {
      const ship1 = new Ship({ x: 0, y: 0 }, 3, true);
      gameboard.addShip(ship1);
      expect(gameboard.unplacedShips).toEqual([null, 4, 3, 1, 1]);
      expect(gameboard.placedShips).toEqual([ship1]);

      const ship2 = new Ship({ x: 2, y: 5 }, 4, false);
      gameboard.addShip(ship2);
      expect(gameboard.unplacedShips).toEqual([null, 4, 3, 1, 0]);
      expect(gameboard.placedShips).toEqual([ship1, ship2]);

      const ship3 = new Ship({ x: 0, y: 4 }, 3, true);
      gameboard.addShip(ship3);
      expect(gameboard.unplacedShips).toEqual([null, 4, 3, 0, 0]);
      expect(gameboard.placedShips).toEqual([ship1, ship2, ship3]);
    });

    test("attempt to place ship with invalid length", () => {
      const ship1 = new Ship({ x: 2, y: 2 }, 5, false);
      expect(() => gameboard.addShip(ship1)).toThrow(
        "Ship length must be between 1 and 4.",
      );

      const ship2 = new Ship({ x: 2, y: 2 }, 0, false);
      expect(() => gameboard.addShip(ship2)).toThrow(
        "Ship length must be between 1 and 4.",
      );
    });

    test("attempt to place too many ships of a certain length", () => {
      const ship1 = new Ship({ x: 2, y: 2 }, 4, false);
      expect(() => gameboard.addShip(ship1)).toThrow(
        "Can't place any more ships of that length.",
      );

      const ship2 = new Ship({ x: 2, y: 2 }, 3, false);
      expect(() => gameboard.addShip(ship2)).toThrow(
        "Can't place any more ships of that length.",
      );
    });

    test("attempt to place a ship out of bounds", () => {
      const ship1 = new Ship({ x: -1, y: 3 }, 2, false);
      expect(() => gameboard.addShip(ship1)).toThrow(
        "Ship must be within bounds.",
      );

      const ship2 = new Ship({ x: 7, y: 9 }, 2, true);
      expect(() => gameboard.addShip(ship2)).toThrow(
        "Ship must be within bounds.",
      );
    });

    test("attempt to place ships too close to each other", () => {
      const ship1 = new Ship({ x: 1, y: 3 }, 2, false);
      expect(() => gameboard.addShip(ship1)).toThrow(
        "Ships can't touch each other.",
      );

      const ship2 = new Ship({ x: 4, y: 3 }, 2, true);
      expect(() => gameboard.addShip(ship2)).toThrow(
        "Ships can't touch each other.",
      );
    });
  });

  test("removeShip(ship)", () => {
    const gameboard = new Gameboard();

    const ship1 = new Ship({ x: 0, y: 3 }, 3, false);
    gameboard.addShip(ship1);
    const ship2 = new Ship({ x: 1, y: 0 }, 2, true);
    gameboard.addShip(ship2);
    const ship3 = new Ship({ x: 3, y: 0 }, 1, true);
    gameboard.addShip(ship3);
    gameboard.removeShip(ship2);
    expect(gameboard.placedShips).toEqual([ship1, ship3]);
  });

  test("placeShipsOnGrid()", () => {
    const gameboard = new Gameboard();

    const ship1 = new Ship({ x: 0, y: 3 }, 3, false);
    gameboard.addShip(ship1);
    const ship2 = new Ship({ x: 1, y: 0 }, 2, true);
    gameboard.addShip(ship2);
    gameboard.placeShipsOnGrid();

    expect(gameboard.grid[0][4].shipIndex).toBe(-1);
    expect(gameboard.grid[2][3].shipIndex).toBe(0);
    expect(gameboard.grid[1][1].shipIndex).toBe(1);
  });

  test("flagCells(positions)", () => {
    const gameboard = new Gameboard();
    gameboard.flagCells([
      { x: 4, y: 5 },
      { x: 3, y: 5 },
    ]);

    expect(gameboard.grid[4][5].status).toBe("flag");
    expect(gameboard.grid[3][5].status).toBe("flag");
  });

  describe("receiveAttack(position)", () => {
    const gameboard = new Gameboard();
    const ship = new Ship({ x: 0, y: 3 }, 2, false);
    gameboard.addShip(ship);
    gameboard.placeShipsOnGrid();

    test("attempt to attack out of bounds cell", () => {
      expect(() => gameboard.receiveAttack({ x: -1, y: 0 })).toThrow(
        "Target cell must be within bounds.",
      );
      expect(() => gameboard.receiveAttack({ x: 10, y: 0 })).toThrow(
        "Target cell must be within bounds.",
      );
    });

    test("missed attack", () => {
      gameboard.receiveAttack({ x: 0, y: 4 });
      expect(gameboard.grid[0][4].status).toBe("miss");
      expect(gameboard.grid[0][1].status).toBe("none");
    });

    test("successful attack", () => {
      gameboard.receiveAttack({ x: 1, y: 3 });
      expect(gameboard.grid[1][3].status).toBe("hit");
      expect(gameboard.grid[1][4].status).toBe("none");
      expect(gameboard.grid[2][4].status).toBe("flag");
      expect(gameboard.grid[0][4].status).toBe("miss");
    });

    test("fatal attack", () => {
      expect(ship.isSunk()).toBe(false);
      gameboard.receiveAttack({ x: 0, y: 3 });
      expect(gameboard.grid[2][3].status).toBe("flag");
      expect(ship.isSunk()).toBe(true);
    });
  });

  test("allShipsSunk()", () => {
    const gameboard = new Gameboard();

    const ship1 = new Ship({ x: 0, y: 2 }, 1, false);
    gameboard.addShip(ship1);
    const ship2 = new Ship({ x: 0, y: 0 }, 1, false);
    gameboard.addShip(ship2);
    gameboard.placeShipsOnGrid();

    expect(gameboard.allShipsSunk()).toBe(false);
    gameboard.receiveAttack({ x: 0, y: 2 });
    expect(gameboard.allShipsSunk()).toBe(false);
    gameboard.receiveAttack({ x: 0, y: 0 })
    expect(gameboard.allShipsSunk()).toBe(true);
  });
});
