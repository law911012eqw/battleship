const Gameboard = require('../scripts/gameboard.js');
const Ship = require('../scripts/ship.js');

const ships = [
    {
        ship: Ship('Carrier', 5),
        pos: [
            { x: 4, y: 5 },
            { x: 4, y: 6 },
            { x: 4, y: 7 },
            { x: 4, y: 8 },
            { x: 4, y: 9 }
        ]
    }
]

//custom matchers
expect.extend({
    toBeDistinct(received) {
        //[...new Set(a.map(o => JSON.stringify(o)))].map(s => JSON.parse(s))
        const uniqueArr = [...new Set(received.map(o => JSON.stringify(o)))].map(s => JSON.parse(s));
        console.log(uniqueArr.length);
        const pass = Array.isArray(received) && uniqueArr.length === received.length;
        if (pass) {
            return {
                message: () => `expected ${received} array is unique`,
                pass: true,
            };
        } else {
            return {
                message: () => `expected ${received} array is not to unique`,
                pass: false,
            };
        }
    }
});
test('Set coordinates for each tiles in a board', () => {
    const board = Gameboard();
    const arr = board.board;
    expect(arr[0][7][0]).toBe('A8');
})
test('All coordinates should be unique', () => {
    const board = Gameboard();
    expect(board.getOccupiedPos()).toBeDistinct();
})
test('A coordinate hit availability should be toggled', () => {
    const board = Gameboard();
    const ships = [
        {
            ship: Ship('Destroyer', 2),
            pos: [
                { x: 4, y: 5 },
                { x: 4, y: 6 }
            ]
        }
    ]
    board.receiveAttack(4, 6, ships);
    expect(board.board[4][6][1]).toBeTruthy();
})
test('Ship should receive a damage after the attack', () => {
    const board = Gameboard();
    const ships = [
        {
            ship: Ship('Carrier', 5),
            pos: [
                { x: 4, y: 5 },
                { x: 4, y: 6 },
                { x: 4, y: 7 },
                { x: 4, y: 8 },
                { x: 4, y: 9 }
            ]
        }
    ]
    board.isShipGotHit(4, 7, ships);
    board.isShipGotHit(3, 1, ships);
    board.isShipGotHit(2, 1, ships);
    board.isShipGotHit(4, 9, ships);
    console.log(board.shipsOnTheBoard[0].pos);
    expect(ships[0].ship.getHealth()).toEqual(3);
})
test('Record the missed attacks', () => {
    const board = Gameboard();
    const ships = [
        {
            ship: Ship('Carrier', 5),
            pos: [
                { x: 4, y: 5 },
                { x: 4, y: 6 },
                { x: 4, y: 7 },
                { x: 4, y: 8 },
                { x: 4, y: 9 }
            ]
        }
    ]
    board.receiveAttack(4, 1, ships);
    board.receiveAttack(4, 7, ships);
    board.receiveAttack(2, 8, ships);
    board.receiveAttack(9, 0, ships);
    board.receiveAttack(9, 0, ships);
    board.receiveAttack(29, 16, ships);
    expect(board.missedAtks.length).toEqual(3);
})