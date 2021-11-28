import { DEV_MODE } from '../actions/dev_mode';
import produce from 'immer';

const initialState = {
    devmode: true
}

export default function (state = initialState,action){
    switch(action.type){
        case DEV_MODE:
            return produce(state, draft => {
                draft.devmode = !draft.devmode;
            })
        default:
            return state;
    }
}