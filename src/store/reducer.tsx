import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {rows, columns} from "../constants";
import {
    randomColor,
    checkColorBalls,
    findBallsOneColorGorizontal,
    findBallsOneColorVertical, createNewRow, createNewColumn
} from "../utils";

interface IBalls {
    x: number,
    y: number,
    color?: number
}

interface IState {
    balls: IBalls[][]
}

const initialState: IState = {
    balls: []
}

interface IMoveBall {
    ballCoorX: number
    ballCoorY: number
    downX: number
    downY: number
    upX: number
    upY: number
}

export const ballsSlice = createSlice({
    name: 'balls',
    initialState: initialState,
    reducers: {
        createMatrix(state: IState) {
            const balls: IBalls[][] = [];
            for (let y = 0; y < rows; y++) {
                balls[y] = []
                for (let x=0; x < columns; x++) {
                    balls[y][x] = {x, y}
                }
            }
            state.balls = balls;
        },
        addColor(state: IState) {

            const balls = JSON.parse(JSON.stringify(state.balls));

            for (let y = 0; y < rows; y++){
                for (let x = 0; x < columns; x++) {
                    while (true) {
                        let color = randomColor();
                        if (checkColorBalls(balls, x,y, color)) {
                            balls[y][x].color = color;
                            break;
                        }
                    }
                }
            }
            state.balls = balls;
        },
        moveBall(state, action: PayloadAction<IMoveBall>) {

            const {ballCoorX, ballCoorY, downX, downY, upX, upY} = action.payload;
            const shiftX = downX - upX;
            const shiftY = downY - upY;
            let left = false, right = false, up = false, down= false;
            if (Math.abs(shiftX) > Math.abs(shiftY)) {
                shiftX > 0 ? right = true : left = true
            } else {
                shiftY > 0 ? up = true : down = true
            }

            const balls = JSON.parse(JSON.stringify(state.balls));
            const tmp = balls[ballCoorY][ballCoorX].color;

            if (up || down) {
                const coorY = up ? ballCoorY - 1 : ballCoorY + 1;
                balls[ballCoorY][ballCoorX].color = balls[coorY][ballCoorX].color;
                balls[coorY][ballCoorX].color = tmp;
            }
            if (left || right) {
                const coorX = left ? ballCoorX + 1 : ballCoorX - 1;
                balls[ballCoorY][ballCoorX].color = balls[ballCoorY][coorX].color;
                balls[ballCoorY][coorX].color = tmp;
            }
            state.balls = balls;
            const audio = new Audio('ball-move.wav');
            audio.play();
        },

        removeBallsOneColor(state) {

            const balls = JSON.parse(JSON.stringify(state.balls));
            const countX = findBallsOneColorGorizontal(balls)?.countX;
            const posX = findBallsOneColorGorizontal(balls)?.posX;
            const countY = findBallsOneColorVertical(balls)?.countY;
            const posY = findBallsOneColorVertical(balls)?.posY;

            console.log(posX)

            if (posY && posY.y >=0 && posY.x >= 0) {

                for (let y = posY.y; y > 0; y--) {
                    balls[y + countY! - 1][posY.x].color = balls[y - 1][posY.x].color;
                }
                for (let y = posY.y; y > 0; y--) {
                    while (true) {
                        let color = randomColor();
                        if (createNewColumn(balls, posY.x, y, color)) {
                            balls[y][posY.x].color = color;
                            break;
                        }
                    }
                }

            }

            if (posX && posX.x >=0 && posX.x >= 0) {

                for (let y = posX.y; y > 0; y--) {
                    for (let x = posX.x; x < posX.x + countX!; x++) {
                        balls[y][x].color = balls[y-1][x].color;
                    }
                }

                for (let x = posX.x; x < posX.x + countX!; x++) {
                    while (true) {
                        let color = randomColor();
                        if (createNewRow(balls, x, color)) {
                            balls[0][x].color = color;
                            break;
                        }
                    }
                }




            }

            state.balls = balls;


        }
    },


})

export const {createMatrix, addColor, moveBall, removeBallsOneColor} = ballsSlice.actions;

export default ballsSlice.reducer