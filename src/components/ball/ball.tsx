import React, {FC, useState} from "react";
import "./ball.sass"
import {useActions} from "../../hooks/useActions";

enum BallEnum {
    "blue", 
    "green",
    "grey",
    "orange",
    "purple",
    "red",
    "yellow"
}

export interface IBall {
    color: number | undefined
    ballCoorX: number,
    ballCoorY: number
}

export interface ICoordinates {
    downX: number
    downY: number
}

const Ball: FC<IBall> = ({color, ballCoorX, ballCoorY}) => {

    const {removeBallsOneColor} = useActions();

    const [coorMouse, setCoorMouse] = useState<ICoordinates>({
        downX: 0,
        downY: 0,
    })

    const {moveBall} = useActions();

    const onDragStartCapture = (e: React.DragEvent<HTMLDivElement>) => {
        setCoorMouse({
            ...coorMouse,
            downX: e.pageX,
            downY: e.pageY,
        })
    }

    const onDragExitCapture = (e: React.DragEvent<HTMLDivElement>) => {
        const obj = {
            ...coorMouse,
            upY: e.pageY,
            upX: e.pageX,
            ballCoorX,
            ballCoorY
        }
        moveBall(obj);
        removeBallsOneColor()
    }

    return (
        <div
            className="ball"
            onDragStartCapture={onDragStartCapture}
            onDragEnd={onDragExitCapture}
            draggable
            style={{background: BallEnum[color!]}}
        >
        </div>
    );
};

export default Ball;