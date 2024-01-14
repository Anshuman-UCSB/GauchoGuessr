import React, { useState } from "react";
import "./App.scss";
import Homepage from "./pages/homepage/Homepage";
import Gamepage from "./pages/gamepage/Gamepage";

function App() {
    const [state, setState] = useState(1);

    const handleState = () => {
        setState((prevState) => (prevState === 1 ? 2 : 1));
    };
    return (
        <div className="App">
            {state === 1 && <Homepage handleState={handleState} />}
            {state === 2 && <Gamepage handleState={handleState} />}
        </div>
    );
}

export default App;
