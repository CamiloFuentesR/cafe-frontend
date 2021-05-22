import { useLottie, useLottieInteractivity } from "lottie-react";
import blinkEye from "../json/blink-eye.json"
const style = {
    height: 200,
};
const options = {
    animationData: blinkEye,
};

export const Eye = () => {


    const lottieObj = useLottie(options, style);
    const Animation = useLottieInteractivity({
        lottieObj,
        mode: "cursor",
        actions: [
            {
                position: { x: [0, 1], y: [-1, 2] },
                type: "seek",
                frames: [0, 150],
            },
            {
                position: { x: -1, y: -1 },
                type: "stop",
                frames: [0],
            },
        ],
    });
    return (
        <div>
            {Animation}
        </div>


    );
};
