# Node.js and MongoDB
Quick demonstration about using Node.js API with MongoDB Driver for creating simple Node.js Console Application according to MongoDB Official Documentations and Instructions. 

Before starting this tutorial you will need to be familiar with MQL (MongoDB Query Language), for more details and information, you can refer to my repo ["mongodb-vscode"](https://github.com/anmarjarjees/mongodb-vscode) which is about "Learning the essentials of MongoDB Query Language using VSCode".

Notice that in this repo we are just learning the CRUD operation using node.js the minimal required tool "MongoDB" driver. In my other repos, there are a demonstration about using "Mongoose" for MongoDB connection and for CRUD operations.

# Node.js
Please refer to my GitHub repo for ["Starting with Node.js"](https://github.com/anmarjarjees/node.js-start) if you need to review the steps of installing node and learning about its core features.

# About MongoDB.com
You will need to open an account with mongoDB. please refer to my in-class 3 PDF files about MongoDB Quick Start, MongoDB Atlas, and MongoDB with Python and review all the details about MongoDB account setup and the initial required configurations.

## Quick Steps Sequence
To have the full explanation about node.js and express installation, please refer to my GiHub repo ["express-basics](https://github.com/anmarjarjees/express-basics), but in this repo we will focus on using pure node.js with MongoDB without any frameworks.

1. run the command to create the "package.json":
```
npm init -y
```

### NOTE:
This "JSON" file contains this "main" field (property):
```
"main": "index.js"
```
The "main" field is a module ID that is the primary entry point to your program.
Since our .js file is named "app.js" so we can modify it:
```
"main": "app.js"
```

2. Add a new property to the JSON file inside the "script". 
Notice that we can run any .js file using this command as we did before:
```
node fileName
```
Since we have the JSON file, we can add the property for example "start" for the object property "scripts". Adding the value which is "node" and "app1.js", "app2.js", or any .js file as this will be our main JavaScript file to run our application in a hosting platform after publishing our project Most commonly used named are app.js, server.js, or index.js depending on the host server:
```
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node app1.js"
  },
```
3. After changing the JSON file, we can run this command:
```
npm run start
```
Or just:
```
npm start
```

The command will run whatever .js file we specified in the package.json

4. Using the main file "app1.js", "app2.js", and so on...

# MongoDB Driver
To simplify the connection and working directly with MongoDB databases in this simple Node.js console application, we will install the MongoDB driver "MongoDB". We can also build our application using the second option "Mongoose" which is an Object Data Modeling (ODM) library for MongoDB and Node.js.

MongoDB driver builds secure connections between our application and the MongoDB cluster. It's in charge of executing all the database operations on behalf of client applications. 

There is an official MongoDB Driver for each programming language. You can visit ("Start Developing with MongoDB")[https://www.mongodb.com/docs/drivers/] to learn more about the driver for each programming language.

# MongoDB Connection and Initial Setup
**Please refer to my In-Class PDF for the full instructions or my repo about using MongoDB with VS Code**
In this example, I used the same organization name with the following:
- A new project named "MONGODB-NODE"
- Created a new cluster named "ClusterMongoNode"
Notice that the default connection string after creating our new cluster "ClusterMongoNode" using the "Driver" option in Atlas connections:
```
mongodb+srv://mongo:<password>@clustermongonode.8t0e141.mongodb.net/?retryWrites=true&w=majority&appName=ClusterMongoNode
```
The default user name will usually be your login ID, but you can modify to any name as in the example above of "mongo"

**Also be advised for the database location *< database >* that you can add to specify your database name:**
```
mongodb+srv://mongo:<password>@clustermongonode.8t0e141.mongodb.net/<database>?retryWrites=true&w=majority&appName=ClusterMongoNode
```

- Copy the connection string from Atlas. Notice that password will not be included:
![MongoDB Connection](/repo-img/MongoDBConnectionWindow.png)

- We need to add/create a database (if not exists) with a collection (optional). Click the "Database", then "Browse Collections", then "Add My Own Data" or the other option "Load a Sample Database"

Notice if you select/click the option "Add My Own Data", MongoDB will ask you for:
- Database name => abc-college
- Collection name => employees

![Database and Collection](/repo-img/database-collection.png)

## Important Note
Instead of copying the connection string to our main application file "app.js", we can copy it into a separate .js file, so we can git ignore it. I name the file "atlas_conn_str.js", then just simply write this code line:
```
module.exports = uri = "PASTE YOUR CONNECTION STRING HERE";
```
Notice that the connection string already includes the username and the cluster name, we just need to add the password

Now refer to "app.js" file to complete the rest.

# Connection Troubleshooting Examples
## Example#1: Error Connecting to the database => Closed Connection:
One of the common possible reasons is: Our IP address doesn't have access to the Atlas Cluster. We need to add our IP address
- Click the "Network Access" under the "SECURITY" category:
![Network Access Link](/repo-img/Security-List-Menu.png);
- Click "Add IP ADDRESS" green button to add your IP address if you cannot see your IP or any IP listed. If there is an IP address, click "EDIT" button to modify the existing one. Notice that the image below shows "0.0.0.0/0" IP address which means it can be accessed from anywhere. For just testing, learning and demonstration, it should be fine, but for production mode, it shouldn't because of security reasons. 
![Network IP Window](/repo-img/Network-IP-Window.png)

## Example#2: Authentication failed
This error could be due to incorrect username or password, or both
- Double check your username in Atlas and make sure it's the same in the connection string. Notice in the example below, the username is "abcd" then ":" then "YOUR_PASSWORD" then "@" then "YOUR_CLUSTER_NAME" then the rest of the connection string...
```
uri = "mongodb+srv://abcd:3gGHRSlU894FSFS@cluster0...
```
- Double check or update your password and copy the new (updated) one to be used in the connection string that you have copied as MongoDB will not add the password to the connection string automatically, we have to add it. **Please refer to my PDF file for the details steps of updating the Atlas password**.

#### Database User Password Update
To update the password or if you forget it:
- Click "Database Access" from the left main navigation
- Click "Edit" button besides the user info

![Database User](/repo-img/database-user.png)

- Click "Edit Password" so you can enter the new password
- Finally, click "Update User"

# MongoDB Database
- MongoDB uses "Binary JSON" or "BSON" as the data format to save the data. 
- Node.JS with MongoDB Driver allows us to work with BSON documents as JavaScript objects
- MongoDB as "NO SQL" database is build on documents (not tables)
Below is an example of a BSON document of a "employee" entity:
```
{
    "_id" { "Primary key: You will have a unique code generated by MongoDB for this document in collection" },
    employee_id: "emp123",
    name: "Alex Chow",
    email: "alex@college.com",
    position: "Instructor",
    age: 58,
    date_hired: 2024-07-03
}
```

# Starting the Application
1. Prepare/create the folder for your application. In this repo is called "Node.js-MongoDB".

2. Initialize the folder as a Node.js project:
```
npm init -y
```
NOTE: If you need a refresh about node npm refer to my in-class notes, pdf files, and the previous repos that shared with you in the BBU.

3. Install the Node.js MongoDB driver:
```
npm install mongodb
```
After installing the mongodb driver, you will have this dependency with the version of the installed mongodb driver:
```
  "dependencies": {
    "mongodb": "^6.5.0"
  }
```

By the way, you can check which version you have installed:
```
npm list mongodb
```

The output (for example):

    node.js-mongodb@1.0.0 C:\Repos\node.js-mongodb

    └── mongodb@6.5.0

4. Connecting our local app with the online Atlas. Copy the connection string from MongoDB Atlas (refer to my PPT slides). Please review the article above about "MongoDB Connection".
  - a) Login to your MongoDB.com (Atlas Account)
  - b) Click the "Database" from the left main navbar
  
  ![Database link](/repo-img/navbar-database.png)

  - c) Click the "Connect" button from the left main content section "Clusters".
    
    NOTES: 
    - The default cluster name is "Cluster0", but you might change it. You can have more than one cluster with different names. In this example, I am using a demo cluster "ClusterMongoNode" as I mentioned for my class code demonstration although it says **"ClusterMyClass"** as shown in the image below:
    - Don't forget that a cluster is part of a project. For quick introduction to MongoDB, the project is named **"MongoDB-Intro"** as explained in my class/lecture.

  ![Main content - "Connect" button](/repo-img/main-content-connect-btn.png)

  - d) Select "Drivers" which is the only option for "Connect to your application" section

  ![Application Driver Connection](/repo-img/drivers-app-connection.png)

  - e) Copy the connection string:
    - Will need to add the password



### *To be Continued...*


# Credits, References, and Recourses:
- MongoDB Documentation:
    - URL: https://www.mongodb.com/docs/
- MongoDB University:
    - https://learn.mongodb.com/
- MongoDB Developer Center:
    - URL: https://www.mongodb.com/developer/
- MongoDB with JavaScript
    - URL: https://www.mongodb.com/docs/languages/javascript/
- MongoDB YouTube Channel:
    - https://www.youtube.com/@MongoDB/playlists
- IBM Technology YouTube Channel
    - URL: https://www.youtube.com/@IBMTechnology/videos
- Lauren Schaefer - Lead, Instructional Advocacy - Pennsylvania, US
    - URL: https://www.mongodb.com/developer/author/lauren-schaefer/
- John McCambridge - Curriculum Engineer for @mongodb
    - URL: https://github.com/nol166