import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import Battle from './Battle';
import Themes from './Themes';
import Settings from './Settings';
export default function Menu() {
    return (
        <Router>
            <NavigateSwitch />
        </Router>
    )
}

function NavigateSwitch() {
    return (
        <Switch>
            <Route exact path="/battleship/" children={<Home />} />
            <Route exact path="/battleship/battle" children={<Battle />} />
            <Route exact path="/battleship/themes" children={<Themes />} />
            <Route exact path="/battleship/settings" children={<Settings />} />
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