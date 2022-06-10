const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });

const params =
{
    TableName: "Books"
};

const obtenetLibros = async () =>
{
    try {
        const datos = await documentClient.scan(params).promise();
        return datos.Items;
    }
    catch (err)
    {
        return err;
    }

}

module.exports.getBooks = async (event, context, callback) => {
    // TODO implement

    // allows for using callbacks as finish/error-handlers
    context.callbackWaitsForEmptyEventLoop = false;

    try
    {
        const datos = await obtenetLibros();

        return datos;

    }
    catch (err)
    {
        const response =
        {
            statusCode: 200,
            body: JSON.stringify(err),
        };
        return response;

    }

};
