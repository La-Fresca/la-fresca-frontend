import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@nextui-org/react';

interface IntegerOnlyDemoProps {
    onOTPChange: (otp: string) => void;
}

const IntegerOnlyDemo: React.FC<IntegerOnlyDemoProps> = ({ onOTPChange }) => {
    const [tokens, setTokens] = useState(["", "", "", ""]);

    const refs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && e.currentTarget.value === '' && index > 0) {
            refs[index - 1].current?.focus();
        }
    };

    const handleChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d?$/.test(value)) {
            const newTokens = [...tokens];
            newTokens[index] = value;
            setTokens(newTokens);
            onOTPChange(newTokens.join(''));
            if (value.length === 1 && index < refs.length - 1) {
                refs[index + 1].current?.focus();
            }
        }
    };

    return (
        <div className="flex flex-row justify-center gap-2 px-25">
            {tokens.map((token, index) => (
                <Input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={token}
                    onChange={handleChange(index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className='border border-white text-white input-focus justify-center'
                    ref={refs[index]}
                />
            ))}
        </div>
    );
};

export default IntegerOnlyDemo;
