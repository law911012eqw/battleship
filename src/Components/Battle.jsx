import React, { useState, useEffect, useRef } from 'react';

import ReturnToMenu from './ReturnToMenu';
import main from '../scripts/main'

export default function Battle() {
    const [width] = useState(window.innerWidth);
    const [height] = useState(window.innerHeight);
    const [boardWidth] = useState(10);
    const [boardHeight] = useState(10);
    const cv1Ref = useRef(null);
    const cv2Ref = useRef(null);

    const drawStrokeRect = (bw, bh, w, ctx1, ctx2) => {
        const size = width * .20;
        const tileSize = 0.1 * size;
        ctx1.strokeStyle = 'black';
        ctx2.strokeStyle = 'black';
        for (let i = 0; i < bw; i++) {
            ctx1.strokeRect((i+1*bw + size) - tileSize, i+1*bw + size, w / 10, w / 10);
            ctx2.strokeRect((i+1*bw + size) - tileSize, i+1*bw + size, w / 10, w / 10);
            for (let j = 0; j < bh; j++) {
                ctx1.strokeRect(w / 10, w / 10, w / 10, w / 10);
                ctx2.strokeRect(w / 10, w / 10, w / 10, w / 10);
            }
        }
    }
    useEffect(() => {
        const cv1 = cv1Ref.current;
        const cv2 = cv2Ref.current;
        const ctx1 = cv1.getContext('2d');
        const ctx2 = cv2.getContext('2d');
        drawStrokeRect(boardWidth, boardHeight, width, ctx1, ctx2);
    }, [])
    return (
        <div id="Battle">
            <ReturnToMenu />
            <h1>Battle</h1>
            <div id="main-battle">
                <div>
                    <canvas
                        ref={cv1Ref}
                        className="cv"
                        id="cv1"
                        width={`${width * 0.20}px`}
                        height={`${width * 0.20}px`}
                    >

                    </canvas>
                </div>
                <div>
                    <canvas
                        ref={cv2Ref}
                        className="cv"
                        id="cv2"
                        width={`${width * 0.20}px`}
                        height={`${width * 0.20}px`}
                    >
                    </canvas>
                </div>
            </div>
        </div>
    )
}