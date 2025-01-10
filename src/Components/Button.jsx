import React from "react";
import "./../styles/calculator.css";

const Button = ({ label, onClick, className = "" }) => (
    <button className={`button ${className}`} onClick={onClick}>
        {label}
    </button>
);

export default Button;
