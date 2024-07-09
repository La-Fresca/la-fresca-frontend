import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export const TitleBox = ({ title, subtitle, button, ClassName, URLLink }: { title: string, subtitle: string, button: string, ClassName: string, URLLink:string }) => {
    const boxClass = `${ClassName} bg-yellow-500 flex flex-col items-center justify-center tracking-widest p-4`;
    
    return (
        // <div className="relative bg-gray-200 h-screen flex items-center justify-center">
        // <div className="w-screen h-screen bg-blue-500 flex items-end justify-end">
        <div className={boxClass}>
            <h3 className="text-xl text-black font-semibold uppercase font-inter">{subtitle}</h3>
            <h1 className="text-8xl text-black uppercase font-noto-serif">{title}</h1>
            <Link to={URLLink} className="text-black text-base font-bold uppercase font-inter flex items-center">
                <FiPlus className="mr-2" /> View More
            </Link>
        </div>
        // </div>
        // </div>
    );
};
