const dbService = require('../../services/db.service')
// const logger = require('../../services/logger.service')
const reviewService = require('../review/review.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    getByToyname,
    remove,
    update,
    add
}

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    try {
        const collection = await dbService.getCollection('toys')
        var toys = await collection.find(criteria).toArray()
        toys = toys.map(toy => {
            delete toy.password
            toy.isHappy = true
            toy.createdAt = ObjectId(toy._id).getTimestamp()
            // Returning fake fresh data
            // toy.createdAt = Date.now() - (1000 * 60 * 60 * 24 * 3) // 3 days ago
            return toy
        })
        return toys
    } catch (err) {
        logger.error('cannot find toys', err)
        throw err
    }
}

async function getById(toyId) {
    try {
        const collection = await dbService.getCollection('toys')
        const toy = await collection.findOne({ '_id': ObjectId(toyId) })
        delete toy.password

        toy.givenReviews = await reviewService.query({ byToyId: ObjectId(toy._id) })
        toy.givenReviews = toy.givenReviews.map(review => {
            delete review.byToy
            return review
        })

        return toy
    } catch (err) {
        logger.error(`while finding toy ${toyId}`, err)
        throw err
    }
}
async function getByToyname(toyname) {
    try {
        const collection = await dbService.getCollection('toys')
        const toy = await collection.findOne({ toyname })
        return toy
    } catch (err) {
        logger.error(`while finding toy ${toyname}`, err)
        throw err
    }
}

async function remove(toyId) {
    try {
        const collection = await dbService.getCollection('toys')
        await collection.deleteOne({ '_id': ObjectId(toyId) })
    } catch (err) {
        logger.error(`cannot remove toy ${toyId}`, err)
        throw err
    }
}

async function update(toy) {
    try {
        // peek only updatable fields!
        toy._id = ObjectId(toy._id)
        const collection = await dbService.getCollection('toys')
        await collection.updateOne({ '_id': toyToSave._id }, { $set: toyToSave })
        return toyToSave;
    } catch (err) {
        logger.error(`cannot update toy ${toy._id}`, err)
        throw err
    }
}

async function add(toy) {
    try {
        // peek only updatable fields!
        const toyToAdd = {
            toyname: toy.toyname,
            password: toy.password,
            fullname: toy.fullname,
            score: toy.score || 0
        }
        const collection = await dbService.getCollection('toys')
        await collection.insertOne(toyToAdd)
        return toyToAdd
    } catch (err) {
        logger.error('cannot insert toy', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.txt) {
        const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
        criteria.$or = [
            {
                toyname: txtCriteria
            },
            {
                fullname: txtCriteria
            }
        ]
    }
    if (filterBy.minBalance) {
        criteria.balance = { $gte: filterBy.minBalance }
    }
    return criteria
}


