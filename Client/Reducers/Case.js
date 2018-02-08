import { SET_CASE_TYPES , SET_CASE_LIST } from 'actions/CaseAction';

const initialState = {
    caseTypes: [],
    caseList:[]
};

export const CaseReducer = (state = initialState, action) => {
    console.log("action",action);
    switch (action.type) {
        case SET_CASE_TYPES: { 
            return Object.assign({}, state, { caseTypes: action.caseTypes });
        }
        case SET_CASE_LIST: {
            return Object.assign({}, state, { caseList:action.caseList });
        }
        default:
            return state;
    }
};
