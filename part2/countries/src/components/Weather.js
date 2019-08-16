import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Weather = ({country}) => {
    //initial state for weather
    const [weather, setWeather] = useState('')
    const [displayWeather, setDisplayWeather] = useState(false)
    
    //using API with the specific country capital name for weather as per docs
    useEffect(() => {
        const key = `42ce14c733e846aebaf45409190508`
        const url = `https://api.apixu.com/v1/current.json?key=${key}&q=${country.capital}`
        axios
        .get(url)
        .then(response => {
            setWeather(response.data.current) //updating state based off JSON values
            setDisplayWeather(true) //updating state
        })
    }, [country.capital]) //we want to only fetch data when the component mounts -> the effect depends on the query so when changed, data request is fired

        //using conditional flow; a) if init state of displayWeather is true, show the details b) loading/fetching data
    return(
        <div>
            {!displayWeather
            ? ( <p>Please wait...</p>
            ) :(
            <div>
                <h3>Weather in {country.capital}</h3>
                <h4>Temperature: {weather.temp_c}c</h4>
                <img src={weather.condition.icon} alt={weather.condition.text}/>
                <h4>Wind: {weather.wind_kph} kph  {weather.wind_dir}</h4>    
            </div>)
            }
        </div>
    )
}

export default Weather
