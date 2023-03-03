export type Position = {
  x: number;
  y: number;
};

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
    const selectedShip = this.getShipByLength(positions.length, allShips);
    if (selectedShip === undefined) throw new Error(BattleShipErrors.InvalidShip);
    if (this.getShipByLength(selectedShip.length, inventory) === undefined) throw new Error(BattleShipErrors.AlreadyUsedShip);
    if (this.checkOverlap(selectedShip, board)) throw new Error(BattleShipErrors.ShipOverlaps);
    const ship = inventory.splice(inventory.findIndex(s => s.length === selectedShip.length),1)[0];
    ship.startPosition = positions[0];
    ship.endPosition = positions[1];
    board.push(ship);
  }

  getShipByLength(length: number, inventory: Ship[]) {
    // TODO: make this vector math! check length (distance?) of vector.
    return inventory.find(s => s.length === length);
  }

  checkOverlap(ship: Ship, board: Ship[]) {
    // TODO: check if ship vector intersects with any other board vector 
    return false;
  }

}

function arePositionsDiagonal(positions: Position[]) {
  return (positions.every((p) => p.x === p.y))
}

function isPositionValid(position: Position): boolean  {
  return position.x >= 1 && position.y >= 1 && position.x <= 10 && position.y <= 10;
}