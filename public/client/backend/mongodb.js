const {MongoClient} = require('mongodb')
const url= 'mongodb://localhost:27017';
const databaseName='databasename147852369'
const client= new MongoClient(url);

async function dbConnect()
{
    let result = await client.connect();
    db= result.db(databaseName);
    return db.collection('jobs');
  
}
module.exports= dbConnect;