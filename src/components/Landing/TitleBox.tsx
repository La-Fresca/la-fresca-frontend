import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';

interface TitleBoxProps {
  title: string;
  subtitle: string;
  button: string;
  ClassName: string;
  URLLink: string;
}

export const TitleBox: React.FC<TitleBoxProps> = ({ title, subtitle, button, ClassName, URLLink }) => {
  const boxClass = `${ClassName} bg-yellow-500 flex flex-col items-center justify-center tracking-widest p-4`;

  return (
    <div className={boxClass}>
      <h3 className="text-xl text-black font-semibold uppercase font-inter">{subtitle}</h3>
      <h1 className="text-8xl text-black uppercase font-noto-serif">{title}</h1>
      {button && (
        <Link to={URLLink} className="text-black text-base font-bold uppercase font-inter flex items-center">
          <FiPlus className="mr-2" /> {button}
        </Link>
      )}
    </div>
  );
};
