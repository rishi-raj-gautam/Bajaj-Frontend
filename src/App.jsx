import React, { useState } from "react";
import Select from "react-select";
import axios from "axios";
import "tailwindcss/tailwind.css";

const options = [
  { value: "numbers", label: "Numbers" },
  { value: "highestAlphabet", label: "Highest Alphabet" }
];

const App = () => {
  const [inputData, setInputData] = useState('{"data":["M","1","334","4","B"]}');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [response, setResponse] = useState(null);

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(inputData);
      if (!parsedData.data || !Array.isArray(parsedData.data)) {
        alert("Invalid input format");
        return;
      }

      const res = await axios.post("https://bajaj-backend-gamma-eight.vercel.app/bfhl", parsedData);
      const { numbers, highest_alphabet } = res.data;

      let filteredResponse = {};
      selectedOptions.forEach((option) => {
        if (option.value === "numbers") filteredResponse.numbers = numbers;
        if (option.value === "highestAlphabet") filteredResponse.highestAlphabet = highest_alphabet;
      });

      setResponse(filteredResponse);
    } catch (error) {
      alert("Error processing request");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-lg w-full text-center p-5 bg-gray-100 shadow-md rounded-lg flex flex-col">
        <h1 className="text-2xl font-semibold mb-4">Bajaj Finserv Health Dev Challenge</h1>
        <div className="text-left w-full">
          <label className="block text-lg font-semibold mb-1">API Input</label>
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
          />
        </div>
        <button
          onClick={handleSubmit}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
        <h3 className="text-lg font-semibold mt-4">Multi Filter</h3>
        <Select
          options={options}
          isMulti
          onChange={setSelectedOptions}
          className="mt-2"
        />
        <h3 className="text-lg font-semibold mt-4">Filtered Response</h3>
        {response ? (
          <div className="mt-2 p-3 bg-white shadow rounded-md">
            {response.numbers && <p><strong>Numbers:</strong> {response.numbers.join(", ")}</p>}
            {response.highestAlphabet && <p><strong>Highest Alphabet:</strong> {response.highestAlphabet}</p>}
          </div>
        ) : (
          <p className="mt-2 text-gray-500">No data</p>
        )}
      </div>
    </div>
  );
};

export default App;
