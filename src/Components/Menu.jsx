import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import Battle from './Battle';
import Themes from './Themes';
import Settings from './Settings';
export default function Menu() {
    const [gamemode, setGamemode] = useState(1); //0 = both AI, 1 = Player vs AI, 2 = PvP
    const [mark, setMark] = useState(null);
    const [piece, setPiece] = useState(null);
    return (
        <Router>
            <NavigateSwitch
                gameMode={gamemode}
                setGamemode={setGamemode}
                mark={mark}
                setMark={setMark}
                piece={piece}
                setPiece={setPiece}
            />
        </Router>
    )
}

function NavigateSwitch(gamemode, setGamemode, mark, setMark, piece, setPiece) {
    return (
        <Switch>
            <Route exact path="/battleship/" children={<Home setGamemode={setGamemode} setMark={setMark} setPiece={setPiece}/>} />
            <Route exact path="/battleship/battle"
                children={<Battle gamemode={gamemode} mark={mark} piece={piece} />} />
            <Route exact path="/battleship/themes" children={<Themes />} />
        </Switch>
    )
}

function Home(setGamemode, setMark, setPiece) {
    useEffect(() => {
        const img = document.getElementById('prf');
        img.onclick = () => {
            window.location.href = 'https://github.com/law911012eqw';
        }
    })
    return (
        <div id="menu">
            <div className="title-wrapper">
                <h1 id="title" className="title">Battleship</h1>

                <h2 className="divider"> | </h2>
                <h4 className="author">Created by B.B Ant</h4>
                <div className="frame">
                    <img id="prf" className="prof" src="https://avatars.githubusercontent.com/u/73290979?s=400&u=2df2e8360dbecaf0265e22194b52647c95ea6e06&v=4" alt="profile picture" />
                </div>
            </div>
            <div className="bottom-menu">
                <nav id="nav-menu">
                    <ul>
                        <li>
                            <Link
                                to="/battleship/battle"
                            >
                                Start Game
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/battleship/themes"
                            >
                                Themes
                            </Link>
                        </li>
                    </ul>
                </nav>
                <Settings setGamemode={setGamemode} setMark={setMark} setPiece={setPiece} />
            </div>

        </div>
    )
}