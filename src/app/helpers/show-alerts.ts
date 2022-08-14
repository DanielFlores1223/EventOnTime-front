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

export const ShowAlertConfirm = ( ) => {
     Swal.fire({
          title: 'Do you want to save the changes?',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'Save',
          denyButtonText: `Don't save`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            Swal.fire('Saved!', '', 'success')
          } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
          }
        })
}

