import * as Battleships from "./SessionManager.ts";

const command = Deno.args
const battleshipHandler = Battleships.init();

if (command[0] === '/newgame') {
    battleshipHandler.newGame(crypto.randomUUID());
    battleshipHandler.newGame(crypto.randomUUID());
    battleshipHandler.newGame(crypto.randomUUID());
}