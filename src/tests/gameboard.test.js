const Gameboard = require('../scripts/gameboard.js');

test('Set coordinates for each tiles in a board',()=>{
    const board = Gameboard();
    const arr = board.board;
    expect(arr[0][7][0]).toBe('A8');
})
test('Receive number not greater than l',()=>{
    const board = Gameboard();
    expect(board.randomNumGen(5)).toBeLessThan(6);
})