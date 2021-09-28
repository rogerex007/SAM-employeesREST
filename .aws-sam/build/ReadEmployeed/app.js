const uuid = require('uuid');
const { getParams, saveItem, getEmployee, getEmployees } = require('./utils/utils')


let response;

const TABLE_NAME = process.env.EMPLOYEED_TABLE_NAME;

exports.saveEmployeed = async (event) => {
    try {
        const {name, lastName, country} = getParams(event);

        const item = {
            id: uuid.v4(),
            name: name,
            lastName: lastName,
            country: country
        };

        const savedItem = await saveItem(item, TABLE_NAME);

        response = {
            'statusCode': 200,
            'body': JSON.stringify({"Saved Employeed": savedItem})
        };
    } catch (err) {
        console.log(err);
        return err;
    }

    return response;
};

exports.readEmployeed = async (event) => {
    try {

        const id = event.pathParameters.id;
        console.log("ID: " + id);
        const foundItem = await getEmployee(id, TABLE_NAME);
        
        response = {
            'statusCode': 200,
            'body': JSON.stringify({Employee: foundItem})
        };
    } catch (err) {
        console.log(err);
        return err;
    }

    return response;
};

exports.readEmployees = async (event) => {
    try {
        const foundItems = await getEmployees(TABLE_NAME);
        
        response = {
            'statusCode': 200,
            'body': JSON.stringify({Employees: foundItems})
        };
    } catch (err) {
        console.log(err);
        return err;
    }

    return response;
};



