import React from "react";
import "./Menu.scss";
import StrokeText from "../stroketext/StrokeText";

type MenuProps = {
    handleState: () => void;
    toggleMenu: () => void;
    update: ()=>void;
};

const Menu: React.FC<MenuProps> = ({ handleState, toggleMenu, update }) => {
    return (
        <div className="menu">
            <div className="menu-box">
                <button className="close" onClick={toggleMenu}>
                    <StrokeText
                        text="X"
                        fontFamily="'Inter', sans-serif"
                        color="#fff"
                        fontSize="25px"
                        fontStyle="italic"
                        fontWeight="900"
                        lineHeight="25px"
                        textAlign="left"
                        shadowColor="#000"
                        xOffset="0px"
                        yOffset="0px"
                        webkitTextStroke="5px black"
                    />
                </button>
                <button className="restart" onClick={()=>{toggleMenu();update();}}>
                    <StrokeText
                        text="RESTART"
                        fontFamily="'Inter', sans-serif"
                        color="#fff"
                        fontSize="25px"
                        fontStyle="italic"
                        fontWeight="900"
                        lineHeight="25px"
                        textAlign="left"
                        shadowColor="#000"
                        xOffset="0px"
                        yOffset="0px"
                        webkitTextStroke="5px black"
                    />
                </button>
                <button className="quit" onClick={handleState}>
                    <StrokeText
                        text="QUIT"
                        fontFamily="'Inter', sans-serif"
                        color="#fff"
                        fontSize="25px"
                        fontStyle="italic"
                        fontWeight="900"
                        lineHeight="25px"
                        textAlign="left"
                        shadowColor="#000"
                        xOffset="0px"
                        yOffset="0px"
                        webkitTextStroke="5px black"
                    />
                </button>
            </div>
        </div>
    );
};

export default Menu;
