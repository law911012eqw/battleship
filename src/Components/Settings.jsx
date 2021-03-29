import React from 'react';

import ReturnToMenu from './ReturnToMenu';
export default function Settings(setGameMode, setMark, setPiece){
    return(
        <div id="Settings">
            <form>
                <label>Gamemode</label>
                <label>Ship Piece</label>
            </form>
        </div>
    )
}