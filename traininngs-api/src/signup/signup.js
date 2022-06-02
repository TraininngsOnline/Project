const router = require('express').Router();
const queries = require('../dbmethods/dbqueries');
const { v4: uuid } = require('uuid');

router.post('/:path', async (req, res) => {
    let table = '';
    switch(req.params.path) {
        case 'speaker': table = process.env.SPEAKER_TABLE;
        break;
        case 'user': table = process.env.USER_TABLE;
        break;
    }
    const item = req.body;
    item.id = uuid();
    item.cart = [];
    item.orders = [];
    const params = {
        TableName: table,
        Item: item
    }
    try {
        const result = await queries.put(params);
        if (result) {
            res.json(result);
        }
    } catch(error) {
        res.status(500).json(error);
    }
});

module.exports = router;