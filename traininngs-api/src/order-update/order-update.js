const router = require('express').Router();
const { verifyToken } = require('../jwt/jwt');
const { updateOrderDetails } = require('../controllers/controller');
const queries = require('../dbmethods/dbqueries');

const userTableName = process.env.USER_TABLE;

router.post('/', verifyToken, async (req, res) => {
    try {
        const paramsForOrderUpdate = {
            username: req.decoded.username,
            amount: req.body.amount,
            webinars: req.body.webinars,
            status: req.body.paymentStatus,
            userId: req.decoded.id
        }
        const result = await updateOrderDetails(paramsForOrderUpdate);
        res.json({
            result
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;