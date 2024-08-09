import { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { UseFormRegister } from 'react-hook-form';

interface PassInputProps {
  register: UseFormRegister<any>;
  fieldname: string;
}

const PassINput: FC<PassInputProps> = ({ register, fieldname }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <input
        type={showPassword ? 'text' : 'password'}
        placeholder=" confirm Password"
        className=" h-8 w-full rounded-lg  text-white border-b-2  border-white-700 bg-transparent focus:outline-none focus:ring-0"
        {...register(fieldname)}
      />
      
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute inset-y-0 right-0 flex items-center pr-2 text-white cursor-pointer"
      >
        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className=' text-white border-white'/>
      </button>

      
    </div>

    
  );
};

export default PassINput;
