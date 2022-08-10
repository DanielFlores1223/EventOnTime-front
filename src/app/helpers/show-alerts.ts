import Swal from 'sweetalert2';

export enum Variant {
     success = 'success',
     error = 'error'
}

export const showAlert = ( msg: string, variant: Variant ) => {
     Swal.fire({
          icon: variant,
          title: msg,
          showConfirmButton: false,
          timer: 2500,
     });
}