const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();


const getParams = (event) => {
    return JSON.parse(event.body);
};

const saveItem = async (item, TABLE_NAME) => {
    const params = {
        TableName: TABLE_NAME,
        Item: item
    }
    return dynamo.put(params).promise().then(() => {
        return item;
    });
};

const getEmployee = async (id, TABLE_NAME) => {
    const params = {
        Key: {
            id: id
        },
        TableName: TABLE_NAME
    };

    try {
        const data = await dynamo.get(params).promise();
        return data;
    } catch (error) {
        return error;
    }

};

const getEmployees = async (TABLE_NAME) => {
    const params = {
        TableName: TABLE_NAME
    };

    try {
        const data = await dynamo.scan(params).promise();
        return data;
    } catch (error) {
        return error;
    }

}



module.exports = {
    getParams,
    saveItem,
    getEmployee,
    getEmployees
}