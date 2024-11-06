import React from 'react';

interface ButtonProps {
  text: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-lg transition duration-300 shadow-md"
    >
      {text}
    </button>
  );
};

export default Button;
