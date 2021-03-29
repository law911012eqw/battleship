import React, { useState, useEffect, useRef } from 'react';

import ReturnToMenu from './ReturnToMenu';
import { Player1, Player2, autoBattle, turnCount } from '../scripts/main'

export default function Battle(gamemode, max) {
    const [width] = useState(window.innerWidth);

    //Player states
    const [P1] = useState(Player1);
    const [P2] = useState(Player2);
    const [turnCounter, setTurnCounter] = useState(turnCount);
    const [winner, setWinner] = useState(null);

    const SIZE = width * .30;

    const cv1Ref = useRef(null);
    const cv2Ref = useRef(null);

    console.log(Player1.aiLegalAtks);

    //draw tiles for the board
    const drawSquare = (x, y, ctx, sz) => {
        ctx.fillStyle = 'rgb(7,67,114)';
        ctx.fillRect(x * sz, y * sz, sz, sz);
        ctx.strokeStyle = 'rgba(7,100,176,0.3)';
        ctx.strokeRect(x * sz, y * sz, sz, sz);
    }

    //draw the game board
    const drawBoard = (ctx, sz, board) => {
        const SQR = sz * ((100 / 15) * 0.01);
        ctx.clearRect(width, width, width, width)
        board.forEach((row, r) => {
            row.forEach((col, c) => {
                drawSquare(c, r, ctx, SQR);
            })
        })
    }

    //Functionality during the game
    const simulateBattleship = (ctx, sz, board) => {
        const SQR = sz * ((100 / 15) * 0.01);
        board.forEach((row, r) => {
            // seconds = r * 10;
            row.forEach((col, c) => {
                if (col[1] === 1) {
                    drawX(c, r, ctx, SQR, false);
                    drawCircle(c, r, ctx, SQR);
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
            <div className="canvas-container">
                {id === 'cv1' ? playerInfo(player) : null}
                <canvas
                    ref={ref}
                    className="cv"
                    id={id}
                    width={`${size}px`}
                    height={`${size}px`}
                >
                </canvas>
                {id === 'cv2' ? playerInfo(player) : null}
            </div>
        )
    }

    //Display the current resources or state of the player
    const playerInfo = (player) => {
        const currentShips = player.gameboard.getCurrentTotalShips();
        const currentOccupied = player.gameboard.getOccupiedPos().length;
        return (
            <div className="player-resource-container">
                <div className="player-resources">
                    <i className="fas fa-ship"></i>
                    <p>{currentShips}/5</p>
                </div>
                <div className="player-resources">
                    <i classname="fas fa-splotch"></i>
                    <p>{currentOccupied}/17</p>
                </div>
            </div>
        )
    }
    const shipContainer = () => {

    }

    //Initial render of empty gameboard
    useEffect(() => {
        const cv1 = cv1Ref.current;
        const cv2 = cv2Ref.current;
        const ctx1 = cv1.getContext('2d');
        const ctx2 = cv2.getContext('2d');
        drawBoard(ctx1, SIZE, P1.gameboard.board);
        drawBoard(ctx2, SIZE, P2.gameboard.board);
    }, [])

    //Main side-effects of present gameplay
    useEffect(() => {
        const cv1 = cv1Ref.current;
        const cv2 = cv2Ref.current;
        const ctx1 = cv1.getContext('2d');
        const ctx2 = cv2.getContext('2d');

        //start the round
        const startRound = () => {
            if (winner !== true) {
                autoBattle(P1, P2);
                setTurnCounter(turnCount);
                return P1.getIsWinner() === true || P2.getIsWinner() === true ? true : false;
            }
        }
    
        //Delay attack
        async function attackDelay(ms) {
            setTimeout(()=>{
                checkCurrentPlayerTurn();
            }, ms)
            return;
        }

        //check which player is the current turn
        async function checkCurrentPlayerTurn() {
            await attackDelay(10000);
            if (P1.turn) {
                attack(ctx1, P1);
            } else {
                attack(ctx2, P2);
            }
            setWinner(startRound());
        }

        //attack the opponent
        function attack(ctx, p) {
            simulateBattleship(ctx, SIZE, p.gameboard.board);
        }
        checkCurrentPlayerTurn();
        return (() => {
            clearTimeout(attackDelay);
        })

    }, [P1, P2])

    return (
        <div id="Battle">
            <ReturnToMenu />
            <h1>Battle</h1>
            <div id="main-battle">
                {canvasContainer(cv1Ref, SIZE, "cv1", P1)}
                <p>{P1.turn ? `${P1.displayName} turn` : `${P2.displayName} turn`} </p>
                {canvasContainer(cv2Ref, SIZE, "cv2", P2)}
            </div>
        </div>
    )
}