
var MongoClient = require('mongodb').MongoClient;
var dbUrl = "mongodb://localhost:27017/CityBoyBlog";

function connectDb(callback) {

    MongoClient.connect(dbUrl,function (err,db) {
        if (err) {
            console.log("数据库连接失败！");
            return;
        }
        console.log('数据库已创建');
        callback(db);
        // db.close();
    })
}

function creatCollection(DB,collectionname){
    DB.createCollection(collectionname,function (err,res) {
        if (err) {
            console.log("集合创建失败，或者已经存在！");
        }
        console.log("创建集合！");
    })
}

//条件查询指定数据(如果查询条件为空，那么默认查询全部)
exports.findOne = function (dbname,collectionname,json,callback) {
    connectDb(function (db) {
        const DB = db.db(dbname);
        const  collection = DB.collection(collectionname);
        if (collection == null){
            creatCollection(DB,collectionname);
        } else {
            collection.find(json).toArray(callback);
        }
        db.close();

    });
};

//插入一条数据
exports.insertOne = function (dbname,collectionname,json,callback) {
    connectDb(function (db) {
        const DB = db.db(dbname);
        const collection = DB.collection(collectionname);
        if (collection == null){
            creatCollection(DB,collectionname);
        } else {
            let date = Date();
            json.date = date.split("GMT")[0];
            DB.collection(collectionname).insertOne(json,callback);
        }
        db.close();
    })
};

//删除一条数据
exports.deleteOne = function (dbname,collectionname,json,callback) {
    connectDb(function (db) {
        const DB = db.db(dbname);
        const collection = DB.collection(collectionname);
        if (collection == null){
            creatCollection(DB,collectionname);
        } else {
            DB.collection(collectionname).deleteOne(json,callback);
        }
        db.close();
    })
};



























