import Gameboard from './gameboard';

export const Player = (initialTurn, player, difficulty) => {
    let turn = initialTurn;
    const isHuman = player;

    //Only applies to AI
    const AILEVEL = difficulty; // 1 or 2
    const randomNum = (n) => {
        return Math.floor(Math.random() * n);
    }
    const gameboard = Gameboard();

    //Use to iterate coordinates to be used as a legal attack for AI
    const randomPlays = (h, w) => {
        const newArr = [];
        for (let i = 0; i < h; i++) {
            for (let j = 0; j < w; j++) {
                newArr.push([i, j]);
            };
        };
        return newArr;
    }

    const selectedAtk = (x,y) => {
        return [x,y];
    }
    //array of legal attacks - used by an AI
    const aiLegalAtks = randomPlays(gameboard.height, gameboard.width);

    const aiMove = (moves) => {
        if (AILEVEL === 1 && moves.length !== 0) {
            //takes and removes an element using a random index
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
        selectedAtk
    }
}
