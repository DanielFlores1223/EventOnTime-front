import Swal from 'sweetalert2';

export enum Variant {
     success = 'success',
     error = 'error',
     warning = 'warning'
}

export const showAlert = ( msg: string, variant: Variant ) => {
     Swal.fire({
          icon: variant,
          title: msg,
          showConfirmButton: false,
          timer: 2500,
     });
}

export const showAlertToast = ( msg: string, variant: Variant ) => {
     Swal.fire({
          icon: variant,
          title: msg,
          showConfirmButton: false,
          timer: 2500,
          toast: true,
          position: 'top-right'
     });
}

