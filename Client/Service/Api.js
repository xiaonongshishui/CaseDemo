const baseUrl = 'http://192.168.202.35:8000';

function Request(method,url,param) { 
    this.method = method;
    this.url = baseUrl + url;
    if (param) { 
        this.url = this.url + '/'+param
    }
}

export const GetTypesRequest = new Request("get", '/api/regulartype');
export const GetCaseListRequest = new Request("get", "/api/case");


export const InsertManualRequest = (caseid) => new Request("put", "/api/case", caseid);

export const GetSampleDataRequest = (caseid) => new Request("post", "/api/casedetailed",caseid);
export const SubmitCaseRequest = (caseid) => new Request("post", "/api/casedetailed", caseid);
export const GetCaseDetailRequest = (caseid) => new Request("put", "/api/casedetailed", caseid);

export const GenerateDummyData = (caseid) => new Request("post","/api/casedata/",caseid);
export const GetDummyDataRequest = (caseid) => new Request("get", "/api/casedata", caseid);

