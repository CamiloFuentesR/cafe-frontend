import React, { useEffect } from 'react';
import heartcoffe from "../styles/img/heartcoffe.jpg"
import { Footer } from '../components/layouts/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { startGetbyCategory } from '../actions/menu.action';
export const Home = () => {

    const { menu } = useSelector(state => state.menu)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(startGetbyCategory('galletas'))
    }, [dispatch])

    return (
        <div className='__home_screen'>
            <header className="__home_header">
            </header>
            <section className="d-flex flex-column __home_section1  align-items-center  ">
                <div className="_home_section1_sub">
                    <img src={heartcoffe} alt="imagen de taza de café" className='opacity-img-cafe' />
                    <h2 className='title-size'>Disfruta del mejor Café</h2>
                </div>
                <div className='p-5 mt-5 text-center'>
                    <p className='mt-5'>Tenemos el una gran variedad al servicio de nuestros clientes</p>
                    <p>Ven y no te pierdas de estos deliciosos sabores</p>
                </div>
            </section>
            <section className="container-fluid">
                <div className="container d-flex bg-warning opacity-25">
                    <div className="__home_liquidos">
                        <div className="__home_refrescos">
                            <header>
                                <h4 className="text-center">Refrescos</h4>
                            </header>
                            {
                                menu.map(data => (data.category.name === 'REFRESCOS') && (
                                    <div className="d-flex justify-content-between m-2" key={data.name}>
                                        <p>{data.name}</p><hr /><p>${data.price}</p>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="__home_bebidas_calientes">
                            <header>
                                <h4 className="text-center">Bebidas Calientes</h4>
                            </header>
                            {
                                menu.map(data => (data.category.name === 'BEBIDAS CALIENTES') && (
                                    <div className="d-flex justify-content-between m-2" key={data.name}>
                                        <p>{data.name}</p><hr /><p>${data.price}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="__home_para_comer">
                        <div className="__home_postres">
                            <header>
                                <h4 className="text-center">Postres</h4>
                            </header>
                            {
                                menu.map(data => (data.category.name === 'POSTRES') && (
                                    <div className="d-flex justify-content-between m-2" key={data.name}>
                                        <p>{data.name}</p><hr /><p>${data.price}</p>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="__home_desayunos">
                            <header>
                                <h4 className="text-center">Desayunos</h4>
                            </header>
                            {
                                menu.map(data => (data.category.name === 'DESAYUNOS') && (
                                    <div className="d-flex justify-content-between m-5" key={data.name}>
                                        <p>{data.name}</p><hr /><p>${data.price}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}
