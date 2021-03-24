import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom'

import Menu from './Menu';
export default function ReturnToMenu() {
    return (
        <Router>
            <div>
                <ul>
                    <li>
                        <Link
                            to="/battlefield/"
                        >
                            Return to Menu
                    </Link>
                    </li>
                </ul>
                <Switch>
                    <Route>
                        <Menu />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}