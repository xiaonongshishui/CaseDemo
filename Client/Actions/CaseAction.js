import { actionCreator } from './actionCreator';
import BaseRequest from 'service/BaseRequest';
import { GetTypesRequest , 
    GetCaseListRequest , 
    CreateCaseRequest,
    InsertManualRequest , 
    GetSampleDataRequest ,
    SubmitCaseRequest,
    GetCaseDetailRequest,
    GenerateDummyData,
    GetDummyDataRequest
} from 'service/Api'


export const SET_CASE_TYPES = "SET_CASE_TYPES";
export const setCaseTypes = actionCreator(SET_CASE_TYPES,"caseTypes");

export const getCaseTypes = ()=>(dispatch,getState)=>{
    return BaseRequest(GetTypesRequest).then(({ result, data }) => {
        if (result === 'success') { 
            dispatch(setCaseTypes(data));
            return Promise.resolve();
        }else{
            return Promise.reject("getCaseTypes err");
        }
    },(err)=>{
        return Promise.reject(err);
    })
}

export const SET_CASE_LIST = "SET_CASE_LIST";
export const setCaseList = actionCreator(SET_CASE_LIST, "caseList");


export const getCaseList = () => (dispatch,getState) => { 
   return BaseRequest(GetCaseListRequest).then(({ result , data }) => { 
        if (result === 'success') { 
            dispatch(setCaseList(data));
            return Promise.resolve();
        }else{
            return Promise.reject("getCaseList err");
        }
    }, (err) => { 
        return Promise.reject(err);
    });
}

export const createCase = (casename) =>(dispatch,getState) => {
    return BaseRequest(CreateCaseRequest,{casename}).then(({result})=>{
        if(result === 'success'){
            return Promise.resolve();
        }else{
            return Promise.reject("createCase err");
        }
    },(err)=>{
        return Promise.reject(err);
    });
}


export const insertManual = (caseId,manualData) => (dispatch,getState) => { 
    return BaseRequest(InsertManualRequest(caseId), manualData).then(({ result,data })=>{
        if(result === 'success'){
            return Promise.resolve();
        }else{
            return Promise.reject("insertManual err");
        }
    },(err)=>{
        return Promise.reject(err);
    });
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

export const submitCase = (caseId) => (dispatch,getState) => {
    return BaseRequest(SubmitCaseRequest(caseId),template).then(({result,data})=>{
        if(result === 'success'){
            return Promise.resolve('success');
        }else{
            return Promise.reject("submitCase err");
        }
    },(err)=>{
        return Promise.reject(err);
    });
}


export const getCaseDetail = (caseId) =>(dispatch,getState) => {
    return BaseRequest(GetCaseDetailRequest(caseId)).then(({result,data})=>{
        if(result === 'success'){
            return Promise.resolve(data)
        }else{
            return Promise.reject("getCaseDetail err");
        }
    },(err)=>{
        return Promise.reject(err);
    });
}

export const generateDummyData = (caseId,batchnum) => (dispatch,getState) => {
    return BaseRequest(GenerateDummyData(caseId),{batchnum}).then(({result})=>{
        if(result === 'success'){
            return Promise.resolve();
        }
    },(err)=>{
        return Promise.reject(err);
    });
}

export const getDummyDataRequest = (caseId) => (dispatch,getState) => {
    return BaseRequest(GetDummyDataRequest(caseId)).then(({result,data})=>{
        if(result === 'success'){
            return Promise.resolve(data);
        }
    },(err)=>{
        return Promise.reject(err);
    });
}















