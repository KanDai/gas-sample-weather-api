const getWeather = () => {
  const apiBaseUrl = 'https://weather.tsukumijima.net/api/forecast/city/'
  const cityId = '130010'
  const apiRequestUrl = `${apiBaseUrl}${cityId}`
  const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
    method: 'get',
  }
  const response = UrlFetchApp.fetch(apiRequestUrl, options)
  const responseJson = JSON.parse(response.getContentText())
  return responseJson
}

const updateSheet = (weather: any) => {
  const sheet = SpreadsheetApp.getActiveSheet()
  const lastRow = sheet.getLastRow()
  const range = sheet.getRange(lastRow + 1, 1, 1, 5)
  const data = weather.forecasts[0]
  const location = weather.location.prefecture

  range.setValues([
    [
      data.date,
      location,
      data.telop,
      data.temperature.max.celsius,
      data.temperature.min.celsius,
    ],
  ])
}

const main = () => {
  const weather = getWeather()
  updateSheet(weather)
}
