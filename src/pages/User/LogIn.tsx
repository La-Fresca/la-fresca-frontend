import LoginForm from '@components/User/LoginForm';
import backgroundImage from '@images/cover/cover-02.jpg';

const LoginPage = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img src={backgroundImage} alt="Background" />
      </div>

      {/* Content */}
      {/* Hidden on mobile */}
      <div className="hidden md:flex md:w-1/2 md:items-center md:justify-center bg-white bg-opacity-20 backdrop-blur relative">
        <div className="w-full p-6 m-auto bg-transparent bg-opacity-0 backdrop-blur-none rounded-md shadow-none lg:max-w-lg">
          <LoginForm />
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
