const {
    BotTester,
    TestConnector
} = require("bot-tester");
const MyBot = require('../bot');
const connector = new TestConnector();

describe("BotTester", () => {
    let bot;
    beforeEach(() => {
        bot = require("../bot")(connector);
    });

    for (let i = 0; i < 5; i++) {
        it("can reply hello", function () {

            return new BotTester(bot).sendMessageToBot("Hiya", ["Good day", "Hello", "Hi"])
                .runTest();
        });
    }

    let messages = ["Who are you?", "How are you doing?", "x"]
    for (let i = 0; i < messages.length; i++) {

        it("will reply with I do not understand", function () {
            let msg = messages[i];
            return new BotTester(bot).sendMessageToBot(msg, "I don't understand: " + msg)
                .runTest();
        });
    }

    it("can handle positive how are you?", () => {
        return new BotTester(bot)
            .sendMessageToBot("How are you?", "I am good.", "How about you?")
            .sendMessageToBot("I am fine.", "That is good to hear.")
            .runTest();
    });

    it("can handle negative how are you?", () => {
        return new BotTester(bot)
            .sendMessageToBot("How are you?", "I am good.", "How about you?")
            .sendMessageToBot("Not good.", "I am sorry to hear that.")
            .runTest();
    });

});