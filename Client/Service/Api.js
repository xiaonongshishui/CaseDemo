const baseUrl = 'http://192.168.202.35:8000';

function Request(method,url,param,param2) { 
    this.method = method;
    this.url = baseUrl + url;
    if (param) { 
        this.url = this.url + '/' + param + '/';
        if (param2) { 
            this.url + param2 + '/';
        }
    }
}

export const GetTypesRequest = new Request("get", '/api/regulartype/');
export const GetCaseListRequest = new Request("get", "/api/case/");
export const CreateCaseRequest = new Request("post","/api/case/");



export const GetSampleDataRequest = (caseid) => new Request("post", "/api/casedetailed",caseid);
export const SubmitCaseRequest = (caseid) => new Request("post", "/api/casedetailed", caseid);
export const GetCaseDetailRequest = (caseid) => new Request("get", "/api/casedetailed", caseid);

export const InsertManualRequest = (caseid) => new Request("put", "/api/casedata", caseid);
export const GenerateDummyDataRequest = (caseid) => new Request("post","/api/casedata",caseid);
export const GetDummyDataRequest = (caseid) => new Request("get", "/api/casedata", caseid);

//export const DownloadFileRequest = (caseid) => new Request("put","/api/downloadfile",caseid,fileType);
