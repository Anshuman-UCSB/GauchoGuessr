import React from "react";
import "./Progress.scss";

// Define the interface for the component props
interface ProgressProps {
    index: number;
    score?: number | null;
    time?: string | null;
    position?: "start" | "end"; // position can only be 'start' or 'end'
}

// Define the Progress component with index, score, time, and position props
const Progress: React.FC<ProgressProps> = ({
    index,
    score,
    time,
    position,
}) => {
    // Construct the class name based on the props
    const className = `prog-rect${
        index !== undefined ? ` index-${index}` : ""
    }${position ? ` ${position}` : ""}`;

    return (
        <div className={className}>
            <div className="text-wrapper">
                <h2>{score !== undefined ? score?.toLocaleString() : "N/A"}</h2>
                <h3>{time ?? "N/A"}</h3>
            </div>
        </div>
    );
};

export default Progress;
