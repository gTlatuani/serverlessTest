const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });

const addBook = async (bookData) =>
{
    return await documentClient.put(bookData).promise()
    .then((data) =>
    {
        console.log("Sí entra aquí");
        const response =
        {
            statusCode: 200,
            message: 'Book added successfully'
        };
        return response;

    })
    .catch((err) =>
    {
        console.log(err);
        const response =
        {
            statusCode: 400,
            message: 'Book insert failed'
        };
        return response;
    });

};

module.exports.handler = async (event, context, callback) => {

    // allows for using callbacks as finish/error-handlers
  context.callbackWaitsForEmptyEventLoop = false;

    let bookData =
    {
        Item: event.arguments.bookData,
        TableName: "Books",
        ReturnValues: "ALL_OLD"
    };

    return await addBook(bookData);


};
