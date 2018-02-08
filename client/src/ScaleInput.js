import React from "react";

const ScaleInput = ({ value, handleChange }) => (
  <input
    name="scale"
    type="number"
    value={value}
    min="10"
    max="50"
    onChange={handleChange}
  />
);

export default ScaleInput;
