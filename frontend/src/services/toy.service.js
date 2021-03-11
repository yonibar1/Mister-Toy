const TOY_URL = (process.env.NODE_ENV !== 'development') ? '/api/toy' : '//localhost:3030/api/toy';
const KEY = 'toysDB';
const axios = require('axios')

export const toyService = {
    query,
    getById,
    remove,
    save,
    getEmptyToy,
}
// var gToys;

function query() {
    return axios.get(`${TOY_URL}`)
        .then(res => res.data)
}

function getById(id) {
    return axios.get(`${TOY_URL}/${id}`)
        .then(res => res.data)
}

function remove(id) {
    return axios.delete(`${TOY_URL}/${id}`)
        .then(res => res.data)
}

function save(toy) {
    if (toy._id) {
        return axios.put(`${TOY_URL}/${toy._id}`, toy)
            .then(res => res.data)
    } else {
        return axios.post(`${TOY_URL}`, toy)
            .then(res => res.data)
    }
}

function getEmptyToy() {
    return {
        _id: '',
        name: '',
        inStock: true,
        type: '',
        price: 0,
        createdAt: Date.now()
    }
}

