import { Position } from "./types.ts";


export enum BoatType {
  Carrier,
  Battleship,
  Destroyer,
  Submarine,
  PatrolBoat
}
type Ship = {
  type: BoatType;
  startPosition: Position | undefined;
  endPosition: Position | undefined;
  length: number;
};


export enum BattleShipErrors {
  PositionNotValid = 'Positions are not valid',
  InvalidShip = 'Ship is not valid',
  AlreadyUsedShip = 'Ship has already been used',
  ShipOverlaps = 'A ship is already placed in in this position',
}

export enum BattleshipGameStatus {
  Started,
  PlacingShips,
  InProgress,
  Ended
}

export const allShips: Ship[] = [
  {type: BoatType.Carrier, length: 5, startPosition: undefined, endPosition: undefined},
  {type: BoatType.Battleship, length: 4, startPosition: undefined, endPosition: undefined},
  {type: BoatType.Destroyer, length: 3, startPosition: undefined, endPosition: undefined},
  {type: BoatType.Submarine, length: 3, startPosition: undefined, endPosition: undefined},
  {type: BoatType.PatrolBoat, length: 2, startPosition: undefined, endPosition: undefined},
]

export class BattleshipSession {
  id = crypto.randomUUID();
  playerId: string;
  playerBoatInventory = [...allShips];
  aiBoatInventory = [...allShips];
  playerBoard: Ship[] = [];
  aiBoard: Ship[] = [];
  playerMoves = [];
  aiMoves = [];
  status = BattleshipGameStatus.Started;

  constructor(playerId: string) {
    this.playerId = playerId;
  }

  addShipPlayer(positions: Position[]) {
    this.addShip(positions, this.playerBoatInventory, this.playerBoard);
  }
  addShipAI(positions: Position[]) {
    this.addShip(positions, this.aiBoatInventory, this.aiBoard);
  }

  addShip(positions: Position[], inventory: Ship[], board: Ship[]) {
    if(!positions.every(isPositionValid) || arePositionsDiagonal(positions)) throw new Error(BattleShipErrors.PositionNotValid);
    if(!arePositionsLinear(positions)) throw new Error(BattleShipErrors.InvalidShip);
    const selectedShip = this.getShipByLength(positions.length, allShips);
    if (selectedShip === undefined) throw new Error(BattleShipErrors.InvalidShip);
    if (this.getShipByLength(selectedShip.length, inventory) === undefined) throw new Error(BattleShipErrors.AlreadyUsedShip);
    const startPosition = positions[0];
    const endPosition = positions[positions.length - 1]
    if (this.checkOverlap(startPosition, endPosition, board)) throw new Error(BattleShipErrors.ShipOverlaps);
    const ship = inventory.splice(inventory.findIndex(s => s.length === selectedShip.length),1)[0];
    ship.startPosition = startPosition;
    ship.endPosition = endPosition;
    board.push(ship);
  }


  getShipByLength(length: number, inventory: Ship[]) {
    // TODO: make this vector math! check length (distance?) of vector.
    return inventory.find(s => s.length === length);
  }

  checkOverlap(startPosition: Position, endPosition: Position, board: Ship[]) {
    if (board.length === 0) return false;
    return board.some(s => doPositionLinesIntersect(startPosition, endPosition, s.startPosition ?? {x: 0, y: 0}, s.endPosition ?? {x: 0, y: 0}))
  }

}

function arePositionsDiagonal(positions: Position[]) {
  return positions.every((p) => p.x === p.y)
}

function arePositionsLinear(positions: Position[]) {
  let linear = true;
  const firstX = positions[0].x;
  const firstY = positions[0].y;

  for (let i = 0; i < positions.length; i++) {
    if (i > 0) {
      const point = positions[i];
      if (point.x !== firstX && point.y !== firstY) linear = false;
    }
  }
   return linear;
}

function isPositionValid(position: Position): boolean  {
  return position.x >= 1 && position.y >= 1 && position.x <= 10 && position.y <= 10;
}


// see https://stackoverflow.com/questions/563198/how-do-you-detect-where-two-line-segments-intersect
function doPositionLinesIntersect(positionAStart: Position, positionAEnd: Position, positionBStart: Position, positionBEnd: Position)
{
  const p0x = positionAStart.x;
  const p0y = positionAStart.y;
  const p1x = positionAEnd.x;
  const p1y = positionAEnd.y;
  const p2x = positionBStart.x;
  const p2y = positionBStart.y;
  const p3x = positionBEnd.x;
  const p3y = positionBEnd.y;
  
  const s10x = p1x - p0x;
  const s10y = p1y - p0y;
  const s32x = p3x - p2x;
  const s32y = p3y - p2y;

  const denom = s10x * s32y - s32x * s10y;
  if (denom === 0) return false;
  const denomPositive = denom > 0;

  const s02x = p0x - p2x;
  const s02y = p0y - p2y;
  const sNumer = s10x * s02y - s10y * s02x;
  if (sNumer < 0 === denomPositive) {
    return false;
  }

  const tNumer = s32x * s02y - s32y * s02x;
  if (tNumer < 0 === denomPositive) {
    return false;
  }

  if ((sNumer > denom) === denomPositive || (tNumer > denom) === denomPositive){
    return false;
  }
  return true; 
}