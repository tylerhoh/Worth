import 'gocardless-nodejs'
import * as dotenv from 'dotenv';


dotenv.config();

const gocardless = require("gocardless-nodejs");
const constants = require("gocardless-nodejs/constants")

const client = gocardless(
    process.env.GOCARDLESS_ACCESS_TOKEN,
    constants.Environments.Sandbox,
);

const listResponse = client.customers.list();
const customers = listResponse.customers;
console.log(customers);