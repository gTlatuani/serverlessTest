const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });

const addGroup = async (groupData) =>
{
    return await documentClient.put(groupData).promise()
    .then((data) =>
    {
        console.log("Sí entra aquí");
        const response =
        {
            statusCode: 200,
            message: 'Group added successfully'
        };
        return response;

    })
    .catch((err) =>
    {
        console.log(err);
        const response =
        {
            statusCode: 400,
            message: 'Insert failed'
        };
        return response;
    });
};

module.exports.handler = async (event, context, callback) =>
{
    // TODO implement

    // allows for using callbacks as finish/error-handlers
    context.callbackWaitsForEmptyEventLoop = false;

    let groupData =
    {
        TableName: "Groups",
        Item: event.arguments.groupData,
        ReturnValues: "ALL_OLD"
    };

    return await addGroup(groupData);


};
