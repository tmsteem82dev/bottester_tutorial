const builder = require("botbuilder");
module.exports = function (connector) {
    let bot = new builder.UniversalBot(connector)

    bot.dialog("/", function (session) {
        switch (session.message.text.toLocaleLowerCase()) {
            case "hiya":
                session.send(["Good day", "Hello", "Hi", "Hemoglobin"]);
                break;
            default:
                session.send("I don't understand: " + session.message.text);
                break;
        }
    });

    return bot;
};