# discord-bot-list
A simple wrapper for the discordbots.org API

# Install
`npm install --save discord-bot-list`

#Getting an API token

Please go to https://discordbots.org/api/docs and generate an API token.
#Usage
```js
//Require the module
const dbl = require(`discord-bot-list`)

const client = new dbl({
    token: "Your API token",
    id: "Your bot's user id"
})

//Get user information

client.getUser("User ID goes here", (err, res) => {
    if(err) {
        console.error(err)
    } else {
        console.log(res)
    }
})

//Get bot information
client.getBot("Bot user ID goes here", (err, res) => {
    if(err) {
        console.error(err)
    } else {
        console.log(res)
    }
})
//Get vote information for your bot
client.getVotes((err, res) => {
    if(err) {
        console.error(err)
    } else {
        console.log(res)
    }
})
//Post stats for your bot
client.postStats("Your bot's server count, MUST be a number, not a string", (err, res) => {
    if(err) {
        console.error(err)
    } else {
        console.log(res)
    }
})
```