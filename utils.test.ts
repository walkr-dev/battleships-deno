import { assertEquals, assertThrows } from "https://deno.land/std@0.77.0/testing/asserts.ts";
import { CoordinatesToPositions, CoordinateToPosition } from "./utils.ts";

// 0,0 at A1

// Battleship board for reference
//   1 2 3 4 5 6 7 8 9 10
// A ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
// B ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
// C ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
// D ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
// E ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
// F ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
// G ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
// H ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
// I ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
// J ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

Deno.test('Single coordinate test - expected coords', () => {
    const input = 'G5';
    const position = CoordinateToPosition(input);
    const expectedPosition = {x: 4, y: 6}
    assertEquals(position, expectedPosition);
});

Deno.test('Single coordinate test - all coords', () => {
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    for (let y = 0; y < letters.length; y++) {
        const letter = letters[y];
        for (let x = 0; x < 10; x++) {
            const input = `${letter}${x + 1}`;
            const position = CoordinateToPosition(input);
            const expectedPosition = {x, y}
            assertEquals(position, expectedPosition);
        }
    }
});

Deno.test('Single coordinate test - double digits coord', () => {
    const input = 'C10';
    const position = CoordinateToPosition(input);
    const expectedPosition = {x: 9, y: 2}
    assertEquals(position, expectedPosition);
});

Deno.test('Single coordinate test - out of bounds coords', () => {
    const input = 'Z8';
    assertThrows(() => CoordinateToPosition(input), Error, 'coordinate is invalid!');
});

Deno.test('Single coordinate test - weird characters', () => {
    const input = '108';
    assertThrows(() => CoordinateToPosition(input), Error, 'coordinate is invalid!');
});

Deno.test('Single coordinate test - bad input #1', () => {
    const input = '108';
    assertThrows(() => CoordinateToPosition(input), Error, 'coordinate is invalid!');
});

Deno.test('Single coordinate test - bad input #2', () => {
    const input = 'junk'
    assertThrows(() => CoordinateToPosition(input), Error, 'coordinate is invalid!');
});

Deno.test('Multiple coords - all valid', () => {
    const input = ['A1', 'A2', 'A3'];
    const positions = CoordinatesToPositions(input);
    const expectedPositions = [{x: 0, y:0}, {x: 1, y: 0}, {x: 2, y: 0}];
    assertEquals(positions, expectedPositions);
})

