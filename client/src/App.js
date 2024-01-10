import React from 'react';


// Classname's are approximate - clarifying
function App() {
    return (
        <div className="App">
            <header className="header">
                <h1 className="title">Handwritten digits recognition</h1>
            </header>
            <main className="main">
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
