// APP5 => Listing all the databases
// Import MongoClient class:
const { MongoClient } = require('mongodb');
// Import the MongoDB connection string:
const uri = require('./atlas_conn_str');

async function main() {
    // We can encapsulate all the code inside the main() function:
    // Create a new MongoClient instance with the connection URI
    const client = new MongoClient(uri);
    /* 
    Connecting to a database could throw an error,
    wrap it with try/catch as we did previously
    */
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect(); // returns a promise
        /* 
        Using "await" keyword to block further execution of any code,
        till the connection operation is completed
        */
        console.log(`\nYou successfully connected to MongoDB!`);

        /* 
        Calling our custom function listAllDatabases()
        that we created later:
        */
        // List all databases after a successful connection
        await listAllDatabases(client);
    } catch (err) {
        // Handle and log any errors that occur during connection or listing
        console.error('Error during connection or listing:', err);
    } finally {
        // Ensure that the client will close after operations or if an error occurs
        await client.close();
    }
} // main()

// Execute the main function and handle any uncaught errors"
// main().catch(console.dir);
main().catch(console.error);

/* 
For learning, adding a new custom function for listing all the databases,
This function will accept a MongoDB client object as argument
*/
async function listAllDatabases(mongoClientObj) {
    // Fetching the list of databases from MongoDB might cause an error!
    // Wrap it with try/catch block:
    try {
        // mongoClientObj.db().admin().listDatabases(): Fetch the list of databases:
        const databaseList = await mongoClientObj.db().admin().listDatabases();
        /* 
        This syntax "await mongoClientObj.db().admin().listDatabases()"
        1) Access the Database => mongoClientObj.db()
        *********************************************
        returns a reference to a specific MongoDB database object
        so the variable "databaseList" is an object (not array)
        - mongoClientObj.db() => db() method:
            > provided by the MongoClient instance
            > takes an optional database name as an argument
            > If no db name is provided, it returns a reference to the default database used in context with specific database operations

        2) Get Admin Operations => mongoClientObj.db().admin()
        ******************************************************
        returns an Admin object that provides administrative operations on the database
        - MongoClientObj.db().admin() => .admin() method:
            > returns an instance of the Admin class
            > This class includes methods for administrative tasks like listing databases, running server status commands
        
        3) List Databases => mongoClientObj.db().admin().listDatabases()
        ****************************************************************
        for listing all databases available on the MongoDB server. 
        -  mongoClientObj.db().admin().listDatabases() => .listDatabases() method:
            > returns a promise that resolves to an object 
            > this object contains information about all databases on the server

        Link: https://www.mongodb.com/docs/manual/reference/command/listDatabases/
        Link: https://www.mongodb.com/docs/manual/reference/method/db.adminCommand/
        Notice that "databaseList" is an object
        */
        // print the list of the databases:
        console.log("\nDatabases List: ");
        /*
        Using froEach with Array object:
    
        array.forEach(element => {
            
        });
        */

        // Loop through each database and print its name
        databaseList.databases.forEach(db => {
            console.log("\n * " + db.name);
        });
        /* 
        To clarify:
        - "databaseList" is an Object
            > it holds information about all the databases on the MongoDB server
            > it has a property named "databases"
        
        - databaseList.databases:
            > is an array (a list) of database objects
            > each object in this array represents a single database and contains details about that database
        
        - .foreach():
            >  is an array method for running a function on each item in the array
            >  is used to iterate over each database object in the databases array.
        
        - db => { ... } is an arrow function
        
        - db.name: 
            > to access the name property of each database object
            > it holds the name of the database

        Link: https://www.mongodb.com/docs/manual/reference/command/listDatabases/
        */
    } catch (error) {
        console.error('Error listing databases:', error);
    }
}; // listAllDatabases()