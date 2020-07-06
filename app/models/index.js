const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

//db collections
const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.messagesSender = require("./msg_sender.model.js")(mongoose);
db.messagesReceiver = require("./msg_receiver.model.js")(mongoose);
module.exports = db;
