import { createSlice } from "@reduxjs/toolkit";
import {rows, columns} from "../constants";
import {randomColor, checkColorBalls} from "../utils";


export const ballsSlice = createSlice({
    name: 'balls',
    initialState: {
        balls: []
    },
    reducers: {
        createMatrix(state) {
            const balls = [];
            for (let x = 0; x < rows; x++) {
                balls[x] = []
                for (let y=0; y < columns; y++) {
                    balls[x][y] = {x, y}
                }
            }
            state.balls = balls;
        },
        addColor(state) {
            const balls = [...state.balls]
            for (let x = 0; x < 10; x++){
                for (let y = 0; y < 10; y++) {
                    while (true) {
                        let color = randomColor();
                        if (checkColorBalls(balls, x,y, color)) {
                            balls[x][y].color = color;
                            break;
                        }
                    }
                }
            }
            state.balls = balls;
        }

    }
})

export const {createMatrix, addColor} = ballsSlice.actions;

export default ballsSlice.reducer