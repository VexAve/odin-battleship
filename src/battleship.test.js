import { isCellTouching, Ship, Gameboard } from "./battleship";

test("isCellTouching(position1, position2)", () => {
  expect(isCellTouching({ x: 0, y: 0 }, { x: 0, y: 0 })).toBe(true);
  expect(isCellTouching({ x: 0, y: 0 }, { x: 1, y: 1 })).toBe(true);
  expect(isCellTouching({ x: 0, y: 0 }, { x: 1, y: 2 })).toBe(false);
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

    test("attempt ships too close to each other", () => {
      const ship1 = new Ship({ x: 1, y: 3 }, 2, false);
      expect(() => gameboard.addShip(ship1)).toThrow(
        "Ships can't touch each other..",
      );

      const ship2 = new Ship({ x: 4, y: 3 }, 2, true);
      expect(() => gameboard.addShip(ship2)).toThrow(
        "Ships can't touch each other..",
      );
    });

    // Ship must be within bounds.
  });
});
