import React, { useEffect, useRef, useState } from 'react'
import Lottie from "lottie-react";
import walkingTaco from "../json/walking-taco.json";
import ufos from "../json/ufos.json";

export const Lot = () => {

    const lottieRef = useRef();
    const [over, setover] = useState(false)
    const handleMouseOver = () => {
        setover(true);
    }
    const handleMouseOut = () => {
        setover(false);
    }
    
    useEffect(() => {
        lottieRef.current.setSpeed(4)
    }, [])

    return (
        <div>
            <h1>Admin</h1>
            <div>

            <Lottie 
                animationData={walkingTaco}
                loop={over}
                autoPlay={over}
                style={{width: '25%'}}
                onMouseOver={handleMouseOver}
                onMouseLeave={handleMouseOut}
                />
            </div>
            <div>
            <Lottie 
                lottieRef={lottieRef}
                animationData={ufos}
                loop={true}
                autoPlay={true}
                style={{width: '25%'}}
                />

            </div>
        </div>
    )
}
