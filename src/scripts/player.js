import Gameboard from './gameboard';

export default function Player(initialTurn, player, difficulty, size) {
    let turn = initialTurn;
    const isHuman = player; //Purpose: to avoid configure the wrong subject
    const displayName = 'whatever'; //To identify which party is which
    let isWinner = false; //Determine the winner
    
    //Only applies to AI
    const AILEVEL = difficulty; // 1 or 2
    const randomNum = (n) => {
        return Math.floor(Math.random() * n);
    }
    const gameboard = Gameboard(size);

    //Use to iterate coordinates to be used as a legal attack for AI
    const randomPlays = (max) => {
        const newArr = [];
        for (let i = 0; i < max; i++) {
            for (let j = 0; j < max; j++) {
                newArr.push([i, j]);
            };
        };
        return newArr;
    }

    const selectedAtk = (x, y) => {
        return [x, y];
    }
    //array of legal attacks - used by an AI
    const aiLegalAtks = randomPlays(size);

    //AI move algorithm
    const aiMove = (moves) => {
        //These two are considered previous values after the specification of move coordinate
        const prevPosNum = gameboard.getOccupiedPos().length;
        const prevShipsLeft = gameboard.getCurrentTotalShips();
        //takes and removes an element using a random index
        const move = moves.splice(randomNum(moves.length - 1), 1);
        return AILEVEL == 1 && moves.length !== 0 ? [].concat(...move) : smartAIMove(prevPosNum, prevShipsLeft, move);
            
    }

    const smartAIMove = (prevPosNum, prevShipsLeft, m) => {
        const posNum = gameboard.getOccupiedPos().length;
        const shipsLeft = gameboard.getCurrentTotalShips();
        let move = [].concat(...m);
        if(prevPosNum !== posNum && prevShipsLeft == shipsLeft){
            
            move = {x: m.x, y: m.y}
        }
        return move;
    }
    const togglePlayerTurn = (turn) => { return !turn; }
    return {
        gameboard,
        turn,
        togglePlayerTurn,
        aiMove,
        aiLegalAtks,
        selectedAtk,
        isWinner,
        isHuman,
        displayName
    }
}