import { useState, useEffect } from 'react'
import axios from 'axios'

import Countries from './Components/Countries'
import Filter from './Components/Filter'

const App = () => {
    const [countries, setCountries] = useState([])
    const [filter, setFilter] = useState('')
    const [capital, setCapital] = useState('Vienna')
    const [weather, setWeather] = useState({})

    const api_key = process.env.REACT_APP_API_KEY

    useEffect(() => {
        axios
            .get('https://restcountries.com/v3.1/all')
            .then((response) => setCountries(response.data))
    }, [])

    useEffect(() => {
        axios
            .get(
                `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`
            )
            .then((response) => setWeather(response.data))
    }, [capital, api_key])

    const handleFilterChange = (e) => {
        setFilter(e.target.value)
    }

    const filteredCountries = countries.filter((c) =>
        c.name.common.toLowerCase().includes(filter.toLowerCase())
    )

    if (
        filteredCountries.length === 1 &&
        filteredCountries[0].capital !== capital
    )
        setCapital(filteredCountries[0].capital)

    return (
        <div>
            <Filter filter={filter} handleFilterChange={handleFilterChange} />
            <Countries
                countries={filteredCountries}
                handleFilterChange={handleFilterChange}
                weather={weather}
            />
        </div>
    )
}

export default App
