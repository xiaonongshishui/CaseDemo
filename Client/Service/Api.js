const baseUrl = 'http://192.168.202.35:8000';

function Request(method,url) { 
    this.method = method;
    this.url = baseUrl + url;
}

export const GetTypesRequest = new Request("get", '/api/regulartype');
export const GetCaseListRequest = new Request("get", "/api/case");

