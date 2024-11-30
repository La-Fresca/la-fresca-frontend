import React from 'react';

interface ButtonProps {
  text: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className=" text-white bg-gradient-to-r from-orange-600 to-orange-400 hover:from-orange-400 hover:to-orange-600 px-8 py-4 rounded-lg transition duration-300 shadow-md"
    >
      {text}
    </button>
  );
};

export default Button;
