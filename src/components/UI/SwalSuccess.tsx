import './swal.css';
import '@sweetalert2/theme-dark';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import withReactContent from 'sweetalert2-react-content';

interface SwalSuccessProps {
  message: string;
}

export const swalSuccess = ({ message }: SwalSuccessProps) => {
  const showSwal = () => {
    withReactContent(Swal).fire({
      title: message,
      icon: 'success',
      confirmButtonText: 'OK',
    });
  };

  return { showSwal };
};
