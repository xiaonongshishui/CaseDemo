import reqwest from 'reqwest'

export default function (request, data) {
  return reqwest(Object.assign({}, request, { data },{crossOrigin:true}))
}
