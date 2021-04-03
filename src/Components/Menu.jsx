import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import Battle from './Battle';
import Themes from './Themes';
import Settings from './Settings';
import { setGameType } from '../scripts/main';

export default function Menu() {
    const [gamemode, setGamemode] = useState({ value: '0' }); //0 = both AI, 1 = Player vs AI, 2 = PvP
    const [difficulty, setDifficulty] = useState({ value: '1', valA: '', valB: '' });
    const [mark, setMark] = useState(null);
    const [piece, setPiece] = useState(null);
    return (
        <Router>
            <NavigateSwitch
                gamemode={gamemode}
                setGamemode={setGamemode}
                difficulty={difficulty}
                setDifficulty={setDifficulty}
                mark={mark}
                setMark={setMark}
                piece={piece}
                setPiece={setPiece}
            />
        </Router>
    )
}

function NavigateSwitch({
    gamemode,
    setGamemode,
    difficulty,
    setDifficulty,
    setMark,
    setPiece }) {
    return (
        <Switch>
            <Route exact path="/battleship/"
                children={<Home
                    setGamemode={setGamemode}
                    gamemode={gamemode}
                    difficulty={difficulty}
                    setDifficulty={setDifficulty}
                />} />
            <Route exact path="/battleship/battle"
                children={<Battle gamemode={gamemode} difficulty={difficulty} />} />
            <Route exact path="/battleship/themes" children={<Themes setMark={setMark} setPiece={setPiece} />} />
        </Switch>
    )
}

function Home({ setGamemode, gamemode, difficulty, setDifficulty }) {
    useEffect(() => {
        const img = document.getElementById('prf');
        img.onclick = () => {
            window.location.href = 'https://github.com/law911012eqw';
        }
    })
    useEffect(() => {
        const setPreparationBeforeGame = (gamemode, difficulty) => {
            setGameType(parseInt(gamemode.value), parseInt(difficulty.valA), parseInt(difficulty.valB));
        }
        setPreparationBeforeGame(gamemode, difficulty);
    }, [gamemode, difficulty])
    return (
        <div id="menu">
            <div className="title-wrapper">
                <h1 id="title" className="title">Battleship</h1>
                <div className="author-wrapper">
                    <h2 className="divider"> | </h2>
                    <h5 className="author">Created by B.B Ant</h5>
                    <div className="frame">
                        <img id="prf" className="prof" src="https://avatars.githubusercontent.com/u/73290979?s=400&u=2df2e8360dbecaf0265e22194b52647c95ea6e06&v=4" alt="profile" />
                    </div>
                </div>


            </div>
            <nav id="nav-menu">
                <ul>
                    <div>
                        <li>
                            <Link
                                to="/battleship/battle"
                            >
                                Start Game
                            </Link>
                        </li>
                    </div>
                    <div>
                        <li>
                            <Link
                                to="/battleship/themes"
                            >
                                Themes
                            </Link>
                        </li>
                    </div>
                </ul>
            </nav>
            <Settings
                setGamemode={setGamemode}
                gamemode={gamemode}
                difficulty={difficulty}
                setDifficulty={setDifficulty}
            />
        </div>
    )
}