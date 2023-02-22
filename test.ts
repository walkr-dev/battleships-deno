import * as bs from './SessionManager.ts'
import { BattleshipGameStatus } from './BattleshipSession.ts';
import {
    assertEquals,
    assertThrows
} from "https://deno.land/std@0.77.0/testing/asserts.ts";

Deno.test("Session basics", () => {
    Deno.test('Can start a game', () => {
        const session = bs.init();
        const game = session.newGame(crypto.randomUUID());
        assertEquals(session.activeSessions().length, 1);
        assertEquals(game.status, BattleshipGameStatus.Started);
    });
    
    Deno.test('Cant start a game if player has an in-progress game', () => {
        const user = crypto.randomUUID();
        const session = bs.init();
        session.newGame(user);
        assertThrows(() => session.newGame(user),Error, 'Cannot start a new session when you have one in progress!');
    });
});

Deno.test("Battleship Rules", () => {
    Deno.test('Cant add a ship to an invalid location', () => {});
    Deno.test('Cant add a ship diagonally', () => {});
    Deno.test('Cant add a ship you dont have', () => {});
})

// Deno.test('Can add a ship to the board', () => {
//     const user = crypto.randomUUID();    
//     const session = bs.init();
//     const game = session.newGame(crypto.randomUUID());
//     const move = session.addship(['A1', 'A2'], user);
// })

// Deno.test('Cant add a ship to an invalid location', () => {
//     const user = crypto.randomUUID();    
//     const session = bs.init();
//     const game = session.newGame(crypto.randomUUID());
//     const move = session.addship(['A1', 'B2'], user);
// })