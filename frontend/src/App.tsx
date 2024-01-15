import React, { useState } from "react";
import "./App.scss";
import Homepage from "./pages/homepage/Homepage";
import Gamepage from "./pages/gamepage/Gamepage";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD2xW0cH_eqGiTUWzttBPQY_Kgk175017o",
    authDomain: "gauchoguessr-ee340.firebaseapp.com",
    projectId: "gauchoguessr-ee340",
    storageBucket: "gauchoguessr-ee340.appspot.com",
    messagingSenderId: "218457441803",
    appId: "1:218457441803:web:56aacaa10ccc00d2a5290e",
    measurementId: "G-82Q1BD6MRS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

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
