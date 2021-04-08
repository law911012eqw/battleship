import Gameboard from './gameboard';
import huntTarget from '../algorithms/hunt_target';

export default function Player(initialTurn, player, difficulty, num) {
    let turn = initialTurn;
    const isHuman = player; //Purpose: to avoid configure the wrong subject
    const playerNum = num;
    const displayName = isHuman ? 'Player' : 'AI'; //To identify which party is which
    let isWinner = false; //Determine the winner

    //Only applies to AI
    const AILEVEL = difficulty; // 1 or 2
    const randomNum = (n) => {
        return Math.floor(Math.random() * n);
    }
    const gameboard = Gameboard();
    const opponentOccupiedPosLeft = 17;
    const opponentShipsLeft = 5;

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
    let aiLegalAtks = randomPlays(10);
    let recentSunk = false;

    let vertical = [1, -1];
    let horizontal = [10, -10];

    //Special variable for Player(AI) with higher difficulty
    let firstHuntAtk = null; //
    let recentDirectionalAtk; //either vertical or horizontal (v/h)

    const refillLegalAtks = () => {
        return randomPlays(10);
    }

    const toggleLegality = (x, y) => {
        const index = aiLegalAtks.findIndex(atk => atk[0] === x & atk[1] === y);
        aiLegalAtks.splice(index, 1);
    }

    //AI move algorithm
    const aiMove = (moves) => {
        //These two are considered previous values after the specification of move coordinate

        //takes and removes an element using a random index
        //DUMB AI RANDOM ATTACK ALGORITHM
        if (moves.length !== 0) {
            if (AILEVEL == 2) {
                if (vertical.length === 0) { vertical  = [1, -1]; }
                if (horizontal.length === 0) { horizontal = [10, -10]; }
                return huntTarget(
                    gameboard,
                    moves,
                    vertical,
                    horizontal, 
                    firstHuntAtk,
                    recentDirectionalAtk,
                    opponentOccupiedPosLeft,
                    recentSunk
                    );
            }
            const move = moves.splice(randomNum(moves.length - 1), 1);
            return [].concat(...move);
        }
    }

    const togglePlayerTurn = (turn) => { return !turn; }
    return {
        gameboard,
        turn,
        togglePlayerTurn,
        aiMove,
        aiLegalAtks,
        recentSunk,
        opponentOccupiedPosLeft,
        selectedAtk,
        isWinner,
        isHuman,
        displayName,
        toggleLegality,
        refillLegalAtks,
        playerNum,
        getAiLegalAtks() { return aiLegalAtks; },
        setAiLegalAtks(arr) { aiLegalAtks = arr; }
    }
}