import React, {FC, useEffect} from 'react';
import "./frame.sass";
import {useActions} from "../../hooks/useActions";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import Ball from "../ball/ball";

const Frame: FC = () => {

    const {addColor, createMatrix} = useActions();

    const {balls} = useTypedSelector(state => state.balls);

    useEffect(() => {
        createMatrix();
        addColor();
    }, [])

    return (
        <div className="frame">
            {balls.map((rows, index) =>
                    <div className="frame_row" key={index}>
                        {rows.map((el, i) =>
                            <Ball color={el.color} key={'a' + i} ballCoorX={el.x} ballCoorY={el.y}/>
                        )}
                    </div>
            )}
        </div>
    );
};

export default Frame;