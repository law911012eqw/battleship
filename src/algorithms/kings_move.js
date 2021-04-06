//Known as Hunt and Target Attack
//Improved algorithm where the AI is structured a new decision system when it specifically hits a ship
//by checking it's neighboring square at one step. When choosing the wrong square it'll return to choose
//between the remaining neighboring squares until it hits. If ship is still alive, it'll continue to it's direction
//which is either vertical or horizontal; diagonal is an illegal move.
export default function kingsMove(gb, prevPosNum, prevShipsLeft, moves, direction) {
    let m = direction.length !== 4 ? gb.recentAtk : moves.splice((Math.floor(Math.random() * moves.length)) - 1, 1);
    const posNum = gb.getOccupiedPos().length; //updated occupied positions
    const shipsLeft = gb.getCurrentTotalShips();
    let attackCount = 0;
    console.log(m);
    const index = Math.floor((Math.random() * direction.length) - 1) + 1;
    const chosenMove = direction.splice(index, 1);
    // let move = ;
    if ((prevPosNum !== posNum && prevShipsLeft === shipsLeft) || direction.length !== 4) {
        console.log('yes');
        attackCount += 1;
        if (attackCount === 1) {
            gb.recentAtk = [].concat(...m);
        }
        console.log(m);
        m[0] += chosenMove[0];
        m[1] += chosenMove[1];
        console.log(m);
        return [].concat(...m);
    }
    return [].concat(...m);
}