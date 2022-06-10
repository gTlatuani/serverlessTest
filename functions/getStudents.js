const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });

const getStudents = async (params) =>
{
    return await documentClient.scan(params).promise()
    .then((data) =>
    {
        return data.Items;
    })
    .catch((err) =>
    {
        console.log(err);
        const response =
        {
            statusCode: 400,
            message: 'Get students failed'
        };
        return response;
    });
}

module.exports.handler = async (event, context, callback) => {
    // allows for using callbacks as finish/error-handlers
    context.callbackWaitsForEmptyEventLoop = false;

    const params =
    {
        TableName: "Students"
    };

    return await getStudents(params);

};
