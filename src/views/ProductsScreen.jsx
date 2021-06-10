import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startPrudctLoading } from '../actions/product.action';


export const Products = () => {

    const dispatch = useDispatch()
    const { products } = useSelector(state => state.product)
    useEffect(() => {
        dispatch(startPrudctLoading())
    }, [dispatch])
    return (
        <div className="__prodcuts_screen d-flex flex-column justify-content-center justify-items-center">
            <div className="container-fluid product_table_container ">
                <h1 className="justify-align-center text-center">Tabla Productos</h1>
                <table className="table table-hover mt-5">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Categoria</th>
                            <th>Disponibilidad</th>
                            <th>Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(producto => (
                            <tr key={producto.name}>
                                <td>{producto.name}</td>
                                <td>{producto.category.name}</td>
                                <td>{producto.available ? 'disponible' : 'no disponible'}</td>
                                <td>{producto.price}</td>
                            </tr>

                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
