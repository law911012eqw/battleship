import React, {useState, useEffect} from 'react';

import Battle from './Battle';

export default function Outcomes(pos, name, ship){
    const [currentPlayer, setCurrentPlayer] = useState(name);
    return(
        <div id="Outcomes">
            <OutcomesInListFormat />
        </div>
    )
}

function OutcomesInListFormat() {
    
}