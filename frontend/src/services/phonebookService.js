import axios from 'axios'
const baseUrl = process.env.REACT_APP_BASE_URL || '/api/persons'
// .env.development.local
// REACT_APP_BASE_URL=http://localhost:3001/api/persons


const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => { return response.data })
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => { return response.data })
}

const update = (id, updatedPerson) => {
    const request = axios.put(`${baseUrl}/${id}`, updatedPerson)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}
export default {
    getAll: getAll,
    create: create,
    update: update,
    delete: deletePerson
}
