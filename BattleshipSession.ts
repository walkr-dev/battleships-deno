export type Position = {
  x: number;
  y: number;
};
enum BoatType {
  "Carrier",
  "Battleship",
  "Destroyer",
  "Submarine",
  "PatrolBoat"
}
type Ship = {
  type: BoatType;
  startPosition: Position | undefined;
  endPosition: Position | undefined;
  length: number;
};

// boat position can be:
// min: 0, max: 9
// cant be diagonal
// cant overlap another ship
enum HitState {
  "Undiscovered",
  "Hit",
  "Miss"
}

export enum BattleshipGameStatus {
  "Started",
  "PlacingShips",
  "InProgress",
  "Ended"
}

const allShips: Ship[] = [
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

  addShip(positions: Position[]) {
    const selectedBoat = this.getShipByLength(positions.length, allShips);
    if (selectedBoat === undefined) throw new Error('Ship is not valid');
    if (this.getShipByLength(selectedBoat.length, this.playerBoatInventory) === undefined) throw new Error('Ship has already been used');
    checkOverlap(positions);
    const ship = this.playerBoatInventory.splice(this.playerBoatInventory.findIndex(s => s.length === selectedBoat.length),1)[0];
    ship.startPosition = positions[0];
    ship.endPosition = positions[1];
    this.playerBoard.push(ship);
  }

  getShipByLength(length: number, inventory: Ship[]) {
    return inventory.find(s => s.length === length);
  }

}

function checkOverlap(positions: Position[]) {

}
