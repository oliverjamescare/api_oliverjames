
/**
 * @api {get} /address/search Address search
 * @apiSampleRequest /address/search
 * @apiVersion 0.0.1
 * @apiName Address search
 * @apiGroup Address
 *
 * @apiParam {String} [search] Search string
 * @apiParam {String} [container] Container id to receive closer results

 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
            "Id": "GB|RM|B|8836300",
            "Type": "Address",
            "Text": "1 Railway Terrace",
            "Highlight": "",
            "Description": "Tipton St. John, Sidmouth, EX10 0AA"
 *     }
 */

/**
 * @api {get} /address/search/:id Address details
 * @apiSampleRequest off
 * @apiVersion 0.0.1
 * @apiName Address details
 * @apiGroup Address
 *
 * @apiParam {String} id Place id

 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
            "Id": "GB|RM|B|8836300",
            "DomesticId": "8836300",
            "Language": "ENG",
            "LanguageAlternatives": "ENG",
            "Department": "",
            "Company": "",
            "SubBuilding": "",
            "BuildingNumber": "",
            "BuildingName": "1 Railway Terrace",
            "SecondaryStreet": "",
            "Street": "",
            "Block": "",
            "Neighbourhood": "",
            "District": "Tipton St. John",
            "City": "Sidmouth",
            "Line1": "1 Railway Terrace",
            "Line2": "Tipton St. John",
            "Line3": "",
            "Line4": "",
            "Line5": "",
            "AdminAreaName": "Devon",
            "AdminAreaCode": "",
            "Province": "Devon",
            "ProvinceName": "Devon",
            "ProvinceCode": "",
            "PostalCode": "EX10 0AA",
            "CountryName": "United Kingdom",
            "CountryIso2": "GB",
            "CountryIso3": "GBR",
            "CountryIsoNumber": "826",
            "SortingNumber1": "87134",
            "SortingNumber2": "",
            "Barcode": "(EX100AA1D6)",
            "POBoxNumber": "",
            "Label": "1 Railway Terrace\nTipton St. John\nSIDMOUTH\nEX10 0AA\nUNITED KINGDOM",
            "Type": "Residential",
            "DataLevel": "Premise",
            "Field1": "",
            "Field2": "",
            "Field3": "",
            "Field4": "",
            "Field5": "",
            "Field6": "",
            "Field7": "",
            "Field8": "",
            "Field9": "",
            "Field10": "",
            "Field11": "",
            "Field12": "",
            "Field13": "",
            "Field14": "",
            "Field15": "",
            "Field16": "",
            "Field17": "",
            "Field18": "",
            "Field19": "",
            "Field20": ""
 *     }
 */