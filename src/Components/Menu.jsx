import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import Battle from './Battle';
import Themes from './Themes';
import Settings from './Settings';
export default function Menu() {
    return (
        <Router>
            <div id="menu">
                <nav id="nav-menu">
                    <ul>
                        <li>
                            <Link
                                to="/battlefield/battle"
                            >
                            New Game
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/battlefield/themes"
                            >
                            Themes
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/battlefield/settings"
                            >
                            Settings
                            </Link>
                        </li>
                    </ul>
                </nav>
                <Switch>
                    <Route exact path="/battlefield/">
                        <Menu />
                    </Route>
                    <Route exact path="/battlefield/battle">
                        <Battle />
                    </Route>
                    <Route exact path="/battlefield/themes">
                        <Themes />
                    </Route>
                    <Route exact path="/battlefield/settings">
                        <Settings />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}