import React from 'react';

function DisplayMessage({ text, color }) {
  return <h3 style={{ color: color }}>{text}</h3>
}

export default DisplayMessage;
