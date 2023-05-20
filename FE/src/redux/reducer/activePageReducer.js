import { SET_ACTIVE_PAGE } from '../action/activePageType';

const INITIAL_STATE = {
    page: {
        name: '',
    }
};
const activePageReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_ACTIVE_PAGE:
            //console.log('check action', action);
            return {
                ...state, page: {
                    name: action?.payload
                }
            };
        default: return state;
    }
};

export default activePageReducer;