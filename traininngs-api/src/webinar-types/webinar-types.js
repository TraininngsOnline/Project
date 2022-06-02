const router = require('express').Router();
const queries = require('../dbmethods/dbqueries');
const {verifyToken} = require('../jwt/jwt');
const {v4: uuid} = require('uuid');
const webinarTypesTable = process.env.WEBINAR_TYPES_TABLE;

router.post('/', verifyToken, async(req, res) => {
    const params = {
        TableName: webinarTypesTable,
        Item: {
            id: uuid(),
            title: req.body.title,
            description: req.body.description,
            date: new Date().toISOString()
        }
    };
    try {
        const result = await queries.put(params);
        res.json(result);
    } catch(error) {
        res.status(500).json(error);
    }
});

router.get('/', async(req, res) => {
    const params = {
        TableName: webinarTypesTable
    };
    try {
        const result = await queries.scan(params);
        res.json(result);
    } catch(error) {
        res.status(500).json(error);
    }
});

module.exports = router;