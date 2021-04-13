//Known as Hunt and Target Attack
//Improved algorithm where the AI is structured a new decision system when it specifically hits a ship
//by checking it's neighboring square at one step. When choosing the wrong square it'll return to choose
//between the remaining neighboring squares until it hits. If ship is still alive, it'll continue to it's direction
//which is either vertical or horizontal; diagonal is an illegal move.
export default function kingsMove(
    moves,
    firstHuntAtk,
    setFirstHunt,
    isVertical,
    posNum,
    recentSunk
) {

    console.log(firstHuntAtk);
    console.log(posNum);
    console.log(isVertical);
    //These are the key to possible shots during target mode
    let move;
    let index = Math.floor(Math.random() * moves.length - 1);

    const random = (arr) => {
        const i = Math.floor(Math.random() * 2);
        return arr[i];
    }
    const availableTargetShot = (target, arr, axis) => {
        const prevShot = firstHuntAtk;
        console.log(target, axis);
        const shot = arr.findIndex((m => axis === 'y' ? m[0][1] === prevShot[1] + target && m[0][0] === prevShot[0]
            : m[0][0] === prevShot[0] + target && m[0][1] === prevShot[1]));
        if (shot === -1) {
            generateTargetShot(arr);
        };
        console.log('only once');
        return arr.splice(index, 1);;
    }
    const generateTargetShot = (arr) => {
        console.log(arr);
        let target = random([1, -1]);
        let axis = random(['x', 'y']);
        availableTargetShot(target, arr, axis);
    }
    //Hunt mode is activated
    if (firstHuntAtk !== null) {
        // const directionIndex = Math.floor(Math.random() * 1);
        const nextIndex = generateTargetShot(moves);
        move = moves.splice(nextIndex, 1);

    } else { //Just the normal random attack
        move = moves.splice(index, 1);
    }
    function transitionToTargetMode() {
        if (posNum.some(m => m.x === move[0][0] && m.y === move[0][1])) {
            setFirstHunt(move);
        }
    }

    function transitionToHuntMode() {
        if (recentSunk) {
            setFirstHunt(null);
            recentSunk = !recentSunk;
        }
    }
    transitionToTargetMode();
    transitionToHuntMode()
    console.log(move);
    return [].concat(...move);
}