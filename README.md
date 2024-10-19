<img width=128 src=".github/128-piano.png" />

# mppnet-bot-template

This is a template bot for [MPP.net](https://multiplayerpiano.net) written in JavaScript. This template is aimed for beginners. This project requires a bot token to run on MPP.net.

If you need a bot token, you can open a ticket on the [official MPP.net Discord server](https://discord.gg/338D2xMufC).

## Getting Started

First, you need Node.js installed on your system (or any local JS runtime), which you can get [here](https://nodejs.org). Installation is different for each OS, so follow the directions carefully.

In order to generate the project, click the green "Use this template" dropdown above and choose "Create a new repository". Follow the instructions to generate a bot based on the template. Be sure to name your bot adequately and appropriately.

Next, copy the `.env.template` file to a new file called `.env`. This file will contain the bot token, like so:

```
NODE_ENV=development
MPPNET_TOKEN=<put your token here>
```

At this point, you can install the required packages for this project. The main dependency is `mpp-client-net`, which is required to connect to the MPP.net server.

I generated this project with [pnpm](https://pnpm.io), but you can use any package manager of your choosing to install the dependencies.

```
pnpm install
```

After this, you can run the start script with your package manager, or alternatively run `node .` to start the bot. The code is set up to connect to the channel `test/awkward` on the server by default.

At this point, you can change the code to your liking. Be sure to follow the [MPP Bot Guide](https://docs.google.com/document/d/1OrxwdLD1l1TE8iau6ToETVmnLuLXyGBhA0VfAY1Lf14/edit?tab=t.0).
