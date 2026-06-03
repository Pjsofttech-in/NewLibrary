// src/services/AlertService.js
import Swal from 'sweetalert2';

const AlertService = {
  success: (message) => {
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: message,
      confirmButtonColor: '#3085d6',
    });
  },

  error: (message) => {
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: message,
      confirmButtonColor: '#d33',
    });
  },

  confirm: async (message) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!',
    });
    return result.isConfirmed;
  },
};

export default AlertService;
