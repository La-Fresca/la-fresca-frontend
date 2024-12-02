
import Swal from 'sweetalert2/dist/sweetalert2.js';

// Default dark theme configuration
export const defaultSwalConfig = {
  customClass: {
    popup: 'swal2-popup swal2-dark',
    confirmButton: 'swal2-confirm',
    cancelButton: 'swal2-cancel',
    htmlContainer: 'swal2-dark',
    title: 'swal2-dark'
  },
  background: '#1a1a1a',
  color: '#ffffff'
};

// Light theme configuration for optional use
export const lightSwalConfig = {
  customClass: {
    popup: 'swal2-popup swal2-light',
    confirmButton: 'swal2-confirm',
    cancelButton: 'swal2-cancel'
  },
  background: '#ffffff',
  color: '#000000'
};

// Initialize Swal with default dark theme
Swal.mixin(defaultSwalConfig);