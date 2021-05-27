import React from 'react'

export const Footer = () => {
    return (
        <div className="__footer">
            <div className="__footer_contactanos">
                <div className="__footer_ig">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler animate__animated animate__fadeIn animate__slower icon-tabler-brand-instagram" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ff2825" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <rect x="4" y="4" width="16" height="16" rx="4" />
                        <circle cx="12" cy="12" r="3" />
                        <line x1="16.5" y1="7.5" x2="16.5" y2="7.501" />
                    </svg>
                    <p>Instagram</p>
                </div>
                <div className="__footer_fb">
                    <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="40px" viewBox="0 0 24 24" width="40px" fill="#0d3bb9"><rect fill="none" height="40" width="40" /><path d="M22,12c0-5.52-4.48-10-10-10S2,6.48,2,12c0,4.84,3.44,8.87,8,9.8V15H8v-3h2V9.5C10,7.57,11.57,6,13.5,6H16v3h-2 c-0.55,0-1,0.45-1,1v2h3v3h-3v6.95C18.05,21.45,22,17.19,22,12z" /></svg>
                    <p>Facebook</p>
                </div>
                <div className="__footer_ws">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler animate__animated animate__fadeIn animate__slower icon-tabler-brand-whatsapp" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#00b341" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
                        <path d="M9 10a0.5 .5 0 0 0 1 0v-1a0.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a0.5 .5 0 0 0 0 -1h-1a0.5 .5 0 0 0 0 1" />
                    </svg>
                    <p>+569123456789</p>
                </div>
            </div>
            <div className="__footer_horarios">
                <div className="__footer_semana">
                    <p>lunes a Viernes</p>
                    <p> 9:00a - 14:00hrs y 15:00hrs - 20:00hrs</p>

                </div>
                <div className="__footer_finde">
                    <p>Sabado y Domingo</p>
                    <p>9:00am - 14:00hrs</p>
                </div>
            </div>
        </div>
    )
}
