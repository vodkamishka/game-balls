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
                if (countX > 2 && i === columns - 1) {
                    matchX.push({countX, posX: {y: j, x: i}});
                }
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
                if (countY > 2 && j === rows - 1) {
                    matchY.push({countY, posY: {y: j, x: i}});
                }
            } else {
                if (countY < 3) {
                    color = balls[j][i].color;
                    countY = 1;
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

export const removeCreateBalls = (matchX: any, matchY: any, balls: any) => {

    if (matchY.length) {

        matchY.forEach((match: any) => {
            const posY = match.posY;
            const countY = match.countY;
            if (posY) {
                for (let y = posY.y; y > posY.y - countY!; y--) {
                    balls[y][posY.x].color = balls[y - countY!] ? balls[y - countY!][posY.x].color : randomColor();
                }
                for (let y = posY.y - countY!; y >= 0; y--) {
                    while (true) {
                        let color = randomColor();
                        if (createNewColumn(balls, posY.x, y, color)) {
                            balls[y][posY.x].color = color;
                            break;
                        }
                    }
                }
            }
        })
    }

    if (matchX.length) {

        matchX.forEach((match: any) => {

            const posX = match.posX;
            const countX = match.countX;

            if (posX) {
                for (let y = posX.y; y >= posX.y - 1; y--) {
                    for (let x = posX.x; x > posX.x - countX!; x--) {
                        balls[posX.y][x].color = balls[posX.y - 1] ? balls[posX.y - 1][x].color : randomColor();
                    }
                }
                for (let x = posX.x; x > posX.x - countX!; x--) {
                    while (true) {
                        let color = randomColor();
                        if (createNewRow(balls, x, color)) {
                            balls[0][x].color = color;
                            break;
                        }
                    }
                }
            }
        });
    }

    matchX = findBallsOneColorGorizontal(balls);
    matchY = findBallsOneColorVertical(balls);

    if (matchX.length || matchY.length) removeCreateBalls(matchX, matchY, balls);

    return balls;

}