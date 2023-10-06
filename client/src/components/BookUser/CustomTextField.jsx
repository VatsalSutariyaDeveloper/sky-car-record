import React, { useState, useEffect } from 'react';
import "../../index.css";
import Select from 'react-select';


const CustomTextField = ({ type, label, name, value, onChange, minDate }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (name === 'carName') {
        try {
          const response = await fetch('http://localhost:3000/car/car-name');
          if (!response.ok) {
            throw new Error('Failed to fetch carName options');
          }
          const data = await response.json();
          setOptions(data.data);
        } catch (error) {
          console.error('Error fetching carName options:', error);
        }
      } else if (name === 'numberPlate') {
        try {
          const response = await fetch('http://localhost:3000/car/number-plate');
          if (!response.ok) {
            throw new Error('Failed to fetch numberPlate options');
          }
          const data = await response.json();
          setOptions(data.data);
        } catch (error) {
          console.error('Error fetching numberPlate options:', error);
        }
      }
    };

    fetchData();
  }, [name]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so add 1
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    onChange(name, newValue);
  };

  const handleSelectboxChange = (selectedOption) => {
    const newValue = selectedOption ? selectedOption.value : null;
    onChange(name, newValue);
  };

  const handleNumberKeyPress = (e) => {
    const charCode = e.which ? e.which : e.keyCode;
    const inputValue = e.target.value;
    if (charCode < 48 || charCode > 57) {
      e.preventDefault();
    }
    if (inputValue.length >= 10) {
      e.preventDefault();
    }
  };

  return (
    <div className="">
      <div className="flex md:w-96 flex-col items-end mt-6">
        <div className="relative h-10 w-full min-w-[200px]">
          {type === 'date' ? (
            <input
              type={type}
              className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-black focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=" "
              value={formatDate(value)}
              onChange={handleInputChange}
              min={minDate}
            />
          ) : type === 'selectbox' ? (
            <Select
              options={options.map((option) => ({
                value: option,
                label: option,
              }))}
              value={value ? { value: value, label: value } : null}
              onChange={handleSelectboxChange}
              placeholder={`Select ${label}`}
            />
          ) : (
            <input
              type={type}
              className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-black focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              placeholder={label}
              value={value}
              onChange={handleInputChange}
              min={minDate}
              onKeyPress={type === 'number' ? handleNumberKeyPress : null} // Use conditional operator
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomTextField;
