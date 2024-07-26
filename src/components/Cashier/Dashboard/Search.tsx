// SearchBar.tsx
import React from 'react';
import { SearchIcon } from '@/pages/BranchManager/FoodList/SearchIcon';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative mb-4">
      <input        
        type="text"
        placeholder="Search..."
        value={searchTerm}
        
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 mb-4 rounded bg-black border border-gray-700 focus:outline-none w-full pl-10"
      />
      <span className="absolute left-3 top-2.5 text-gray-400">
        <i><SearchIcon /></i>
      </span>
    </div>
  );
};

export default SearchBar;
