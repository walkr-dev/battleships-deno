import * as bs from './SessionManager.ts'
import { BattleShipErrors, BattleshipGameStatus } from './BattleshipSession.ts';
import {
    assertEquals,
    assertThrows
} from "https://deno.land/std@0.77.0/testing/asserts.ts";
import { SessionErrors } from "./SessionManager.ts";

const sessions = bs.init();

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