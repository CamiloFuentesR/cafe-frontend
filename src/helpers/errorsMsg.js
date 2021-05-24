import Swal from 'sweetalert2'

export const authMessage = (data) => {

    if(data.msg){
        return Swal.fire('Datos incorrectos',data.msg,'warning')
    }
    const {email,password} = data.errors;
    if(email){
        return Swal.fire('Campos',email.msg,'warning')
    }
    if(password){
        return Swal.fire('Campos',password.msg,'warning')
    }
}

