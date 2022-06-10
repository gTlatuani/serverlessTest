const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });

const addStudent = async (studentData) =>
{
    return await documentClient.put(studentData).promise()
    .then((data) =>
    {
        console.log("Sí entra aquí");
        const response =
        {
            statusCode: 200,
            message: 'Student added successfully'
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

}


module.exports.handler = async (event, context, callback) =>
{
    // allows for using callbacks as finish/error-handlers
    context.callbackWaitsForEmptyEventLoop = false;

    let studentData =
    {
        Item: event.arguments.studentData,
        TableName: "Students",
    }

    //return await documentClient.put(studentData).promise()
    return await addStudent(studentData);



};
