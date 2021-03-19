const Gameboard = require('../scripts/gameboard.js');

//custom matchers
expect.extend({
    toBeDistinct(received) {
        //[...new Set(a.map(o => JSON.stringify(o)))].map(s => JSON.parse(s))
        const uniqueArr = [...new Set(received.map(o => JSON.stringify(o)))].map(s => JSON.parse(s));
        console.log(received);
        console.log(uniqueArr);
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
test('Receive number not greater than l', () => {
    const board = Gameboard();
    expect(board.randomNumGen(5)).toBeLessThan(6);
})
test('All coordinates should be unique', () => {
    const board = Gameboard();
    expect(board.getOccupiedPos()).toBeDistinct();
})