import React from "react";

export default function Menu() {
    return (
        <div>
            <button className="close"></button>
            <div className="options-wrapper">
                <button className="restart"></button>
                <button className="quit"></button>
            </div>
        </div>
    );
}
