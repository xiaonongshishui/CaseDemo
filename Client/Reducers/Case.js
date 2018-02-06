import { SET_CASE_TYPES } from '../Actions/CaseAction';

const initialState = {
    caseTypes: [],
    caseLists:[]
};

export const CaseReducer = (state = initialState, action) => {
    switch (action) {
        case SET_CASE_TYPES: { 
            return Object.assign({}, state.caseTypes, action.caseTypes);
        }
        default:
            return state;
    }
};
