import React, { useState } from "react";
import Select from "react-select";
import axios from "axios";
import "tailwindcss/tailwind.css";

const options = [
  { value: "numbers", label: "Numbers" },
  { value: "highestAlphabet", label: "Highest Alphabet" }
];

const App = () => {
  const [inputData, setInputData] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [response, setResponse] = useState(null);

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(inputData);
      if (!parsedData.data || !Array.isArray(parsedData.data)) {
        alert("Invalid input format");
        return;
      }

      const res = await axios.post(
        "https://bajaj-backend-gamma-eight.vercel.app/bfhl",
        parsedData
      );
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
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-black px-4">
    <h1 className="text-3xl font-semibold text-white text-center mb-6">Bajaj Finserv Health Dev Challenge</h1>
      <div className="max-w-lg w-full p-6 rounded-xl bg-white/10 shadow-2xl backdrop-blur-lg border border-white/30">
        
        
        
        <div className="text-left w-full">
          <label className="block font-medium text-white mb-1">API Input:</label>
          <input
            type="text"
            className="w-full p-3 border border-white/20 rounded-md bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
          />
        </div>

        
        <button
          onClick={handleSubmit}
          className="mt-5 w-full py-3 bg-blue-500 text-white text-lg font-medium rounded-lg hover:bg-blue-600 transition-all"
        >
          Submit
        </button>

        <h3 className="text-lg font-medium mt-6 text-white">Multi Filter</h3>
        <Select
          options={options}
          isMulti
          onChange={setSelectedOptions}
          className="mt-2"
        />

        
        <h3 className="text-lg font-medium mt-6 text-white">Filtered Response</h3>
        {response ? (
          <div className="mt-3 p-4 bg-white/20 shadow-lg rounded-lg border border-white/30 text-white">
            {response.numbers && <p><strong>Numbers:</strong> {response.numbers.join(", ")}</p>}
            {response.highestAlphabet && <p><strong>Highest Alphabet:</strong> {response.highestAlphabet}</p>}
          </div>
        ) : (
          <p className="mt-2 text-gray-400">No data</p>
        )}
      </div>
    </div>
  );
};

export default App;
