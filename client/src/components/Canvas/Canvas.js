import React, {useEffect, useRef, useState} from 'react';

const Canvas = (props) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    }, []);

    const startDrawing = () => {

    }

    const finishDrawing = () => {

    }

    const draw = () => {

    }

    return (
        <canvas ref={canvasRef}
                {...props}>

        </canvas>
    );
};

export default Canvas;