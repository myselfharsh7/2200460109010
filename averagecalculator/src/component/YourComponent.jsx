import React, { useState, useEffect } from 'react';
import fetch from 'axios'; // Import fetch - Note: node-fetch might not work in the browser, you may need to use another HTTP client library like axios
const PORT = 9876;

function App() {
  const [numbers, setNumbers] = useState(new Set());

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("text server url"); // Replace "text server url" with the actual URL
        const data = await response.json();
        data.forEach(number => {
          if (number.qualifier === 'p' || number.qualifier === 'f' || number.qualifier === 'e' || number.qualifier === 'r') {
            setNumbers(prevNumbers => new Set([...prevNumbers, number.value]));
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []); // Empty dependency array to mimic componentDidMount behavior

  const calculateSumAndAverage = () => {
    const storeNumbers = Array.from(numbers);
    const sum = storeNumbers.reduce((acc, curr) => acc + curr, 0);
    const avg = sum / storeNumbers.length;
    return { sum, avg };
  };

  const { sum, avg } = calculateSumAndAverage();

  return (
    <div>
      <h1>Numbers App</h1>
      <p>Sum: {sum}</p>
      <p>Average: {avg}</p>
    </div>
  );
}

export default App;
