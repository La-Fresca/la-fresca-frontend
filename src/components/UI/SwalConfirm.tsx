import './swal.css';
import '@sweetalert2/theme-dark';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import withReactContent from 'sweetalert2-react-content';

export const swalConfirm = () => {
  const showSwal = (onConfirm: () => void) => {
    withReactContent(Swal)
      .fire({
        title: 'Do you want to delete the item?',
        showCancelButton: true,
        confirmButtonText: 'Delete',
        denyButtonText: 'Cancel',
        customClass: {
          popup: 'swal2-popup',
          confirmButton: 'swal2-confirm',
        },
      })
      .then((result: any) => {
        if (result.isConfirmed) {
          onConfirm();
          Swal.fire('Deleted!', '', 'success');
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info');
        }
      });
  };
  return { showSwal };
};
