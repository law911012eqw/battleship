const Gameboard = require('../scripts/gameboard.js');

//custom matchers
expect.extend({
    toBeDistinct(received) {
        //new Set(received).size === received.length
        //[...new Set(a.map(o => JSON.stringify(o)))].map(s => JSON.parse(s))
        const pass = Array.isArray(received) && [...new Set(received.map(o => JSON.stringify(o)))].map(s => JSON.parse(s));
        if (pass) {
            return {
                message: () => `expected [${received}] array is unique`,
                pass: true,
            };
        } else {
            return {
                message: () => `expected [${received}] array is not to unique`,
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
test('Receive number not greater than l', () => {
    const board = Gameboard();
    expect(board.randomNumGen(5)).toBeLessThan(6);
})
test('All coordinates should be unique', () => {
    const board = Gameboard();
    expect(board.getOccupiedPos()).toBeDistinct();
})
test('Produce the right output if coordinates alread existed or not', () => {
    const board = Gameboard();
    board.occupiedPos = [
        { x: 7, y: 4 },
        { x: 7, y: 5 },
        { x: 7, y: 6 },
        { x: 7, y: 7 },
        { x: 7, y: 8 },
    ]
    expect(board.validateCoordinates(2,7,5,1)).toBeTruthy();
})