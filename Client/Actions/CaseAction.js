import { actionCreator } from './actionCreator';
import BaseRequest from 'service/BaseRequest';
import { GetTypesRequest , GetCaseListRequest , InsertManualRequest , GetSampleDataRequest } from 'service/Api'


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


export const insertManual = (caseId,manualData) => (dispatch,getState) => { 
    BaseRequest(InsertManualRequest(caseId), manualData).then({ result, data }) => { 
    if (result === 'success') { 
        
    }
}, (err) => { });
}

export const getSampleData = (caseId,template) => (dispatch,getState) =>{
    return BaseRequest(GetSampleDataRequest(caseId), template).then(({ result, data }) => {
        if (result === 'success') {
            return Promise.resolve(data);
        } else { 
            return Promise.reject("getSampleData err");
        }
     }, (err) => { 
        return Promise.reject(err);
    });
}








