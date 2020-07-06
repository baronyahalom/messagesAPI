//collection for sending msg
module.exports = mongoose => {
    const message_sender = mongoose.model(
        "all_messages_sender",
        mongoose.Schema(
            {
                sender: String,
                receiver: String,
                subject: String,
                message: String,
                status : String
            },
            { timestamps: true }
        )
    );

    return message_sender;
};
