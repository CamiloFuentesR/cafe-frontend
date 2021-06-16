import  { useEffect, useState } from 'react'

const useValidation = (stateInicial, validar, fn) => {
    const [formValues, setFormValues] = useState(stateInicial);
    const [errores, setErrores] = useState({});
    const [submitForm, setSubmitForm] = useState(false);
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        if (submitForm) {
            //object.keys es para ver si un objeto esta vacio o tiene algo
            const noErrores = Object.keys(errores).length === 0;
            if (noErrores) {
                fn(); //igul  la funcion que se ejecuta en el componente
                setLoading(true);
            }
            setSubmitForm(false);
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errores])

    //Funcion que se ejecuta conforme el usuario escribe algo
    const handleChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        });
      
    }

    //Funcion que se ejecuta cuando el usuario ejecuta el submit
    const handleSubmit = e => {
        e.preventDefault();
        const erroresValidacion = validar(formValues);
        setErrores(erroresValidacion);
        setSubmitForm(true);
    }

    return {
        formValues,
        errores,
        handleSubmit,
        handleChange,
        setLoading,
        loading,
        setFormValues
    }
}

export default useValidation;