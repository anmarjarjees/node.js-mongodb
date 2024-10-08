// APP3 => CREATE MANY: Inserting multiple documents to "abc-college.employees":
const { MongoClient } = require('mongodb');

// Importing our MongoDB Connection String:
const uri = require('./atlas_conn_str');

const client = new MongoClient(uri);

const dbName = "abc-college";

// We need to specify the collection_name:
const collectionName = "employees"

// ABC-College.employees

// To Access the database and the collection "ABC-College.employees"
// Creating and ABC-College Collection variable "abcCollection"
const abcCollection = client.db(dbName).collection(collectionName);

// Insert multiple documents:
/* 
Instead of creating one object, 
we can simply create an array of objects
*/
const employees = [
    {
        emp_id: 'emp784',
        name: 'Sam Simpson',
        email: 'SamSimpson@abcMogoDBcollege.ca',
        job_title: 'Instructor',
        age: 50,
        salary: 25,
        hired_date: new Date(),
    },
    {
        emp_id: 'emp887',
        name: 'Sally Grayson',
        email: 'SallyGrayson@abcMogoDBcollege.ca',
        job_title: 'Graphic Designer',
        age: 37,
        salary: 28,
        hired_date: new Date(),
    }
]

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        console.log(`Connected to database: ${dbName}`);

        // Using the method insertMany() for inserting multiple documents:
        const result = await abcCollection.insertMany(employees);
        /*  
        For testing:
        using the property "insertedCount" of the promise object that insertMany() method returns

        the property "insertedCount": The number of inserted documents for this operations

        Link: https://www.mongodb.com/docs/manual/reference/method/db.collection.insertMany/
        */
        console.log(`${result.insertedCount} new employees (document) were inserted`);
        /* 
        New document with auto-generated id value of 661201f6d07e2599ff4fe60c was inserted
        */
        console.log(result.insertedIds);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
        /* 
        the closing statement is commented due to the same reason as with app2.js
        */
    }
}

run().catch(console.dir);

/* 
Another alternative way, using arrow function:
**********************************************
*/
const test = async () => {
    try {
        await client.connect();
        let result = await abcCollection.insertMany(employees);
        console.log(`${result.insertedCount} document were inserted`);
    } catch (err) {
        console.log(`Connection Error: ${err}`);
    }
    finally {
        // await client.close();        
    }
}

// calling our function "test()":
// not running "test()" function to avoid the id duplication error:
// test();


/*
IMPORTANT NOTE FOR TESTING/RUNNING THE CODE:
******************************************** 
Refer to the comments of app2.js file for closing the connection
*/
