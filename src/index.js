import { Client } from "mpp-client-net";
import { configDotenv } from "dotenv";

configDotenv(); // Load environment variables from the ".env" file

// Create a client to connect to the server
// (the websocket link is old)
const client = new Client("wss://mppclone.com:8443", process.env.MPPNET_TOKEN);

// Join a channel
client.setChannel("test/awkward");

// Start the client
client.start();

// Helper functions

let dmUser;

function sendChat(text) {
    if (typeof dmUser !== "undefined") {
        // Send a direct message back to the user
        client.sendArray([
            {
                m: "dm",
                message: text,
                _id: dmUser._id
            }
        ]);
    } else {
        // Send a normal chat message
        client.sendArray([
            {
                m: "a",
                message: text
            }
        ]);
    }
}

function handleCommand(command, args) {
    // Run a command (called from "a" and "dm" events)

    console.log("Running command:", command, args);

    if (command == "cmds") {
        sendChat("Commands: !cmds, !about");
    } else if (command == "about") {
        if (args[1] == "secret") {
            sendChat("Shh! This is a secret command! Don't tell anyone.");
        } else {
            sendChat("This bot was made with mppnet-bot-template.");
        }
    } else if (command == "name") {
        client.sendArray([
            {
                m: "userset",
                set: {
                    name: args.slice(1).join(" ")
                }
            }
        ]);
    }
}

//* Setup event listeners
//? For a list of events, see:
//? https://github.com/mppnet/frontend/blob/main/docs/protocol.md

client.on("hi", msg => {
    // This function runs when the bot connects to the server
    console.log("Connected to MPP.net");

    // Change the bot's name and color
    client.sendArray([
        {
            m: "userset",
            set: {
                name: "Template Bot",
                color: "#ffffff"
            }
        }
    ]);
});

client.on("a", msg => {
    // This function runs every time a message is sent in chat
    console.log(`${msg.p._id} ${msg.p.name}: ${msg.a}`);

    // Detect the command prefix
    if (!msg.a.startsWith("!")) return;

    const args = msg.a.split(" "); // List of arguments
    const command = args[0].substring(1); // Command they typed without the prefix

    dmUser = undefined;

    // Check for commands
    handleCommand(command, args);
});

client.on("dm", msg => {
    // This function only runs for direct messages (DMs) sent to the bot

    console.log(`(DM) ${msg.sender._id} ${msg.sender.name}: ${msg.a}`);
    console.log(msg);

    // Detect the command prefix
    if (!msg.a.startsWith("!")) return;

    const args = msg.a.split(" "); // List of arguments
    const command = args[0].substring(1); // Command they typed without the prefix

    // Check for commands
    dmUser = msg.sender;
    handleCommand(command, args);
});
