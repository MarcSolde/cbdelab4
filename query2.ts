const MongoClient2 = require('mongodb').MongoClient;

// Connection URL
const url2 = 'mongodb://localhost:27017';

// Database Name
const dbName2 = 'myproject';

// Create a new MongoClient
const client2 = new MongoClient(url);

// Use connect method to connect to the 
function query2(size: any, type: any, region: any) {
    client.connect(function(err: Error) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
      
        const db = client.db(dbName);
        const collection = db.collection('documents');

        db.consumer.aggregate([{
            '$match': {
                'partSupp.part.size': {'$eq': size},
                'partSupp.supplier.region': {'$eq': region}
            },
            '$lookup': {
                from: "partSupp",
                localField: "",
                foreignField: "",
                as: "",
            }    
        }])
    })
}
