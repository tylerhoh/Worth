import 'gocardless-nodejs'

const gocardless = require("gocardless-nodejs");
const constants = require("gocardless-nodejs/constants")

const client = gocardless(
    process.env.GoCardlessAccessToken,
    constants.Environments.Sandbox,
);

const listResponse = client.customers.list();
const customers = listResponse.customers;
console.log(customers);