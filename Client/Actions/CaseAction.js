import { actionCreator } from './actionCreator';
import BaseRequest from 'service/BaseRequest';
import { GetTypesRequest , 
    GetCaseListRequest , 
    CreateCaseRequest,
    InsertManualRequest , 
    GetSampleDataRequest ,
    SubmitCaseRequest,
    GetCaseDetailRequest,
    GenerateDummyDataRequest,
    GetDummyDataRequest
} from 'service/Api'


export const SET_CASE_TYPES = "SET_CASE_TYPES";
export const setCaseTypes = actionCreator(SET_CASE_TYPES,"caseTypes");

export const getCaseTypes = ()=>(dispatch,getState)=>{
    return new Promise((resolve,reject)=>{
        BaseRequest(GetTypesRequest).then(({data})=>{
            dispatch(setCaseTypes(data));
            return resolve(data)
        },(err)=>{return reject(err)});
    });
}

export const SET_CASE_LIST = "SET_CASE_LIST";
export const setCaseList = actionCreator(SET_CASE_LIST, "caseList");


export const getCaseList = () => (dispatch,getState) => {
    return new Promise((resolve,reject)=>{
        BaseRequest(GetCaseListRequest).then(({data})=>{
            dispatch(setCaseList(data));
            return resolve();
        },(err)=>{return reject(err)});
    });
}

export const createCase = (casename) =>(dispatch,getState) => {
    return new Promise((resolve,reject)=>{
        BaseRequest(CreateCaseRequest,{casename}).then(({data})=>{
            return resolve(data.caseid);
        },(err)=>{
            return reject(err);
        });
    })
}


export const insertManual = (caseId,manualData) => (dispatch,getState) => {
    return new Promise((resolve,reject)=>{
        BaseRequest(InsertManualRequest(caseId), manualData).then((response)=>{
            return resolve();
        },(err)=>{
            return reject(err);
        });
    });
}

export const getSampleData = (caseId,template) => (dispatch,getState) =>{
    return new Promise((resolve,reject)=>{
        BaseRequest(GetSampleDataRequest(caseId), template).then(({data})=>{
            console.log("getSampleData",data);
            return resolve(data);
        },(err)=>{reject(err);})
    });
}

export const submitCase = (caseId) => (dispatch,getState) => {
    return new Promise((resolve,reject)=>{
        BaseRequest(SubmitCaseRequest(caseId),template).then(()=>{
            return resolve();
        },(err)=>{reject(err);});
    });
}


export const getCaseDetail = (caseId) =>(dispatch,getState) => {
    return new Promise((resolve,reject)=>{
        BaseRequest(GetCaseDetailRequest(caseId)).then(({data})=>{
            return resolve(data);
        },(err)=>{return reject(err);});
    });
}

export const generateDummyData = (caseId,batchnum) => (dispatch,getState) => {
    return new Promise((resolve,reject)=>{
        BaseRequest(GenerateDummyDataRequest(caseId),{batchnum:batchnum}).then(()=>{
            return resolve();
        },(err)=>{return reject(err);});
    });
}

export const getDummyData = (caseId) => (dispatch,getState) => {
    return new Promise((resolve,reject)=>{
        BaseRequest(GetDummyDataRequest(caseId)).then(({data})=>{
            return resolve(data);
        },(err)=>{reject(err);});
    });
}

// export const downloadFile = (caseId) => (dispatch)















