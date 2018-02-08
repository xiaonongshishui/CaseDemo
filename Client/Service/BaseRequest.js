import reqwest from 'reqwest';

export default function (request, data) {
  return new Promise((resolve, reject) => {
    const options = Object.assign({}, request, { data }, { crossOrigin: true, type: "json", contentType: "application/json" });
    console.log("options",options);
    reqwest(Object.assign({}, request, { data }, { crossOrigin: true })).then((response) => {
      let _response = JSON.parse(response);
      if (_response.result === 'success') {
        resolve(_response);
      } else { 
        reject(_response.info + " err");
      }
    }, (err) => {reject("server err" + err)});
  });
}
