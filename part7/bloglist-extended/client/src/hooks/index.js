import { useState, useEffect } from 'react'
import axios from 'axios'

export const useResource = baseUrl => {
    const [resources, setResources] = useState([])

    useEffect(() => {
        axios.get(baseUrl).then(response => setResources(response.data))
    }, [baseUrl])

    const create = resource => {
        axios
            .post(baseUrl, resource)
            .then(response => setResources([...resources, response.data]))
    }

    const remove = id => {
        axios
            .delete(`${baseUrl}/${id}`)
            .then(() => setResources(resources.filter(r => r.id === id)))
    }

    const update = (id, resource) => {
        axios
            .put(`${baseUrl}/${id}`, resource)
            .then(response =>
                setResources(
                    resources.map(r => (r.id !== id ? response.data : r))
                )
            )
    }

    const service = {
        create,
        remove,
        update
    }

    return [resources, service]
}

export const useLocalStorage = (keyName, defaultValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const value = window.localStorage.getItem(keyName)
            if (value) {
                return JSON.parse(value)
            } else {
                window.localStorage.setItem(
                    keyName,
                    JSON.stringify(defaultValue)
                )
                return defaultValue
            }
        } catch (err) {
            return defaultValue
        }
    })
    const setValue = newValue => {
        try {
            window.localStorage.setItem(keyName, JSON.stringify(newValue))
        } catch (err) {
            console.error(err)
        }
        setStoredValue(newValue)
    }
    return [storedValue, setValue]
}
