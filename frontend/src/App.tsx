import React from "react";
import "./App.scss";
import Homepage from "./pages/homepage/Homepage";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Gamepage from "./pages/Gamepage";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Homepage />}/>
                <Route path="/game" element={<Gamepage/>} />
            </Routes>
        </>
    );
}

export default App;
