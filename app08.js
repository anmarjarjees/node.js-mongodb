// APP7 => UPDATE: Update document(s) in "abc-college.employees":
/* 
One more example about updateOne()
*/
const { MongoClient } = require('mongodb');

// Importing our MongoDB Connection String:
const uri = require('./atlas_conn_str');

const client = new MongoClient(uri);

const dbName = "abc-college";

const collectionName = "employees"

// Creating and ABC-College Collection variable "abcCollection"
const abcCollection = client.db(dbName).collection(collectionName);

/* 
We want to update the employee with a specific id value "emp123".
We create a filter to find this document.
The filter is defined as an object where the field 'emp_id' equals 'emp123'.
*/

// Update the employee with a specific emp_id "emp123"
const oneDocFilter = { emp_id: 'emp123' };

// Query:
// Update Document: Define the new values we want to set for the employee.
// The $set operator is used to specify the fields to update.
const updateValues = {
    $set: {
        name: 'Alexandra Chow', // New name for the employee
        job_title: 'Senior Developer', // New job title
        age: 59 // Updated age
    }
};
/* 
- The $set operator is crucial when updating specific fields in a document.
*/

async function run() {
    try {
        // Connect the client to the MongoDB server.
        await client.connect();
        console.log(`Connected to database: ${dbName}`);

        // Inform the user that we are starting the update operation.
        console.log("\nUpdating Document:");

        // Use updateOne() to update the document that matches the filter criteria.
        // Await the result of updateOne() method.
        // UpdateOne: to modify some fields for employee with id "emp_123":
        const updateResult = await abcCollection.updateOne(oneDocFilter, updateValues);

        // Check the result of the update operation.
        if (updateResult.modifiedCount > 0) {
            // If matchedCount is greater than 0, it means a document was found.
            console.log(`Successfully updated document with emp_id 'emp123'.`);
            console.log(`${updateResult.modifiedCount} document(s) were updated.`); // modifiedCount shows how many documents were actually changed.
        } else {
            // If no documents matched the filter, inform the user.
            console.log("No Update!");
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