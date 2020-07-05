module.exports = mongoose => {
    const message_receiver = mongoose.model(
        "all_messages_receiver",
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

    return message_receiver;
};
