const MongoClient3 = require('mongodb').MongoClient;

// Connection URL
const url3 = 'mongodb://localhost:27017';

// Database Name
const dbName3 = 'myproject';

// Create a new MongoClient
const client3 = new MongoClient(url);

// Use connect method to connect to the 
function query3(segment: any, date1: any, date2: any) {
    client.connect(function(err: Error) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
      
        const db = client.db(dbName);
        db.customers.aggregate([{
            '$match': {
                'c_mktsegment': {'$eq': segment},
                'orders.o_orderdate': {'$lt': date1},
                'orders.lineitem.l_shipdate': {'gt': date2} 
            },
            '$group' :{
                '_id': 'orders.lineitem._id',
                'o_orderdate': 'orders.o_orderdate',
                'l_shippriority': 'orders.lineitem.l_shippriority',
                'revenue': {'$multiply': ['l_extendedprice' , {'$substact': [ { '$literal':1 }, 'l_discount' ] } ] },
            },
            '$sort': {
                'revenue' : -1,
                'o_orderdate': 1
            },
            '$project': {
                '_id': 1,
                'revenue':1,
                'o_orderdate': 1,
                'o_shippriority': 1
            }
        }])
    })
}