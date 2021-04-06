import Player from './player'; //arguments = (initialTurn,isHuman,difficulty -> 1 for easy and 2 for hard, otherwise null if player)

//Global variables 
const MAX = 10;

//Initial creation of player objects
export let Player1 = Player(true, true, 1, MAX);;
export let Player2 = Player(false, false, 1, MAX);

//Set the gamemode including the AI difficulty
export async function setGameType(gamemode, p1diff, p2diff){
    if (gamemode == 0) {
        Player1 = Player(true, true, null, MAX);
        Player2 = Player(false, true, null, MAX);
    } else if (gamemode == 1) {
        Player1 = Player(true, true, null, MAX);
        Player2 = Player(false, false, p2diff, MAX);
    } else {
        Player1 = Player(true, false, p1diff, MAX);
        Player2 = Player(false, false, p2diff, MAX);
    }
    namingBothParties(Player1, Player2);
}

//toggle turns
export const toggleTurnForBothPlayers = (p1, p2) => {
    p1.turn = p1.togglePlayerTurn(p1.turn);
    p2.turn = p2.togglePlayerTurn(p2.turn);
}

//used to display to check if the player is an AI or not
const namingBothParties = (Player1, Player2) => {
    if (Player1.isHuman === true && Player2.isHuman === true) {
        Player1.displayName = 'Player 1';
        Player2.displayName = 'Player 2';
    } else if (Player1.isHuman === false && Player2.isHuman === false) {
        Player1.displayName = 'AI 1';
        Player2.displayName = 'AI 2';
    } else {
        Player1.displayName = 'Player';
        Player2.displayName = 'AI';
    }
}

const checkWinner = (P1, P2) => {
    if (P1.gameboard.getOccupiedPos().length == 0) {
        P2.isWinner = true;
    } else if (P2.gameboard.getOccupiedPos().length == 0) {
        P1.isWinner = true;
    }
}

//Auto function for AIvsAI gamemode
export const autoBattle = (P1, P2) => {
    if (P1.turn) {
        const atk = P1.aiMove(P1.aiLegalAtks);
        const ships = P2.gameboard.shipsOnTheBoard;
        P2.gameboard.receiveAttack(atk[0], atk[1], ships);
    } else if (P2.turn) {
        const atk = P2.aiMove(P2.aiLegalAtks);
        const ships = P1.gameboard.shipsOnTheBoard;
        P1.gameboard.receiveAttack(atk[0], atk[1], ships);
    }
    checkWinner(P1, P2);
    toggleTurnForBothPlayers(P1, P2);
}

//Attack the ships of the other party
export const playerAttack = (attacker, defender, x, y) => {
    if(!attacker.aiLegalAtks.some(o => o[0] === x && o[1] === y)) return true;
    const ships = defender.gameboard.shipsOnTheBoard;
    attacker.toggleLegality(x,y);
    defender.gameboard.receiveAttack(y, x, ships);
    checkWinner(Player1, Player2);
    toggleTurnForBothPlayers(Player1, Player2);
    return false;
}

export const randomize = (player) => {
    const p = player.gameboard;
    p.resetArray(p.occupiedPos);
    p.shipsOnTheBoard = p.addShipsToTheBoard();
}

export const resetGame = (player) => {
    randomize(player);
    if (player.isWinner) { player.isWinner = false; }
    player.gameboard.resetBoard();
    player.aiLegalAtks = player.refillLegalAtks();
}
