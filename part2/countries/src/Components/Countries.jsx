import React from 'react'

import Country from './Country'

const Countries = ({ countries, handleFilterChange, weather }) => {
    if (countries.length > 20)
        return <div>To many matches, specify another filter</div>
    else if (countries.length === 1) {
        return <Country country={countries[0]} weather={weather} />
    }
    return (
        <ul>
            {countries.map((c, ind) => (
                <li key={ind}>
                    {c.name.common}{' '}
                    <button value={c.name.common} onClick={handleFilterChange}>
                        show
                    </button>
                </li>
            ))}
        </ul>
    )
}

export default Countries
