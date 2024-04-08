"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("gocardless-nodejs");
var gocardless = require("gocardless-nodejs");
var constants = require("gocardless-nodejs/constants");
var client = gocardless(process.env.GOCARDLESS_ACCESS_TOKEN, constants.Environments.Sandbox);
var listResponse = await client.customers.list();
var customers = listResponse.customers;
console.log(customers);
