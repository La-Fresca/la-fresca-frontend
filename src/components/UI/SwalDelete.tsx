import './swal.css';
import '@sweetalert2/theme-dark';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import withReactContent from 'sweetalert2-react-content';

interface SwalProps {
  message: string;
  buttonText?: string;
  afterString: string;
}

export const swalConfirm = ({
  message,
  buttonText,
  afterString,
}: SwalProps) => {
  const showSwal = (onConfirm: () => void) => {
    withReactContent(Swal)
      .fire({
        title: message,
        showCancelButton: true,
        confirmButtonText: buttonText || 'Delete',
        denyButtonText: 'Cancel',
        customClass: {
          popup: 'swal2-popup',
          confirmButton: 'swal2-confirm',
        },
      })
      .then((result: any) => {
        if (result.isConfirmed) {
          onConfirm();
          Swal.fire(afterString, '', 'success');
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info');
        }
      });
  };
  return { showSwal };
};
