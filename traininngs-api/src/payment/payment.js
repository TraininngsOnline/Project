const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_KEY);
const { verifyToken } = require('../jwt/jwt');
const { updateOrderDetails } = require('../controllers/controller');
const queries = require('../dbmethods/dbqueries');

const userTableName = process.env.USER_TABLE;

router.post('/', verifyToken, async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: req.body.line_items,
            success_url: `https://traininngsonline.com/#/users/order-update?status=success`,
            cancel_url: `https://traininngsonline.com/#/users/order-update?status=failed`,
        })
        res.json({ url: session.url })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
});

module.exports = router;