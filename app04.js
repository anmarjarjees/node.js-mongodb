// APP4 => READ: Selecting (Reading) from "abc-college.employees":
/* 
By using find() and findOne() method

Practicing find() method:
Link: https://www.mongodb.com/docs/manual/reference/method/db.collection.find/
*/

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
/* 
Remember that "abcCollection" variable
is holding a reference to our MongoDB collection "employees"
>> Table (SQL) <==> Collection (MQL)
*/
const abcCollection = client.db(dbName).collection(collectionName);

/* 
Query: Find all employees who are 40 years old or older
Creating a variable for holding the filter criteria (good practice):
getting the documents with age greater than 40
using the greater than operator "$gt":

Template:
const filterVariable = { field_name: { $gt: NUMERIC_VALUE } }
*/

// Query: Find all employees who are 40 years old or older
const filterDocument = { age: { $gt: 40 } }

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        console.log(`Connected to database: ${dbName}`);

        /* 
        Using .find() method for the MongoDB collection object:
        Notice that we removed "await" from the code below:
        > await abcCollection.find(filterDocument);
        'await' has no effect on the type of this expression.

        Using "await" with find() has no effect because:
        > .find() method does not actually retrieve the data immediately; 
        it creates a cursor that will allow us to iterate over the results later.
        > .find() method doesn't fetch documents right away! It gives us a cursor that we can use to access those documents.
        > .find(): creates/returns a "cursor" for a filter that can be used to iterate over results from MongoDB

        Please be advised that a "cursor" is an iterable object that allows us to access the documents later. The actual data retrieval happens when we start iterating over the cursor
        (using .toArray(), .forEach(), or .next())

        As with PHP or any CRUD operation with any programming langue, 
        a cursor is like a pointer that you can use to navigate through a set of results 
        from a database query.
        */
        let resultCursor = abcCollection.find(filterDocument);

        // Using countDocuments() method to count:
        let foundDocCount = await abcCollection.countDocuments(filterDocument);
        /* 
        IMPORTANT NOTE:
        ***************
        Functions that return promises (like countDocuments()) 
        need to be awaited to get the actual result.

        Adding "await()" makes the program waits until the countDocuments() function finishes
        and gives us the count of documents.
        So the variable "foundDocCount" will hold the actual number of documents found

        If we DO NOT use "await":
        The variable "foundDocCount" will NOT hold the actual count! 
        Instead, it will hold a promise

        To summarize:
        A promise is like a placeholder for a value that will be available later. 
        If we  try to use "foundDocCount" immediately without "await", 
        we will NOT get the expected number but a promise object instead.

        OUTPUT WITHOUT "await":
        [object Promise] documents found
        */

        console.log(`${foundDocCount} documents found`);

        /* 
        Using the OLD .forEach() method (Deprecated):
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
        IMPORTANT NOTE FOR RESTING THE CURSOR: 
        **************************************
        If run this code immediately:
        let document = await resultCursor.next();

        We will have this "ERROR":
        "MongoCursorExhaustedError: Cursor is exhausted"
        
        (Remember that we have a similar issue when we use "fetch()" with PHP CRUD operation)

        To solve this error:
        We need to reset the cursor again to point to the first document:
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
    } catch (error) {
        console.error("An error occurred:", error);
    }
    finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
} // end run()

run().catch(console.dir);

