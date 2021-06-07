import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'


//hacer la ruta publica sirve para que al estar autetnticado no pueda volver a la pantalla de login sin hacer logout
export const PublicRouter = ({
    isAuthenticated,
    component: Component,
    ...rest
}
) => {
    return (
        <Route {...rest}
            component={(props) => (
                //pregunta si esta autenticado
                (!isAuthenticated)
                    //si esta atenticado carga este componente
                    ? (<Component {...props} />)
                    //si no esta autenticado solo carga el componente del login
                    : (<Redirect to="/admin" />)
            )}
        />
    )
}

PublicRouter.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}
