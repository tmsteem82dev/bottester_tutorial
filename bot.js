const builder = require("botbuilder");
module.exports = function (connector) {
    let bot = new builder.UniversalBot(connector)

    bot.dialog("/", function (session) {
        switch (session.message.text.toLocaleLowerCase()) {
            case "hiya":
                session.send(["Good day", "Hello", "Hi"]);
                break;
            case "how are you?":
                session.replaceDialog("/how_are_you");
                break;
            default:
                session.send("I don't understand: " + session.message.text);
                break;
        }
    });

    bot.dialog("/how_are_you", [
        function (session, args, next) {
            session.send("I am good.");
            next();
        },
        function (session, result, next) {
            builder.Prompts.text(session, "How about you?");
        },
        function (session, result, next) {
            if (result.response === "I am fine.") {
                session.endConversation("That is good to hear.");
            } else {
                session.endConversation("I am sorry to hear that.");
            }
        }
    ]);

    return bot;
};