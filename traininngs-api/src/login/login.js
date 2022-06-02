const router = require('express').Router();
const queries = require('../dbmethods/dbqueries');
const { signInToken } = require('../jwt/jwt');
router.post('/:path', async (req, res) => {
    let table = '';
    switch(req.params.path) {
        case 'admin': table = process.env.ADMIN_TABLE;
        break;
        case 'user': table = process.env.USER_TABLE;
        break;
        case 'marketingmanager': table = process.env.MARKETING_MANAGER_TABLE
        break;
    }
    const params = {
        TableName: table,
        FilterExpression: 'username = :username AND password = :password',
        ExpressionAttributeValues: {
            ':username': req.body.username,
            ':password': req.body.password
        }
    }
    queries.scan(params).then((data) => {
        if (data.Items.length) {
            console.log(data);
            const jwtData = {
                username: data.Items[0].username,
                role: data.Items[0].role,
                cart: data.Items[0].cart ? data.Items[0].cart.length : undefined,
                id: data.Items[0].id,
                name: data.Items[0].name
            };
            res.json({
                message: 'login Successful',
                data: jwtData,
                token: signInToken(jwtData)
            });
        } else {
            res.status(401).json({
                message: 'Invalid Credentials'
            });
        }
    }, (error) => {
        res.status(500).json({ error })
    });
});

module.exports = router;


