// Importing the mongo client "MongoClient"
/* 
"MongoClient" class is imported from "MongoDB Node.js" driver
will be used to connect to a MongoDB database 
*/
const { MongoClient } = require('mongodb');
/* 
To review: const { MongoClient }
- Destructuring Assignment: 
This syntax is known as destructuring, is used here to:
> extract the "MongoClient" property from the object returned by require('mongodb')
> assign it to a constant named "MongoClient".
> the name you use on the left side of the assignment must match the name of the property exported by the module
> if destructure property doesn't exist in the module's exports, it will be "undefined":

- Purpose: 
Destructuring allows us to access specific properties of an object directly, rather than accessing them through the object itself. In this case, it extracts MongoClient from the module exports.
*/

// Importing our MongoDB Connection String from the JS file "atlas_conn_str.js":
// notice we added ./ to refer to the root location of the current project folder
// We can use .env (recommended) as explained in my other next repositories
const uri = require('./atlas_conn_str');

// Testing the connection:
// console.log(uri); // should print the uri value

/* 
Using the Mongo Client object "MongoClient"
to initiate the connection with the Atlas DB
We only need one "MongoClient" instance per Atlas cluster for an application. 
*/
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri);

/* 
Connect to the database by identifying these the "Database" name with connection above
*/
const dbName = "abc-college";
/* 
Adding the main function to execute the connection to the database
MongoDB provides Asynchronous code

Using "async" and "await" which is the syntactic sugar :-) of using Promises
*/
async function main() {
    /* 
    Connecting to a database could throw an error,
    wrap it with try/catch as we did previously
    */
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        /* 
        The "await" keyword is used to wait for a promise to resolve and retrieve its result.
        We are using "await" keyword to block further execution of any code,
        till the connection operation is completed
        */
        console.log(`\nDeployment Database ${dbName}. You successfully connected to MongoDB!`);
    } catch (err) {
        console.error(err);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
} // main()

// Calling/Executing our connection function "main"
// main().catch(console.dir);
main().catch(console.error);
/* 
Notice that both:
- .catch(console.dir)
- .catch(console.error)
are used for handling errors that occur in an asynchronous function,
but they differ in how they handle and format the error output:

- console.dir:
    > Provides a detailed with more formatted output
    > Useful for inspecting the properties of objects
    > May show more detailed information but might be less straightforward for error logging.

- console.error:
    > Provides a simple and standard error output
    > Shows error messages and stack traces
    > Generally preferred for error handling as it's tailored for displaying errors
*/

/* 
If credentials are wrong or not provided:
"MongoServerError: bad auth : authentication failed"
*/

/* 
Another alternative way, using arrow function:
**********************************************
*/
const test = async () => {
    try {
        await client.connect();
        console.log(`\nOne more time :-) Deployment Database ${dbName}. You successfully connected to MongoDB!`);
    } catch (err) {
        console.log(`Connection Error: ${err}`);
    }
    finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
};

// calling our function "test()":
test();
