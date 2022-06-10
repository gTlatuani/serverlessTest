const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });
const { v4 as uuid } = require('uuid');

const initLesson = async (lessonData) =>
{
    return await documentClient.put(lessonData).promise()
    .then((data) =>
    {
        console.log("Sí entra aquí");
        const response =
        {
            statusCode: 200,
            message: 'New lesson registered successfully'
        };
        return response;

    })
    .catch((err) =>
    {
        console.log(err);
        const response =
        {
            statusCode: 400,
            message: 'Lesson init failed'
        };
        return response;
    });
};

module.exports.handler = async (event, context, callback) =>
{

    // allows for using callbacks as finish/error-handlers

    context.callbackWaitsForEmptyEventLoop = false;

    let lesson_id = uuid();

    let instructor_id = event.arguments.lessonData.instructor_id;

    let group_id = event.arguments.lessonData.group_id;

    let lessonData =
    {
        Item: { lesson_id: lesson_id, instructor_id: instructor_id, group_id: group_id },
        TableName: "Lessons"
    };

    console.log(event.arguments);

    return await initLesson(lessonData);

};
