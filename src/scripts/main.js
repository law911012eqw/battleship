import Ship from './ship';
import Gameboard from './gameboard';
import Player from './Player'; //arguments = (initialTurn,isHuman,difficulty -> 1 for easy and 2 for hard, otherwise null if player)

//Initial creation of player objects
const P1 = Player(true, false, 1);
const P2 = Player(false, false, 1);

const toggleTurnForBothPlayers = (p1, p2) => {
    p1.turn = p1.togglePlayerTurn(p1.turn);
    p2.turn = p2.togglePlayerTurn(p2.turn);
}

const AutoBattle