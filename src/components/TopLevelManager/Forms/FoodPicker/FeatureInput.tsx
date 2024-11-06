import React from 'react';

interface Option {
  label: string;
  price: number;
}

interface Feature {
  name: string;
  options: Option[];
}

interface FeatureInputProps {
  feature: Feature;
  onChange: (feature: Feature) => void;
}

const FeatureInput: React.FC<FeatureInputProps> = ({ feature, onChange }) => {
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...feature, name: e.target.value });
  };

  const handleOptionChange = (index: number, newOption: Option) => {
    const updatedOptions = feature.options.map((option, i) => (i === index ? newOption : option));
    onChange({ ...feature, options: updatedOptions });
  };

  const handleAddOption = () => {
    onChange({ ...feature, options: [...feature.options, { label: '', price: 0 }] });
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">Feature Name</label>
      <input
        type="text"
        value={feature.name}
        onChange={handleNameChange}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      />
      <label className="block text-sm font-medium text-gray-700 mt-2">Options</label>
      {feature.options.map((option, index) => (
        <div key={index} className="flex items-center mt-1">
          <input
            type="text"
            value={option.label}
            onChange={(e) => handleOptionChange(index, { ...option, label: e.target.value })}
            placeholder="Option Label"
            className="block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm mr-2"
          />
          <input
            type="number"
            value={option.price}
            onChange={(e) => handleOptionChange(index, { ...option, price: Number(e.target.value) })}
            placeholder="Option Price"
            className="block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      ))}
      <button type="button" onClick={handleAddOption} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
        Add Option
      </button>
    </div>
  );
};

export default FeatureInput;
