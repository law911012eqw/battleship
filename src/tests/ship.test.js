const Ship = require('../scripts/ship.js');

test('correct name', () => {
    const current = Ship('Carrier', 5);
    expect(current.getName()).toBe('Carrier');
})
test('correct health', () => {
    const current = Ship('Carrier', 5);
    expect(current.getHealth()).toBe(5);
})
test('ship damage after hit', () => {
    const current = Ship('Carrier', 5);
    current.hit();
    expect(current.getHealth()).toEqual(4);
})
test('current state should be hit after hit', () => {
    const current = Ship('Carrier', 5);
    current.hit();
    expect(current.getCurrentState()).toBe('hit');
})
test('health == 0, ship should sink', () => {
    const current = Ship('Destroyer', 2);
    current.hit();
    current.hit();
    expect(current.getCurrentState()).toBe('sunk');
})