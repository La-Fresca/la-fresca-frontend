import { toast } from 'sonner';

interface ToastProps {
  message: string;
  type: string;
}

const Toast: React.FC<ToastProps> = ({ message, type }) => {
  const toastStyle = {
    background: type === 'success' ? 'rgba(0,150,0,0.6)' : 'rgba(200,0,0,0.6)',
    color: 'white',
    border: 'none',
    transform: 'translateY(100%)',
  };

  const toastOptions = {
    position: 'top-right' as const,
    autoClose: type === 'success' ? 1000 : 2000,
    style: toastStyle,
  };

  switch (type) {
    case 'success':
      toast.success(message, toastOptions);
      break;
    case 'fail':
      toast.error(message, toastOptions);
      break;
    default:
      console.error(`Unsupported toast type: ${type}`);
      break;
  }

  return null;
};

export default Toast;
