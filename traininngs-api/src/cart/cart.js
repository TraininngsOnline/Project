const router = require('express').Router();
const queries = require('../dbmethods/dbqueries');
const { verifyToken } = require('../jwt/jwt');
const AWS = require("aws-sdk");

const tableName = process.env.USER_TABLE;
const webinarTable = process.env.WEBINARS_TABLE;

router.post('/:webinarid', verifyToken, async (req, res) => {
    const cart = [
        {
            id: req.params.webinarid,
            paymentFor: req.body.paymentFor,
            quantity: req.body.quantity || 1
        }
    ];
    const emptyList = [];
    const params = {
        TableName: tableName,
        // FilterExpression: 'username = :username',
        // ExpressionAttributeValues: {
        //     ':username': req.decoded.username
        // },
        Key: {
            username: req.decoded.username
        },
        "UpdateExpression": "set cart = list_append(if_not_exists(cart, :emptyList), :cart)",
        "ExpressionAttributeValues": {
            ":cart" : cart,
            ":emptyList": emptyList
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

router.put('/quantity', verifyToken, async (req, res) => {
    const params = {
        TableName: tableName,
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
        if (result.Items.length) {
            const cart = result.Items[0]['cart'];
            const itemIndex = cart.findIndex(item => (item.id === req.body.id && item.paymentFor === req.body.paymentFor));
            cart[itemIndex]['quantity'] = req.body.quantity;
            const updateParams = {
                TableName: tableName,
                Key: {
                    username: req.decoded.username
                },
                // FilterExpression: 'username = :username',
                // ExpressionAttributeValues: {
                //     ':username': req.decoded.username
                // },
                "UpdateExpression": "set cart = :cart",
                "ExpressionAttributeValues": {
                    ":cart" : cart
                },
                "ReturnValues" : "UPDATED_NEW"
            };
            try {
                const result1 = await queries.update(updateParams);
                res.json(result1);
            } catch(error) {
                res.status(500).json(error); 
            }

        }
    } catch(error) {
        res.status(500).json(error); 
    }
});

router.delete('/:id/:paymentFor/:quantity', verifyToken, async (req, res) => {
    const params = {
        TableName: tableName,
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
        if (result.Items.length) {
            const cart = result.Items[0]['cart'];
            console.log('cart items', cart);
            const itemIndex = cart.findIndex(item => (item.id === req.params.id && item.paymentFor === req.params.paymentFor && Number(item.quantity) === Number(req.params.quantity)));
            console.log('item index', itemIndex);            
            cart.splice(itemIndex, 1);
            const updateParams = {
                TableName: tableName,
                Key: {
                    username: req.decoded.username
                },
                // FilterExpression: 'username = :username',
                // ExpressionAttributeValues: {
                //     ':username': req.decoded.username
                // },
                "UpdateExpression": "set cart = :cart",
                "ExpressionAttributeValues": {
                    ":cart" : cart
                },
                "ReturnValues" : "UPDATED_NEW"
            };
            try {
                const result1 = await queries.update(updateParams);
                res.json(result1);
            } catch(error) {
                res.status(500).json(error); 
            }

        }
    } catch(error) {
        res.status(500).json(error); 
    }
});

router.get('/', verifyToken, async (req, res) => {
    console.log('username', req.decoded.username);
    const params = {
        TableName: tableName,
        // Key: {
        //     username: req.decoded.username
        // }
        FilterExpression: 'username = :username',
        ExpressionAttributeValues: {
            ':username': req.decoded.username
        }
    }
    try {
        const result = await queries.scan(params);
        const user = result.Items[0];
        console.log('user details',result);
        if (user && user.cart && user.cart.length) {
            const webinarIds = {}, paymentOptions = {};
            user.cart.map((value, index) => {
                var titleKey = ":titlevalue"+index;
                webinarIds[titleKey.toString()] = value.id;
                paymentOptions[value.id] = value.paymentFor;
            });
            const webinarParams = {
                TableName: webinarTable,
                FilterExpression: "id IN ("+Object.keys(webinarIds).toString()+ ")",
                ExpressionAttributeValues : webinarIds
            };
            try {
                const webinars = await queries.scan(webinarParams);
                res.json({
                    Items: webinars.Items,
                    paymentOptions,
                    cart: user.cart
                });
            } catch(error) {
                res.status(500).json(error);
            }
        } else {
            res.json({
                Items: [],
                paymentOptions: {},
                cart: []
            });
        }
    } catch(error) {
        res.status(500).json(error); 
    }
});

module.exports = router;
