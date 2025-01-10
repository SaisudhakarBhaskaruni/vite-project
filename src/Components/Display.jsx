import React from "react";
import "./../styles/calculator.css";

const Display = ({ value }) => (
    <div className="display">{value || "0"}</div>
);

export default Display;
