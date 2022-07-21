import axios from 'axios'

const baseUrl = '/api/blogs'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async (resource, token) => {
    const config = {
        headers: {
            Authorization: `bearer ${token}`
        }
    }
    const response = await axios.post(baseUrl, resource, config)
    return response.data
}

const update = async (id, resource, token) => {
    const config = {
        headers: {
            Authorization: `bearer ${token}`
        }
    }
    const response = await axios.put(`${baseUrl}/${id}`, resource, config)
    return response.data
}

const remove = async (id, token) => {
    const config = {
        headers: {
            Authorization: `bearer ${token}`
        }
    }
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
}

const comment = async (id, comment, token) => {
    const config = {
        headers: {
            Authorization: `bearer ${token}`
        }
    }
    const response = await axios.post(
        `${baseUrl}/${id}/comments`,
        comment,
        config
    )
    return response.data
}

const blogService = {
    getAll,
    create,
    update,
    remove,
    comment
}

export default blogService
