//Known as Hunt and Target Attack
//Improved algorithm where the AI is structured a new decision system when it specifically hits a ship
//by checking it's neighboring square at one step. When choosing the wrong square it'll return to choose
//between the remaining neighboring squares until it hits. If ship is still alive, it'll continue to it's direction
//which is either vertical or horizontal; diagonal is an illegal move as it requires 2 steps.
export default function kingsMove(
    moves,
    firstHuntAtk,
    setFirstHunt,
    sameShipHuntShot,
    setSameShipHuntShot,
    availableTargetShots,
    setAvailableTargetShots,
    posNum,
    recentSunk,
    setRecentSunk
) {

    console.log(availableTargetShots);
    console.log(firstHuntAtk, sameShipHuntShot);
    const checkLen = availableTargetShots.length === 0;
    let move;     //This is the chosen move after the process of choosing possible attacks
    let index = Math.floor(Math.random() * moves.length - 1);

    const random = (arr) => {
        const i = Math.floor(Math.random() * arr.length);
        return arr.splice(i, 1);
    }
    const checkIfThereAreNoPossibleAttacks = (arr, prevShot) => {
        if(prevShot === null) return false;
        //m => reference for array element
        //step => is either 1, -1 which is used for neighboring square attacks
        const x = (m, step) =>  m[0] === prevShot[0] + step;
        const y = (m, step) =>  m[1] === prevShot[1] + step;
        const findIfAttacksArePossible = (m) => (x(m, 1) && y(m, 0)) || (x(m, -1) && y(m, 0)) 
        || (x(m, 0) && y(m, 1)) || (x(m, 0) && y(m, -1));
        console.log(arr.some(findIfAttacksArePossible));
        return arr.some(findIfAttacksArePossible);
    }

    //The moves, chosen next attack or attack to be referenced
    //3rd arg refers to the center of the possibilities during the target mode
    const availableTargetShot = (arr, nextShot, attackRef) => {
        console.log(nextShot);
        const target = nextShot.target;
        const axis = nextShot.axis;
        const prevShot =  attackRef ? sameShipHuntShot : firstHuntAtk;
        const isNextShotAvailable = (m) => axis === 'y' ? m[1] === prevShot[1] + target && m[0] === prevShot[0]
            : m[0] === prevShot[0] + target && m[1] === prevShot[1];
        const shot = arr.findIndex(isNextShotAvailable);
        console.log(shot);
        if (shot === -1) { return generateTargetShot(arr); }
        return shot;
    }
    const generateTargetShot = (arr) => {
        const chooseBetweenFirstOrRecentAtk = firstHuntAtk !== sameShipHuntShot && sameShipHuntShot !== null;
        let atkRef = false;
        if(checkIfThereAreNoPossibleAttacks(moves, sameShipHuntShot)){
            console.log('keep going with recent successful attack');
            atkRef = true;
        } else if (checkIfThereAreNoPossibleAttacks(moves, firstHuntAtk)) {
            console.log('no choice, go back to first hunt');
            atkRef = false;
        } else if (chooseBetweenFirstOrRecentAtk) {
            atkRef = true;
        } else { atkRef = false; }
        
        let nextShot = random(availableTargetShots);
        return availableTargetShot(arr, ...nextShot, atkRef);
    }

    //Target mode is activated
    function targetPhase() {
        if (firstHuntAtk !== null) {
            const nextIndex = generateTargetShot(moves);
            move = moves.splice(nextIndex, 1);
    
        } else { //Just the normal random attack
            move = moves.splice(index, 1);
        }
    }


    function refillAvailableShots() {
        if(availableTargetShots.length===0){
            setSameShipHuntShot(firstHuntAtk);
        }
        setAvailableTargetShots([
            {
                target: 1,
                axis: 'x',
            },
            {
                target: -1,
                axis: 'x',
            },
            {
                target: 1,
                axis: 'y',
            },
            {
                target: -1,
                axis: 'y',
            }
        ]);
    }
    function transitionToTargetMode() {
        if (firstHuntAtk === null && posNum.some(m => m.x === move[0][0] && m.y === move[0][1])) {
            console.log('The First Attack');
            setFirstHunt(...move);
            refillAvailableShots();
        } else if (firstHuntAtk !== null && posNum.some(m => m.x === move[0][0] && m.y === move[0][1])) {
            console.log('Recent successful Attack');
            setSameShipHuntShot(...move);
            refillAvailableShots();
        } else if (availableTargetShots.length === 0){
            console.log('refill?');
            refillAvailableShots();
        }
    }

    function transitionToHuntMode() {
        if (recentSunk) {
            console.log('sunken ship');
            setFirstHunt(null);
            setSameShipHuntShot(null);
            setRecentSunk(!recentSunk);
            if(availableTargetShots.length !== 4) refillAvailableShots();
        }
        move = moves.splice(index, 1);
        return [].concat(...move);
    }

    //Sequential step of this algorithm
    transitionToHuntMode();
    targetPhase();
    transitionToTargetMode();
    return [].concat(...move);
}