import React from "react";
import "./StrokeText.scss";

interface StrokeTextProps {
    text: string;
    fontFamily: string;
    color: string;
    fontSize: string;
    fontStyle: React.CSSProperties["fontStyle"];
    fontWeight: React.CSSProperties["fontWeight"];
    lineHeight: string;
    textAlign: React.CSSProperties["textAlign"];
    shadowColor: string; // New property for shadow color
    xOffset: string; // New property for horizontal shadow offset
    yOffset: string; // New property for vertical shadow offset
    webkitTextStroke: string;
}

const StrokeText: React.FC<StrokeTextProps> = ({
    text,
    fontFamily,
    color,
    fontSize,
    fontStyle,
    fontWeight,
    lineHeight,
    textAlign,
    shadowColor,
    xOffset,
    yOffset,
    webkitTextStroke,
}) => {
    const textStyles: React.CSSProperties = {
        fontFamily,
        color,
        fontSize,
        fontStyle,
        fontWeight,
        lineHeight,
        textAlign,
    };

    const shadowStyles: React.CSSProperties = {
        ...textStyles,
        position: "absolute",
        top: yOffset,
        left: xOffset,
        color: shadowColor,
        zIndex: 1,
        WebkitTextStroke: webkitTextStroke,
    };

    const strokeStyles: React.CSSProperties = {
        ...textStyles,
        WebkitTextStroke: webkitTextStroke,
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 2,
        color: "transparent",
        pointerEvents: "none",
    };

    return (
        <div
            className="text-container"
            style={{
                position: "relative",
                display: "inline-block",
            }}
        >
            {/* Shadow text */}
            <div className="stroke-text text-shadow" style={shadowStyles}>
                {text}
            </div>
            {/* Stroked text */}
            <div className="stroke-text text-stroke" style={strokeStyles}>
                {text}
            </div>
            {/* Regular text */}
            <div className="stroke-text text" style={textStyles}>
                {text}
            </div>
        </div>
    );
};

export default StrokeText;
