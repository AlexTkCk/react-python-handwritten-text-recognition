import React, {useRef, useState} from 'react';
import ParticleBackground from "./components/Particles/ParticleBackground";
import Canvas from "./components/Canvas/Canvas";

function App() {

    const canvasRef = useRef(null);
    const [predictedDigit, setPredictedDigit] = useState('?');

    const clearCanvasHandler = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    }

    const predictHandler = () => {
        const imageDataURL = canvasRef.current.toDataURL('image/png');

        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                imageBase64: imageDataURL
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        fetch('http://localhost:8080/predict', requestOptions)
            .then(res => res.json())
            .then(({prediction}) => setPredictedDigit(prediction));

    }

    return (
        <div className="App h-screen w-screen overflow-x-hidden flex flex-col">
            <ParticleBackground/>

            <header className="header h-fit py-2.5 px-3 mb-6">
                <h1 className="title text-5xl md:text-8xl text-white text-center">Handwritten digits recognition</h1>
            </header>
            <main className="main grow flex flex-col md:flex-row justify-center items-center gap-5 ">
                <Canvas canvasRef={canvasRef} className={"h-3/4 mx-auto aspect-square bg-white"}/>
                <div className="w-1/2 flex flex-col items-center justify-evenly h-full">
                    <div className="relative w-fit mb-10">
                        <h1 className={'container_title relative text-3xl text-white bg-black lg:text-5xl border border-sm border-white' +
                            ' rounded-bl-3xl text-center w-fit px-7 py-3 rounded-br-3xl z-[5]'}>Prediction is : {predictedDigit}</h1>
                        <div className="border-white absolute border left-5 top-5 w-full h-full rounded-br-3xl rounded-bl-3xl z-[3]"></div>
                    </div>
                    <div className="NN-visualization"></div>
                    <div className="buttons-container flex flex-col md:flex-row gap-5 items-center pb-3">
                        <button onClick={predictHandler} className={"predict-button text-3xl lg:text-6xl text-center bg-white text-black px-5 py-2.5 w-fit rounded-xl"}>Predict</button>
                        <button onClick={clearCanvasHandler} className={"reset-button text-3xl lg:text-6xl text-center bg-white text-black px-5 py-2.5 w-fit rounded-xl"}>Clear</button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;
