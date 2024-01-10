import React from 'react';


function App() {
    return (
        <div className="App h-screen w-screen overflow-x-hidden">
            <header className="header h-1/5">
                <h1 className="title">Handwritten digits recognition</h1>
            </header>
            <main className="main grow">
                <div className={"canvas"}></div>
                <div className="container">
                    <h1 className={'container title'}>Prediction is : </h1>
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
