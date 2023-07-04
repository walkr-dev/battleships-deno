type Empty = undefined;
type Ship = string;
type Hit = true;
type Miss = false;

type Tile = Empty | Ship | Hit | Miss;

const emptyBoard: Tile[][] = [
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
];

export class Board {
    tiles: Tile[][] = emptyBoard;

    setTile(x: number, y: number, data: Tile) {
        this.tiles[y][x] = data;
    }

    getTile(x: number, y: number) {
        return this.tiles[y][x];
    }
}
// player 1 ship board
// positions of all p1 ships + p2 hits
// player 1 hit board
// p1 fire positions + p1 hit positions

// tile state
// either HIT, MISS, EMPTY or SHIP.