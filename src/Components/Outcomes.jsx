import React, { useEffect } from 'react';

export default function Outcomes({
    currentPlayer,
    shipNum,
    categoryNum,
    coordinate,
    outcomesArr,
    setOutcomesArr}) {

    useEffect(() => {
        const addingListInArr = () => {
            switch (categoryNum) {
                case 0:
                    outcomesArr.push(
                        `${currentPlayer} won the battleship!`
                    )
                    break;
                case 1:
                    outcomesArr.push(
                        `${currentPlayer} only have ${shipNum} ${shipNum !== 1 ? 'ships' : 'ship'} left.`
                    )
                    break;
                case 2:
                    outcomesArr.push(
                        `${currentPlayer} successfully hit an attack at ${coordinate}.`
                    )
                    break;
                case 3:
                    outcomesArr.push(
                        `${currentPlayer} missed an attack at ${coordinate}.`
                    )
                    break;
                default:
                    outcomesArr.push(
                        'The game has started...'
                    )
                    break;
            }
            console.log('well?');
        }
        addingListInArr();
    }, [shipNum, currentPlayer]);
    const outcomesInListFormat = () => {
        if (outcomesArr < 5) {
            // setOutcomesArr(outcomesArr.slice(1));
            // return;
        }
        outcomesArr.map(txt => {
            return (
                <p>
                    {txt}
                </p>
            )
        })
    }
    return (
        <div>
            {outcomesInListFormat()}
        </div>
    )
}