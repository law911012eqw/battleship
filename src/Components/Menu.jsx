import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import Battle from './Battle';
import Themes from './Themes';
import Settings from './Settings';
export default function Menu() {
    const [gamemode, setGamemode] = useState(1); //0 = both AI, 1 = Player vs AI, 2 = PvP
    const [max, setMax] = useState(10);
    return (
        <Router>
            <NavigateSwitch
                gameMode={gamemode}
                setGamemode={setGamemode}
                max={max}
                setMax={setMax}
            />
        </Router>
    )
}

function NavigateSwitch(gamemode, setGamemode, max, setMax) {
    return (
        <Switch>
            <Route exact path="/battleship/" children={<Home />} />
            <Route exact path="/battleship/battle"
                children={<Battle gamemode={gamemode} max={max} />} />
            <Route exact path="/battleship/themes" children={<Themes />} />
            <Route exact path="/battleship/settings"
                children={<Settings setGamemode={setGamemode} setMax={setMax} />} />
        </Switch>
    )
}

function Home() {
    return (
        <div id="menu">
            <nav id="nav-menu">
                <ul>
                    <li>
                        <Link
                            to="/battleship/battle"
                        >
                            New Game
                </Link>
                    </li>
                    <li>
                        <Link
                            to="/battleship/themes"
                        >
                            Themes
                </Link>
                    </li>
                    <li>
                        <Link
                            to="/battleship/settings"
                        >
                            Settings
                </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}