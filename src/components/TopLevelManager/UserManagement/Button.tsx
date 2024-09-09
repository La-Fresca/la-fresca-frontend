import React from 'react';

interface ButtonProps {
  text: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-yellow-500 hover:bg-yellow-700 text-white px-4 py-2 rounded transition duration-300"
    >
      {text}
    </button>
  );
};

export default Button;
