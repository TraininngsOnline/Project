const AWS = require("aws-sdk");
const fileType = require('file-type');
const { v4: uuid } = require('uuid');

AWS.config.update({
    region: 'us-east-1'
});
const s3 = new AWS.S3();

const dynamoClient = new AWS.DynamoDB.DocumentClient();

const scan = (params) => {
    return dynamoClient.scan(params).promise();
}

const put = (params) => {
    return dynamoClient.put(params).promise();
}

const update = (params) => {
    return dynamoClient.update(params).promise();
}

const deleteItem = (params) => {
    return dynamoClient.delete(params).promise();
}

const uploadToS3 = async (data) => {
    // const imageContent = data.substr(7, data.length);
    const imageBuffer = Buffer.from(data, 'base64');
    const imageInfo = await fileType.fromBuffer(imageBuffer);
    if (imageInfo) {
        const imageExt = imageInfo.ext;
        const imageMime = imageInfo.mime;
        const name = uuid();
        const key = `${name}.${imageExt}`;
        try {
            await s3.putObject({
                Body: imageBuffer,
                Key: key,
                ContentType: imageMime,
                Bucket: process.env.IMAGE_UPLOAD_BUCKET,
                ACL: 'public-read'
            }).promise();
            return {
                url: `https://${process.env.IMAGE_UPLOAD_BUCKET}.s3.amazonaws.com/${key}`
            };
        } catch (error) {
            return error;
        }
    } else {
        return {
            url: data
        }
    }
}

module.exports = {
    scan,
    put,
    uploadToS3,
    deleteItem,
    update
}