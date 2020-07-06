messages API 

Created with nodeJS express, and data saved in MongoDB. 

link - https://messagesherolo.herokuapp.com/

https://messagesherolo.herokuapp.com/api/message/new_message - create new message. the body should contain - sender, receiver, subject, message.

https://messagesherolo.herokuapp.com/api/message/read_all/:user - read all messages user received

https://messagesherolo.herokuapp.com/api/message/get_all_unread/:user - get all unread messages that user received

https://messagesherolo.herokuapp.com/api/message/read_one/:user/:msgID - read specific message that user received

https://messagesherolo.herokuapp.com/api/message/delete_msg/:user/:msgID - delete specific message that user sent/received. 


