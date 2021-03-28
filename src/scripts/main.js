import Player from './player'; //arguments = (initialTurn,isHuman,difficulty -> 1 for easy and 2 for hard, otherwise null if player)

//Initial creation of player objects
export const Player1 = Player(true, false, 1, 15);
export const Player2 = Player(false, false, 1, 15);

const toggleTurnForBothPlayers = (p1, p2) => {
    p1.turn = p1.togglePlayerTurn(p1.turn);
    p2.turn = p2.togglePlayerTurn(p2.turn);
}

const autoBattle = (P1,P2) => {
    while(P1.gameboard.getCurrentTotalShips() !== 0 || P2.gameboard.getCurrentTotalShips() !== 0){
        toggleTurnForBothPlayers(P1, P2);
        if (P1.turn) {
            const atk = P1.aiMove(P1.aiLegalAtks);
            const ships = P2.gameboard.shipsOnTheBoard;
            P2.gameboard.receiveAttack(atk[0], atk[1], ships);
        } else if (P2.turn) {
            const atk = P2.aiMove(P2.aiLegalAtks);
            const ships = P1.gameboard.shipsOnTheBoard;
            P1.gameboard.receiveAttack(atk[0], atk[1], ships);
        }
    }
}

autoBattle(Player1,Player2);
