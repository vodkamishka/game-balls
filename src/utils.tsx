import {rows, columns} from "./constants";
import {IBall} from "./components/ball/ball";
import {IBalls} from "./store/reducer";

export const randomColor = () => Math.floor(Math.random() * 6);



export const checkColorBalls = (balls: IBall[][], x: number, y: number, color: number): boolean=> {
    let flag = true;
    if (y > 1 && color === balls[y-1][x].color && color === balls[y-2][x].color) flag = false;
    if (x > 1 && color === balls[y][x-1].color && color === balls[y][x-2].color) flag = false;
    return flag;
};

export const createNewRow = (balls: IBall[][], x: number, color: number): boolean => {
    let flag = true;
    if (x > 1 && color === balls[0][x-1].color && color === balls[0][x-2].color &&
        color === balls[0][x+1].color && color === balls[0][x+2].color && x < rows -1) flag = false;
    if (color === balls[1][x].color && color === balls[2][x].color) flag = false;
    return flag;
};

export const createNewColumn = (balls: IBall[][], x: number, y: number, color: number) => {
    let flag = true;
    if (color === balls[y+1][x].color && color === balls[y+2][x].color) flag = false;
    if (x > 1 && color === balls[y][x-1].color && color === balls[y][x-2].color &&
        color === balls[y][x+1].color && color === balls[y][x+2].color && x < rows -1) flag = false;
    return flag;
};

export const findBallsOneColorGorizontal = (balls: IBalls[][]) => {

    let countX = 1;
    const matchX = [];

    for (let j = 0; j < rows; j++) {
        let color = balls[j][0].color;
        countX = 1;
        for (let i = 1; i < columns; i++) {
            if (color === balls[j][i].color) {
                countX++;
            } else {
                if (countX < 3) {
                    color = balls[j][i].color;
                    countX = 1;
                } else {
                    matchX.push({countX, posX: {y: j, x: i - 1}});
                    countX = 1;
                    continue;
                }
                countX = 1;
            }
        }
    }

    return matchX;

}

export const findBallsOneColorVertical = (balls: IBalls[][]) => {
    
    let countY = 1;
    const matchY = [];

    for (let i = 0; i < columns; i++) {
        let color = balls[0][i].color;
        countY = 1;
        for (let j = 1; j < rows; j++) {
            if (color === balls[j][i].color) {
                countY++;
            } else {
                color = balls[j][i].color;
                countY = 1;
                if (countY < 3) {
                } else {
                    matchY.push({countY, posY: {y: j - 1, x: i}});
                    countY = 1;
                    continue;
                }

            }
        }
    }

    return matchY;
}

interface IDetermineDirection {
    downX: number;
    downY: number;
    upX: number;
    upY: number;
}

export const determineDirection = (payload: IDetermineDirection) => {

    const {downX, downY, upX, upY} = payload;
    const shiftX = downX - upX;
    const shiftY = downY - upY;
    let left, right, up, down;
    if (Math.abs(shiftX) > Math.abs(shiftY)) {
        shiftX > 0 ? right = true : left = true
    } else {
        shiftY > 0 ? up = true : down = true
    }

    return { right, left, up, down }
}

export const checkMatches = (balls: IBalls[][]) => {

    if (!balls.length) return;

    let countX = 1;

    for (let j = 0; j < rows; j++) {
        let color = balls[j][0].color;
        countX = 1;
        for (let i = 1; i < columns; i++) {
            if (color === balls[j][i].color) {
                countX++;
            } else {
                if (countX < 3) {
                    color = balls[j][i].color;
                    countX = 1;
                } else {
                    return true;
                }
            }
        }
    };

    let countY = 1;

    for (let i = 0; i < columns; i++) {
        let color = balls[0][i].color;
        countY = 1;
        for (let j = 1; j < rows; j++) {
            if (color === balls[j][i].color) {
                countY++;
            } else {
                color = balls[j][i].color;
                if (countY < 3) {
                    countY = 1;
                } else {
                    return true
                }
            }
        }
    }

    return false;
}