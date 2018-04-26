var mongoose = require('mongoose');

const dbConfig = {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 27017,
    user: process.env.DB_USER || "",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE || "test"
}

function getConnectionLink()
{
    var link = "mongodb://";
    if(dbConfig.user)
        link += dbConfig.user+":"+dbConfig.password+"@";
    
    link += dbConfig.host+":"+dbConfig.port+"/"+dbConfig.database;
    return link;

}

mongoose.connect(getConnectionLink(), { useMongoClient: true });
mongoose.Promise = global.Promise;
mongoose.set('debug', true);

module.exports = mongoose;