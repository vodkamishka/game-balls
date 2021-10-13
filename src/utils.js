import {rows, columns} from "./constants";

export const randomColor = () => Math.floor(Math.random() * 6);

export const checkColorBalls = (balls, x, y, color) => {
    let flag = true;
    if (y > 1 && color === balls[y-1][x].color && color === balls[y-2][x].color) flag = false;
    if (x > 1 && color === balls[y][x-1].color && color === balls[y][x-2].color) flag = false;
    return flag;
};

export const createNewRow = (balls, x, color) => {
    let flag = true;
    if (x > 1 && color === balls[0][x-1].color && color === balls[0][x-2].color &&
        color === balls[0][x+1].color && color === balls[0][x+2].color && x < rows -1) flag = false;
    if (color === balls[1][x].color && color === balls[2][x].color) flag = false;
    return flag;
};

export const createNewColumn = (balls, x, y, color) => {
    let flag = true;
    if (color === balls[y+1][x].color && color === balls[y+2][x].color) flag = false;
    if (x > 1 && color === balls[y][x-1].color && color === balls[y][x-2].color &&
        color === balls[y][x+1].color && color === balls[y][x+2].color && x < rows -1) flag = false;
    return flag;
};

export const findBallsOneColorGorizontal = (balls) => {

    let countX = 1;
    let color = undefined;
    let posX = {y: 0, x: 0};

    for (let i  = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            if (color === balls[i][j].color) {
                posX = {y: i, x: j - countX};
                countX++;
            } else {

                color = balls[i][j].color;

                if (countX < 3) {
                    countX = 1;
                } else {
                    return {countX, posX}
                }
            }
        }
    }

}

export const findBallsOneColorVertical = (balls) => {

    let countY = 1;
    let color = undefined;
    let posY = {y: 0, x: 0};

    for (let j = 0; j < columns; j++) {
        for (let i = 0; i < rows; i++) {
            if (color === balls[i][j].color) {
                posY = {y: i - countY, x: j};
                countY++;
            } else {

                color = balls[i][j].color;

                if (countY < 3) {
                    countY = 1;
                } else {
                    return {countY, posY}
                }
            }
        }
    }

}