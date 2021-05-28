import BotClient from "./lib/structure/client";
require('dotenv').config()



const Client = new BotClient({
    ownerID: process.env.OWNER_ID,
    token: process.env.TOKEN,
    mongooseURI: process.env.MONGOOSE_URI
})

Client.start()
    .then(() => console.log('[✔] Started the client!'))