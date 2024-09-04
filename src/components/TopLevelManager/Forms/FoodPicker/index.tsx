import React, { useState } from 'react';
import FeatureInput from './FeatureInput';

interface Option {
  label: string;
  price: number;
}

interface Feature {
  name: string;
  options: Option[];
}

const FoodForm: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [available, setAvailable] = useState(false);
  const [features, setFeatures] = useState<Feature[]>([]);

  const handleAddFeature = () => {
    setFeatures([...features, { name: '', options: [{ label: '', price: 0 }] }]);
  };

  const handleFeatureChange = (index: number, newFeature: Feature) => {
    const updatedFeatures = features.map((feature, i) => (i === index ? newFeature : feature));
    setFeatures(updatedFeatures);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ name, description, price, available, features });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white shadow-md rounded">
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="available" className="block text-sm font-medium text-gray-700">Available</label>
        <input
          type="checkbox"
          id="available"
          checked={available}
          onChange={(e) => setAvailable(e.target.checked)}
          className="mt-1"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Features</label>
        {features.map((feature, index) => (
          <FeatureInput
            key={index}
            feature={feature}
            onChange={(newFeature) => handleFeatureChange(index, newFeature)}
          />
        ))}
        <button type="button" onClick={handleAddFeature} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
          Add Feature
        </button>
      </div>
      <div className="text-right">
        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">Submit</button>
      </div>
    </form>
  );
};

export default FoodForm;
