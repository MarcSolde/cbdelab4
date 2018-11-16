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

        db.partSupp.aggregate([{
            '$match': {
                'part.size': {'$eq': size},
                'supplier.region': {'$eq': region},
                'supplier.supplyCost': {'$min': 'result_subquery.ps_supplyCost'}
            },
            '$lookup': {
                from: "partSupp",
                localField: "supplier.region.name",
                foreignField: region,
                as: "result_subquery",
            },
            '$project': {
                'supplier.s_actbal': 1,
                'supplier.s_name': 1,
                'supplier.nation.n_name': 1,
                'part._id': 1,
                'part.p_mfgr': 1,
                'supplier.s_address': 1,
                'supplier.s_phone':1,
                'supplier.s_comment':1
            },
            '$sort': {
                'supplier.s_acctbal': -1,
                'supplier.nation.n_name': 1,
                'supplier.s_name': 1,
                'supplier.part._id':1
            }    
        }])
    })
}
