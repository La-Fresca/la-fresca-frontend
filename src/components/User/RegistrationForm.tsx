import { Link, useNavigate, useLocation } from 'react-router-dom';
import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import PassINput from './PasswordInput';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { useAuth } from '@/api/useAuth';
import { jwtDecode, JwtPayload } from 'jwt-decode';
const { testRefresh } = useAuth();

const FormSchema = z.object({
  email: z.string().min(1, { message: 'Email is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

type FormSchemaType = z.infer<typeof FormSchema>;

interface ourJwtPayload extends JwtPayload {
  role?: string;
}

const LoginForm = () => {
  const signIn = useSignIn();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const { register, handleSubmit, formState } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    try {
      const apiUrl = (import.meta as any).env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const json = await response.json();
        const accessToken = json.access_token;
        const refreshToken = json.refresh_token;
        const role = (jwtDecode(accessToken) as ourJwtPayload).role;
        signIn({
          auth: {
            token: accessToken,
            type: 'Bearer',
          },
          refresh: refreshToken,
          userState: {
            role: role,
          },
        });
      } else {
        console.error('error occured');
        return;
      }
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Error occured', error);
    }
  };
  const { errors } = formState;
  return (
    <div className="relative flex flex-row justify-center h-screen overflow-hidden">
      <div className="w-full p-6 m-auto lg:max-w-full bg-white bg-opacity-0">
        <h1 className="text-4xl font-semibold mb-8 text-white text-center">
          Register
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              type="text"
              placeholder="Email Address"
              className="w-full text-white border-b-2 border-white-700 bg-transparent focus:outline-none focus:ring-0"
              {...register('email')}
            />
          </div>
          <PassINput register={register} fieldname="password" />
          <div className="space-y-6">
            <button
              className="w-full py-2 mt-5 text-center text-white bg-yellow-500 rounded-md hover:bg-yellow-600"
              type="submit"
            >
              Register
            </button>
            
          </div>
          <div className="text-center">
            <p className="text-white">
              <Link to="/forgot-password" className="text-white hover:text-yellow-500">
                Forgot password?
              </Link>
            </p>
          </div>
        </form>

        <h1 className='text-center my-10 text-xl'>
          -OR-
        </h1>

        <div className="mt-6 mb-6 flex justify-center space-x-10">
          <div className="px-6 sm:px-0 max-w-sm">
            <button
              type="button"
              className="text-white w-full bg-transparent border border-white rounded-lg text-xs px-2 py-2 text-center flex items-center justify-between hover:text-yellow-500 hover:border-yellow-500"
            >
              <svg
                className="mr-3 w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                ></path>
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                ></path>
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
              </svg>
              Sign up with Google<div></div>
            </button>
          </div>
          <div className="px-6 sm:px-0 max-w-sm">
            <button
              type="button"
              className="text-white w-full bg-transparent border border-white rounded-lg text-xs px-2 py-2 text-center flex items-center justify-between hover:text-yellow-500 hover:border-yellow-500"
            >
              <svg
                className="mr-3 w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 48 48"
              >
                <linearGradient
                  id="Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1"
                  x1="9.993"
                  x2="40.615"
                  y1="9.993"
                  y2="40.615"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stop-color="#2aa4f4"></stop>
                  <stop offset="1" stop-color="#007ad9"></stop>
                </linearGradient>
                <path
                  fill="url(#Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1)"
                  d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"
                ></path>
                <path
                  fill="#fff"
                  d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z"
                ></path>
              </svg>
              Sign up with Facebook<div></div>
            </button>
          </div>
        </div>        
      </div>
      
        
    </div>
    


    
  );
};

export default LoginForm;
