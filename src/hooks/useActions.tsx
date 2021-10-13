import {useDispatch} from "react-redux";
import {addColor, createMatrix, moveBall, removeBallsOneColor} from "../store/reducer";
import {bindActionCreators} from "redux";

const actions = { addColor, createMatrix, moveBall, removeBallsOneColor }

export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(actions, dispatch)
}