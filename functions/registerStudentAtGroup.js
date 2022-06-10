const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });

const registerStudentAtGroup = async (studentData) =>
{
    return await documentClient.update(studentData).promise()
    .then((data) =>
    {
        console.log("Sí entra aquí");
        const response =
        {
            statusCode: 200,
            message: 'Student registered at group successfully'
        };
        return response;

    })
    .catch((err) =>
    {
        console.log(err);
        const response =
        {
            statusCode: 400,
            message: 'Student register failed'
        };
        return response;
    });
};

module.exports.handler = async (event, context, callback) =>
{
    // TODO implement

    // let studentData =
    // {
    //     TableName: "Groups",
    //     Key: { idGrupo: "l0j9g6f5d3" },
    //     UpdateExpression: "set alumnos = list_append(alumnos, :a)",
    //     ExpressionAttributeValues:
    //     {
    //         ":a": [{"idAlumno": "12345"}]
    //     },
    //     ReturnValues: "UPDATED_NEW"
    // }

    console.log(event.arguments);

    let studentData =
    {
        TableName: "Groups",
        Key: { group_id: event.arguments.studentData.group_id },
        UpdateExpression: "set students = list_append(students, :a)",
        ExpressionAttributeValues:
        {
            ":a": event.arguments.studentData.students
        },
        ReturnValues: "ALL_NEW"
    }

    return await registerStudentAtGroup(studentData);



};
