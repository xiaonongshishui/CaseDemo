import { actionCreator } from './actionCreator';
import BaseRequest from 'service/BaseRequest';
import { GetTypesRequest , GetCaseListRequest } from 'service/Api'


export const SET_CASE_TYPES = "SET_CASE_TYPES";
export const setCaseTypes = actionCreator(SET_CASE_TYPES,"caseTypes");

export const getCaseTypes = ()=>(dispatch,getState)=>{
    BaseRequest(GetTypesRequest).then(({ result, data }) => {
        if (result === 'success') { 
            dispatch(setCaseTypes(data));
        }
    },(err)=>{
        //console.log("");
    })
}

export const SET_CASE_LIST = "SET_CASE_LIST";
export const setCaseList = actionCreator(SET_CASE_LIST, "caseList");


export const getCaseList = () => (dispatch,getState) => { 
    BaseRequest(GetCaseListRequest).then(({ result , data }) => { 
        if (result === 'success') { 
            dispatch(setCaseList(data))
        }
    }, (err) => { 

    });
}








