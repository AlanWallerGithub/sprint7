import mongo from 'mongodb';

let db = mongo.MongoClient;

console.log('ups')

db.connect('mongodb://root:password@localhost:27017/?authMechanism=DEFAULT', function(err, dbData){
    if (err){
        console.log('MongoDB not connected...')
        throw err;
        
    }
    console.log('MongoDB connected...')
});