import Ship from './ship.js'

export const Gameboard = () => {
    const height = 10; //immutable board height
    const width = 10; //mutable board width
    //default sets of ships
    const shipClasses = [
        ['Carrier', 5],
        ['Battleship', 4],
        ['Cruiser', 3],
        ['Submariner', 3],
        ['Destroyer', 2]
    ]
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

    const board = twoDimensionalArrayGenerator(height, width); //A 2d array-ish for coodinations
    const randomNumGen = (len) => { //
        const n = (10 - len);
        return Math.floor(Math.random() * n) + 1;
    }
    let occupiedPos = []; //occupied coordinate positions -- tracks what is available or not
    function coordinate(x, y) {
        this.x = x;
        this.y = y;
    }
    const missedAtks = [];

    //assign coordinates to a ship
    const assignCoordinates = (len, bh) => {
        let arr = [];
        let isCoordinatesTaken = false;
        const x = randomNumGen(len); //results to an integer between 0 and (h/w - length of ship)
        const y = Math.floor(Math.random() * bh); //output would be integer between 0 and 9
        const n1 = Math.round(Math.random()); //between 0 and 1
        const n2 = betweenTwoNumbers(n1); //return 0 or 1 dependent to the output of n1
        for (let i = 0; i < len; i++) {
            const xy = [x + i, y];
            arr.push(new coordinate(xy[n1], xy[n2]));
        }
        isCoordinatesTaken = validateCoordinates(x, y, len, n1);
        //call this function again when the coordinate is taken, otherwise, proceed to the process
        if (isCoordinatesTaken === true) {
            console.log('recursion succeeded, what now?');
            return assignCoordinates(len, bh) //restart the function
        }
        return arr;
    }

    //add the ships and its coordinates to the ship holder
    const addShipsToTheBoard = (ships) => {
        const obj = [];
        for (let i = 0; i < ships.length; i++) {
            const name = ships[i][0];
            const length = ships[i][1];
            const pos = assignCoordinates(length, height);
            occupiedPos.push(...pos);
            const ship = Ship(name, length);
            obj.push({
                ship: ship,
                pos: pos,
            });
        }
        return obj;
    }

    //check whether the following coordinates existed already
    const validateCoordinates = (x, y, len, n1) => {
        if (occupiedPos.length === 0) { return false; }
        return occupiedPos.some(o => n1 === 0 ? (o.x >= x && o.x <= x + len) && o.y === y : (o.y >= x && o.y <= x + len) && o.x === y);
    }

    //An array to keep the ship factories and its board positions
    const shipsOnTheBoard = addShipsToTheBoard(shipClasses);
    let currentTotalShips = shipsOnTheBoard.length;

    //check if all ships are gone or not
    const isAllShipsGone = () => {
        return currentTotalShips === 0 ? 1 : 0;
    }

    //Either sunk or not sunk
    const checkShipState = (ship) => {
        if (ship.ship.getCurrentState() === 'sunk') {
            currentTotalShips -= 1;
        }
    }

    const receiveAttack = (x, y, ships) => {
        if (x > height && y > height) {
            return;
        }
        if (!board[x][y][1]) {
            board[x][y][1] = 1 - board[x][y][1];
            const attackMissed = isShipGotHit(x, y, ships);
            if (attackMissed === true) {
                missedAtks.push({
                    x: x,
                    y: y
                })
            }
        }
        isAllShipsGone();
    }

    const isShipGotHit = (x, y, ships) => {
        for (const ship of ships) {
            for (const pos of ship.pos) {
                if (pos.x === x && pos.y === y) {
                    ship.ship.hit();
                    checkShipState(ship);
                    return false;
                }
            }
        }
        return true;
    }

    //get mutable variables
    const getOccupiedPos = () => { return occupiedPos; }
    const getBoard = () => { return board; }
    const getCurrentTotalShips = () => { return currentTotalShips; }
    return {
        height,
        width,
        randomNumGen,
        shipsOnTheBoard,
        board,
        missedAtks,
        currentTotalShips,
        validateCoordinates,
        receiveAttack,
        isShipGotHit,
        getOccupiedPos,
        getBoard,
        getCurrentTotalShips
    }
}

module.exports = Gameboard;