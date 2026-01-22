import { Ship, Gameboard, Player } from "./battleship";

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

  
});
