import React, {useEffect, useRef, useState} from 'react';

const Canvas = (props) => {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        context.lineCap = 'round';
        context.lineWidth = 5;
        context.strokeStyle = 'black';
        contextRef.current = context;
    }, []);

    const startDrawing = ({nativeEvent}) => {
        const {offsetX, offsetY} = nativeEvent;

        setIsDrawing(true);
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
    }

    const finishDrawing = () => {
        setIsDrawing(false);
    }

    const draw = () => {

    }

    return (
        <canvas ref={canvasRef}
                {...props}
                onMouseDown={startDrawing}>

        </canvas>
    );
};

export default Canvas;