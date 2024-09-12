// APP4 => Selecting (Reading) from "abc-college.employees":

const { MongoClient } = require('mongodb');

// Importing our MongoDB Connection String:
const uri = require('./atlas_conn_str');

const client = new MongoClient(uri);

const dbName = "abc-college";

// We need to specify the collection_name:
const collectionName = "employees"

// abc-college.employees

// To Access the database and the collection "ABC-College.employees"
// Creating and ABC-College Collection variable "abcCollection"
const abcCollection = client.db(dbName).collection(collectionName);

/* 
By using find() and findAll()
*/


/* 
Creating a variable for holding the filter criteria:
getting the documents with age greater than 40
using the greater than operator "$gt"
*/
const filterDocument = { age: { $gt: 40 } }

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // console.log(`Pinged your deployment Database ${dbName}. You successfully connected to MongoDB!`);

        /* 
        Using .find() method:
        Notice that we removed "await" from the code below:
        > await abcCollection.find(filterDocument);
        'await' has no effect on the type of this expression.

        .find(): Creates a "cursor" for a filter that can be used to iterate over results from MongoDB
        */
        let resultCursor = abcCollection.find(filterDocument);

        // Using countDocuments() method to count:
        let foundDocCount = abcCollection.countDocuments(filterDocument);

        /* 
        NOTE:
        Notice that we added the "await" below
        otherwise, this error:
        "Attempted to check out a connection from closed connection pool"
        */
        console.log(`${await foundDocCount} documents found`);

        /* 
        Using .forEach() method:
        Iterates over all the documents for this cursor using the iterator, callback pattern.
        If the iterator returns false, iteration will stop.

        NOTE: 
        The code below still working fine, but you will have this warning:
        "The declaration was marked as deprecated here."

        Will be removed in a future release. Use for await...of instead.
        */
        console.log("\n Document List By Using ForEach:");
        await resultCursor.forEach(doc => {
            console.log(doc);
        });

        /* 
        To avoid using the deprecated forEach method, 
        We can use modern JavaScript iteration code with the syntactic sugar statement of "async/await". 
        An alternative solution is to use a while loop to iterate through the cursor:        
        */
        console.log("\n Document List By Using While Loop with next():");
        // Iterate through documents using a while loop

        /* 
        NOTE: 
        If run this code immediately:
        let document = await resultCursor.next();

        We will have this error:
        "MongoCursorExhaustedError: Cursor is exhausted"
        
        As we need to reset the cursor again to point to the first document:
        by using rewind() method:
        */

        // Reset the cursor to point to the first document
        // We removed "await" => await resultCursor.rewind();=> 'await' has no effect on the type of this expression.
        resultCursor.rewind();

        // The next() method of the cursor is used to retrieve the next document.
        let document = await resultCursor.next();
        while (document) {
            // Each document is printed to the console until there are no more documents left in the cursor
            console.log(document);
            document = await resultCursor.next();
        }

        /* 
        Now what about findOne()?
        We can use findOne() to find (retrieve) only one document (the first one in the collection) :-)
        */
        console.log("\n Retrieve Only One Document (If exists):");

        /* 
        Find documents where a field is equal to a specific value:
        */
        const oneDocFilter = { emp_id: 'emp123' }
        let oneDocCursor = abcCollection.findOne(oneDocFilter);
        let oneDocument = await oneDocCursor.next();
        console.log(oneDocument);

    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}


run().catch(console.dir);

