import React from 'react';

import ReturnToMenu from './ReturnToMenu';
export default function Settings({ setGamemode, gamemode, difficulty, setDifficulty }) {
    const handleGamemodeChange = (event) => {
        setGamemode({ value: event.target.value });
    }
    const handleDifficultyChange = (event) => {
        setDifficulty({ value: event.target.value })
    }
    return (
        <div id="Settings">
            <div className="custom-select">
                <select name="gamemodes" value={gamemode.value} onChange={handleGamemodeChange}>
                    <option value='0'>PvP</option>
                    <option value='1'>PvAI</option>
                    <option value='2'>AIvAI</option>
                </select>
            </div>

            {gamemode.value != 0 ?
                <ShowSelectDifficulty
                    difficulty={difficulty}
                    handleDifficultyChange={handleDifficultyChange}
                /> : null}
        </div>
    )
}

const ShowSelectDifficulty = ({ difficulty, handleDifficultyChange }) => {
    return (
        <div className="custom-select">
            <select name="diff" value={difficulty.value} onChange={handleDifficultyChange}>
                <option value='1'>Easy</option>
                <option value='2'>Hard</option>
            </select>
        </div>
    )
}