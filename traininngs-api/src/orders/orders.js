const router = require('express').Router();
const { verifyToken } = require('../jwt/jwt');
const queries = require('../dbmethods/dbqueries');
const { v4: uuid } = require('uuid');

const ordersTable = process.env.ORDERS_TABLE;

// router.post('/', verifyToken, async (req, res) => {
//     const params = {
//         TableName: ordersTable,
//         Item: {
//             id: uuid(),
//             customer: req.decoded.username,

//         }
//     };
//     try {

//     } catch(error) {
//         res.status(500).json(error);
//     }
// });

router.get('/', verifyToken, async (req, res) => {
    const params = {
        TableName: ordersTable
    };
    try {
        const result = await queries.scan(params);
        res.json(sortItems(result.Items));
    } catch (error) {
        res.status(500).json(error);
    }
});

function sortItems(items) {
    const result = items.sort(function compare(a, b) {
        var dateA = new Date(a.date);
        var dateB = new Date(b.date);
        return dateB - dateA;
    });
    return result;
}

module.exports = router;