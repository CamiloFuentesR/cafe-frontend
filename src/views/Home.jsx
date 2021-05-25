import React from 'react';
import heartcoffe from "../styles/img/heartcoffe.jpg"
import { Footer } from '../components/layouts/Footer';
export const Home = () => {
    return (
        <div className='__home_screen'>
            <header className="__home_header">
                <h1>header</h1>
            </header>
            <section className="__home_section1">
                <div className="_home_section1_sub">
                    <img src={heartcoffe} alt="" />
                    <h2>Disfruta del mejor Café</h2>
                </div>
            </section>
            <section className="__home_menu">
                <h2>section2</h2>
            </section>
            <Footer />
        </div>
    )
}
