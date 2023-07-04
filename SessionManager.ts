import { BattleshipSession, BattleshipGameStatus } from "./BattleshipSession.ts";

export enum SessionErrors {
    SessionAlreadyInProgress = 'Cannot start a new session when you have one in progress',
}

const sessions: BattleshipSession[] = [];

function activeSessions() {
 return sessions.filter(s => s.status !== BattleshipGameStatus.Ended);
}

function playerHasActiveSession(playerId: string) {
    return getSessionByPlayerId(playerId) !== undefined;
}

function getSessionByPlayerId(playerId: string) {
    return activeSessions().find(s => s.playerId === playerId);
} 

function newGame(playerId: string): BattleshipSession {
    if (playerHasActiveSession(playerId)) throw new Error(SessionErrors.SessionAlreadyInProgress);
    const newSession = new BattleshipSession(playerId);
    sessions.push(newSession);
    return newSession;
}

export function init() {
    
    return {
        newGame,
        activeSessions,
    }
}
