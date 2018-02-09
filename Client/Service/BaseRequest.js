import reqwest from 'reqwest';

export default function (request, data) {
  return new Promise((resolve, reject) => {
    let options = Object.assign({}, request, { crossOrigin: true, type: "json", contentType: "application/json" });
    if (data !== undefined) {
      options = Object.assign({},options, { data: JSON.stringify(data) });
    }
    
    console.log("options",options);
    reqwest(options).then((response) => {
      if (response.result === 'success') {
        resolve(response);
      } else { 
        reject(response.info + " err");
      }
    }, (err) => {reject("server err" + err)});
  });
}
