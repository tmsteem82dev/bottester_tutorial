const builder = require("botbuilder");
const cardGenerator = require("./cardGenerator");
module.exports = function (connector) {
    let bot = new builder.UniversalBot(connector)

    bot.dialog("/", function (session) {
        switch (session.message.text.toLocaleLowerCase()) {
            case "hiya":
                session.replaceDialog("/greeting");
                break;
            case "how are you?":
                session.replaceDialog("/how_are_you");
                break;
            case "what is github?":
                session.replaceDialog("/what_is_github");
                break;
            default:
                session.send("I don't understand: " + session.message.text);
                break;
        }
    });

    bot.dialog("/what_is_github", [function (session, args, next) {
        session.send("For information on GitHub look at the card below:");
        next();
    }, function (session, result, next) {
        let cardMSg = cardGenerator.getGitHubCardMessage(); //new builder.Message(session).addAttachment(card);
        session.send(cardMSg);
        session.endConversation();
    }]);

    bot.dialog("/greeting", [function (session, args, next) {

        let msgs = ["Good day", "Hello", "Hi"]

        if (session.userData.name) {
            for (let i = 0; i < msgs.length; i++) {
                msgs[i] = `${msgs[i]}, ${session.userData.name}!`;
            }
        }
        session.send(msgs);
        next();
    }, function (session, result, next) {
        if (session.userData.name) {
            session.endConversation();
        } else {
            builder.Prompts.text(session, "My name is Tobor, what is your name?");
        }

    }, function (session, result, next) {
        session.userData.name = result.response;
        session.endConversation("Nice to meet you.")
    }]);

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