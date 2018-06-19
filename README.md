# EventUs Back-end

![EventUs Image](src/image.jpg)

[![Build Status](link to travis)](link to travis)
![Coverage](https://img.shields.io/badge/coverage-75%25-brightgreen.svg)
![Node](https://img.shields.io/badge/node-v8.9.4-blue.svg)

## Overview 
This the back-end to the EventUs application and is intended to be a social media platform organized around events localized around the user. It stores and persists data via Mongoose and a MongoDB, with the data being provided by the user. The application is built with Node.js and utilizes an Express.js server with custom middleware and authentication. 

## Getting Started 

EventUs API is available at `https://github.com/EventUs-CF`. 

## Schema Structure 

![schema diagram](img here)

### Account Schema

#### POST /signup 
This route is designed to take the input of the form and ensure that a new account is created with a proper security token for accessing other routes in the application.

#### GET /login  
Verifies if you are an existing user, allowing login and returns a unique token for accessing other application endpoints. 

### User Schema 

### Event Schema

## Architecture 
The back-end of this application was created and deployed with the following technology: 

Vanilla JavaScript, Node.js, body-parser, Express.js, superagent, http-errors, Mongoose, jest and faker for testing, eslint for syntactically correct code.  

## Testing 
In order to test please ensure you have access to the Jest test suite. To run the tests for the back-end please type the following into your CLI.

    npm run dbon
    npm test

When finished testing please remember to turn off your MongoDB

    npm run dboff

Collective thanks to all of the Teacher's Assistants, Vinicio and the other staff at Code Fellows.