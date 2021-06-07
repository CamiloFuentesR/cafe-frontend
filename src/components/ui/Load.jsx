import Lottie from 'lottie-react'
import React, { useRef } from 'react'
import tacos from "../../json/walking-taco.json";

export const Load = () => {

    const lottieRef = useRef();
    return (
        <div className="cargando">
            <div className="lottie">
                <Lottie
                    lottieRef={lottieRef}
                    animationData={tacos}
                    loop={true}
                    autoPlay={true}
                    style={{ width: '100%' }}
                    className="cargando"
                />
            </div>
        </div>
    )
}
