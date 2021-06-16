import validator from "validator";

export default function loginvalidate(valores) {

    let errores = {};

    ///vldiar el email
    if (!valores.email) {
        errores.email = "El email es obligatorio"

    }
    else if (!validator.isEmail(valores.email)) {
        errores.email = "Email no válido"
    }

    //validar el password
    if (!valores.password) {
        errores.password = "El password es obligatorio"
    } else if (valores.password.length < 6) {

        errores.password = "El password debe tener al menos 6 caracteres"
    }


    return errores
}

export const registerValidate = (valores) => {
    let errores = {};

    if(!valores.name){
        errores.name = 'El nombre es oblgatorio'
    }
    ///vldiar el email
    if (!valores.email) {
        errores.email = "El email es obligatorio"

    }
    else if (!validator.isEmail(valores.email)) {
        errores.email = "Email no válido"
    }

    //validar el password
    if (!valores.password) {
        errores.password = "El password es obligatorio"
    } if (!valores.password2) {
        errores.password2 = "El password es obligatorio"
    } 
    else if(!/^(?=.*[A-Z])/.test(valores.password) ){
        errores.password ='El Password debe contener al menos una mayúscula'
    }
    else if(!/\d/.test(valores.password) ){
        errores.password ='El Password debe contener nùmeros'
    }
    else if (valores.password.length < 6) {

        errores.password = "El password debe tener al menos 6 caracteres"
    }
    else if(valores.password !== valores.password2){
        errores.password2 ='Los password no coinciden'
    }
    else if(valores.password !== valores.password2){
        errores.password2 ='Los password no coinciden'
    }
    return errores;
}
export const productValidate = (valores) => {
    let errores = {};

    if(!valores.name){
        errores.name = 'El nombre es oblgatorio'
    }
    if(!valores.price){
        errores.name = 'El precio es oblgatorio'
    }
    if(valores.available.trim() === ''){
        errores.name = 'El stock es oblgatorio'
    }
    return errores;
}