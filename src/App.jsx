import React, { useState } from "react";
import Display from "./components/Display.jsx";
import Button from "./components/Button.jsx";
import ConfettiExplosion from "react-confetti-explosion";
import "./styles/App.css"; // You can define your light and dark mode styles in this CSS file

const App = () => {
    const [input, setInput] = useState("");
    const [result, setResult] = useState("");
    const [confetti, setConfetti] = useState(false);
    const [memory, setMemory] = useState(0); // Memory for MC, M+, M-, MR
    const [isRadians, setIsRadians] = useState(true); // Toggle between radians and degrees
    const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode
    const [history, setHistory] = useState([]); // State for storing history

    const factorial = (n) => (n <= 1 ? 1 : n * factorial(n - 1));

    const evaluateExpression = () => {
        try {
            let expression = input
                .replace("×", "*")
                .replace("÷", "/")
                .replace("sin", `Math.sin`)
                .replace("cos", `Math.cos`)
                .replace("tan", `Math.tan`)
                .replace("log", `Math.log10`)
                .replace("ln", `Math.log`)
                .replace("π", Math.PI)
                .replace("e", Math.E)
                .replace("Rand", Math.random())
                .replace("!", "factorial");

            // Handle radian-degree toggle for trigonometric functions
            if (!isRadians) {
                expression = expression.replace(/Math\.(sin|cos|tan)\((.*?)\)/g, (match, func, angle) =>
                    `Math.${func}(((${angle}) * Math.PI) / 180)`
                );
            }

            const evalResult = eval(expression);

            if (input.includes("99") && input.includes("33")) {
                setConfetti(true);
                setTimeout(() => setConfetti(false), 2000);
            }

            setResult(evalResult);
            setInput(String(evalResult));

            // Add current expression and result to history
            setHistory([{ expression: input, result: evalResult }, ...history]);

        } catch {
            setResult("Error");
        }
    };

    const handleButtonClick = (value) => {
        if (value === "=") {
            evaluateExpression();
        } else if (value === "C") {
            setInput("");
            setResult("");
        } else if (value === "DEL") {
            setInput(input.slice(0, -1));
        } else if (value === "Rad") {
            setIsRadians(!isRadians);
        } else if (value === "mc") {
            setMemory(0);
        } else if (value === "m+") {
            setMemory(memory + parseFloat(result || input || "0"));
        } else if (value === "m-") {
            setMemory(memory - parseFloat(result || input || "0"));
        } else if (value === "mr") {
            setInput(String(memory));
        } else if (value === "x²") {
            setInput(`${input}**2`);
        } else if (value === "x³") {
            setInput(`${input}**3`);
        } else if (value === "xʸ") {
            setInput(`${input}**`);
        } else if (value === "¹/x") {
            setInput(`1/(${input})`);
        } else if (value === "²√x") {
            setInput(`Math.sqrt(${input})`);
        } else if (value === "³√x") {
            setInput(`Math.cbrt(${input})`);
        } else if (value === "ʸ√x") {
            setInput(`${input}**(1/`);
        } else if (value === "eˣ") {
            setInput(`Math.exp(${input})`);
        } else if (value === "10ˣ") {
            setInput(`10**(${input})`);
        } else {
            setInput(input + value);
        }
    };

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div className={`calculator ${isDarkMode ? "dark" : "light"}`}>
            <div className="theme-toggle">
                <button onClick={toggleTheme}>
                    {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                </button>
            </div>
            <Display value={result || input} />
            {confetti && <ConfettiExplosion />}
            <div className="buttons">
                {[
                    "(", ")",
                    "mc", "m+", "m-", "mr",
                    "C", "+/-", "%", "÷",
                    "2nd", "x²", "x³", "xʸ", "eˣ", "10ˣ",
                    "7", "8", "9", "×",
                    "¹/x", "²√x", "³√x", "ʸ√x", "ln", "log₁₀",
                    "4", "5", "6", "-",
                    "x!", "sin", "cos", "tan", "e", "E",
                    "1", "2", "3", "+",
                    "Rad", "sinh", "cosh", "tanh", "π", "Rand",
                    "0", ".", "=",
                ].map((btn) => (
                    <Button
                        key={btn}
                        label={btn}
                        onClick={() => handleButtonClick(btn)}
                        className={
                            btn === "0"
                                ? "double-button"
                                : ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].includes(btn)
                                    ? "number"
                                    : ["+", "×", "-", "÷", "="].includes(btn)
                                        ? "special"
                                        : ""
                        }
                    />
                ))}
            </div>
            <div className="history">
                <h3>History</h3>
                {history.length > 0 ? (
                    <ul>
                        {history.map((item, index) => (
                            <li key={index}>
                                <strong>{item.expression}</strong> = {item.result}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No history yet</p>
                )}
            </div>
        </div>
    );
};

export default App;
