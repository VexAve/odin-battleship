import { Ship, Gameboard } from "./battleship";

describe("Ship class", () => {
  test("new Ship(position, length, vertical)", () => {
    const ship1 = new Ship({ x: 1, y: 2 }, 4, true);
    expect(ship1.position).toEqual({ x: 1, y: 2 });
    expect(ship1.length).toBe(4);
    expect(ship1.vertical).toBe(true);

    const ship2 = new Ship({ x: 4, y: 3 }, 2, false);
    expect(ship2.position).toEqual({ x: 4, y: 3 });
    expect(ship2.length).toBe(2);
    expect(ship2.vertical).toBe(false);
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
});