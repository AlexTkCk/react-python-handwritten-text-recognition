import React, {useEffect, useRef, useState} from 'react';

const Canvas = (props) => {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        context.lineCap = 'round';
        context.strokeStyle = 'black';
        context.lineWidth = 20;
        contextRef.current = context;
    }, []);

    const startDrawing = ({nativeEvent}) => {
        const {offsetX, offsetY} = nativeEvent;
        setIsDrawing(true);
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
    }

    const finishDrawing = () => {
        contextRef.current.closePath();
        setIsDrawing(false);
    }

    const draw = ({nativeEvent}) => {
        if (!isDrawing) {
            return
        }
        const {offsetX, offsetY} = nativeEvent;
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke()
    }

    const startDrawingTouch = (e) => {
        const {clientX, clientY} = e.changedTouches[0];
        const canvasRect = e.target.getBoundingClientRect();

        const offsetX = clientX - canvasRect.left;
        const offsetY = clientY - canvasRect.top;

        setIsDrawing(true);
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
    }


    const drawTouch = (e) => {
        if (!isDrawing) {
            return
        }
        const {clientX, clientY} = e.changedTouches[0];
        const canvasRect = e.target.getBoundingClientRect();

        const offsetX = clientX - canvasRect.left;
        const offsetY = clientY - canvasRect.top;
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke()
    }

    return (
        <canvas ref={canvasRef}
                {...props}
                onMouseDown={startDrawing}
                onMouseUp={finishDrawing}
                onMouseMove={draw}
                onTouchStart={startDrawingTouch}
                onTouchMove={drawTouch}
                onTouchEnd={finishDrawing}
        >

        </canvas>
    );
};

export default Canvas;