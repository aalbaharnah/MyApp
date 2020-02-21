import myKey from "../MyKey/mykey"

export const WeatherInfo = (query) => GET(`http://api.weatherstack.com/current?access_key=${myKey}&query=${query}`)


async function GET(url) {
    return fetch(ur)
        .then(resp => resp.json)
        .then(resp => resp)
        .catch(error => error)
}