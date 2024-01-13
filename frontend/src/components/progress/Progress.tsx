import React from "react";

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
    const className = `prog-rect${index !== undefined ? ` ${index}` : ""}${
        position ? ` ${position}` : ""
    }`;

    return (
        <div className={className}>
            {index !== undefined && <div>Index: {index}</div>}
            <div>Score: {score !== null ? score?.toLocaleString() : "N/A"}</div>
            <div>Time: {time ?? "N/A"}</div>
        </div>
    );
};

export default Progress;
