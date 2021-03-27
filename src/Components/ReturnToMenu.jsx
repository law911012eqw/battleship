import { useHistory, Link } from 'react-router-dom'

export default function ReturnToMenu() {
    const history = useHistory();

    function handleClick() {
        history.push('/battleship/');
    }
    return (
        <li id="Return" onClick={handleClick}>
            <Link>
                Return to Menu
            </Link>
        </li>
    )
}