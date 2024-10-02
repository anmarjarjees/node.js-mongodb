// APP10 => DELETE: Delete document(s) in "abc-college.employees":
/* 
One more example about deleteOne()
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
We want to delete the employee with a specific id value "emp123".
We create a filter to find this document.
The filter is defined as an object where the field 'emp_id' equals 'emp123'.
*/

// Filter: Delete the employee with a specific emp_id "emp123"
const oneDocFilter = { emp_id: 'emp123' }; // The criteria for the document we want to delete

async function run() {
    try {
        // Connect the client to the MongoDB server.
        await client.connect();
        console.log(`Connected to database: ${dbName}`);

        // Inform the user that we are starting the delete operation.
        console.log("\nDeleting Document:");

        // Use deleteOne() to delete the document that matches the filter criteria.
        // Await the result of deleteOne() method.
        // deleteOne: to remove the employee document with id "emp123":
        const deleteResult = await abcCollection.deleteOne(oneDocFilter);

        /*
        The result object "deleteResult" contains:
        - deletedCount: Number of documents that were deleted (should be 0 or 1).
        If a document is successfully deleted, deletedCount will be 1.
        More details can be found here: https://www.mongodb.com/docs/manual/reference/method/db.collection.deleteOne/
        */

        // Check the result of the delete operation.
        if (deleteResult.deletedCount > 0) {
            // If deletedCount is greater than 0, it means a document was found and deleted.
            console.log(`Successfully deleted document with emp_id 'emp123'.`);
            console.log(`${deleteResult.deletedCount} document(s) were deleted.`); // deletedCount shows how many documents were removed.
        } else {
            // If no documents matched the filter, inform the user.
            console.log("No document found to delete with emp_id 'emp123'.");
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
