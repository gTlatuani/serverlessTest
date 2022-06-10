const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });

const addBook = async (bookData) =>
{
    try {
        await documentClient.put(bookData).promise();
    }
    catch(err)
    {
        console.log(err);
        return err;
    }
};

module.exports.handler = async (event, context, callback) => {

    // allows for using callbacks as finish/error-handlers
  context.callbackWaitsForEmptyEventLoop = false;

    let bookData =
    {
        Item: event.arguments.bookData,
        TableName: "Books",
        ReturnValues: "ALL_NEW"
    };

    console.log(event);

    try {
        await addBook(bookData);

        const response =
        {
            statusCode: 200,
            message: 'Book added successfully'
        };
        return response.message;
    }
    catch(err)
    {
        const response =
        {
            statusCode: 400,
            message: 'Insert failed',
        };
        return response;
    }
};
