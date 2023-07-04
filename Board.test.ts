import { assertEquals } from "https://deno.land/std@0.77.0/testing/asserts.ts";
import { Board } from "./Board.ts";

Deno.test('Empty board, getTile returns correctly', () => {
    const board = new Board();
    assertEquals(board.getTile(0,0), undefined);
});

Deno.test('Add something to board, getTile returns correctly', () => {
    const board = new Board();
    board.setTile(5,5, 'Submarine');
    assertEquals(board.getTile(5,5), 'Submarine');
});