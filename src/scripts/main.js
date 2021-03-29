import Player from './player'; //arguments = (initialTurn,isHuman,difficulty -> 1 for easy and 2 for hard, otherwise null if player)

//Global variables 
export let turnCount = 0;

const MAX = 10;

//Initial creation of player objects
export const Player1 = Player(true, false, 1, MAX);
export const Player2 = Player(false, false, 1, MAX);

//toggle turns
const toggleTurnForBothPlayers = (p1, p2) => {
    p1.turn = p1.togglePlayerTurn(p1.turn);
    p2.turn = p2.togglePlayerTurn(p2.turn);
}

//used to display to check if the player is an AI or not
const namingBothParties = (Player1, Player2) => {
    if(Player1.isHuman === true && Player2.isHuman === true){
        Player1.displayName = 'Player 1';
        Player2.displayName = 'Player 2';
    } else if (Player1.isHuman === false && Player2.isHuman === false){
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
export const autoBattle = (P1, P2) => {
    turnCount++;
    if (P1.turn) {
        const atk = P1.aiMove(P1.aiLegalAtks);
        const ships = P2.gameboard.shipsOnTheBoard;
        P2.gameboard.receiveAttack(atk[0], atk[1], ships);
    } else if (P2.turn) {
        const atk = P2.aiMove(P2.aiLegalAtks);
        const ships = P1.gameboard.shipsOnTheBoard;
        P1.gameboard.receiveAttack(atk[0], atk[1], ships);
    }
    checkWinner(P1,P2);
    toggleTurnForBothPlayers(P1, P2);
}

namingBothParties(Player1, Player2);
