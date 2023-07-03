import * as bs from './SessionManager.ts'
import { allShips, BattleShipErrors, BattleshipGameStatus, BoatType } from './BattleshipSession.ts';
import {
    assertEquals,
    assertThrows
} from "https://deno.land/std@0.77.0/testing/asserts.ts";
import { SessionErrors } from "./SessionManager.ts";
import { Position } from "./types.ts";

const sessions = bs.init();

// SESSION

Deno.test('Can start a game', () => {
    const game = sessions.newGame(crypto.randomUUID());
    assertEquals(sessions.activeSessions().length, 1);
    assertEquals(game.status, BattleshipGameStatus.Started);
});
Deno.test('Cant start a game if player has an in-progress game', () => {
    const user = crypto.randomUUID();
    sessions.newGame(user);
    assertThrows(() => sessions.newGame(user),Error, SessionErrors.SessionAlreadyInProgress);
});

// SHIP PLACEMENT

Deno.test('Can add a ship', () => {
    const session = sessions.newGame(crypto.randomUUID());
    const startPos = {x: 1, y: 1};
    const endPos = {x: 1, y: 2};

    const expectedShip = allShips[4];

    session.addShipPlayer([startPos, endPos]);
    assertEquals(session.playerBoard[0].startPosition, startPos);
    assertEquals(session.playerBoard[0].endPosition, endPos);
    assertEquals(session.playerBoard[0], expectedShip);
    assertEquals(session.playerBoatInventory.length, 4);
})

Deno.test('Can add multiple ships', () => {
    const session = sessions.newGame(crypto.randomUUID());
    const firstShipStartPos = {x: 1, y: 1};
    const firstShipEndPos = {x: 1, y: 2};

    const expectedFirstShip = allShips[4];

    const secondShipPos: Position[] = [{x: 2, y: 2}, {x: 2, y: 3}, {x: 2, y: 4}, {x: 2, y: 5}];

    const expectedSecondShip = allShips[1];

    session.addShipPlayer([firstShipStartPos, firstShipEndPos]);
    session.addShipPlayer(secondShipPos);

    assertEquals(session.playerBoard[0].startPosition, firstShipStartPos);
    assertEquals(session.playerBoard[0].endPosition, firstShipEndPos);
    assertEquals(session.playerBoard[0], expectedFirstShip);

    assertEquals(session.playerBoard[1].startPosition, secondShipPos[0]);
    assertEquals(session.playerBoard[1].endPosition, secondShipPos[3]);
    assertEquals(session.playerBoard[1], expectedSecondShip);

    assertEquals(session.playerBoatInventory.length, 3);
})

Deno.test('Cant add a ship to an invalid location', () => {
    const session = sessions.newGame(crypto.randomUUID());
    assertThrows(() =>  session.addShipPlayer([{x: -1, y: -1}, {x: -1, y: -2}]), Error, BattleShipErrors.PositionNotValid);
});

Deno.test('Cant add a ship diagonally', () => {
    const session = sessions.newGame(crypto.randomUUID());
    assertThrows(() =>  session.addShipPlayer([{x: 1, y: 1}, {x: 2, y: 2}]), Error, BattleShipErrors.PositionNotValid);
});

Deno.test('Cant add a ship you dont have', () => {
    const session = sessions.newGame(crypto.randomUUID());
    session.addShipPlayer([{x: 1, y: 1}, {x: 1, y: 2}])
    assertThrows(() =>  session.addShipPlayer([{x: 2, y: 2}, {x: 2, y: 3}]), Error, BattleShipErrors.AlreadyUsedShip);
});

Deno.test('Cant add a ship to a position a ship already occupies', () => {
    const session = sessions.newGame(crypto.randomUUID());
    session.addShipPlayer([{x: 1, y: 1}, {x: 1, y: 2}])
    assertThrows(() =>  session.addShipPlayer([{x: 1, y: 1}, {x: 2, y: 1}, {x: 3, y: 1}, {x: 4, y: 1}]), Error, BattleShipErrors.ShipOverlaps);
});

Deno.test('Cant add a weirdly shaped ship', () => {
    //e.g.
    //     X
    // X X X
    const session = sessions.newGame(crypto.randomUUID());
    assertThrows(() =>  session.addShipPlayer([{x: 1, y: 1}, {x: 2, y: 1}, {x: 3, y: 1}, {x: 3, y: 2}]), Error, BattleShipErrors.InvalidShip);
});

// ATTACKING

// WIN STATE

// LOSE STATE

// WHOLE GAME