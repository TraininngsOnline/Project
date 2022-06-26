const router = require('express').Router();
const { verifyToken } = require('../jwt/jwt');
const queries = require('../dbmethods/dbqueries');

const ordersTable = process.env.ORDERS_TABLE;

router.get('/', verifyToken, async (req, res) => {
    const params = {
        TableName: ordersTable,
        FilterExpression: 'userId = :userId',
        ExpressionAttributeValues: {
            ':userId': req.decoded.id
        }
    };
    try {
        const result = await queries.scan(params);
        res.json(result.Items);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;