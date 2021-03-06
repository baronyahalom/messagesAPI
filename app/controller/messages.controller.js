const db = require("../models");
const msg_send = db.messagesSender;
const msg_receive = db.messagesReceiver;

//creating and saving new msg
exports.create = (req, res) => {
    console.log("writing new message");
    // Validate request
    if (!req.body.sender) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a message for sender
    const new_message_send = new msg_send({
        sender: req.body.sender,
        receiver: req.body.receiver,
        subject: req.body.subject,
        message: req.body.message,
        status : "send"
    });

    // Create a message for receiver
    const new_message_receive = new msg_receive({
        sender: req.body.sender,
        receiver: req.body.receiver,
        subject: req.body.subject,
        message: req.body.message,
        status : "receive"
    });

    // Save message in the database
    new_message_send.save(new_message_send)
        .then(data => {
            console.log("Message by " + data.sender + " was send successfully to " + data.receiver);
            new_message_receive.save(new_message_receive)
                .then(data => {
                    res.send("Message by " + data.sender + " was send successfully to " + data.receiver);
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while creating the message."
                    });
                });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the message."
            });
        });


};


// read all messages that user received
exports.readAll = (req, res) => {
    const userID = req.params.user;
    let receiver = { receiver: { $regex: new RegExp(userID), $options: "i" } };

    msg_receive.find(receiver)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving messages."
            });
        });

};

// get all unread messages that user receives
exports.getUnread = (req, res) => {
    console.log("Getting all unread messages from user: " + req.params.user);
    const userID = req.params.user;
    let receiver = { receiver: { $regex: new RegExp(userID), $options: "i" } };
    let unreadMessages = [];
    msg_receive.find(receiver)
        .then(data => {
            //get only the messages user receive and didn't read
            Object.keys(data).forEach(function(k){
                if(data[k].status === "receive")
                    unreadMessages.push(data[k]);
            });
            if(unreadMessages.length === 0)
                res.send("You read all your messages");
            else
                res.send(unreadMessages);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving messages."
            });
        });

};

//read specific msg
exports.readOne = (req, res) => {
    console.log("read messages from user: " + req.params.user);
    const userID = req.params.user;
    const msg = req.params.msgID;
    /// find msg by ID
    msg_receive.findById(msg)
        .then(data => {
            console.log(data.sender)
            // find user and check if he didn't read the msg
            if( data.receiver === userID && data.status === "receive"){
                msg_receive.findByIdAndUpdate(msg, {"status" : "read"},  { useFindAndModify: false })
                    .then(dddd => {
                        res.send(data);
                    })
                    .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "can't update"
                    });
                    });
            }
            else
                res.send("didn't find message");
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving messages."
            });
        });

};

//delete specific msg
exports.deleteMsg = (req, res) => {
    console.log("delete messages from user: " + req.params.user);
    const userID = req.params.user;
    const msg = req.params.msgID;
    //check if delete from receiver
    msg_receive.findById(msg)
        .then(data => {
            if(data != null && data.receiver === userID){
                msg_receive.findByIdAndRemove(msg,  { useFindAndModify: false })
                    .then(dddd => {
                        res.send(data);
                    })
                    .catch(err => {
                        res.status(500).send({
                            message:
                                err.message || "can't update"
                        });
                    });
            }
            //check if delete from sender
            else
            {
                msg_send.findById(msg)
                    .then(data => {
                        if(data != null && data.sender === userID){
                            msg_send.findByIdAndRemove(msg)
                                .then(dddd => {
                                    res.send(data);
                                })
                                .catch(err => {
                                    res.status(500).send({
                                        message:
                                            err.message || "can't update"
                                    });
                                });
                        }
                        else
                            res.send("didn't find message");
                    })
                    .catch(err => {
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred while retrieving messages."
                        });
                    });
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving messages."
            });
        });

};






