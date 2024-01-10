import React, {useEffect, useRef} from 'react';

const Canvas = (props) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    }, []);

    return (
        <canvas ref={canvasRef} {...props}>
            
        </canvas>
    );
};

export default Canvas;