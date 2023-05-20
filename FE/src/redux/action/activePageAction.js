import { SET_ACTIVE_PAGE } from './activePageType'

export const reduxActivePage = (page) => {
    return {
        type: SET_ACTIVE_PAGE,
        payload: page
    };
};
