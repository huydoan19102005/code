import React, { useReducer } from "react";
import { Button } from "react-bootstrap";
import { useTheme } from "../contexts/ThemeContext";

const initialState = { count: 0 };
function reducer(state, action) {
  switch (action.type) {
    case "increment": return { count: state.count + 1 };
    case "decrement": return { count: state.count - 1 };
    case "reset":     return initialState;
    default:          return state;
  }
}

export default function CounterComponent() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { theme, toggleTheme } = useTheme();

  const buttonStyle = {
    margin: "5px", padding: "10px 20px", borderRadius: "6px",
    border: "none", cursor: "pointer", fontWeight: "bold", fontSize: "16px"
  };

  return (
    <div style={{ padding: 20, border: "1px solid #ccc" }}>
      <h2>Bộ Đếm Đa Năng</h2>
      <p style={{ fontSize: 24, fontWeight: "bold" }}>Giá trị hiện tại: {state.count}</p>

      <Button
        onClick={toggleTheme}
        style={{
          ...buttonStyle,
          background: theme === "light" ? "#6c757d" : "#f8f9fa",
          color: theme === "light" ? "#ffffff" : "#000000",
        }}
      >
        {theme === "light" ? "Dark" : "Light"}
      </Button>

      <Button onClick={() => dispatch({ type: "increment" })}
              style={{ ...buttonStyle, background: "#007bff", color: "#fff" }}>
        Tăng (+1)
      </Button>
      <Button onClick={() => dispatch({ type: "decrement" })}
              style={{ ...buttonStyle, background: "#ffc107", color: "#333" }}>
        Giảm (-1)
      </Button>
      <Button onClick={() => dispatch({ type: "reset" })}
              style={{ ...buttonStyle, background: "red", color: "#fff" }}>
        Reset
      </Button>
    </div>
  );
}
