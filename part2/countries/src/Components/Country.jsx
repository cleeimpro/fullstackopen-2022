import React from "react"

const Country = ({ country, weather }) => {
    const languages = Object.values(country.languages)

    console.log(weather)

    return (
        <div>
            <h1>{country.name.common}</h1>
            <div>capital {country.capital[0]}</div>
            <div>area {country.area}</div>
            <p>
                <b>languages:</b>
            </p>
            <ul>
                {languages.map((l, ind) => (
                    <li key={ind}>{l}</li>
                ))}
            </ul>
            <img
                src={country.flags.png}
                alt={`flag of ${country.name.common}`}
            />

            <h2>Weather in {country.capital}</h2>
            <p>
                temperature{' '}
                {(weather.main.temp - 273.15).toLocaleString({
                    maximumFractionDigits: 2,
                })}{' '}
                Celsius
            </p>
            <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
            />
            <p>wind {weather.wind.speed} m/s</p>
        </div>
    )
}

export default Country