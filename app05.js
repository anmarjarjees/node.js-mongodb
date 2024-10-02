// APP5 => READ: Selecting (Reading) from "abc-college.employees":
/* 
By using find() and findOne() method

NOTE:
The findOne() method is designed to return only a single document that matches the filter criteria. 
If multiple documents match the query, 
it will return the first one it finds based on the order of documents in the collection.

Practicing findOne() method:
Link: https://www.mongodb.com/docs/v6.2/reference/method/db.collection.findOne/
*/

const { MongoClient } = require('mongodb');

// Importing our MongoDB Connection String:
const uri = require('./atlas_conn_str');

const client = new MongoClient(uri);

const dbName = "abc-college";

// We need to specify the collection_name:
const collectionName = "employees"

// To Access the database and the collection "ABC-College.employees"
// Creating and ABC-College Collection variable "abcCollection"
const abcCollection = client.db(dbName).collection(collectionName);

/* 
Query: Find the employees with id value "emp123"
Creating a variable for holding the filter criteria (good practice):
getting the document where a field is equal to a specific value

Template:
const filterVariable = { field_name: ANY_VALUE  }
*/

// Query: Find the employees with id value "emp123" 
const oneDocFilter = { emp_id: 'emp123' }

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        console.log(`Connected to database: ${dbName}`);
        /* 
        We can use findOne() to find (retrieve) only one document (the first one in the collection)
        */
        console.log("\n Retrieve Only One Document (If exists):");

        // Retrieve only one document based on a specific filter
        // Await the result of findOne() method:
        let oneDocument = await abcCollection.findOne(oneDocFilter);
        /* 
        IMPORTANT NOTE:
        ***************
        findOne() [unlike find()]:
        - directly returns a promise that resolves to"
            > a single document (if found)
            > null (if not found)
        - performs the database operation immediately when called
        - must be used with "await" as we are waiting  for the promise to resolve 
        and give us the document. We want the actual result right away

        We need to use "await" with findOne() 
        awaiting the result of abcCollection.findOne(oneDocFilter)
        
        Otherwise: we will receive a promise rather than the actual document!
        Always using "await" when calling asynchronous functions
        */
        if (oneDocument) {
            console.log("Found document:", oneDocument);
            // without "await" returns => Promise { <pending> }
        } else {
            console.log("No document found with emp_id 'emp123'.");
        }

        // let oneDocument = await oneDocCursor.next();
    } catch (error) {
        console.error("An error occurred:", error);
    }
    finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
} // end run()

run().catch(console.dir);

/* 
Finally, to summarize:
**********************
- find(): Returns a cursor (not a promise to the data), so no need for "await"
- findOne(): Returns a promise that resolves to a document, so "await" is needed to get the actual document. 
*/

