// APP7 => UPDATE: Update document(s) in "abc-college.employees":
/* 
By using UpdateOne() and UpdateMany() methods

updateOne(): updates the first document that matches the search criteria
updateMany(): updates all documents that match the search criteria

Link: https://www.mongodb.com/docs/languages/kotlin/kotlin-sync-driver/current/write/update/
Link: https://www.mongodb.com/docs/manual/tutorial/update-documents/

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

// Query: Increasing the salary of document/employee with id "emp_123" by $2:
/* 
Using MongoDB update operator "$inc" to increment (or decrement) a numerical field in a document.
- Adding + value for incrementing
- Adding - value for decrementing
*/
const updateSalary = { $inc: { salary: 2 } }
/* 
{ salary: 2 }: 
 - This is an object where the key is the field we want to update (salary)
 - The value (2) is the amount by which we want to increase that field.
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

        // UpdateOne => increase the salary of employee with id "emp_123":
        const updateResult = await abcCollection.updateOne(oneDocFilter, updateSalary);
        /* 
        The result object "updateResult" contains the number of the modified documents
        */

        // Way#1: Check the result of the update operation using "matchedCount"
        if (updateResult.matchedCount > 0) {
            // If matchedCount is greater than 0, it means a document was found.
            console.log(`Document with emp_id 'emp123' is found and updated.`);
            console.log(`${updateResult.modifiedCount} document(s) were updated.`); // modifiedCount shows how many documents were actually changed.
        } else {
            // If no documents matched the filter, inform the user.
            console.log("No document found to update with emp_id 'emp123'.");
        }

        // Way#2: Check the result of the update operation using "modifiedCount"
        if (updateResult.modifiedCount > 0) {
            // If matchedCount is greater than 0, it means a document was found.
            console.log(`Successfully updated document with emp_id 'emp123'.`);
            console.log(`${updateResult.modifiedCount} document(s) were updated.`); // modifiedCount shows how many documents were actually changed.
        } else {
            // If no documents matched the filter, inform the user.
            console.log("No document found to update with emp_id 'emp123'.");
        }

        /* 
        matchedCount vs modifiedCount:
        - matchedCount: 
            > to check if any documents exist that match your query. 
            > This tells you if there’s something to update.
        - modifiedCount: 
            > to see if any actual changes were made after the update. 
            > This is particularly useful for informing the user whether the update had an effect or not.
        */

        // To ensure that an update is only attempted if there are documents that match the filter:
        // Combining both: matchedCount & modifiedCount
        if (updateResult.matchedCount > 0) {
            if (updateResult.modifiedCount > 0) {
                console.log(`Document with emp_id 'emp123' is found and was successfully updated`);
                console.log(`${updateResult.modifiedCount} document(s) were updated.`);
            } else {
                console.log(`Document matched but no changes were made to emp_id 'emp123'.`);
            }
        } else {
            console.log("No document found to update with emp_id 'emp123'.");
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

/* 
Summary of updateOne() usage:
- updateOne() is used to update a single document that matches the specified filter criteria.
- It returns an object that contains:
    - matchedCount: The number of documents matched by the filter.
    - modifiedCount: The number of documents that were actually modified.
- Always handle potential errors in asynchronous operations.
*/