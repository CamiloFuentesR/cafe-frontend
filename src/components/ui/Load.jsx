import Lottie from 'lottie-react'
import React, { useRef } from 'react'
import ufos from "../../json/ufos.json";

export const Load = () => {

    const lottieRef = useRef();
    return (
        <div className="cargando">
             <Lottie 
                lottieRef={lottieRef}
                animationData={ufos}
                loop={true}
                autoPlay={true}
                style={{width: '100%' }}
                className="cargando"
                />
        </div>
    )
}
