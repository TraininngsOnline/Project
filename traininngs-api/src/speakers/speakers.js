const router = require('express').Router();
const queries = require('../dbmethods/dbqueries');
const { verifyToken } = require('../jwt/jwt');
const { v4: uuid } = require('uuid'); 
const tableName = process.env.SPEAKERS_TABLE;

router.post('/', async (req, res) => {
    const item = req.body;
    if (!item.id) {
        item.id = uuid();
    }
    item.verifiedStatus = 'not verified';
    const params = {
        TableName: tableName,
        Item: item
    };
    try {
        const result = await queries.put(params);
        if (result) {
            res.json({result, item});
        }
    } catch(error) {
        res.status(500).json(error);
    }
});

router.get('/verified', verifyToken, async (req, res) => {
    const params = {
        TableName: tableName,
        FilterExpression: `verifiedStatus = :filter`,
        ExpressionAttributeValues: {
            ':filter': 'verified'
        }
    };
    try {
        const result = await queries.scan(params);
        if (result) {
            res.json(result);
        }
    } catch(error) {
        res.status(500).json(error);
    }
});

router.get('/all', verifyToken, async (req, res) => {
    const params = {
        TableName: tableName
    };
    try {
        const result = await queries.scan(params);
        if (result) {
            res.json(result);
        }
    } catch(error) {
        res.status(500).json(error);
    }
});

router.post('/:speakerId', verifyToken, async (req, res) => {
    const status = req.body.status;
    const params = {
        TableName: tableName,
        Key: {
            id: req.params.speakerId
        },
        "UpdateExpression": "set verifiedStatus = :status",
        "ExpressionAttributeValues": {
            ":status" : status
        },
        "ReturnValues" : "UPDATED_NEW"
    };
    try {
        const result = await queries.update(params);
        res.json(result);
    } catch(error) {
        res.status(500).json(error); 
    }
});

module.exports = router;