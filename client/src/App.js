import React from 'react';
import ParticleBackground from "./components/Particles/ParticleBackground";

function App() {
    return (
        <div className="App h-screen w-screen overflow-x-hidden">
            <ParticleBackground/>

            <header className="header h-fit py-2.5 px-3 mb-6">
                <h1 className="title text-5xl lg:text-8xl text-white text-center">Handwritten digits recognition</h1>
            </header>
            <main className="main grow">
                <div className={"canvas"}></div>
                <div className="w-full">
                    <div className="relative w-fit">
                        <h1 className={'container_title relative text-5xl text-white bg-black lg:text-8xl border border-sm border-white' +
                            ' rounded-bl-3xl text-center w-fit px-7 py-3 rounded-br-3xl z-[5]'}>Prediction is : ?</h1>
                        <div className="border-white absolute border left-5 top-5 w-full h-full rounded-br-3xl rounded-bl-3xl z-[3]"></div>
                    </div>
                    <div className="NN-visualization"></div>
                    <div className="buttons-container">
                        <button className={"predict-button"}>Predict</button>
                        <button className={"reset-button"}>Clear canvas</button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;
