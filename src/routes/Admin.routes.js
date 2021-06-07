import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux';

export const AdminRouter = ({
    isAuthenticated,
    component: Component, //Component= <DashBoardRoutes/>, se le puede dar cualquier nombre
    ...rest //props?
}) => {
    const { location: { pathname, search } } = rest;
    //el search es el queryparam cuando se hacen busquedas
    localStorage.setItem('lastPath', pathname + search);
    const { role } = useSelector(state => state.root)
    return (
        <Route {...rest}
            component={(props) => (
                (isAuthenticated && role === "ADMIN_ROLE")
                    //si esta atenticado carga este componente
                    ? (<Component {...props} />)
                    //si no esta autenticado solo carga el componente del login
                    : (<Redirect to="/logged" />)
            )}
        />
    )
}

AdminRouter.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}
