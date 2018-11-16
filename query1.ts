const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the 
function query1(date: Date) {
    client.connect(function(err: Error) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
      
        const db = client.db(dbName);
        const collection = db.collection('documents');
        // Find some documents
        db.customer.aggregate([{
            '$match': {
                'orders.lineitem.l_shipdate': {'$lte': date}
            },
            '$group': {
                '_id': 'l_returnflag',
                'l_linestatus': 'l_linestatus',
                'sum_qty': {'$sum': 'l_quantity'},
                'sum_base_price': {'$sum': 'l_extendedprice'},
                'sum_disc_price':{'$multiply': ['l_extendedprice' , {'$substact': [ { '$literal':1 }, 'l_discount' ] } ] },
                'sum_charge': {'$multiply': ['l_extendedprice' , {'$substact': [ { '$literal':1 }, 'l_discount' ] },{$sum:[ {'$literal': '1' }, 'l_tax' ]} ] },
                'avg_qty':{'$avg': 'l_quantity'},
                'avg_price':{'$avg':'l_extendedprice'},
                'avg_disc':{'$avg':'l_discount'},
                'count_order':{'$sum': 1}
            },
            '$project': {
                'l_returnflag': 1,
                'l_linestatus':1,
                'sum_qty':1,
                'sum_base_price':1,
                'sum_disc_price':1,
                'sum_charge':1,
                'avg_qty':1,
                'avg_price':1,
                'avg_dis':1,
                'count_order':1
            }
        }])
        client.close();
      });
}
