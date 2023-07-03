import { Coordinate, Position } from "./types.ts";

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


export function CoordinatesToPositions(coord: Coordinate[]): Position[] {
    return coord.map(c => CoordinateToPosition(c));
}

export function CoordinateToPosition(coord: Coordinate): Position {
    if (!isCoordinateValid(coord)) throw new Error('coordinate is invalid!');
    const y = letterToNumber(coord[0]);
    const x = Number.parseInt(coord.slice(1)) - 1;
    return {x, y};
}

export function isCoordinateValid(coord: Coordinate) {
    if (coord.length < 2 || coord.length > 3 ) return false;
    if (!isInputAValidLetterCoordinate(coord[0])) return false;
    const x = Number.parseInt(coord.slice(1))
    if (x > 10 || x < 0) return false;
    return true;
}

// TODO: yet again, possibly something more elegant, but solves an issue for now...
function isInputAValidLetterCoordinate(input: string) {
    return input.toLowerCase() >= 'a' && input.toLowerCase() < 'k';
}

function letterToNumber(letter: string): number {
    // a === 0, b === 1 etc etc
    // TODO: surely there's something more elegant than a switch - but my brain fails me for now...
    switch (letter.toLowerCase()) {
        case 'a':
            return 0;
        case 'b':
            return 1;
        case 'c':
            return 2;
        case 'd':
            return 3;
        case 'e':
            return 4;
        case 'f':
            return 5;
        case 'g':
            return 6;
        case 'h':
            return 7;
        case 'i':
            return 8;
        case 'j':
            return 9;
        default:
            throw new Error('character invalid!');
    }
}