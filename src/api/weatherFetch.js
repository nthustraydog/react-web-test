import axios from 'axios';

const key = '36978c6550efee0e27e50850cc57adda';
const weatherBaseUrl = `http://api.openweathermap.org/data/2.5/weather?appid=${key}`;

let weatherSource = axios.CancelToken.source();

export function getWeatherGroup(code) {
    let group = 'na';
    if (200 <= code && code < 300) {
        group = 'thunderstorm';
    } else if (300 <= code && code < 400) {
        group = 'drizzle';
    } else if (500 <= code && code < 600) {
        group = 'rain';
    } else if (600 <= code && code < 700) {
        group = 'snow';
    } else if (700 <= code && code < 800) {
        group = 'atmosphere';
    } else if (800 === code) {
        group = 'clear';
    } else if (801 <= code && code < 900) {
        group = 'clouds';
    }
    return group;
}

// example function of axios
export function getWeatherInfo(location = 'Hsinchu', unit = 'metric') {
    let url = `${weatherBaseUrl}&q=${encodeURIComponent(location)}&units=${unit}`;

    console.log(`Making request to: ${url}`);

    return axios.get(url, {cancelToken: weatherSource.token}).then(function(res) {
        if (res.data.cod && res.data.message)
            throw new Error(res.data.message);

        return {
            code: res.data.weather[0].id,
            group: getWeatherGroup(res.data.weather[0].id),
            description: res.data.weather[0].description,
            temp: res.data.main.temp
        };
    }).catch(function(err) {
        if (axios.isCancel(err)) {
            console.error(err.message, err);
        } else {
            throw err;
        }
    });
}

export function cancelWeather() {
    weatherSource.cancel('Weather request canceled');
}