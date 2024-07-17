import React from 'react';

interface ButtonProps {
  text: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button onClick={onClick} className="bg-orange-500 text-white px-4 py-2 rounded">
      {text}
    </button>
  );
};

export default Button;
