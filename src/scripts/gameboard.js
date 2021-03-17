import Ship from './ship.js'

const twoDimensionalArrayGenerator = (outerLen, innerLen) => {
    let arr = [];
    for (let i = 0; i < outerLen; i++) {
        let data = [];
        for (let j = 0; j < innerLen; j++) {
            let shipInfo = [];
            //name coordinate for the board e.g arr[0][7][0] would be A7
            shipInfo.push(`${String.fromCharCode(65 + i)}${j + 1}`, 0)
            data.push(shipInfo);
        }
        arr.push(data);
    }
    return arr;
}
const betweenTwoNumbers = (x) => { return x > 0.5 ? 0 : 1; }
//default sets of ships
const shipClasses = [
    ['Carrier', 5],
    ['Battleship', 4],
    ['Cruiser', 3],
    ['Submariner', 3],
    ['Destroyer', 2]
]
export const Gameboard = () => {
    const height = 10;
    const width = 10;
    let currentTotalShips = shipClasses.length;
    const board = twoDimensionalArrayGenerator(height, width); //A 2d array-ish for coodinations
    const randomNumGen = (len) => { //
        const n = (10 - len);
        return Math.floor(Math.random() * n) + 1;
    }
    let occupiedPos = []; //occupied coordinate positions -- tracks what is available or not
    //assign coordinates to a ship
    const assignCoordinates = (len, bh) => {
        let arr = [];
        const x = randomNumGen(len); //results to an integer between 0 and (h/w - length of ship)
        const y = Math.floor(Math.random() * bh - 1) + 1; //output would be integer between 0 and 9
        const n1 = Math.round(Math.random()); //between 0 and 1
        const n2 = betweenTwoNumbers(n1); //return 0 or 1 dependent to the output of n1
        for (let i = 0; i < len; i++){
            const xy = [x+i,y];
            arr.push(xy[n1],xy[n2]);
        }
        return arr;
    }
    const addShipsToTheBoard = (ships) => {
        const obj = [];
        const occupied = [];
        for(let i = 0; i < ships.length; i++){
            const name = ships[i][0];
            const length = ships[i][1];
            const pos = assignCoordinates(length, height);
            occupied.push(pos);
            const ship = Ship(name,length);
            obj.push(ship,pos);
        }
        occupiedPos.push(occupied);
        return obj;
    }
    const shipsOnTheBoard = addShipsToTheBoard(shipClasses);
    const getOccupiedPos = () => { return occupiedPos; }
    return {
        randomNumGen,
        shipsOnTheBoard,
        board,
        getOccupiedPos
    }
}

const board = Gameboard();
console.log(board.randomNumGen(7));
console.log(board.shipsOnTheBoard);
console.log(board.getOccupiedPos());

module.exports = Gameboard;