# afip-ocr
afip invoice qr reader

this package export an asynchronous function to extract data from afip invoices qr

```
const afipOcr = require('afip-ocr')

var Base64Pdf = 'yourBase64Pdf'

async function logAsyncFunction() {
    try {
        const result = await afipOcr.extractQRFromPDFencoded(Base64Pdf)
        console.log(result)
    } catch (error) {
        console.error("Error:", error)
    }
}

logAsyncFunction()

```