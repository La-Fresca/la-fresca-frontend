import Cookies from 'js-cookie';
import createRefresh from 'react-auth-kit/createRefresh';
const API_URL = (import.meta as any).env.VITE_API_URL;

function getRefreshToken() {
  try {
    return Cookies.get('_auth_refresh');
  } catch (error) {
    console.error(error);
    return null;
  }
}
export const useAuth = () => {
  const refresh = createRefresh({
    interval: 3000,
    refreshApiCallback: async (): Promise<any> => {
      try {
        const response = await fetch(`${API_URL}/user/refresh_token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getRefreshToken()}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to refresh token');
        }
        const json = await response.json();
        console.log('Refreshing');
        return {
          isSuccess: true,
          newAuthToken: json.access_token,
          newAuthTokenExpireIn: 10,
          newRefreshTokenExpiresIn: 60,
        };
      } catch (error) {
        console.error(error);
        return {
          isSuccess: false,
        };
      }
    },
  });

  return { refresh };
};
