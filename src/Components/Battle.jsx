import React, { useState, useEffect, useRef } from 'react';

import ReturnToMenu from './ReturnToMenu';
import { Player1, Player2 } from '../scripts/main'

export default function Battle(gamemode, max) {
    const [width] = useState(window.innerWidth);

    const [P1] = useState(Player1);
    const [P2] = useState(Player2);

    const SIZE = width * .30;

    const cv1Ref = useRef(null);
    const cv2Ref = useRef(null);


    //draw tiles for the board
    const drawSquare = (x, y, ctx, sz) => {
        ctx.fillStyle = 'rgb(7,67,114)';
        ctx.fillRect(x * sz, y * sz, sz, sz);
        ctx.strokeStyle = 'rgba(7,100,176,0.3)';
        ctx.strokeRect(x * sz, y * sz, sz, sz);
    }

    //draw the game board
    const drawBoard = (ctx, sz, board) => {
        const SQR = 0.1 * sz;
        ctx.clearRect(width,width,width,width)
        board.forEach((row, r) => {
            row.forEach((col, c) => {
                if(col[1] === 0){
                    drawX(c, r, ctx, SQR);
                }
                drawSquare(c, r, ctx, SQR);
            })
        })
    }

    const drawX = (x, y, ctx, sz) => {
        ctx.beginPath();

        ctx.moveTo((x * sz/2) - 20, (y * sz) - 20);
        ctx.lineTo((x * sz/2) + 20, (y * sz) + 20);

        ctx.moveTo((x * sz/2) + 20, (y * sz) - 20);
        ctx.lineTo((x * sz/2) - 20, (y * sz) + 20);
        ctx.strokeStyle = 'rgb(77,176,210)';
        ctx.stroke();
    }
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
    const playerInfo = (player) => {
        const currentShips = player.gameboard.currentTotalShips;
        const currentOccupied = player.gameboard.getOccupiedPos().length;
        return(
            <div className="player-resource-container">
                <div className="player-resources">
                    <i class="fas fa-ship"></i>
                    <p>{currentShips}/5</p>
                </div>
                <div className="player-resources">
                    <i class="fas fa-splotch"></i>
                    <p>{currentOccupied}/17</p>
                </div>
                <p>{player.turn ? 'YOU' : 'NOT YOU'} </p>
            </div>
        )
    }
    const shipContainer = () => {

    }
    useEffect(() => {
        const cv1 = cv1Ref.current;
        const cv2 = cv2Ref.current;
        const ctx1 = cv1.getContext('2d');
        const ctx2 = cv2.getContext('2d');
        drawBoard(ctx1, SIZE, P1.gameboard.board);
        drawBoard(ctx2, SIZE, P2.gameboard.board);
    }, [])
    useEffect(()=>{
        const cv1 = cv1Ref.current;
        const cv2 = cv2Ref.current;
        const ctx1 = cv1.getContext('2d');
        const ctx2 = cv2.getContext('2d');
        drawBoard(ctx1, SIZE, P1.gameboard.board);
        drawBoard(ctx2, SIZE, P2.gameboard.board);
    }, [P1,P2])
    return (
        <div id="Battle">
            <ReturnToMenu />
            <h1>Battle</h1>
            <div id="main-battle">
                {canvasContainer(cv1Ref, SIZE, "cv1", P1)}
                {canvasContainer(cv2Ref, SIZE, "cv2", P2)}
            </div>
        </div>
    )
}