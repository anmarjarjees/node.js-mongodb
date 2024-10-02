// APP8 => UPDATE: Update multiple documents in "abc-college.employees":
/* 
By using updateMany() method

updateMany(): updates all documents that match the search criteria.

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
We want to update all employees with the job title 'Senior Developer'.
We create a filter to find these documents.
The filter is defined as an object where the field 'job_title' equals 'Senior Developer'.
*/

// Filter: All employees with job title 'Senior Developer'
const jobTitleFilter = { job_title: 'Senior Developer' };

// Query: Increase the salary of all matching documents by $2
const updateSalary = { $inc: { salary: 2 } }

async function run() {
    try {
        // Connect the client to the MongoDB server.
        await client.connect();
        console.log(`Connected to database: ${dbName}`);

        // Inform the user that we are starting the update operation.
        console.log("\nUpdating Documents:");

        // Use updateMany() to update all documents that match the filter criteria.
        // Await the result of updateMany() method.

        // UpdateMany => increase the salary of all employees with job title 'Senior Developer':
        const updateResult = await abcCollection.updateMany(jobTitleFilter, updateSalary);
        /* 
        The result object "updateResult" contains the number of matched and modified documents
        */

        // Way#1: Check the result of the update operation using "matchedCount"
        // Combining both: matchedCount & modifiedCount
        if (updateResult.matchedCount > 0) {
            if (updateResult.modifiedCount > 0) {
                console.log(`Successfully updated ${updateResult.modifiedCount} document(s) for job title 'Senior Developer'.`);
            } else {
                console.log(`Documents matched but no changes were made for job title 'Senior Developer'.`);
            }
        } else {
            console.log("No documents found to update with job title 'Senior Developer'.");
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