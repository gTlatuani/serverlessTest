const AWS = require('aws-sdk');    // 2. Import main development library to access all AWS resources

module.exports.handler = async (event) =>   // 1. Lambda handler declaration
{
    let arguments_from_trigger = event.arguments;   // 3. Retrieve data sended by users and/or triggers

    return  // 4. A lambda must to return data/message to user usually in JSON format
    {
        statusCode: 200,
        body: JSON.stringify(
        {
            message: 'Lambda deployed successfully from Serverless framework. By Gabriel Zidane',
            input: event,
        })
    };
};
