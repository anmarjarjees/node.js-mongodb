// APP9 => DELETE: Delete multiple documents in "abc-college.employees":
/* 
Using deleteMany() method

deleteMany(): deletes all documents that match the search criteria.

Link: https://www.mongodb.com/docs/manual/tutorial/delete-documents/
*/
const { MongoClient } = require('mongodb');

// Importing our MongoDB Connection String:
const uri = require('./atlas_conn_str');

// Creating a new MongoClient instance to connect to the MongoDB server
const client = new MongoClient(uri);

const dbName = "abc-college"; // Name of the database
const collectionName = "employees"; // Name of the collection

// Creating a variable for the employees collection
const abcCollection = client.db(dbName).collection(collectionName);

/* 
We want to delete all employees with a salary less than $17.
We create a filter to find these documents.
The filter is defined as an object where the field 'salary' is less than 17.
*/

// Filter: All employees with a salary less than $17
const salaryFilter = { salary: { $lt: 17 } }; // The criteria for the documents we want to delete

async function run() {
    try {
        // Connect the client to the MongoDB server.
        await client.connect();
        console.log(`Connected to database: ${dbName}`);

        // Inform the user that we are starting the delete operation.
        console.log("\nDeleting Documents:");

        // Use deleteMany() to delete all documents that match the filter criteria.
        // Await the result of deleteMany() method.
        const deleteResult = await abcCollection.deleteMany(salaryFilter);

        /* 
        The result object "deleteResult" contains:
        - deletedCount: Number of documents that were deleted (can be 0 or more).
        More details can be found here: https://www.mongodb.com/docs/manual/reference/method/db.collection.deleteMany/
        */

        // Check the result of the delete operation.
        if (deleteResult.deletedCount > 0) {
            // If deletedCount is greater than 0, it means documents were found and deleted.
            console.log(`Successfully deleted ${deleteResult.deletedCount} document(s) with a salary less than $17.`);
        } else {
            // If no documents matched the filter, inform the user.
            console.log("No documents found to delete with a salary less than $17.");
        }
    } catch (error) {
        // Catch any errors that occur during the operation and log them.
        console.error("An error occurred:", error);
    } finally {
        // Ensure that the client will close when you finish or encounter an error.
        await client.close();
    }
} // end run()

// Execute the run function and catch any errors.
run().catch(console.dir);