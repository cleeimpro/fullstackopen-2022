import React from "react"

const Filter = ({ filter, handleFilterChange }) => (
    <div>
        <span>find countries</span>
        <input type="text" value={filter} onChange={handleFilterChange} />
    </div>
)

export default Filter