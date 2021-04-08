//Known as Hunt and Target Attack
//Improved algorithm where the AI is structured a new decision system when it specifically hits a ship
//by checking it's neighboring square at one step. When choosing the wrong square it'll return to choose
//between the remaining neighboring squares until it hits. If ship is still alive, it'll continue to it's direction
//which is either vertical or horizontal; diagonal is an illegal move.
export default function kingsMove(
    gb,
    moves,
    vertical,
    horizontal,
    firstHuntAtk,
    recentDirectionalAtk,
    posNum,
    recentSunk
    ) {

    //These are the key to possible shots during target mode
    let move;
    let index = Math.floor(Math.random() * moves.length - 1);

       //Hunt mode is activated
    if(firstHuntAtk !== null) {
        const directionIndex = Math.floor(Math.random() * 1);
        let nextIndex;
        directionIndex ? nextIndex = horizontal.splice(Math.floor(Math.random() * horizontal.length - 1), 1)
        : nextIndex = vertical.splice(Math.floor(Math.random() * vertical.length - 1), 1);
        if(recentDirectionalAtk === 'h'){
            if(horizontal.length < 2){
                nextIndex = horizontal[0];
                recentDirectionalAtk = 'v';
            }
            
        } else if (recentDirectionalAtk === 'v'){
            if(vertical.length < 2){
                nextIndex = horizontal[0];
                recentDirectionalAtk = 'h';
            }
        }
        //1 or true for horizontal, otherwise vertical
        directionIndex ? recentDirectionalAtk = 'h' : recentDirectionalAtk = 'v';
        move = moves.splice(firstHuntAtk + nextIndex, 1);
        const newHuntIndex = firstHuntAtk < index ? firstHuntAtk - 1 : firstHuntAtk;
        firstHuntAtk = newHuntIndex;

    } else {
        move = moves.splice(index, 1);
    }
    if(posNum.some(m => m[0] === move[0] && m[1] === move[1])){
        firstHuntAtk = index;
    }
    if (recentSunk){
        firstHuntAtk = null;
        recentSunk = !recentSunk;
    }
    console.log(move);
    return [].concat(...move);
}