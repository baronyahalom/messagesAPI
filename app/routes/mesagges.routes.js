// all the routs for the application

module.exports = app => {
    const message = require("../controller/messages.controller.js");
    const router = require("express").Router();
    router.post("/new_message", message.create);
    router.get("/read_all/:user", message.readAll);
    router.get("/get_all_unread/:user", message.getUnread);
    router.get("/read_one/:user/:msgID", message.readOne);
    router.get("/delete_msg/:user/:msgID", message.deleteMsg);
    app.use('/api/message', router);
};
