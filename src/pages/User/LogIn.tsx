import LoginForm from '@components/User/LoginForm';
import backgroundImage from '@images/cover/Logincover.png';
import LogoIcon from '@/images/logo/la-fresca.png';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 ">
        <img src={backgroundImage} alt="Background" />
      </div>

      {/* Content */}
      {/* Hidden on mobile */}
      <div className="flex ">
        <div className="hidden w-1/2 md:flex md:items-center md:justify-center bg-yellow-900 bg-opacity-10 backdrop-blur-lg relative">
          <div className="w-2/3 p-6 m-auto bg-transparent bg-opacity-0 backdrop-blur-none rounded-md shadow-none lg:max-w-lg">
            <LoginForm />
          </div>
        </div>

        <div className="flex flex-col w-1/2 z-1">
          <div className="mt-30 h-60 justify-center flex w-full">
            <img src={LogoIcon} alt="Background" />
          </div>

          <div className="mt-10 text-center">
            <h1 className="text-xl text-white font-bold">
              Don't have an account yet ?
            </h1>
            <p className="my-5 mx-25 text-white">
              Register now to access personalized content, save your
              preferences, and enjoy exclusive discounts. Click the button to
              get started!
            </p>

            <button
              className="bg-yellow-500 text-black rounded-md px-5 py-2 font-extrabold"
              onClick={() => {
                navigate('/register');
              }}
            >
              Register
            </button>
          </div>
        </div>
      </div>

      {/* Shown on mobile */}
      <div className="md:hidden">
        <div className="max-w-lg mx-auto p-8 bg-white bg-opacity-30 backdrop-blur-lg rounded-lg shadow-lg">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
