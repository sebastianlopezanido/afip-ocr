const Jimp = require("jimp")
const jsQR = require("jsqr")


function decodeBase64(encodedString) {

  const buffer = Buffer.from(encodedString, 'base64')
  return buffer.toString('latin1')

}

function extractValueFromURL(url) {

  const parts = url.split('?')

  if (parts.length < 2) {
    return null
  }
  
  const queryString = parts[1]
  const queryParams = queryString.split('&')
  
  for (const param of queryParams) {

    if (param.startsWith('p=')) {

      const encodedValue = param.substring(2)
      const decodedValue = decodeBase64(encodedValue)
      const jsonObject = JSON.parse(decodedValue)
      return jsonObject

    }

  }
  
  return null

}

async function extractQRFromPDFencoded(base64PDF) {
  const { pdf } = await import("pdf-to-img")
  const buffer = Buffer.from(base64PDF, "base64")
  const document_image = await pdf(buffer, { scale: 5 })
  
  for await (const image of document_image) {

    const image_obj = await Jimp.read(image)
    const { data, width, height } = image_obj.bitmap
    const decodedQR = jsQR(new Uint8ClampedArray(data), width, height)

    if(decodedQR){

      return extractValueFromURL(decodedQR.data)
      
    }

  }

  return null

}


module.exports = {
  extractQRFromPDFencoded
}


  









