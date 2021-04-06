import React, { useState, useEffect, useRef } from 'react';

import ReturnToMenu from './ReturnToMenu';
import Outcomes from './Outcomes';
import { Player1, Player2, autoBattle, randomize, playerAttack, resetGame } from '../scripts/main'

export default function Battle({ gamemode, difficulty }) {
    //viewport width used for canvas size
    const width = window.innerWidth;

    //Player factory function as a state
    const [P1,] = useState(Player1);
    const [P2,] = useState(Player2);

    //Used to manually start and end the game
    const [winner, setWinner] = useState(null);
    const [start, setStart] = useState(false);

    //Set the current player
    const [currentTurn, setCurrentTurn] = useState([Player1.turn, Player1.isHuman]);

    //Used as a fake count to trigger an associated useEffect as a dependency value
    const [fakeCount, setFakeCount] = useState(0);

    //Immutable and conditionally-based variable
    const SIZE = (width >= 800) ? width * .22 : width * .30;

    //Canvas stuff
    const cv1Ref = useRef(null);
    const cv2Ref = useRef(null);

    const [toggleP1ShipVisibility, setToggleP1ShipVisibility] = useState(true);
    const [toggleP2ShipVisibility, setToggleP2ShipVisibility] = useState(true);

    //Triggered after a click on start button
    const handleStartButton = () => {
        if (!start && gamemode.value === 0){
            setToggleP1ShipVisibility(false);
            setToggleP2ShipVisibility(false);
        }
        if (!start) {
            setStart(!start);
            resetStates();
        }
    }

    //Reset all the propety of palyer and gameboard functions to initial state
    function setPlayerAsStates() {
        return new Promise(resolve => {
            setTimeout(() => {
                resetGame(P1);
                resetGame(P2);
                resolve('resolved');
            }, 200);
        });
    }

    const resetStates = () => {
        setStart(!start);
        setWinner(false);
        setCurrentTurn([P1.turn, P1.isHuman]);
    }

    //Reset all states to initial value
    async function HandleRestartButton() {
        const cv1 = cv1Ref.current;
        const cv2 = cv2Ref.current;
        const ctx1 = cv1.getContext('2d');
        const ctx2 = cv2.getContext('2d');
        if (start) {
            await setPlayerAsStates();
            setCurrentTurn([P1.turn, P1.isHuman]);
            drawBoard(ctx1, SIZE, P1);
            drawBoard(ctx2, SIZE, P2);
            console.log(currentTurn);
            resetStates();
            console.log(currentTurn);
        }
    }

    const randomizeShipLocation = (e) => {
        const cv1 = cv1Ref.current;
        const cv2 = cv2Ref.current;
        const ctx1 = cv1.getContext('2d');
        const ctx2 = cv2.getContext('2d');
        if (e.target.id === 'randomize-p1') {
            randomize(P1);
            drawBoard(ctx1, SIZE, P1);
        } else {
            randomize(P2);
            drawBoard(ctx2, SIZE, P2);
        }
    }
    const toggleShipVisibility = (e) => {
        if (e.target.id.includes('p1')) {
            setToggleP1ShipVisibility(!toggleP1ShipVisibility);
        } else {
            setToggleP2ShipVisibility(!toggleP2ShipVisibility);
        }
    }
    //draw tiles for the board
    const drawSquare = (x, y, ctx, sz) => {
        ctx.fillStyle = 'rgb(7,67,114)';
        ctx.fillRect(x * sz, y * sz, sz, sz);
        ctx.strokeStyle = 'rgba(7,100,176,0.3)';
        ctx.strokeRect(x * sz, y * sz, sz, sz);
        ctx.lineWidth = 1;
    }

    const drawShip = (x, y, ctx, sz, len, direction) => {
        ctx.fillStyle = 'rgb(224,224,224)';
        ctx.strokeStyle = 'rgb(34,34,34)';
        for (let i = 0; i < len; i++) {
            direction === 0 ? ctx.fillRect(x * sz, y * sz, sz, sz * len) : ctx.fillRect(x * sz, y * sz, sz * len, sz);
        }
        direction === 0 ? ctx.strokeRect(x * sz, y * sz, sz, sz * len) : ctx.strokeRect(x * sz, y * sz, sz * len, sz);
    }

    //draw the game board
    const drawBoard = (ctx, sz, player) => {
        const SQR = sz * ((100 / 10) * 0.01); //square size of each coordinates
        const pos = player.gameboard.shipsOnTheBoard;
        const occupiedPos = player.gameboard.getOccupiedPos();
        const board = player.gameboard.board;
        ctx.clearRect(0, 0, SQR, SQR);
        board.forEach((row, r) => {
            row.forEach((col, c) => {
                //Auto visualize ships in AI board
                if(!toggleP1ShipVisibility && player.turn === true) {
                    drawSquare(c, r, ctx, SQR);
                    return;
                }
                if(!toggleP2ShipVisibility && player.turn === false) {
                    drawSquare(c, r, ctx, SQR);
                    return;
                }
                if (player.isHuman && occupiedPos.filter(o => o.x === r && o.y === c).length == 1) {
                    visualizeBoardForAIvsAI(pos, c, r, ctx, SQR);
                } else {
                    drawSquare(c, r, ctx, SQR);
                }
            })
        })
    }

    const visualizeBoardForAIvsAI = (pos, c, r, ctx, SQR) => {
        for (const ship of pos) {
            if (ship.pos[0].x === r && ship.pos[0].y === c) {
                if (ship.pos[0].x === r && ship.pos[1].x === r) {
                    drawShip(c, r, ctx, SQR, ship.pos.length, 1);
                } else {
                    drawShip(c, r, ctx, SQR, ship.pos.length, 0);
                }
            }
        }
    }

    //draw ship placements specifically for AI
    //Functionality during the game -> marks the attacked coordinates
    const simulateBattleship = (ctx, sz, player) => {
        const SQR = sz * ((100 / 10) * 0.01);
        const board = player.gameboard.board;
        //const occupiedPos = player.gameboard.getOccupiedPos();
        const recentAttackedPos = player.gameboard.getRecentCoordinate();
        board.forEach((row, r) => {
            row.forEach((col, c) => { //0 = unattacked, 1 = recency(by 1), 2 = already marked
                if (col[1] === 1) {
                    if (recentAttackedPos.x === r && recentAttackedPos.y === c) {
                        drawX(c + 1, r + 1, ctx, SQR, true);
                        drawCircle(c + 1, r + 1, ctx, SQR, true);
                    } else {
                        drawX(c + 1, r + 1, ctx, SQR, false);
                        drawCircle(c + 1, r + 1, ctx, SQR, false);
                    }
                    col[1] = 2;
                }
            })
        })
    }

    //Draw x on the board to indicate coordinate attack unavailability to the user
    const drawX = (x, y, ctx, sz, shipHit) => {
        ctx.beginPath();
        ctx.lineWidth = 2;
        //Reason: One-fourth reduction for clean scalability while board is crowded
        ctx.moveTo((x * sz) - (sz * (3 / 4)), (y * sz) - (sz * (3 / 4))); //0 + 1/4, 0 + 1/4
        ctx.lineTo((x * sz) - sz / 4, (y * sz) - sz / 4); // 30 - 1/4, 30 - 1/4

        ctx.moveTo((x * sz) - sz / 4, (y * sz) - (sz * (3 / 4))); //30 - 1/4, 0
        ctx.lineTo((x * sz) - (sz * (3 / 4)), (y * sz) - sz / 4); //0, 30 - 1/4
        ctx.strokeStyle = changeStrokeStyle(shipHit);
        ctx.stroke();
    }

    //Draw circle on the board
    const drawCircle = (x, y, ctx, sz, shipHit) => {
        const centerX = (x * sz - sz) + (sz / 2);
        const centerY = (y * sz - sz) + (sz / 2);
        const endAngle = Math.PI + (Math.PI * x) / 2;

        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.arc(centerX, centerY, sz / 3, 0, endAngle);
        ctx.strokeStyle = changeStrokeStyle(shipHit);
        ctx.stroke();
    }

    const changeStrokeStyle = (shipHit) => {
        return shipHit ? 'red' : 'rgb(77,166,215)';
    }

    //Output of canvas element
    const canvasContainer = (ref, size, id, player) => {
        return (
            <div className="base-container">
                {id === 'cv1' && player !== null ? playerInfo(player) : null}
                <div className="canvas-container">
                    <canvas
                        ref={ref}
                        className="cv"
                        id={id}
                        width={`${size}px`}
                        height={`${size}px`}
                    >

                    </canvas>
                    {!start && player.isHuman ? displayBeforeStartButtons(id) : null}
                </div>
                {id === 'cv2' && player !== null ? playerInfo(player) : null}
            </div>
        )
    }

    //Display the current resources or state of the player
    const playerInfo = (player) => {
        const currentShips = player.gameboard.getCurrentTotalShips();
        const currentOccupied = player.gameboard.getOccupiedPos().length;
        return (
            <div className="player-resource-container">
                <p>{player.displayName}</p>
                <div className="player-resources">
                    <i className="fas fa-ship"></i>
                    <p>{currentShips}/5</p>
                </div>
                <div className="player-resources">
                    <i className="fas fa-splotch"></i>
                    <p>{currentOccupied}/17</p>
                </div>
            </div>
        )
    }

    //Displays turn or final outcome for the user to see
    const displayTurnOrWinner = () => {
        if (!winner) {
            return (
                <p className="display-turn">
                    {P1.turn ? `${P1.displayName} turn` : `${P2.displayName} turn`}
                </p>
            )
        }
        return (
            <p className="display-victory">
                {P1.isWinner ? `${P1.displayName} wins!!` : `${P2.displayName} wins!!`}
            </p>
        )
    }

    //Possible instructions for the player or both parties.
    const displayInstruction = () => {
        if (winner) return (<h2>{'Game ended'}</h2>);
        if ((P1.isHuman || P2.isHuman) && start) return (<h2>{'Destroy the enemy\'s ships'}</h2>)
        if ((P1.isHuman || P2.isHuman) && !start) return (<h2>{'Place the ships'}</h2>)
        if (gamemode.value == 2 && !start) {
            return (<h2>{'Start the battle'}</h2>)
        }
        return (<h2>{'Get some popcorn'}</h2>)
    }

    //Buttons for gameboard property mutation
    const displayBeforeStartButtons = (id) => {
        return (
            <div className="button-container">
                <div id="p1-bottom-side">
                    <button
                        className="in-game-btn"
                        id={id === 'cv1' ? 'randomize-p1' : 'randomize-p2'}
                        onClick={randomizeShipLocation}
                    >
                        Randomize
                    </button>
                    <button
                        className="in-game-btn"
                        id={id === 'cv1' ? 'tglVsb-p1' : 'tglVsb-p2'}
                        onClick={toggleShipVisibility}
                    >
                        Toggle visibility
                    </button>
                </div>
            </div>
        )
    }

    const displayUpperButtons = () => {
        return (
            <div id="upper-button-container">
                <button
                    onClick={!start ? handleStartButton : HandleRestartButton}
                >
                    {!start ? <i className="fas fa-play"></i> : <i className="fas fa-redo-alt"></i>}

                </button>
                <button>
                    <i className="fas fa-eye"></i>
                </button>
            </div>
        )
    }

    //Initial render of empty gameboard
    useEffect(() => {
        const cv1 = cv1Ref.current;
        const cv2 = cv2Ref.current;
        const ctx1 = cv1.getContext('2d');
        const ctx2 = cv2.getContext('2d');
        drawBoard(ctx1, SIZE, P1);
        drawBoard(ctx2, SIZE, P2);
    }, [toggleP1ShipVisibility, toggleP2ShipVisibility])

    //Main side-effects of present gameplay
    useEffect(() => {
        const cv1 = cv1Ref.current;
        const cv2 = cv2Ref.current;
        const ctx1 = cv1.getContext('2d');
        const ctx2 = cv2.getContext('2d');
        const sz = SIZE * 0.1;

        //Feature availability: to track the current coordinates demanded with mouse event
        const getCursorPosition = (attacker, defender, cvs, event) => {
            const rect = cvs.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            return playerAttack(attacker, defender, Math.round((x - sz / 2) / sz), Math.round((y - sz / 2) / sz));
        }

        const humanAttack = (attacker, defender, cv, ctx) => {
            if (attacker.turn && start) {
                cv.addEventListener('mousedown', function handler(e) {
                    const attackedPosition = getCursorPosition(attacker, defender, cv, e);
                    if (attackedPosition) {
                        setFakeCount(fakeCount + 1);
                        return cv.removeEventListener('mousedown', handler);
                    }
                    simulateBattleship(ctx, SIZE, defender);
                    setCurrentTurn([defender.turn, defender.isHuman]);
                    cv.removeEventListener('mousedown', handler);
                })
            }
        }
        //Allow the human players to choose a coordinates to attack
        const startHumanAttack = () => {
            //Conditionally apply event listener
            humanAttack(P1, P2, cv2, ctx2);
            humanAttack(P2, P1, cv1, ctx1);
        }

        //start the round
        const startAiAttack = () => {
            if (P1.turn) {
                autoBattle(P1, P2);
                simulateBattleship(ctx2, SIZE, P2);
                setCurrentTurn([P2.turn, P2.isHuman]);
                return;
            } else if (P2.turn) {
                autoBattle(P1, P2);
                simulateBattleship(ctx1, SIZE, P1);
                setCurrentTurn([P1.turn, P1.isHuman]);
            }
        }

        //Delay attack
        async function attackDelay(ms) {
            setTimeout(() => {
                startAiAttack();
            }, ms)
            return;
        }

        //check which player is the current turn
        async function checkCurrentPlayerTurn() {
            if (P1.isWinner || P2.isWinner) {
                setWinner(true);
                return;
            }
            //index 0 refers to player turn, index 1 refers whether player is human
            if (!currentTurn[1] && currentTurn[0]) {
                await attackDelay(50);
            }
            if (currentTurn[1] && currentTurn[0]) {
                startHumanAttack();
            }
            return;
        }

        const startGame = () => {
            if (start && !winner) {
                checkCurrentPlayerTurn();
            }
        }
        startGame();
        console.log(start, 'Is current player human: ' + currentTurn[1]);
        return (() => {
            clearTimeout(attackDelay);
        })
    }, [currentTurn, start, fakeCount])

    return (
        <div id="Battle">
            <div id="upper-container">
                <ReturnToMenu />
                {displayUpperButtons()}
            </div>
            <div id="instructions-parent-container">
                <div id="instructions-wrapper">
                    {displayInstruction()}
                </div>
            </div>
            <div id="main-battle">
                {canvasContainer(cv1Ref, SIZE, "cv1", P1)}
                {P1 !== null || P2 !== null ? displayTurnOrWinner() : null}
                {canvasContainer(cv2Ref, SIZE, "cv2", P2)}
            </div>
        </div>
    )
}