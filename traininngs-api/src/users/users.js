const router = require('express').Router();
const queries = require('../dbmethods/dbqueries');
const { verifyToken } = require('../jwt/jwt');

const USER_TABLE = process.env.USER_TABLE;


router.get('/', verifyToken, async (req, res) => {
  const params = {
    TableName: USER_TABLE
  };
  try {
    const result = await queries.scan(params);
    res.status(200).json(result.Items);
  } catch(error) {
    res.status(500).json(error);
  }
})

// router.post("/", async function (req, res) {
//   const { userId, name } = req.body;
//   if (typeof userId !== "string") {
//     res.status(400).json({ error: '"user Id" must be a string' });
//   } else if (typeof name !== "string") {
//     res.status(400).json({ error: '"name" must be a string' });
//   }

//   const params = {
//     TableName: USERS_TABLE,
//     Item: {
//       userId: userId,
//       name: name,
//     },
//   };

//   try {
//     await dynamoDbClient.put(params).promise();
//     res.json({ userId, name });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Could not create user" });
//   }
// });

module.exports = router;