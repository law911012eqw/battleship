import React, { useState, useEffect, useRef } from 'react';

import ReturnToMenu from './ReturnToMenu';
import { Player1, Player2, autoBattle, turnCount, randomize } from '../scripts/main'

export default function Battle({ gamemode, difficulty }) {
    const [width] = useState(window.innerWidth);

    //Player states
    const [turnCounter, setTurnCounter] = useState(turnCount);
    const [winner, setWinner] = useState(null);
    const [P1,] = useState(Player1);
    const [P2,] = useState(Player2);

    //Possible nstructions for the player or both parties.
    const instructions = ['Place the ships', 'Start the game', 'Destroy the enemy\'s ships', 'Just watch'];
    const [start, setStart] = useState(false);

    //Immutable variable
    const SIZE = width * .26;

    //Canvas
    const cv1Ref = useRef(null);
    const cv2Ref = useRef(null);

    const handleStartButton = () => {
        if (!start) {
            setStart(true);
        }
    }

    const randomizeShipLocation = (e) => {
        const cv1 = cv1Ref.current;
        const cv2 = cv2Ref.current;
        const ctx1 = cv1.getContext('2d');
        const ctx2 = cv2.getContext('2d');
        console.log(e.target.id);
        if (e.target.id === 'randomize-p1') {
            randomize(P1);
            drawBoard(ctx1, SIZE, P1);
        } else {
            randomize(P2);
            drawBoard(ctx2, SIZE, P2);
        }
    }
    //draw tiles for the board
    const drawSquare = (x, y, ctx, sz) => {
        ctx.fillStyle = 'rgb(7,67,114)';
        ctx.fillRect(x * sz, y * sz, sz, sz);
        ctx.strokeStyle = 'rgba(7,100,176,0.3)';
        ctx.strokeRect(x * sz, y * sz, sz, sz);
    }

    const drawShip = (x, y, ctx, sz, len, direction) => {
        ctx.fillStyle = 'rgb(224,224,224)';
        ctx.strokeStyle = 'rgb(0,0,0)';
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

        board.forEach((row, r) => {
            row.forEach((col, c) => {
                //Auto visualize ships in AI board
                if (occupiedPos.filter(o => o.x === r && o.y === c).length !== 1) {
                    drawSquare(c, r, ctx, SQR);
                }
                visualizeBoardForAIvsAI(pos, c, r, ctx, SQR);
            })
        })
    }

    const visualizeBoardForAIvsAI = (player, pos, c, r, ctx, SQR) => {
        if (player.isHuman == false && pos.filter(o => o.pos[0].x === r && o.pos[0].y === c).length == 1) {
            for (const ship of pos) {
                if (ship.pos[0].x === r && ship.pos[0].y === c) {
                    if (ship.pos[0].x === r && ship.pos[1].x === r) {
                        drawShip(c, r, ctx, SQR, ship.pos.length, 1)
                    } else {
                        drawShip(c, r, ctx, SQR, ship.pos.length, 0);
                    }
                }
            }
        }
    }

    //Feature availability: to track the current coordinates demanded with mouse event
    // function getCursorPosition(canvas, event) {
    //     const rect = canvas.getBoundingClientRect()
    //     const x = event.clientX - rect.left
    //     const y = event.clientY - rect.top
    //     console.log("x: " + x + " y: " + y)
    // }

    // const canvas = document.querySelector('canvas')
    // canvas.addEventListener('mousedown', function(e) {
    //     getCursorPosition(canvas, e)
    // })

    //draw ship placements specifically for AI
    //Functionality during the game -> marks the attacked coordinates
    const simulateBattleship = (ctx, sz, player) => {
        const SQR = sz * ((100 / 10) * 0.01);
        const board = player.gameboard.board;
        //const occupiedPos = player.gameboard.getOccupiedPos();
        const recentAttackedPos = player.gameboard.getRecentCoordinate();
        console.log(recentAttackedPos);
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
                    {!start ? displayBeforeStartButtons(id) : null}
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
    const shipContainer = () => {

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
                        onClick={handleStartButton}
                    >
                        Start Game
                    </button>
                </div>
            </div>
        )
    }

    //Initial render of empty gameboard
    useEffect(() => {
        const cv1 = cv1Ref.current;
        const cv2 = cv2Ref.current;
        console.log(cv1, cv2);
        const ctx1 = cv1.getContext('2d');
        const ctx2 = cv2.getContext('2d');
        drawBoard(ctx1, SIZE, P1);
        drawBoard(ctx2, SIZE, P2);
    }, [])

    //Main side-effects of present gameplay
    useEffect(() => {
        const cv1 = cv1Ref.current;
        const cv2 = cv2Ref.current;
        const ctx1 = cv1.getContext('2d');
        const ctx2 = cv2.getContext('2d');
        //start the round
        const startRound = () => {
            autoBattle(P1, P2);
            setTurnCounter(turnCount);
        }

        //Delay attack
        async function attackDelay(ms) {
            setTimeout(() => {
                checkCurrentPlayerTurn();
            }, ms)
            return;
        }

        //check which player is the current turn
        async function checkCurrentPlayerTurn() {
            if (P1.isWinner !== true || P2.isWinner !== true) {
                await attackDelay(500);
                if (P1.turn) {
                    simulateBattleship(ctx2, SIZE, P2);
                } else if (P2.turn) {
                    simulateBattleship(ctx1, SIZE, P1);
                }
                setWinner(startRound());
            }
            else {
                return;
            }
        }

        const startGame = () => {
            if (start) {
                checkCurrentPlayerTurn();
            }
        }
        console.log(start);
        startGame();

        return (() => {
            clearTimeout(attackDelay);
        })

    }, [start])

    return (
        <div id="Battle">
            <ReturnToMenu />
            <div id="main-battle">
                {canvasContainer(cv1Ref, SIZE, "cv1", P1)}
                {P1 !== null || P2 !== null ? displayTurnOrWinner() : null}
                {canvasContainer(cv2Ref, SIZE, "cv2", P2)}
            </div>
        </div>
    )
}