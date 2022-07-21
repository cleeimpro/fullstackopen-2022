import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import PropType from 'prop-types'

const ProtectedRoute = ({ children }) => {
    const user = useSelector(state => state.user)
    const location = useLocation()

    if (!user)
        return <Navigate to="/login" replace state={{ from: location }} />

    return children
}

ProtectedRoute.propTypes = {
    children: PropType.element
}

export default ProtectedRoute
