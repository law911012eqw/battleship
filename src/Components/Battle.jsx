import React, { useState, useEffect, useRef } from 'react';

import ReturnToMenu from './ReturnToMenu';
import { P1, P2 } from '../scripts/main'

export default function Battle() {
    const [width] = useState(window.innerWidth);
    const BOARDWIDTH = P1.gameboard.width;
    const BOARDHEIGHT = P1.gameboard.height;
    const cv1Ref = useRef(null);
    const cv2Ref = useRef(null);
    const SIZE = width * .20;
    console.log(BOARDHEIGHT, BOARDWIDTH);
    //draw tiles for the board
    const drawSquare = (x, y, ctx, sz) => {
        ctx.fillStyle = 'blue';
        ctx.strokeStyle = 'rgba(34,34,34,0.3)';
        ctx.strokeRect(x * sz, y * sz, sz, sz);
    }

    //draw the game board
    const drawBoard = (ctx, sz, board) => {
        const SQR = 0.1 * sz;
        ctx.clearRect(width,width,width,width)
        board.forEach((row, r) => {
            row.forEach((col, c) => {
                if(col[1] === 1){
                    drawX(c, r, ctx, SQR);
                }
                drawSquare(c, r, ctx, SQR);
            })
        })
    }

    const drawX = (x, y, ctx, sz) => {
        ctx.beginPath();

        ctx.moveTo((x * sz) - 20, (y * sz) - 20);
        ctx.lineTo((x * sz) + 20, (y * sz) + 20);

        ctx.moveTo((x * sz) + 20, (y * sz) - 20);
        ctx.lineTo((x * sz) - 20, (y * sz) + 20);
        ctx.stroke();
    }
    const canvasContainer = (ref, size, id) => {
        return (
            <div>
                <canvas
                    ref={ref}
                    className="cv"
                    id={id}
                    width={`${size}px`}
                    height={`${size}px`}
                >

                </canvas>
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
    return (
        <div id="Battle">
            <ReturnToMenu />
            <h1>Battle</h1>
            <div id="main-battle">
                {canvasContainer(cv1Ref, SIZE, "cv1")}
                {canvasContainer(cv2Ref, SIZE, "cv2")}
                {/* <div>
                    <canvas
                        ref={cv1Ref}
                        className="cv"
                        id="cv1"
                        width={`${SIZE}px`}
                        height={`${SIZE}px`}
                    >

                    </canvas>
                    <div></div>
                </div>
                <div>
                    <canvas
                        ref={cv2Ref}
                        className="cv"
                        id="cv2"
                        width={`${SIZE}px`}
                        height={`${SIZE}px`}
                    >
                    </canvas>
                    <div></div>
                </div> */}
            </div>
        </div>
    )
}