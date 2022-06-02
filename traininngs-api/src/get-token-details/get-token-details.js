const router = require('express').Router();
const queries = require('../dbmethods/dbqueries');
const {verifyToken} = require('../jwt/jwt');
const userTable = process.env.USER_TABLE;

router.get('/', verifyToken, async (req, res) => {
    console.log(req.decoded.username, userTable);
    const params = {
        TableName: userTable,
        // Key: {
        //     username: req.decoded.username
        // }
        FilterExpression: 'username = :username',
        ExpressionAttributeValues: {
            ':username': req.decoded.username
        }
    };
    try {
        const result = await queries.scan(params);
        let response = {};
        if (result.Items && result.Items.length) {
            const item = result.Items[0];
            response = {
                username: item.username,
                cart: item.cart.length
            }
        }
        res.json(response);
    } catch(error) {
        res.status(500).json(error);
    }
});

module.exports = router;
