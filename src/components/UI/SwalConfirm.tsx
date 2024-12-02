import './swal.css';
import '@sweetalert2/theme-dark';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import withReactContent from 'sweetalert2-react-content';

export const swalConfirm = () => {
  const commonConfig = {
    showCancelButton: true,
  };

  const showSwal = (onConfirm: () => void) => {
    withReactContent(Swal)
      .fire({
        title: 'Do you want to delete the item?',
        confirmButtonText: 'Delete',
        denyButtonText: 'Cancel',
        ...commonConfig,
      })
      .then((result: any) => {
        if (result.isConfirmed) {
          onConfirm();
          Swal.fire({
            title: 'Deleted!',
            icon: 'success',
            ...commonConfig,
          });
        }
      });
  };

  const showSwalApprove = (onConfirm: () => void) => {
    withReactContent(Swal)
      .fire({
        title: 'Do you want to approve this item?',
        confirmButtonText: 'Approve',
        denyButtonText: 'Cancel',
        ...commonConfig,
      })
      .then((result: any) => {
        if (result.isConfirmed) {
          onConfirm();
          Swal.fire({
            title: 'Approved!',
            icon: 'success',
            ...commonConfig,
          });
        }
      });
  };

  const showSwalReject = (onConfirm: () => void) => {
    withReactContent(Swal)
      .fire({
        title: 'Do you want to reject this item?',
        confirmButtonText: 'Reject',
        denyButtonText: 'Cancel',
        ...commonConfig,
      })
      .then((result: any) => {
        if (result.isConfirmed) {
          onConfirm();
          Swal.fire({
            title: 'Rejected!',
            icon: 'success',
            ...commonConfig,
          });
        }
      });
  };

  return { showSwal, showSwalApprove, showSwalReject };
};
